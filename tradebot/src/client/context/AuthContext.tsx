import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	environment: 'demo' | 'live' | null;
	login: (token: string, env: 'demo' | 'live') => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [environment, setEnvironment] = useState<'demo' | 'live' | null>(null);

	useEffect(() => {
		// Check for existing token on mount
		const token = localStorage.getItem('token');
		const env = localStorage.getItem('environment') as 'demo' | 'live' | null;
		if (token) {
			setIsAuthenticated(true);
			setEnvironment(env);
		}
	}, []);

	const login = (token: string, env: 'demo' | 'live') => {
		localStorage.setItem('token', token);
		localStorage.setItem('environment', env);
		setIsAuthenticated(true);
		setEnvironment(env);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('environment');
		setIsAuthenticated(false);
		setEnvironment(null);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, environment, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}
