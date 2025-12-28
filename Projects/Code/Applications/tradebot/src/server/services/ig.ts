/**
 * IG Markets API Client
 * API URLs come from environment variables
 */

interface IGSession {
	cst: string;
	securityToken: string;
	expiresAt: number;
}

interface IGConfig {
	apiKey: string;
	username: string;
	password: string;
	environment: 'demo' | 'live';
}

let currentSession: IGSession | null = null;
let config: IGConfig | null = null;

function getBaseUrl(): string {
	const isLive = config?.environment === 'live';
	if (isLive) {
		return process.env.IG_LIVE_URL || 'https://api.ig.com/gateway/deal';
	}
	return process.env.IG_DEMO_URL || 'https://demo-api.ig.com/gateway/deal';
}

export function configureIG(newConfig: IGConfig): void {
	config = newConfig;
	currentSession = null;
}

export async function startSession(): Promise<IGSession> {
	if (!config) {
		throw new Error('IG not configured');
	}

	const response = await fetch(`${getBaseUrl()}/session`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-IG-API-KEY': config.apiKey,
			VERSION: '2',
		},
		body: JSON.stringify({
			identifier: config.username,
			password: config.password,
		}),
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(
			`Session failed: ${error.errorCode || response.statusText}`,
		);
	}

	const cst = response.headers.get('CST');
	const securityToken = response.headers.get('X-SECURITY-TOKEN');

	if (!cst || !securityToken) {
		throw new Error('Missing session tokens');
	}

	currentSession = {
		cst,
		securityToken,
		expiresAt: Date.now() + 6 * 60 * 60 * 1000,
	}; // 6 hours
	return currentSession;
}

async function getSession(): Promise<IGSession> {
	if (!currentSession || Date.now() > currentSession.expiresAt - 60000) {
		return startSession();
	}
	return currentSession;
}

async function request<T>(
	method: string,
	endpoint: string,
	body?: unknown,
	version = '1',
): Promise<T> {
	if (!config) {
		throw new Error('IG not configured');
	}
	const session = await getSession();

	const response = await fetch(`${getBaseUrl()}${endpoint}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'X-IG-API-KEY': config.apiKey,
			CST: session.cst,
			'X-SECURITY-TOKEN': session.securityToken,
			VERSION: version,
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		throw new Error(`API error: ${error.errorCode || response.statusText}`);
	}

	return response.json();
}

// Account
export interface AccountInfo {
	accounts: Array<{
		accountId: string;
		accountName: string;
		accountType: string;
		balance: {
			balance: number;
			deposit: number;
			profitLoss: number;
			available: number;
		};
		currency: string;
	}>;
}

export async function getAccounts(): Promise<AccountInfo> {
	return request('GET', '/accounts');
}

// Markets / Instruments
export interface Market {
	epic: string;
	instrumentName: string;
	instrumentType: string;
	bid: number;
	offer: number;
	percentageChange: number;
	netChange: number;
}

export async function searchMarkets(searchTerm: string) {
	return request<{ markets: Market[] }>(
		'GET',
		`/markets?searchTerm=${encodeURIComponent(searchTerm)}`,
	);
}

export async function getMarket(epic: string) {
	return request<{
		instrument: Market;
		snapshot: { bid: number; offer: number };
	}>('GET', `/markets/${epic}`, undefined, '3');
}

// Positions
export interface Position {
	position: {
		dealId: string;
		direction: 'BUY' | 'SELL';
		size: number;
		level: number;
		currency: string;
		contractSize: number;
	};
	market: Market;
}

export async function getPositions() {
	return request<{ positions: Position[] }>(
		'GET',
		'/positions',
		undefined,
		'2',
	);
}

export async function openPosition(params: {
	epic: string;
	direction: 'BUY' | 'SELL';
	size: number;
	orderType?: 'MARKET' | 'LIMIT';
	stopDistance?: number;
	limitDistance?: number;
}) {
	return request<{ dealReference: string }>(
		'POST',
		'/positions/otc',
		{
			epic: params.epic,
			direction: params.direction,
			size: params.size,
			orderType: params.orderType || 'MARKET',
			currencyCode: 'EUR',
			forceOpen: true,
			guaranteedStop: false,
			stopDistance: params.stopDistance,
			limitDistance: params.limitDistance,
		},
		'2',
	);
}

export async function closePosition(
	dealId: string,
	direction: 'BUY' | 'SELL',
	size: number,
) {
	// IG uses DELETE with a body, need special handling
	return request<{ dealReference: string }>(
		'POST',
		'/positions/otc',
		{
			dealId,
			direction: direction === 'BUY' ? 'SELL' : 'BUY', // Opposite to close
			size,
			orderType: 'MARKET',
		},
		'1',
	);
}

// Working Orders
export async function getOrders() {
	return request<{ workingOrders: unknown[] }>(
		'GET',
		'/workingorders',
		undefined,
		'2',
	);
}

export async function createOrder(params: {
	epic: string;
	direction: 'BUY' | 'SELL';
	size: number;
	level: number;
	type: 'LIMIT' | 'STOP';
}) {
	return request<{ dealReference: string }>(
		'POST',
		'/workingorders/otc',
		{
			epic: params.epic,
			direction: params.direction,
			size: params.size,
			level: params.level,
			type: params.type,
			currencyCode: 'EUR',
			timeInForce: 'GOOD_TILL_CANCELLED',
			guaranteedStop: false,
		},
		'2',
	);
}

export async function cancelOrder(dealId: string) {
	return request<{ dealReference: string }>(
		'DELETE',
		`/workingorders/otc/${dealId}`,
		undefined,
		'2',
	);
}

// Prices
export async function getHistoricalPrices(
	epic: string,
	resolution: string,
	max = 100,
) {
	return request<{ prices: unknown[] }>(
		'GET',
		`/prices/${epic}?resolution=${resolution}&max=${max}`,
		undefined,
		'3',
	);
}

// Activity History (closed trades)
export interface ActivityItem {
	date: string;
	dealId: string;
	epic: string;
	period: string;
	channel: string;
	type: string;
	status: string;
	description: string;
	details: {
		dealReference: string;
		direction: 'BUY' | 'SELL';
		size: number;
		level: number;
		goodTillDate?: string;
		currency: string;
		profit?: number;
		profitCurrency?: string;
	};
}

export async function getActivityHistory(from?: string, to?: string) {
	const now = new Date();
	const fromDate =
		from || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
	const toDate = to || now.toISOString();

	return request<{ activities: ActivityItem[] }>(
		'GET',
		`/history/activity?from=${fromDate}&to=${toDate}`,
		undefined,
		'3',
	);
}

// Transaction History (P/L)
export interface Transaction {
	date: string;
	openDateUtc: string;
	closeDateUtc: string;
	reference: string;
	instrumentName: string;
	period: string;
	profitAndLoss: string;
	transactionType: string;
	cashTransaction: boolean;
	size: string;
	openLevel: string;
	closeLevel: string;
	currency: string;
}

export async function getTransactionHistory(from?: string, to?: string) {
	const now = new Date();
	const fromDate =
		from || new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
	const toDate = to || now.toISOString();

	return request<{ transactions: Transaction[] }>(
		'GET',
		`/history/transactions?from=${fromDate}&to=${toDate}&type=ALL_DEAL`,
		undefined,
		'2',
	);
}
