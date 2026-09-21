import { Navigate, useLocation } from 'react-router-dom';

// <Navigate> drops the query string; legacy links like /browse-workers?category=x need it kept.
export default function RedirectKeepSearch({ to }) {
  const { search } = useLocation();
  return <Navigate to={`${to}${search}`} replace />;
}
