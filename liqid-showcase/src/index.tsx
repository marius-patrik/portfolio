import React from 'react';
import ReactDOM from 'react-dom/client';
import { Redirect, Route, Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Explorer from './pages/explorer';
import { LoginPage } from './pages/login';
import './global.css';
import 'liqid-components/styles.css';

// Check if JWT token exists and is valid
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('jwt_token');
  if (!token) return false;
  if (token === 'guest_token') return true;

  try {
    // Decode JWT payload (base64)
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('jwt_token');
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Protected route component
const ProtectedRoute = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return <Component />;
};

const App = () => {
  return (
    <Router hook={useHashLocation}>
      <Route path="/login" component={LoginPage} />

      <Route path="/">
        <ProtectedRoute component={Explorer} />
      </Route>
    </Router>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
