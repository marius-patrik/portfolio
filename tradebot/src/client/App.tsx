import { Route, Switch } from "wouter";
import { Page } from "./components/Interface/Page/Page";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";
import { Strategies } from "./pages/Strategies";

export function App() {
  return (
    <AuthProvider>
      <Switch>
        {/* Public routes (no navbar) */}
        <Route path="/">
          <Home />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        {/* Protected routes (with navbar) */}
        <Route path="/dashboard">
          <Page>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Page>
        </Route>

        <Route path="/strategies">
          <Page>
            <ProtectedRoute>
              <Strategies />
            </ProtectedRoute>
          </Page>
        </Route>

        <Route path="/history">
          <Page>
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          </Page>
        </Route>

        <Route path="/settings">
          <Page>
            <Settings />
          </Page>
        </Route>
      </Switch>
    </AuthProvider>
  );
}
