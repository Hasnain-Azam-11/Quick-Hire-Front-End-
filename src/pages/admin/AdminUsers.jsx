import { useState } from 'react';
import { Search, Users2 } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import { CategoryChip } from '../../components/CategoryChip';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatDate } from '../../constants/hiring';

// Every account registered on this browser. There's no backend user-list endpoint yet, so this
// reads the same local registry the app uses to restore a name/role on sign-in.
export default function AdminUsers() {
  const { getAllUsers } = useAuth();
  const { allWorkers } = useMarketplace();
  const [query, setQuery] = useState('');

  const workerById = new Map(allWorkers.map((w) => [w.id, w]));
  const users = getAllUsers().filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return u.name?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Users</h1>
        <p className="text-gray-600 mt-1">Every account registered on this browser</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, username or email"
          className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
        />
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Users2 className="w-8 h-8" />
          </div>
          <p className="text-sm text-gray-500">No accounts match your search.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Username</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const worker = u.roles?.includes('worker') ? workerById.get(u.id) : null;
                return (
                  <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name || u.username} size="sm" />
                        <span className="font-semibold text-[#0A0A0A] whitespace-nowrap">{u.name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">@{u.username}</td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{u.email || '—'}</td>
                    <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{u.city || '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <CategoryChip>Client</CategoryChip>
                        {u.roles?.includes('worker') && (
                          <CategoryChip variant="orange">
                            Worker{worker?.verified ? ' ✓' : ''}
                          </CategoryChip>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{u.joinedAt ? formatDate(u.joinedAt) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
