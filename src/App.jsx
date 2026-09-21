import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';

export default function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <RouterProvider router={router} />
      </MarketplaceProvider>
    </AuthProvider>
  );
}
