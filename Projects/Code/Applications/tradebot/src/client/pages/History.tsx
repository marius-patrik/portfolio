import { useTransactions } from "../hooks/useApi";

interface Transaction {
  date: string;
  instrumentName: string;
  transactionType: string;
  size: string;
  openLevel: string;
  closeLevel: string;
  profitAndLoss: string;
  currency: string;
}

export function History() {
  const { data, isLoading, error } = useTransactions();
  const transactions: Transaction[] = data?.transactions || [];

  const totalPnL = transactions.reduce((sum, t) => {
    const pnl = Number.parseFloat(t.profitAndLoss.replace(/[^-\d.]/g, "")) || 0;
    return sum + pnl;
  }, 0);

  const wins = transactions.filter(
    (t) => Number.parseFloat(t.profitAndLoss.replace(/[^-\d.]/g, "")) > 0,
  ).length;
  const winRate =
    transactions.length > 0
      ? Math.round((wins / transactions.length) * 100)
      : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Trade History</h1>

      <div className="glass-card p-6">
        {isLoading ? (
          <div className="text-center py-8 text-slate-400">
            Loading history...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            Connect to IG first
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg mb-2">No trade history yet</p>
            <p className="text-sm">Your closed trades will appear here.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-white/10">
                <th className="pb-3">Date</th>
                <th className="pb-3">Instrument</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Open</th>
                <th className="pb-3">Close</th>
                <th className="pb-3">P/L</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <TradeRow key={`${t.date}-${i}`} transaction={t} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-slate-400">Total Trades</p>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-slate-400">Win Rate</p>
          <p
            className={`text-2xl font-bold ${winRate >= 50 ? "text-profit" : "text-loss"}`}>
            {transactions.length > 0 ? `${winRate}%` : "—"}
          </p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-slate-400">Total P/L</p>
          <p
            className={`text-2xl font-bold ${totalPnL >= 0 ? "text-profit" : "text-loss"}`}>
            {totalPnL >= 0 ? "+" : ""}€{totalPnL.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

function TradeRow({ transaction }: { transaction: Transaction }) {
  const pnl =
    Number.parseFloat(transaction.profitAndLoss.replace(/[^-\d.]/g, "")) || 0;
  const date = new Date(transaction.date).toLocaleString();

  return (
    <tr className="border-b border-white/5 hover:bg-white/5">
      <td className="py-3 text-slate-400">{date}</td>
      <td className="font-medium">{transaction.instrumentName}</td>
      <td>{transaction.transactionType}</td>
      <td>{transaction.size}</td>
      <td>{transaction.openLevel}</td>
      <td>{transaction.closeLevel}</td>
      <td className={pnl >= 0 ? "text-profit" : "text-loss"}>
        {pnl >= 0 ? "+" : ""}€{pnl.toFixed(2)}
      </td>
    </tr>
  );
}
