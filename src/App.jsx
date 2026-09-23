import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <AdminAuthProvider>
          <RouterProvider router={router} />
        </AdminAuthProvider>
      </MarketplaceProvider>
    </AuthProvider>
  );
}
