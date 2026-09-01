import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { WorkerDataProvider } from './context/WorkerDataContext';
import { ClientDataProvider } from './context/ClientDataContext';

export default function App() {
  return (
    <AuthProvider>
      <WorkerDataProvider>
        <ClientDataProvider>
          <RouterProvider router={router} />
        </ClientDataProvider>
      </WorkerDataProvider>
    </AuthProvider>
  );
}