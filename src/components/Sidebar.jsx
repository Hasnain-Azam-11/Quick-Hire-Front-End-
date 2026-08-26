import { Link, useLocation } from 'react-router';
import { Avatar } from './Avatar';
import { LayoutDashboard, Briefcase, Calendar, Users, Star, Settings, FileText, Shield } from 'lucide-react';

export function Sidebar({ userType, userName, userRole }) {
  const location = useLocation();

  const clientNav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/client/dashboard' },
    { icon: Briefcase, label: 'My Jobs', path: '/client/jobs' },
    { icon: Calendar, label: 'Bookings', path: '/client/bookings' },
    { icon: Users, label: 'Browse Workers', path: '/browse-workers' },
    { icon: Star, label: 'Reviews', path: '/client/reviews' },
    { icon: Settings, label: 'Settings', path: '/client/settings' }
  ];

  const workerNav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/worker/dashboard' },
    { icon: Briefcase, label: 'Browse Jobs', path: '/browse-jobs' },
    { icon: FileText, label: 'Applications', path: '/worker/applications' },
    { icon: Calendar, label: 'Schedule', path: '/worker/schedule' },
    { icon: Star, label: 'Reviews', path: '/worker/reviews' },
    { icon: Settings, label: 'Settings', path: '/worker/settings' }
  ];

  const adminNav = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Shield, label: 'Verification Queue', path: '/admin/verification' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews' }
  ];

  const nav = userType === 'client' ? clientNav : userType === 'worker' ? workerNav : adminNav;

  return (
    <div className="w-60 bg-[#0A0A0A] text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          <Avatar name={userName} size="lg" verified={userType === 'worker'} />
          <h3 className="mt-3 mb-1">{userName}</h3>
          <span className="text-xs px-3 py-1 bg-[#FF6B00] rounded-full">{userRole}</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#FF6B00] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-4 py-3 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">Logout</span>
        </Link>
      </div>
    </div>
  );
}