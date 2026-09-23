import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { clearToken, getToken, setToken } from '../api/token';
import { registerClient, requestToken } from '../api/auth';

const AuthContext = createContext(null);

const USER_KEY = 'quickhire_user';
const USERS_KEY = 'quickhire_users';
const LEGACY_ROLE_KEY = 'quickhire_role';

const newId = () => `u-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// Accepts the old single-`role` shape and returns `{ roles, activeRole }`.
function normalizeUser(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const legacyRole = raw.role;
  let roles = Array.isArray(raw.roles) ? [...raw.roles] : legacyRole === 'worker' ? ['client', 'worker'] : ['client'];
  if (!roles.includes('client')) roles = ['client', ...roles];

  const activeRole = roles.includes(raw.activeRole)
    ? raw.activeRole
    : roles.includes(legacyRole)
    ? legacyRole
    : 'client';

  const next = { ...raw, roles, activeRole };
  delete next.role;
  if (!next.id) next.id = newId();
  return next;
}

function readUsers() {
  try {
    const list = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeUsers(list) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving users to localStorage:', e);
  }
}

// The backend only stores the credentials and client profile, so the rest of the account
// (full name, roles, ...) is kept per username in this browser's registry.
const findProfile = (username) => readUsers().find((u) => u.username === username) || null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      // No token means not signed in (this also drops sessions from the old mock login).
      if (!getToken()) return null;
      return normalizeUser(JSON.parse(localStorage.getItem(USER_KEY)));
    } catch (e) {
      console.error('Error loading user from localStorage:', e);
      return null;
    }
  });

  // Keep the session and the local account registry in sync.
  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_ROLE_KEY);
      if (!user) {
        localStorage.removeItem(USER_KEY);
        return;
      }
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      const others = readUsers().filter((u) => u.id !== user.id);
      writeUsers([...others, user]);
    } catch (e) {
      console.error('Error saving user to localStorage:', e);
    }
  }, [user]);

  const startSession = (token, profile) => {
    setToken(token);
    setUser(profile);
  };

  // Signs in against the backend (POST /api-token-auth/). Rejects with the axios error.
  const login = async (username, password) => {
    const token = await requestToken({ username, password });
    const profile = normalizeUser(
      findProfile(username) || {
        id: username,
        username,
        name: username,
        email: '',
        phone: '',
        city: '',
        accountType: 'individual',
        roles: ['client'],
        activeRole: 'client',
      }
    );
    startSession(token, profile);
    return profile;
  };

  // Creates a client account (POST /Client/registration/), then signs the user in because the
  // registration response carries no token. Workers add the worker role later via /become-worker.
  // Resolves `{ user, signedIn }`; rejects with the axios error if registration itself fails.
  const register = async (form) => {
    const username = form.username.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    // The response is the new ClientProfile: { id, phone_number, profile_picture, average_rating }.
    const created = await registerClient({
      username,
      email,
      password: form.password,
      phone_number: phone.replace(/[\s-]/g, ''),
    });

    const profile = normalizeUser({
      id: username,
      username,
      name: form.name.trim(),
      email,
      phone,
      city: '',
      accountType: 'individual',
      clientProfileId: created?.id ?? null,
      profilePicture: created?.profile_picture ?? null,
      averageRating: Number(created?.average_rating) || 0,
      joinedAt: new Date().toISOString(),
      roles: ['client'],
      activeRole: 'client',
    });

    try {
      startSession(await requestToken({ username, password: form.password }), profile);
      return { user: profile, signedIn: true };
    } catch {
      // Account exists; remember the profile so the next manual sign-in restores the name.
      writeUsers([...readUsers().filter((u) => u.id !== profile.id), profile]);
      return { user: profile, signedIn: false };
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
  };

  const addRole = useCallback((newRole) => {
    setUser((prev) => {
      if (!prev || prev.roles.includes(newRole)) return prev;
      return { ...prev, roles: [...prev.roles, newRole], activeRole: newRole };
    });
  }, []);

  const switchRole = useCallback((newRole) => {
    setUser((prev) => {
      if (!prev || !prev.roles.includes(newRole) || prev.activeRole === newRole) return prev;
      return { ...prev, activeRole: newRole };
    });
  }, []);

  // Every account registered on this browser (admin panel's Users list — no backend user list yet).
  const getAllUsers = useCallback(() => readUsers(), []);

  const roles = user?.roles ?? [];
  const workerEntryPath = !user
    ? '/register?redirect=/become-worker'
    : roles.includes('worker')
    ? '/worker/dashboard'
    : '/become-worker';

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.activeRole ?? null,
        roles,
        isAuthenticated: !!user,
        hasRole: (r) => roles.includes(r),
        workerEntryPath,
        login,
        register,
        logout,
        updateProfile,
        addRole,
        switchRole,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
