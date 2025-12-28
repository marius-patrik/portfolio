import useSWR from "swr";

const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "API request failed");
  }
  return res.json();
};

export function useAccounts() {
  return useSWR("/api/portfolio/account", fetcher);
}

export function usePositions() {
  return useSWR("/api/portfolio/positions", fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
  });
}

export function useOrders() {
  return useSWR("/api/orders", fetcher);
}

export function useMarkets(searchTerm: string) {
  return useSWR(
    searchTerm
      ? `/api/markets/search?q=${encodeURIComponent(searchTerm)}`
      : null,
    fetcher,
  );
}

export function usePrices(epic: string, resolution = "HOUR") {
  return useSWR(
    epic ? `/api/markets/${epic}/prices?resolution=${resolution}` : null,
    fetcher,
  );
}

// Mutation functions
export async function closePosition(
  dealId: string,
  direction: "BUY" | "SELL",
  size: number,
) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/portfolio/positions/${dealId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ direction, size }),
  });
  if (!res.ok) throw new Error("Failed to close position");
  return res.json();
}

export async function openPosition(params: {
  epic: string;
  direction: "BUY" | "SELL";
  size: number;
  stopDistance?: number;
  limitDistance?: number;
}) {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/portfolio/positions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to open position");
  return res.json();
}

// Trade history
export function useTransactions() {
  return useSWR("/api/history/transactions", fetcher);
}
