import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRole }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    if (role === 'client') {
      return <Navigate to="/client/dashboard" replace />;
    }
    if (role === 'worker') {
      return <Navigate to="/worker/dashboard" replace />;
    }
  }

  return <Outlet />;
}