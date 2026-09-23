import { Link } from 'react-router-dom';
import { AlertCircle, Briefcase, ChevronRight, ShieldCheck, Users2 } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import { CategoryChip } from '../../components/CategoryChip';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

function StatCard({ icon: Icon, label, value, hint, tone }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
        <Icon size={24} />
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-bold text-[#0A0A0A]">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
        {hint && <div className="text-[11px] text-gray-400 mt-0.5">{hint}</div>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { getAllUsers } = useAuth();
  const { allWorkers, myJobs, openJobs } = useMarketplace();

  const users = getAllUsers();
  const pendingWorkers = allWorkers.filter((w) => !w.verified);
  const onDutyCount = allWorkers.filter((w) => w.isOnDuty).length;
  // Jobs are fetched from the backend by whoever is signed in as a real user in this browser;
  // an admin-only session (no real client/worker login) won't have any to show yet.
  const visibleJobsCount = new Set([...myJobs, ...openJobs].map((j) => j.id)).size;

  const stats = [
    { icon: Users2, label: 'Registered Accounts', value: users.length, tone: 'bg-[#FFF0E6] text-[#FF6B00]' },
    { icon: ShieldCheck, label: 'Total Workers', value: allWorkers.length, hint: `${onDutyCount} on-duty`, tone: 'bg-emerald-50 text-emerald-600' },
    { icon: AlertCircle, label: 'Pending Verifications', value: pendingWorkers.length, tone: 'bg-amber-50 text-amber-600' },
    {
      icon: Briefcase,
      label: 'Jobs Visible This Session',
      value: visibleJobsCount,
      hint: 'Needs a signed-in backend session',
      tone: 'bg-sky-50 text-sky-600',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of accounts, workers and platform activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Verification Queue</h2>
            <Link to="/admin/verifications" className="text-xs font-semibold text-[#FF6B00]! hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {pendingWorkers.length === 0 ? (
            <p className="text-sm text-gray-500">No workers waiting for review.</p>
          ) : (
            <div className="space-y-3">
              {pendingWorkers.slice(0, 4).map((w) => (
                <div key={w.id} className="flex items-center gap-3">
                  <Avatar name={w.name || 'Worker'} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#0A0A0A] truncate">{w.name || 'Unnamed worker'}</div>
                    <div className="text-xs text-gray-500">{w.city}</div>
                  </div>
                  {w.category && <CategoryChip variant="ghost">{w.category}</CategoryChip>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Recent Accounts</h2>
            <Link to="/admin/users" className="text-xs font-semibold text-[#FF6B00]! hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {users.length === 0 ? (
            <p className="text-sm text-gray-500">No accounts registered on this browser yet.</p>
          ) : (
            <div className="space-y-3">
              {users.slice(0, 4).map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <Avatar name={u.name || u.username} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-[#0A0A0A] truncate">{u.name || u.username}</div>
                    <div className="text-xs text-gray-500">@{u.username}</div>
                  </div>
                  {u.roles?.includes('worker') && <CategoryChip variant="ghost">Worker</CategoryChip>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
