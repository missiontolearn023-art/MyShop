import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { isAdminLoggedIn, loginAdmin, logoutAdmin } from '@/lib/shopData';

interface AuthContextType {
  authenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAdminLoggedIn());
  }, []);

  const login = (username: string, password: string) => {
    const success = loginAdmin(username, password);
    if (success) setAuthenticated(true);
    return success;
  };

  const logout = () => {
    logoutAdmin();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
