import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Guards a group of routes. The URL decides the active role: opening the
// /worker area as a user who holds both roles switches them into worker mode.
export default function ProtectedRoute({ allowedRole, guestRedirect = '/sign-in' }) {
  const { isAuthenticated, role, roles, switchRole } = useAuth();
  const location = useLocation();

  const permitted = isAuthenticated && (!allowedRole || roles.includes(allowedRole));

  useEffect(() => {
    if (permitted && allowedRole && role !== allowedRole) {
      switchRole(allowedRole);
    }
  }, [permitted, allowedRole, role, switchRole]);

  if (!isAuthenticated) {
    return <Navigate to={guestRedirect} replace state={{ from: location.pathname + location.search }} />;
  }

  if (!permitted) {
    // Only reachable for the worker area: a client who hasn't become a worker yet.
    return <Navigate to={allowedRole === 'worker' ? '/become-worker' : '/'} replace />;
  }

  return <Outlet />;
}
