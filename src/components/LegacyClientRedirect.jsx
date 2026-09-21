import { Navigate, useLocation } from 'react-router-dom';

// The client dashboard area is gone; old /client/* links land on the closest new page.
const TARGETS = {
  jobs: '/my-requests',
  'post-job': '/post-job',
  workers: '/workers',
  reviews: '/profile',
  settings: '/profile',
  bookings: '/my-requests',
};

export default function LegacyClientRedirect() {
  const { pathname, search } = useLocation();
  const rest = pathname.replace(/^\/client\/?/, '');

  let to = '/';
  if (rest.startsWith('bookings/')) to = `/${rest}`;
  else if (TARGETS[rest]) to = TARGETS[rest];

  return <Navigate to={to === '/workers' ? `${to}${search}` : to} replace />;
}
