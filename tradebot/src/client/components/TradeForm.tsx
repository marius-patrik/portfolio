import { useState } from 'react';
import { openPosition, useMarkets } from '../hooks/useApi';

interface TradeFormProps {
	onSuccess?: () => void;
}

export function TradeForm({ onSuccess }: TradeFormProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedEpic, setSelectedEpic] = useState('');
	const [selectedName, setSelectedName] = useState('');
	const [direction, setDirection] = useState<'BUY' | 'SELL'>('BUY');
	const [size, setSize] = useState('1');
	const [stopDistance, setStopDistance] = useState('');
	const [limitDistance, setLimitDistance] = useState('');
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const { data: marketsData, isLoading: searchLoading } =
		useMarkets(searchTerm);
	const markets = marketsData?.markets || [];

	const handleSubmit = async () => {
		if (!selectedEpic || !size) {
			setStatus('error');
			setErrorMessage('Please select an instrument and enter size');
			return;
		}

		setStatus('loading');
		setErrorMessage('');

		try {
			await openPosition({
				epic: selectedEpic,
				direction,
				size: Number.parseFloat(size),
				stopDistance: stopDistance
					? Number.parseFloat(stopDistance)
					: undefined,
				limitDistance: limitDistance
					? Number.parseFloat(limitDistance)
					: undefined,
			});
			setStatus('success');
			setSelectedEpic('');
			setSelectedName('');
			setSize('1');
			onSuccess?.();
			setTimeout(() => setStatus('idle'), 3000);
		} catch (error) {
			setStatus('error');
			setErrorMessage((error as Error).message);
		}
	};

	return (
		<div className="glass-card p-6">
			<h2 className="text-lg font-semibold mb-4">Open Position</h2>

			{status === 'error' && (
				<div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
					{errorMessage}
				</div>
			)}

			{status === 'success' && (
				<div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
					✓ Position opened successfully
				</div>
			)}

			<div className="space-y-4">
				{/* Search Instrument */}
				<div>
					<label className="block text-sm font-medium mb-2">
						Search Instrument
					</label>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search (e.g. DAX, Gold, US 500)"
						className="input"
					/>
					{searchLoading && (
						<p className="text-xs text-slate-400 mt-1">Searching...</p>
					)}
					{markets.length > 0 && !selectedEpic && (
						<div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-slate-900/80">
							{markets.slice(0, 10).map((m: Market) => (
								<button
									key={m.epic}
									type="button"
									onClick={() => {
										setSelectedEpic(m.epic);
										setSelectedName(m.instrumentName);
										setSearchTerm('');
									}}
									className="w-full text-left px-3 py-2 hover:bg-white/5 text-sm border-b border-white/5 last:border-0"
								>
									<span className="font-medium">{m.instrumentName}</span>
									<span className="text-slate-400 ml-2 text-xs">{m.epic}</span>
								</button>
							))}
						</div>
					)}
				</div>

				{/* Selected Instrument */}
				{selectedEpic && (
					<div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
						<div className="flex items-center justify-between">
							<span className="font-medium">{selectedName}</span>
							<button
								type="button"
								onClick={() => {
									setSelectedEpic('');
									setSelectedName('');
								}}
								className="text-slate-400 hover:text-white text-sm"
							>
								✕
							</button>
						</div>
					</div>
				)}

				{/* Direction */}
				<div>
					<label className="block text-sm font-medium mb-2">Direction</label>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => setDirection('BUY')}
							className={`flex-1 py-2 rounded-lg font-medium transition-all ${
								direction === 'BUY'
									? 'bg-green-500/20 text-green-400 border border-green-500/30'
									: 'bg-white/5 text-slate-400 hover:bg-white/10'
							}`}
						>
							BUY
						</button>
						<button
							type="button"
							onClick={() => setDirection('SELL')}
							className={`flex-1 py-2 rounded-lg font-medium transition-all ${
								direction === 'SELL'
									? 'bg-red-500/20 text-red-400 border border-red-500/30'
									: 'bg-white/5 text-slate-400 hover:bg-white/10'
							}`}
						>
							SELL
						</button>
					</div>
				</div>

				{/* Size */}
				<div>
					<label className="block text-sm font-medium mb-2">Size</label>
					<input
						type="number"
						value={size}
						onChange={(e) => setSize(e.target.value)}
						min="0.1"
						step="0.1"
						className="input"
					/>
				</div>

				{/* Stop & Limit */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">
							Stop Distance
						</label>
						<input
							type="number"
							value={stopDistance}
							onChange={(e) => setStopDistance(e.target.value)}
							placeholder="Optional"
							className="input"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">
							Limit Distance
						</label>
						<input
							type="number"
							value={limitDistance}
							onChange={(e) => setLimitDistance(e.target.value)}
							placeholder="Optional"
							className="input"
						/>
					</div>
				</div>

				{/* Submit */}
				<button
					type="button"
					onClick={handleSubmit}
					disabled={status === 'loading' || !selectedEpic}
					className={`w-full py-3 rounded-xl font-semibold transition-all disabled:opacity-50 ${
						direction === 'BUY' ? 'btn-primary' : 'btn-danger'
					}`}
				>
					{status === 'loading'
						? 'Opening...'
						: `${direction} ${selectedName || 'Select Instrument'}`}
				</button>
			</div>
		</div>
	);
}

interface Market {
	epic: string;
	instrumentName: string;
	bid?: number;
	offer?: number;
}
