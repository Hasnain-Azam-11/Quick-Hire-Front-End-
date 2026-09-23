import { createContext, useContext, useState } from 'react';

// The admin panel has no backend yet (no `is_staff` login endpoint), so this is a separate,
// deliberately simple mock session — independent of the real client/worker AuthContext, which is
// already wired to the Django backend. Swap `login` for a real `POST /admin/login/` (or whatever
// exposes `is_staff`) once that exists.
const AdminAuthContext = createContext(null);

const SESSION_KEY = 'quickhire_admin_session';

// Placeholder credentials until real admin authentication exists on the backend.
const DEMO_CREDENTIALS = { username: 'admin', password: 'quickhire2026' };

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    if (username.trim() !== DEMO_CREDENTIALS.username || password !== DEMO_CREDENTIALS.password) {
      return false;
    }
    const next = { name: 'Admin', username: DEMO_CREDENTIALS.username };
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin: session, isAdminAuthenticated: !!session, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
