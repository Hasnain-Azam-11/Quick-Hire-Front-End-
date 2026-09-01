import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Clock } from 'lucide-react';

export default function ClientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="bg-[#0A0A0A] text-white py-4 px-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center font-bold text-xl text-white">
            Q
          </div>
          <div>
            <h1 className="text-[#FF6B00] text-xl font-bold">Client Dashboard — coming soon</h1>
            <p className="text-xs text-gray-400">Welcome, {user?.name || 'Client'}</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white text-xs py-2 px-4 gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </header>

      {/* Main Content Placeholder */}
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-10 shadow-sm border border-gray-200 text-center space-y-6">
          <div className="w-20 h-20 bg-[#FFF0E6] text-[#FF6B00] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Clock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0A0A0A]">Client Dashboard — coming soon</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We are building a seamless client portal for posting jobs, managing applicants, and tracking active worker bookings. Check back soon!
            </p>
          </div>

          <div className="p-4 bg-[#F5F5F5] rounded-xl text-left space-y-2 text-xs text-gray-600 border border-gray-200">
            <div className="font-semibold text-[#0A0A0A]">Account Details:</div>
            <div>Name: <strong>{user?.name || 'Ali Raza'}</strong></div>
            <div>Email: <strong>{user?.email || 'client@quickhire.pk'}</strong></div>
            <div>Role: <span className="px-2 py-0.5 bg-[#FF6B00] text-white rounded-full font-medium">Client</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}