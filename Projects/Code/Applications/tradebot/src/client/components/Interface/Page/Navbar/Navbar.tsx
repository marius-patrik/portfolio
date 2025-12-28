import { Link, useLocation } from "wouter";

const navLinks = [
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/strategies", label: "Strategies", icon: "🎯" },
  { path: "/history", label: "History", icon: "📜" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="glass-card mx-4 mt-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
            <span className="text-xl">📈</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TradeBot</h1>
            <p className="text-xs text-slate-400">IG Markets CFD</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navLinks.map(({ path, label, icon }) => (
            <Link
              key={path}
              href={path}
              className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                location === path
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}>
              <span>{icon}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30">
          <span className="text-green-400 text-sm font-medium">● Demo</span>
        </div>
      </div>
    </nav>
  );
}
