import { Link } from "wouter";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-linear-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <span className="text-5xl">📈</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            TradeBot
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-400 mb-4">
            CFD Trading Dashboard for IG Markets
          </p>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            Connect to your IG Markets account and manage your CFD trading with
            real-time data, live positions, and professional charting tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="btn btn-primary text-lg px-8 py-4">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-primary text-lg px-8 py-4">
                  Login to IG Markets
                </Link>
                <a
                  href="https://www.ig.com/demo-trading-account"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 text-lg px-8 py-4">
                  Open Demo Account
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to trade
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="📊"
              title="Live Market Data"
              description="Real-time prices and professional charting with TradingView-style interface."
            />
            <FeatureCard
              icon="💹"
              title="Position Management"
              description="View, monitor, and close your positions with live P&L tracking."
            />
            <FeatureCard
              icon="🔐"
              title="Secure Connection"
              description="Connect securely to IG Markets API with support for Demo and Live accounts."
            />
            <FeatureCard
              icon="📱"
              title="Modern Interface"
              description="Clean, responsive design that works seamlessly on desktop and mobile."
            />
            <FeatureCard
              icon="⚡"
              title="Fast Execution"
              description="Quick market orders with real-time feedback and confirmation."
            />
            <FeatureCard
              icon="📜"
              title="Trade History"
              description="Review your trading history and analyze your performance."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 text-center text-sm text-slate-500">
        <p>
          TradeBot © {new Date().getFullYear()} — Not affiliated with IG Markets
        </p>
        <p className="mt-2 text-xs">
          CFD trading involves significant risk of loss. Only trade with money
          you can afford to lose.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
