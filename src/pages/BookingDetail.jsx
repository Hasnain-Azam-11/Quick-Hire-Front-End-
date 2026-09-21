import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import PageShell from '../components/PageShell';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { calcTotal, endDateFor, formatDate, formatDuration, formatPKR } from '../constants/hiring';

const statusColors = {
  pending: 'bg-[#F59E0B]',
  confirmed: 'bg-[#22C55E]',
  completed: 'bg-[#0A0A0A]',
  cancelled: 'bg-[#EF4444]'
};

const statusLabels = {
  pending: 'Pending Confirmation',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export default function BookingDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { getBooking, getWorker } = useMarketplace();

  const booking = getBooking(id);

  if (!booking || booking.clientId !== user?.id) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 py-24">
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Booking Not Found</h1>
        <p className="text-gray-500">This booking doesn't exist or belongs to another account.</p>
        <Link to="/my-requests">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={18} />
            Back to My Requests
          </Button>
        </Link>
      </div>
    );
  }

  const worker = getWorker(booking.workerId);
  const end = endDateFor(booking.startDate, booking.durationType, booking.durationCount);
  const isPermanent = booking.durationType === 'permanent';
  const total = booking.total ?? calcTotal(booking.rate, booking.durationType, booking.durationCount);

  const timeline = [
    { label: booking.source === 'offer' ? 'Hire request sent' : 'Job posted', date: formatDate(booking.createdAt), completed: true },
    { label: 'Confirmed by worker', date: formatDate(booking.createdAt), completed: true },
    { label: 'Work starts', date: formatDate(booking.startDate), completed: false },
    ...(end ? [{ label: 'Work ends', date: formatDate(end.toISOString()), completed: false }] : []),
  ];

  return (
    <PageShell>
      <div>
        <Link to="/my-requests" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] mb-6">
          <ArrowLeft size={20} />
          Back to My Requests
        </Link>

        <div className={`${statusColors[booking.status] || statusColors.confirmed} text-white rounded-2xl p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm mb-1 opacity-90">Booking Status</div>
              <div className="text-2xl">{statusLabels[booking.status] || booking.status}</div>
            </div>
            <div className="text-right">
              <div className="text-sm mb-1 opacity-90">Booking ID</div>
              <div className="text-xl uppercase">#{booking.id.slice(-6)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Job Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg mb-2">{booking.title}</h3>
                  <CategoryChip variant="orange">{booking.category}</CategoryChip>
                </div>
                {booking.notes && <p className="text-gray-600">{booking.notes}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#FF6B00] mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div>{[booking.area, booking.city].filter(Boolean).join(', ') || '—'}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-[#FF6B00] mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Duration</div>
                      <div>{formatDuration(booking.durationType, booking.durationCount)}</div>
                      <div className="text-sm text-gray-500">
                        {formatDate(booking.startDate)}{end ? ` - ${formatDate(end.toISOString())}` : ' onwards'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Worker Information</h2>
              <div className="flex items-start gap-4">
                <Avatar name={booking.workerName} size="lg" verified={worker?.verified} />
                <div className="flex-1">
                  <h3 className="mb-2">{booking.workerName}</h3>
                  {worker && worker.reviewsCount > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={Math.floor(worker.rating)} size="sm" />
                      <span className="text-sm">{worker.rating}</span>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Link to={`/worker-profile/${booking.workerId}`}>
                      <Button variant="outline" className="text-sm">View Profile</Button>
                    </Link>
                    <Button variant="ghost" className="text-sm" disabled title="Messaging is coming soon">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Timeline</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-[#22C55E] text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {item.completed ? '✓' : index + 1}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className={`absolute left-5 top-10 w-0.5 h-8 ${
                          item.completed ? 'bg-[#22C55E]' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="mb-1">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Rate</span>
                  <span>{formatPKR(booking.rate)} / {booking.payUnit}</span>
                </div>
                {!isPermanent && (
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span>{formatDuration(booking.durationType, booking.durationCount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3">
                  <span>{isPermanent ? 'Monthly Salary' : 'Total Amount'}</span>
                  <span className="text-xl text-[#FF6B00]">{formatPKR(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
