import { useState } from 'react';
import { Chart } from '../components/Chart';
import { TradeForm } from '../components/TradeForm';
import { closePosition, useAccounts, usePositions } from '../hooks/useApi';

export function Dashboard() {
	const { data: accountData, isLoading: accountLoading } = useAccounts();
	const {
		data: positionsData,
		isLoading: positionsLoading,
		mutate: refreshPositions,
	} = usePositions();

	const account = accountData?.accounts?.[0];
	const positions = positionsData?.positions || [];

	const totalPnL = positions.reduce(
		(sum: number, p: { position: { profitAndLoss?: number } }) =>
			sum + (p.position?.profitAndLoss || 0),
		0,
	);

	return (
		<div className="space-y-6 animate-fade-in">
			{/* Account Summary */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<StatCard
					label="Balance"
					value={
						account
							? `€${account.balance?.balance?.toLocaleString() || '0'}`
							: '—'
					}
					icon="💰"
					loading={accountLoading}
				/>
				<StatCard
					label="Available"
					value={
						account
							? `€${account.balance?.available?.toLocaleString() || '0'}`
							: '—'
					}
					icon="�"
					loading={accountLoading}
				/>
				<StatCard
					label="Positions"
					value={positions.length.toString()}
					icon="📊"
					loading={positionsLoading}
				/>
				<StatCard
					label="Open P/L"
					value={`${totalPnL >= 0 ? '+' : ''}€${totalPnL.toFixed(2)}`}
					icon="�"
					loading={positionsLoading}
					trend={totalPnL >= 0 ? 'up' : 'down'}
				/>
			</div>

			{/* Chart & Trade Form */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 glass-card overflow-hidden">
					<Chart symbol="Germany 40 (DAX)" />
				</div>
				<TradeForm onSuccess={refreshPositions} />
			</div>

			{/* Open Positions */}
			<div className="glass-card p-6">
				<h2 className="text-lg font-semibold mb-4">Open Positions</h2>
				{positionsLoading ? (
					<div className="text-center py-8 text-slate-400">
						Loading positions...
					</div>
				) : positions.length === 0 ? (
					<div className="text-center py-8 text-slate-400">
						No open positions
					</div>
				) : (
					<table className="w-full text-sm">
						<thead>
							<tr className="text-left text-slate-400 border-b border-white/10">
								<th className="pb-3">Instrument</th>
								<th className="pb-3">Direction</th>
								<th className="pb-3">Size</th>
								<th className="pb-3">Entry</th>
								<th className="pb-3">P/L</th>
								<th className="pb-3">Actions</th>
							</tr>
						</thead>
						<tbody>
							{positions.map((p: PositionData) => (
								<PositionRow
									key={p.position.dealId}
									position={p}
									onClose={async () => {
										await closePosition(
											p.position.dealId,
											p.position.direction,
											p.position.size,
										);
										refreshPositions();
									}}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

interface PositionData {
	position: {
		dealId: string;
		direction: 'BUY' | 'SELL';
		size: number;
		level: number;
		profitAndLoss?: number;
	};
	market: {
		instrumentName: string;
		epic: string;
	};
}

function StatCard({
	label,
	value,
	icon,
	trend,
	loading,
}: {
	label: string;
	value: string;
	icon: string;
	trend?: 'up' | 'down' | null;
	loading?: boolean;
}) {
	return (
		<div className="glass-card p-4">
			<div className="flex items-center justify-between mb-2">
				<span className="text-2xl">{icon}</span>
				{trend && (
					<span className={trend === 'up' ? 'text-profit' : 'text-loss'}>
						{trend === 'up' ? '↑' : '↓'}
					</span>
				)}
			</div>
			<p className="text-sm text-slate-400">{label}</p>
			<p
				className={`text-xl font-bold ${
					loading
						? 'animate-pulse text-slate-500'
						: trend === 'up'
							? 'text-profit'
							: trend === 'down'
								? 'text-loss'
								: ''
				}`}
			>
				{loading ? '...' : value}
			</p>
		</div>
	);
}

function PositionRow({
	position,
	onClose,
}: {
	position: PositionData;
	onClose: () => void;
}) {
	const [closing, setClosing] = useState(false);
	const { position: pos, market } = position;
	const pnl = pos.profitAndLoss || 0;

	const handleClose = async () => {
		setClosing(true);
		try {
			await onClose();
		} finally {
			setClosing(false);
		}
	};

	return (
		<tr className="border-b border-white/5 hover:bg-white/5">
			<td className="py-3 font-medium">
				{market?.instrumentName || 'Unknown'}
			</td>
			<td className={pos.direction === 'BUY' ? 'text-profit' : 'text-loss'}>
				{pos.direction}
			</td>
			<td>{pos.size}</td>
			<td>{pos.level?.toLocaleString()}</td>
			<td className={pnl >= 0 ? 'text-profit' : 'text-loss'}>
				{pnl >= 0 ? '+' : ''}€{pnl.toFixed(2)}
			</td>
			<td>
				<button
					type="button"
					onClick={handleClose}
					disabled={closing}
					className="btn btn-danger text-xs py-1 px-3 disabled:opacity-50"
				>
					{closing ? '...' : 'Close'}
				</button>
			</td>
		</tr>
	);
}
