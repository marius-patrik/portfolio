import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

// Check if JWT token exists and is valid
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwt_token');
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export const LoginPage = () => {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      setLocation('/');
    }
  }, [setLocation]);

  const API_BASE = 'http://localhost:3001/api';

  const handleSendCode = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/send-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to send code');
        return;
      }

      setCodeSent(true);
    } catch {
      setError('Failed to send code. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) {
      setError('Please enter the code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to verify code');
        return;
      }

      // Store JWT and redirect
      localStorage.setItem('jwt_token', data.token);
      setLocation('/');
    } catch {
      setError('Failed to verify code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={codeSent}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
          </div>

          {!codeSent ? (
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          ) : (
            <>
              {/* Code Input */}
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-2xl tracking-widest"
                />
                <p className="text-white/50 text-xs mt-2">
                  Check your terminal for the code (debug mode)
                </p>
              </div>

              <button
                onClick={handleVerifyCode}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <button
                onClick={() => {
                  setCodeSent(false);
                  setCode('');
                  setError('');
                }}
                className="w-full py-2 text-white/60 hover:text-white text-sm transition-colors"
              >
                Use different email
              </button>
            </>
          )}

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                localStorage.setItem('jwt_token', 'guest_token');
                setLocation('/');
              }}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/80 font-medium rounded-lg transition-colors border border-white/10"
            >
              Login as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
