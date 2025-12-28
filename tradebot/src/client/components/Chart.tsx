import {
	ColorType,
	type IChartApi,
	type ISeriesApi,
	createChart,
} from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { usePrices } from '../hooks/useApi';

interface ChartProps {
	symbol: string;
	epic?: string;
}

type Resolution = 'HOUR' | 'HOUR_4' | 'DAY' | 'WEEK';

const timeframes: { label: string; value: Resolution }[] = [
	{ label: '1H', value: 'HOUR' },
	{ label: '4H', value: 'HOUR_4' },
	{ label: '1D', value: 'DAY' },
	{ label: '1W', value: 'WEEK' },
];

export function Chart({ symbol, epic = 'IX.D.DAX.IFMM.IP' }: ChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
	const [resolution, setResolution] = useState<Resolution>('DAY');

	const { data: pricesData, isLoading, error } = usePrices(epic, resolution);

	// Create chart
	useEffect(() => {
		if (!containerRef.current) return;

		const chart = createChart(containerRef.current, {
			layout: {
				background: { type: ColorType.Solid, color: '#1e293b' },
				textColor: '#94a3b8',
			},
			grid: {
				vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
				horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
			},
			width: containerRef.current.clientWidth,
			height: 400,
		});

		const series = chart.addCandlestickSeries({
			upColor: '#22c55e',
			downColor: '#ef4444',
			borderDownColor: '#ef4444',
			borderUpColor: '#22c55e',
			wickDownColor: '#ef4444',
			wickUpColor: '#22c55e',
		});

		chartRef.current = chart;
		seriesRef.current = series;

		const handleResize = () => {
			if (containerRef.current) {
				chart.applyOptions({ width: containerRef.current.clientWidth });
			}
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			chart.remove();
		};
	}, []);

	// Update data when prices change
	useEffect(() => {
		if (!seriesRef.current || !pricesData?.prices?.length) return;

		const chartData = pricesData.prices.map((p: PriceCandle) => ({
			time:
				p.snapshotTimeUTC?.split('T')[0] ||
				p.snapshotTime?.split('/').reverse().join('-'),
			open: (p.openPrice?.bid + p.openPrice?.ask) / 2,
			high: (p.highPrice?.bid + p.highPrice?.ask) / 2,
			low: (p.lowPrice?.bid + p.lowPrice?.ask) / 2,
			close: (p.closePrice?.bid + p.closePrice?.ask) / 2,
		}));

		seriesRef.current.setData(chartData);
		chartRef.current?.timeScale().fitContent();
	}, [pricesData]);

	return (
		<div className="chart-container">
			<div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="text-lg font-semibold">{symbol}</span>
					{isLoading && (
						<span className="text-xs text-slate-400 animate-pulse">
							Loading...
						</span>
					)}
					{error && (
						<span className="text-xs text-red-400">Connect to IG first</span>
					)}
				</div>
				<div className="flex items-center gap-2">
					{timeframes.map((tf) => (
						<button
							key={tf.value}
							type="button"
							onClick={() => setResolution(tf.value)}
							className={`px-2 py-1 text-xs rounded transition-all ${
								resolution === tf.value
									? 'bg-blue-500/20 text-blue-400'
									: 'text-slate-400 hover:text-white hover:bg-white/5'
							}`}
						>
							{tf.label}
						</button>
					))}
				</div>
			</div>
			<div ref={containerRef} />
		</div>
	);
}

interface PriceCandle {
	snapshotTime: string;
	snapshotTimeUTC?: string;
	openPrice: { bid: number; ask: number };
	closePrice: { bid: number; ask: number };
	highPrice: { bid: number; ask: number };
	lowPrice: { bid: number; ask: number };
}
