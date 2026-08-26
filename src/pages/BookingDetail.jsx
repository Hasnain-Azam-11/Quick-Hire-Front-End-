import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { ArrowLeft, MapPin, Calendar, DollarSign } from 'lucide-react';

const bookingData = {
  id: 1,
  status: 'confirmed',
  job: {
    title: 'Full-time Nanny Position',
    category: 'Childcare',
    description: 'Looking for an experienced nanny to care for our 2-year-old daughter.',
    startDate: 'May 10, 2026',
    endDate: 'Aug 10, 2026',
    duration: '3 months',
    city: 'Karachi',
    area: 'DHA Phase 6'
  },
  worker: {
    name: 'Fatima Ahmed',
    rating: 4.9,
    verified: true
  },
  client: {
    name: 'Ahmed Khan',
    type: 'Family'
  },
  payment: {
    rate: 2000,
    totalDays: 90,
    total: 180000
  },
  notes: 'Please arrive 15 minutes early on the first day. We will provide all necessary supplies.',
  timeline: [
    { status: 'posted', date: 'May 1, 2026', time: '10:30 AM', completed: true },
    { status: 'applied', date: 'May 1, 2026', time: '2:45 PM', completed: true },
    { status: 'confirmed', date: 'May 2, 2026', time: '9:15 AM', completed: true },
    { status: 'in-progress', date: 'May 10, 2026', time: 'Pending', completed: false },
    { status: 'completed', date: 'Aug 10, 2026', time: 'Pending', completed: false }
  ]
};

export default function BookingDetail() {
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

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <Link to="/client/bookings" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] mb-6">
            <ArrowLeft size={20} />
            Back to Bookings
          </Link>

          <div className={`${statusColors[bookingData.status]} text-white rounded-2xl p-6 mb-6`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm mb-1 opacity-90">Booking Status</div>
                <div className="text-2xl">{statusLabels[bookingData.status]}</div>
              </div>
              <div className="text-right">
                <div className="text-sm mb-1 opacity-90">Booking ID</div>
                <div className="text-xl">#{bookingData.id.toString().padStart(6, '0')}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Job Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg mb-2">{bookingData.job.title}</h3>
                    <CategoryChip variant="orange">{bookingData.job.category}</CategoryChip>
                  </div>
                  <p className="text-gray-600">{bookingData.job.description}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-[#FF6B00] mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Location</div>
                        <div>{bookingData.job.city}, {bookingData.job.area}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={20} className="text-[#FF6B00] mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Duration</div>
                        <div>{bookingData.job.duration}</div>
                        <div className="text-sm text-gray-500">{bookingData.job.startDate} - {bookingData.job.endDate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Worker Information</h2>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar name={bookingData.worker.name} size="lg" verified={bookingData.worker.verified} />
                  <div className="flex-1">
                    <h3 className="mb-2">{bookingData.worker.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating rating={Math.floor(bookingData.worker.rating)} size="sm" />
                      <span className="text-sm">{bookingData.worker.rating}</span>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/worker/${bookingData.id}`}>
                        <Button variant="outline" className="text-sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button variant="ghost" className="text-sm">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Additional Notes</h2>
                <p className="text-gray-600">{bookingData.notes}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Timeline</h2>
                <div className="space-y-4">
                  {bookingData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed ? 'bg-[#22C55E] text-white' : 'bg-gray-200 text-gray-400'
                        }`}>
                          {item.completed ? '✓' : index + 1}
                        </div>
                        {index < bookingData.timeline.length - 1 && (
                          <div className={`absolute left-5 top-10 w-0.5 h-8 ${
                            item.completed ? 'bg-[#22C55E]' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="mb-1 capitalize">{item.status.replace('-', ' ')}</div>
                        <div className="text-sm text-gray-500">{item.date} • {item.time}</div>
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
                    <span>PKR {bookingData.payment.rate.toLocaleString()}/day</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Days</span>
                    <span>{bookingData.payment.totalDays}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span>Total Amount</span>
                    <span className="text-xl text-[#FF6B00]">
                      PKR {bookingData.payment.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {bookingData.status === 'pending' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl mb-4">Actions</h2>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth>
                      Confirm Booking
                    </Button>
                    <Button variant="outline" fullWidth className="border-[#EF4444] text-[#EF4444]">
                      Decline
                    </Button>
                  </div>
                </div>
              )}

              {bookingData.status === 'confirmed' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl mb-4">Actions</h2>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth>
                      Mark as Completed
                    </Button>
                    <Button variant="ghost" fullWidth>
                      Send Message
                    </Button>
                    <Button variant="outline" fullWidth className="border-[#EF4444] text-[#EF4444]">
                      Cancel Booking
                    </Button>
                  </div>
                </div>
              )}

              {bookingData.status === 'completed' && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl mb-4">Leave a Review</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Share your experience with {bookingData.worker.name}
                  </p>
                  <Link to={`/review/${bookingData.id}`}>
                    <Button variant="primary" fullWidth>
                      Write Review
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}