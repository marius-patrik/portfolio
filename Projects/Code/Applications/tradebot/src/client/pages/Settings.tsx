import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';

export function Settings() {
	const [apiKey, setApiKey] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [environment, setEnvironment] = useState<'demo' | 'live'>('demo');
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const { login, isAuthenticated, logout } = useAuth();
	const [, navigate] = useLocation();

	const handleSave = async () => {
		if (!apiKey || !username || !password) {
			setStatus('error');
			setErrorMessage('Please fill in all fields');
			return;
		}

		setStatus('loading');
		setErrorMessage('');

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ apiKey, username, password, environment }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Login failed');
			}

			login(data.token, data.environment);
			setStatus('success');
			setTimeout(() => {
				navigate('/');
			}, 1000);
		} catch (error) {
			setStatus('error');
			setErrorMessage((error as Error).message);
		}
	};

	const handleLogout = () => {
		logout();
		setStatus('idle');
	};

	return (
		<div className="space-y-6 animate-fade-in max-w-2xl">
			<h1 className="text-2xl font-bold">Settings</h1>

			{isAuthenticated ? (
				<div className="glass-card p-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-lg font-semibold">Connected to IG Markets</h2>
							<p className="text-sm text-slate-400 mt-1">
								You are logged in and ready to trade.
							</p>
						</div>
						<button
							type="button"
							onClick={handleLogout}
							className="btn btn-danger"
						>
							Disconnect
						</button>
					</div>
				</div>
			) : (
				<div className="glass-card p-6">
					<h2 className="text-lg font-semibold mb-4">IG Markets API</h2>
					<p className="text-sm text-slate-400 mb-6">
						Get your API key from{' '}
						<a
							href="https://www.ig.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:underline"
						>
							My IG → Settings → API
						</a>
					</p>

					{status === 'error' && (
						<div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
							{errorMessage}
						</div>
					)}

					{status === 'success' && (
						<div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
							✓ Connected! Redirecting...
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label htmlFor="env" className="block text-sm font-medium mb-2">
								Environment
							</label>
							<div className="flex gap-2">
								<button
									type="button"
									onClick={() => setEnvironment('demo')}
									className={`px-4 py-2 rounded-lg transition-all ${
										environment === 'demo'
											? 'bg-green-500/20 text-green-400 border border-green-500/30'
											: 'bg-white/5 text-slate-400 hover:bg-white/10'
									}`}
								>
									Demo
								</button>
								<button
									type="button"
									onClick={() => setEnvironment('live')}
									className={`px-4 py-2 rounded-lg transition-all ${
										environment === 'live'
											? 'bg-red-500/20 text-red-400 border border-red-500/30'
											: 'bg-white/5 text-slate-400 hover:bg-white/10'
									}`}
								>
									Live
								</button>
							</div>
						</div>

						<div>
							<label
								htmlFor="apiKey"
								className="block text-sm font-medium mb-2"
							>
								API Key
							</label>
							<input
								id="apiKey"
								type="text"
								value={apiKey}
								onChange={(e) => setApiKey(e.target.value)}
								placeholder="Enter your IG API key"
								className="input"
							/>
						</div>

						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium mb-2"
							>
								Username
							</label>
							<input
								id="username"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder="Enter your IG username"
								className="input"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your IG password"
								className="input"
							/>
						</div>

						<button
							type="button"
							onClick={handleSave}
							disabled={status === 'loading'}
							className="btn btn-primary w-full disabled:opacity-50"
						>
							{status === 'loading' ? 'Connecting...' : 'Connect to IG'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
