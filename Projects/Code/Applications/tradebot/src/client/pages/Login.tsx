import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [apiKey, setApiKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [environment, setEnvironment] = useState<"demo" | "live">("demo");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey || !username || !password) {
      setStatus("error");
      setErrorMessage("Please fill in all fields");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, username, password, environment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      login(data.token, data.environment);
      setStatus("success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setStatus("error");
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-blue-500 via-purple-500 to-green-500 flex items-center justify-center shadow-xl shadow-purple-500/20 mb-4 hover:scale-105 transition-transform">
              <span className="text-3xl">📈</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-slate-400">
            Connect to IG Markets to start trading
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="glass-card p-8">
          {status === "error" && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
              ✓ Connected! Redirecting...
            </div>
          )}

          <div className="space-y-5">
            {/* Environment Toggle */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Environment
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEnvironment("demo")}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all font-medium ${
                    environment === "demo"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 border border-transparent"
                  }`}>
                  🧪 Demo
                </button>
                <button
                  type="button"
                  onClick={() => setEnvironment("live")}
                  className={`flex-1 px-4 py-3 rounded-xl transition-all font-medium ${
                    environment === "live"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 border border-transparent"
                  }`}>
                  🔴 Live
                </button>
              </div>
            </div>

            {/* API Key */}
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium mb-2">
                API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your IG API key"
                className="input"
                autoComplete="off"
              />
            </div>

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your IG username"
                className="input"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your IG password"
                className="input"
                autoComplete="current-password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : (
                "Connect to IG"
              )}
            </button>
          </div>

          {/* Help text */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Get your API key from{" "}
            <a
              href="https://www.ig.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline">
              My IG → Settings → API
            </a>
          </p>
        </form>

        {/* Back link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
