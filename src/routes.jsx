import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import WorkerProfile from './pages/WorkerProfile';
import AIRecommendations from './pages/AIRecommendations';
import BookingDetail from './pages/BookingDetail';
import Review from './pages/Review';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

import WorkerLayout from './layouts/WorkerLayout';
import WorkerHome from './pages/worker/WorkerHome';
import WorkerBrowseJobs from './pages/worker/WorkerBrowseJobs';
import WorkerApplications from './pages/worker/WorkerApplications';
import WorkerSchedule from './pages/worker/WorkerSchedule';
import WorkerReviews from './pages/worker/WorkerReviews';
import WorkerSettings from './pages/worker/WorkerSettings';

import ClientLayout from './layouts/ClientLayout';
import ClientHome from './pages/client/ClientHome';
import ClientPostJob from './pages/client/ClientPostJob';
import ClientBrowseWorkers from './pages/client/ClientBrowseWorkers';
import ClientMyJobs from './pages/client/ClientMyJobs';
import ClientReviews from './pages/client/ClientReviews';
import ClientSettings from './pages/client/ClientSettings';

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

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    Component: Landing
  },
  {
    path: '/dashboard',
    element: <DashboardRedirect />
  },
  {
    path: '/sign-in',
    Component: SignIn
  },
  {
    path: '/register',
    Component: Register
  },
  {
    path: '/worker-profile/:id',
    Component: WorkerProfile
  },

  // Protected Client Routes
  {
    element: <ProtectedRoute allowedRole="client" />,
    children: [
      {
        path: '/client',
        element: <ClientLayout />,
        children: [
          {
            path: 'dashboard',
            element: <ClientHome />
          },
          {
            path: 'post-job',
            element: <ClientPostJob />
          },
          {
            path: 'workers',
            element: <ClientBrowseWorkers />
          },
          {
            path: 'jobs',
            element: <ClientMyJobs />
          },
          {
            path: 'reviews',
            element: <ClientReviews />
          },
          {
            path: 'settings',
            element: <ClientSettings />
          },
          {
            path: '*',
            element: <Navigate to="/client/dashboard" replace />
          }
        ]
      },
      {
        path: '/client/ai-recommendations',
        Component: AIRecommendations
      },
      {
        path: '/client/bookings/:id',
        Component: BookingDetail
      },
      {
        path: '/post-job',
        element: <Navigate to="/client/post-job" replace />
      },
      {
        path: '/browse-workers',
        element: <Navigate to="/client/workers" replace />
      }
    ]
  },

  // Protected Worker Routes
  {
    element: <ProtectedRoute allowedRole="worker" />,
    children: [
      {
        path: '/worker',
        element: <WorkerLayout />,
        children: [
          {
            path: 'dashboard',
            element: <WorkerHome />
          },
          {
            path: 'jobs',
            element: <WorkerBrowseJobs />
          },
          {
            path: 'applications',
            element: <WorkerApplications />
          },
          {
            path: 'schedule',
            element: <WorkerSchedule />
          },
          {
            path: 'reviews',
            element: <WorkerReviews />
          },
          {
            path: 'settings',
            element: <WorkerSettings />
          },
          {
            path: '*',
            element: <Navigate to="/worker/dashboard" replace />
          }
        ]
      },
      {
        path: '/browse-jobs',
        element: <Navigate to="/worker/jobs" replace />
      }
    ]
  },

  // Admin Routes
  {
    path: '/admin/dashboard',
    Component: AdminDashboard
  },
  {
    path: '/admin/login',
    Component: SignIn
  },
  {
    path: '/review/:id',
    Component: Review
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);