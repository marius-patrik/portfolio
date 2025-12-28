export function Strategies() {
	return (
		<div className="space-y-6 animate-fade-in">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold">Trading Strategies</h1>
				<button type="button" className="btn btn-primary">
					+ New Strategy
				</button>
			</div>

			<div className="glass-card p-6">
				<div className="text-center py-12 text-slate-400">
					<p className="text-lg mb-2">No strategies yet</p>
					<p className="text-sm">
						Create your first automated trading strategy.
					</p>
				</div>
			</div>

			<div className="glass-card p-6">
				<h2 className="text-lg font-semibold mb-4">Strategy Templates</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<TemplateCard
						name="DCA"
						description="Auto-buy at regular intervals"
						icon="📊"
					/>
					<TemplateCard
						name="Grid Trading"
						description="Orders at preset price levels"
						icon="📏"
					/>
					<TemplateCard
						name="SMA Crossover"
						description="Moving average signals"
						icon="📈"
					/>
				</div>
			</div>
		</div>
	);
}

function TemplateCard({
	name,
	description,
	icon,
}: {
	name: string;
	description: string;
	icon: string;
}) {
	return (
		<div className="p-4 rounded-xl border border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer">
			<div className="text-3xl mb-3">{icon}</div>
			<h4 className="font-medium mb-1">{name}</h4>
			<p className="text-sm text-slate-400">{description}</p>
		</div>
	);
}
