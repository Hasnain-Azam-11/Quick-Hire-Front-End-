import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, Inbox, MapPin, XCircle } from 'lucide-react';
import { useWorkerData } from '../../context/WorkerDataContext';
import { StatusPill } from '../../components/StatusPill';
import { CategoryChip } from '../../components/CategoryChip';
import { Button } from '../../components/Button';
import { formatDate, formatDuration, formatPKR, timeAgo } from '../../constants/hiring';

export default function WorkerOffers() {
  const { offers, respondToOffer } = useWorkerData();

  // Pending requests first, newest first within each group.
  const sorted = [...offers].sort((a, b) => {
    if ((a.status === 'pending') !== (b.status === 'pending')) return a.status === 'pending' ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Hire Requests</h1>
        <p className="text-gray-600 mt-1">Clients who found your profile and want to hire you directly</p>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0A0A0A]">No Hire Requests Yet</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Keep your profile complete and stay On-Duty so clients can find and hire you. You can also apply to open
            jobs in the meantime.
          </p>
          <Link to="/worker/jobs">
            <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold mt-2">Browse Open Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#FF6B00] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-[#0A0A0A]">{offer.clientName}</h2>
                    <StatusPill status={offer.status}>{offer.status.toUpperCase()}</StatusPill>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CategoryChip variant="orange">{offer.category}</CategoryChip>
                    <span>• Requested {timeAgo(offer.createdAt)}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="font-bold text-[#FF6B00] text-lg">{formatPKR(offer.rate)}</div>
                  <div className="text-[11px] text-gray-400">per {offer.payUnit}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F5F5] rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-800">{formatDuration(offer.durationType, offer.durationCount)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Start Date</div>
                    <div className="font-semibold text-gray-800">{formatDate(offer.startDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-gray-500">Location</div>
                    <div className="font-semibold text-gray-800">{offer.city || '—'}</div>
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">
                    {offer.durationType === 'permanent' ? 'Monthly salary' : 'Total'}
                  </div>
                  <div className="font-bold text-[#FF6B00] text-sm">{formatPKR(offer.total)}</div>
                </div>
              </div>

              {offer.note && (
                <p className="text-sm text-gray-600 bg-[#FFF0E6]/60 border border-[#FF6B00]/10 rounded-xl p-4">
                  “{offer.note}”
                </p>
              )}

              {offer.status === 'pending' && (
                <div className="flex justify-end gap-3 pt-1">
                  <Button
                    variant="outline"
                    className="text-xs py-2 px-5 font-semibold gap-1.5 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                    onClick={() => respondToOffer(offer.id, 'declined')}
                  >
                    <XCircle className="w-4 h-4" />
                    Decline
                  </Button>
                  <Button
                    variant="primary"
                    className="text-xs py-2 px-6 font-semibold gap-1.5"
                    onClick={() => respondToOffer(offer.id, 'accepted')}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept
                  </Button>
                </div>
              )}

              {offer.status === 'accepted' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800">
                  <strong>Booked!</strong> This job is in your Schedule.{' '}
                  <Link to="/worker/schedule" className="underline font-semibold">View schedule</Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
