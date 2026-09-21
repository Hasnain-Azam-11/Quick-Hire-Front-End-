import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// /dashboard: workers go to their dashboard; everyone else to the home page.
export default function DashboardRedirect() {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Navigate to={roles.includes('worker') ? '/worker/dashboard' : '/'} replace />;
}
