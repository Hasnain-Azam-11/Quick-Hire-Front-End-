import { Info } from 'lucide-react';
import { CategoryChip } from '../../components/CategoryChip';
import { StatusPill } from '../../components/StatusPill';
import { useMarketplace } from '../../context/MarketplaceContext';
import { formatDate, formatPayRange } from '../../constants/hiring';

// Jobs need a real backend session to fetch (Django requires an authenticated token), and admin
// sign-in here is a separate mock session with no such token — so this can only show jobs that
// happen to already be loaded because someone is also signed in as a normal user in this browser.
// Once admin auth is wired to the backend (`is_staff`), swap this for a real admin jobs endpoint.
export default function AdminJobs() {
  const { myJobs, openJobs } = useMarketplace();
  const jobs = [...myJobs, ...openJobs].filter((j, i, arr) => arr.findIndex((x) => x.id === j.id) === i);

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Jobs</h1>
        <p className="text-gray-600 mt-1">Job posts visible to this browser session</p>
      </div>

      <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-2xl p-4 text-sm flex items-start gap-3">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          This list only shows jobs the current browser session can already see (it needs a signed-in account with
          backend access). Once admin authentication is wired to the backend, this page can list every job directly.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <p className="text-sm text-gray-500">No jobs visible right now. Sign in as a client or worker in another tab, then come back.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">City</th>
                <th className="px-5 py-3 font-semibold">Pay</th>
                <th className="px-5 py-3 font-semibold">Start</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F5F5F5] transition-colors">
                  <td className="px-5 py-3 font-semibold text-[#0A0A0A] max-w-xs truncate">{j.title}</td>
                  <td className="px-5 py-3"><CategoryChip variant="orange">{j.category}</CategoryChip></td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{j.city}</td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{formatPayRange(j.payMin, j.payMax)}</td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{formatDate(j.startDate)}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={j.status === 'Open' ? 'active' : j.status === 'Assigned' ? 'pending' : 'completed'}>
                      {j.status.toUpperCase()}
                    </StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
