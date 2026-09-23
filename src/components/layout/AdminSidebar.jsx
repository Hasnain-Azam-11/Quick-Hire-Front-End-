import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, ShieldCheck, Tags, Briefcase, Users2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/verifications', icon: ShieldCheck, label: 'Worker Verifications' },
  { to: '/admin/categories', icon: Tags, label: 'Categories' },
  { to: '/admin/jobs', icon: Briefcase, label: 'Jobs' },
  { to: '/admin/users', icon: Users2, label: 'Users' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const { allWorkers } = useMarketplace();
  const pendingCount = allWorkers.filter((w) => !w.verified).length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="w-64 bg-[#0A0A0A] text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#FF6B00] rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-lg font-black">Q</span>
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">QuickHire</div>
            <div className="text-[11px] text-gray-400 leading-tight">Admin Panel</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-[#FF6B00] text-white font-medium shadow-md shadow-[#FF6B00]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {to === '/admin/verifications' && pendingCount > 0 && (
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-white text-[#0A0A0A] text-[11px] font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="px-2 text-xs text-gray-400">
          Signed in as <span className="text-white font-semibold">{admin?.name}</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors w-full cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
