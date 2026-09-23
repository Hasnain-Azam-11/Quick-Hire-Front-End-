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
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Checkout from './pages/Checkout';
import PaymentHistory from './pages/PaymentHistory';

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
import ProtectedRoute from './components/ProtectedRoute';
import DashboardRedirect from './components/DashboardRedirect';
import RedirectKeepSearch from './components/RedirectKeepSearch';
import LegacyClientRedirect from './components/LegacyClientRedirect';

// ===== ADMIN PAGES =====
import AdminLayout from './layouts/AdminLayout';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminSignIn from './pages/admin/AdminSignIn';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVerifications from './pages/admin/AdminVerifications';
import AdminCategories from './pages/admin/AdminCategories';
import AdminJobs from './pages/admin/AdminJobs';
import AdminUsers from './pages/admin/AdminUsers';

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
          { path: '/checkout/:bookingId', element: <Checkout /> },
          { path: '/payments', element: <PaymentHistory /> },
          { path: '/messages', element: <Messages /> },
          { path: '/messages/:conversationId', element: <Messages /> },
          { path: '/notifications', element: <Notifications /> },
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
  // 4. ADMIN ROUTES (separate mock session — see AdminAuthContext)
  // ============================
  {
    path: '/admin/login',
    element: <AdminSignIn />,
  },
  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'verifications', element: <AdminVerifications /> },
          { path: 'categories', element: <AdminCategories /> },
          { path: 'jobs', element: <AdminJobs /> },
          { path: 'users', element: <AdminUsers /> },
          { path: '*', element: <Navigate to="/admin/dashboard" replace /> },
        ],
      },
    ],
  },

  // ============================
  // 5. FALLBACK (404)
  // ============================
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);