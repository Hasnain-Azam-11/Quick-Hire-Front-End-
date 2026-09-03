import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// ===== PUBLIC PAGES =====
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import WorkerProfile from './pages/WorkerProfile';
import CategoryPage from './pages/CategoryPage';

// ===== CLIENT PAGES =====
import ClientLayout from './layouts/ClientLayout';
import ClientHome from './pages/client/ClientHome';
import ClientPostJob from './pages/client/ClientPostJob';
import ClientBrowseWorkers from './pages/client/ClientBrowseWorkers';
import ClientMyJobs from './pages/client/ClientMyJobs';
import ClientReviews from './pages/client/ClientReviews';
import ClientSettings from './pages/client/ClientSettings';

// ===== WORKER PAGES =====
import WorkerLayout from './layouts/WorkerLayout';
import WorkerHome from './pages/worker/WorkerHome';
import WorkerBrowseJobs from './pages/worker/WorkerBrowseJobs';
import WorkerApplications from './pages/worker/WorkerApplications';
import WorkerSchedule from './pages/worker/WorkerSchedule';
import WorkerReviews from './pages/worker/WorkerReviews';
import WorkerSettings from './pages/worker/WorkerSettings';

// ===== OTHER PAGES =====
import AIRecommendations from './pages/AIRecommendations';
import BookingDetail from './pages/BookingDetail';
import Review from './pages/Review';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// ===== DASHBOARD REDIRECT =====
function DashboardRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role === 'client') {
    return <Navigate to="/client/dashboard" replace />;
  }

  return <Navigate to="/worker/dashboard" replace />;
}

// ===== ROUTER =====
export const router = createBrowserRouter([
  // ============================
  // 1. PUBLIC ROUTES
  // ============================
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <DashboardRedirect />,
  },
  {
    path: '/worker-profile/:id',
    element: <WorkerProfile />,
  },
  {
    path: '/categories/:categorySlug',
    element: <CategoryPage />,
  },

  // ============================
  // 2. CLIENT ROUTES (Protected)
  // ============================
  {
    element: <ProtectedRoute allowedRole="client" />,
    children: [
      {
        path: '/client',
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/client/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <ClientHome />,
          },
          {
            path: 'post-job',
            element: <ClientPostJob />,
          },
          {
            path: 'workers',
            element: <ClientBrowseWorkers />,
          },
          {
            path: 'jobs',
            element: <ClientMyJobs />,
          },
          {
            path: 'reviews',
            element: <ClientReviews />,
          },
          {
            path: 'settings',
            element: <ClientSettings />,
          },
          {
            path: '*',
            element: <Navigate to="/client/dashboard" replace />,
          },
        ],
      },
      {
        path: '/client/ai-recommendations',
        element: <AIRecommendations />,
      },
      {
        path: '/client/bookings/:id',
        element: <BookingDetail />,
      },
      {
        path: '/post-job',
        element: <Navigate to="/client/post-job" replace />,
      },
      {
        path: '/browse-workers',
        element: <Navigate to="/client/workers" replace />,
      },
    ],
  },

  // ============================
  // 3. WORKER ROUTES (Protected)
  // ============================
  {
    element: <ProtectedRoute allowedRole="worker" />,
    children: [
      {
        path: '/worker',
        element: <WorkerLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/worker/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <WorkerHome />,
          },
          {
            path: 'jobs',
            element: <WorkerBrowseJobs />,
          },
          {
            path: 'applications',
            element: <WorkerApplications />,
          },
          {
            path: 'schedule',
            element: <WorkerSchedule />,
          },
          {
            path: 'reviews',
            element: <WorkerReviews />,
          },
          {
            path: 'settings',
            element: <WorkerSettings />,
          },
          {
            path: '*',
            element: <Navigate to="/worker/dashboard" replace />,
          },
        ],
      },
      {
        path: '/browse-jobs',
        element: <Navigate to="/worker/jobs" replace />,
      },
    ],
  },

  // ============================
  // 4. ADMIN ROUTES
  // ============================
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/login',
    element: <SignIn />,
  },

  // ============================
  // 5. OTHER ROUTES
  // ============================
  {
    path: '/review/:id',
    element: <Review />,
  },

  // ============================
  // 6. FALLBACK (404)
  // ============================
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);