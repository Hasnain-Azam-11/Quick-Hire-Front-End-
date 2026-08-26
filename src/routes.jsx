import { createBrowserRouter } from 'react-router';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import BrowseWorkers from './pages/BrowseWorkers';
import WorkerProfile from './pages/WorkerProfile';
import PostJob from './pages/PostJob';
import AIRecommendations from './pages/AIRecommendations';
import WorkerDashboard from './pages/WorkerDashboard';
import BrowseJobs from './pages/BrowseJobs';
import BookingDetail from './pages/BookingDetail';
import Review from './pages/Review';
import AdminDashboard from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing
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
    path: '/client/dashboard',
    Component: ClientDashboard
  },
  {
    path: '/browse-workers',
    Component: BrowseWorkers
  },
  {
    path: '/worker/:id',
    Component: WorkerProfile
  },
  {
    path: '/post-job',
    Component: PostJob
  },
  {
    path: '/client/ai-recommendations',
    Component: AIRecommendations
  },
  {
    path: '/worker/dashboard',
    Component: WorkerDashboard
  },
  {
    path: '/browse-jobs',
    Component: BrowseJobs
  },
  {
    path: '/client/bookings/:id',
    Component: BookingDetail
  },
  {
    path: '/review/:id',
    Component: Review
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboard
  },
  {
    path: '/admin/login',
    Component: SignIn
  }
]);