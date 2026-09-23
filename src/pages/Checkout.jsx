import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, Lock, Smartphone } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import PageShell from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { calcTotal, formatDuration, formatPKR } from '../constants/hiring';

// The method is what QuickHire shows the client; the real gateway call (JazzCash/EasyPaisa/card
// processor) is a backend integration — this page mocks the "processing" step and marks the
// booking paid so the rest of the app (receipts, notifications) has something real to show.
const METHODS = [
  { id: 'JazzCash', title: 'JazzCash', text: 'Pay from your JazzCash mobile account', icon: Smartphone, tone: 'bg-red-50 text-red-600' },
  { id: 'EasyPaisa', title: 'EasyPaisa', text: 'Pay from your EasyPaisa mobile account', icon: Smartphone, tone: 'bg-emerald-50 text-emerald-600' },
  { id: 'Card', title: 'Debit / Credit Card', text: 'Visa, Mastercard or any local bank card', icon: CreditCard, tone: 'bg-blue-50 text-blue-600' },
];

export default function Checkout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBooking, payForBooking } = useMarketplace();

  const [method, setMethod] = useState('JazzCash');
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);

  const booking = getBooking(bookingId);

  if (!booking || booking.clientId !== user?.id) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 py-24">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Booking Not Found</h1>
        <p className="text-gray-500">This booking doesn&apos;t exist or belongs to another account.</p>
        <Link to="/my-requests">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={18} />
            Back to My Requests
          </Button>
        </Link>
      </div>
    );
  }

  if (booking.paymentStatus === 'paid' && !paid) {
    return <Navigate to={`/bookings/${bookingId}`} replace />;
  }

  const total = booking.total ?? calcTotal(booking.rate, booking.durationType, booking.durationCount);

  const handlePay = (e) => {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);
    // Mimics the round trip to a real gateway. Swap this for the real checkout call when it exists.
    setTimeout(() => {
      payForBooking(bookingId, method);
      setProcessing(false);
      setPaid(true);
    }, 1400);
  };

  if (paid) {
    return (
      <PageShell width="max-w-lg">
        <div className="bg-white rounded-2xl p-8 sm:p-10 text-center space-y-4 border border-gray-100 shadow-sm">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h1 className="text-2xl font-extrabold text-[#0A0A0A]">Payment Successful</h1>
          <p className="text-gray-600">
            {formatPKR(total)} paid via {method} for <strong>{booking.title}</strong>.
          </p>
          <Button variant="primary" fullWidth onClick={() => navigate(`/bookings/${bookingId}`)}>
            View Booking
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell width="max-w-lg">
      <Link to={`/bookings/${bookingId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] transition-colors">
        <ArrowLeft size={18} />
        Back to booking
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Checkout</h1>
        <p className="text-gray-600 mt-1">Choose how you&apos;d like to pay</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <Avatar name={booking.workerName} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[#0A0A0A] truncate">{booking.title}</h3>
          <p className="text-sm text-gray-500">
            {booking.workerName} • {formatDuration(booking.durationType, booking.durationCount)}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-gray-400">Amount due</div>
          <div className="text-xl font-extrabold text-[#FF6B00]">{formatPKR(total)}</div>
        </div>
      </div>

      <form onSubmit={handlePay} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        <div role="radiogroup" aria-label="Payment method" className="space-y-3">
          {METHODS.map(({ id, title, text, icon: Icon, tone }) => {
            const selected = method === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setMethod(id)}
                disabled={processing}
                className={`w-full text-left rounded-2xl border-2 p-4 flex items-center gap-4 transition-all cursor-pointer disabled:cursor-not-allowed ${
                  selected ? 'border-[#FF6B00] bg-[#FFF0E6] shadow-sm' : 'border-gray-200 bg-white hover:border-[#FF6B00]/60'
                }`}
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold ${selected ? 'text-[#FF6B00]' : 'text-[#0A0A0A]'}`}>{title}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">{text}</span>
                </span>
                <span
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                    selected ? 'border-[#FF6B00]' : 'border-gray-300'
                  }`}
                >
                  {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />}
                </span>
              </button>
            );
          })}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          aria-busy={processing}
          className={`py-3.5 font-bold gap-2 ${processing ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
        >
          {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
          {processing ? 'Processing payment...' : `Pay ${formatPKR(total)}`}
        </Button>

        <p className="text-[11px] text-gray-400 text-center">
          This is a preview checkout — no real {method} transaction is made yet.
        </p>
      </form>
    </PageShell>
  );
}
