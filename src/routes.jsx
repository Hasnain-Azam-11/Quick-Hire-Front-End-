import { createBrowserRouter, Navigate } from 'react-router-dom';

// ===== PUBLIC PAGES =====
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import WorkerProfile from './pages/WorkerProfile';
import CategoryPage from './pages/CategoryPage';
import WorkersPage from './pages/WorkersPage';
import BecomeWorker from './pages/BecomeWorker';
import PublicLayout from './layouts/PublicLayout';

// ===== SIGNED-IN PAGES (all accounts are clients first) =====
import Profile from './pages/Profile';
import MyRequests from './pages/MyRequests';
import PostCustomJob from './pages/PostCustomJob';

// ===== WORKER PAGES =====
import WorkerLayout from './layouts/WorkerLayout';
import WorkerHome from './pages/worker/WorkerHome';
import WorkerBrowseJobs from './pages/worker/WorkerBrowseJobs';
import WorkerApplications from './pages/worker/WorkerApplications';
import WorkerOffers from './pages/worker/WorkerOffers';
import WorkerServices from './pages/worker/WorkerServices';
import WorkerSchedule from './pages/worker/WorkerSchedule';
import WorkerReviews from './pages/worker/WorkerReviews';
import WorkerSettings from './pages/worker/WorkerSettings';

// ===== OTHER PAGES =====
import BookingDetail from './pages/BookingDetail';
import Review from './pages/Review';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardRedirect from './components/DashboardRedirect';
import RedirectKeepSearch from './components/RedirectKeepSearch';
import LegacyClientRedirect from './components/LegacyClientRedirect';

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
    path: '/categories/:categorySlug',
    element: <CategoryPage />,
  },
  {
    // Browsing workers and viewing a profile is open to guests; hiring asks them to sign in.
    element: <PublicLayout />,
    children: [
      { path: '/workers', element: <WorkersPage /> },
      { path: '/worker-profile/:id', element: <WorkerProfile /> },
    ],
  },
  {
    path: '/browse-workers',
    element: <RedirectKeepSearch to="/workers" />,
  },
  {
    // Any signed-in client can add the worker role; guests are sent to register first.
    element: <ProtectedRoute guestRedirect="/register?redirect=/become-worker" />,
    children: [{ path: '/become-worker', element: <BecomeWorker /> }],
  },

  // ============================
  // 2. SIGNED-IN PAGES (no client dashboard: they use the normal site layout)
  // ============================
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: '/profile', element: <Profile /> },
          { path: '/my-requests', element: <MyRequests /> },
          { path: '/post-job', element: <PostCustomJob /> },
          { path: '/bookings/:id', element: <BookingDetail /> },
        ],
      },
    ],
  },
  {
    // The old client dashboard was removed; keep its URLs working.
    path: '/client/*',
    element: <LegacyClientRedirect />,
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
            path: 'offers',
            element: <WorkerOffers />,
          },
          {
            path: 'services',
            element: <WorkerServices />,
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