import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, Wallet2 } from 'lucide-react';
import PageShell from '../components/PageShell';
import { StatusPill } from '../components/StatusPill';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPKR } from '../constants/hiring';

function Row({ booking, direction }) {
  const isPaid = booking.paymentStatus === 'paid';
  return (
    <Link
      to={`/bookings/${booking.id}`}
      className="flex items-center gap-4 px-5 py-4 hover:bg-[#F5F5F5] transition-colors border-b border-gray-50 last:border-0"
    >
      <span
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          direction === 'out' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        {direction === 'out' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-sm text-[#0A0A0A] truncate">{booking.jobTitle}</div>
        <div className="text-xs text-gray-500 truncate">
          {direction === 'out' ? `To ${booking.workerName}` : `From ${booking.clientName}`} • {booking.location}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-bold text-sm text-[#0A0A0A]">{formatPKR(booking.total)}</div>
        <StatusPill status={isPaid ? 'confirmed' : 'pending'}>{isPaid ? 'PAID' : 'UNPAID'}</StatusPill>
      </div>
    </Link>
  );
}

function EmptyState({ text }) {
  return (
    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
      <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
        <Wallet2 className="w-8 h-8" />
      </div>
      <p className="text-gray-500 text-sm max-w-sm mx-auto">{text}</p>
    </div>
  );
}

// A client's spending and (if they're also a worker) what they've been paid, in one place.
export default function PaymentHistory() {
  const { roles } = useAuth();
  const { myBookingsAsClient, mySchedule } = useMarketplace();
  const isWorker = roles.includes('worker');
  const [tab, setTab] = useState('spent');

  const spentTotal = myBookingsAsClient.filter((b) => b.paymentStatus === 'paid').reduce((sum, b) => sum + (Number(b.total) || 0), 0);
  const earnedTotal = mySchedule.filter((b) => b.paymentStatus === 'paid').reduce((sum, b) => sum + (Number(b.total) || 0), 0);

  const list = tab === 'spent' ? myBookingsAsClient : mySchedule;

  return (
    <PageShell width="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Payments</h1>
        <p className="text-gray-600 mt-1">Everything you&apos;ve paid for hires, and payments you&apos;ve received</p>
      </div>

      <div className={`grid gap-4 ${isWorker ? 'sm:grid-cols-2' : 'sm:grid-cols-1'}`}>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
          <span className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
            <ArrowUpRight className="w-5 h-5" />
          </span>
          <div>
            <div className="text-xl font-extrabold text-[#0A0A0A]">{formatPKR(spentTotal)}</div>
            <div className="text-xs text-gray-500">Total paid as a client</div>
          </div>
        </div>
        {isWorker && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <span className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ArrowDownLeft className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xl font-extrabold text-[#0A0A0A]">{formatPKR(earnedTotal)}</div>
              <div className="text-xs text-gray-500">Total received as a worker</div>
            </div>
          </div>
        )}
      </div>

      {isWorker && (
        <div className="flex bg-gray-200 p-1 rounded-xl w-fit">
          {[
            { id: 'spent', label: 'What I Paid' },
            { id: 'earned', label: 'What I Received' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                tab === t.id ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <EmptyState
          text={
            tab === 'spent'
              ? "You haven't hired anyone yet. Payments for accepted hire requests and jobs will show up here."
              : "No payments received yet. They'll appear here once a client pays for a booking with you."
          }
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {list.map((b) => (
            <Row key={b.id} booking={b} direction={tab === 'spent' ? 'out' : 'in'} />
          ))}
        </div>
      )}

      {tab === 'spent' && list.some((b) => b.paymentStatus !== 'paid') && (
        <p className="text-xs text-gray-500 text-center">
          Have an unpaid booking? Open it from <Link to="/my-requests" className="text-[#FF6B00]! hover:underline font-semibold">My Requests</Link> to pay.
        </p>
      )}
    </PageShell>
  );
}
