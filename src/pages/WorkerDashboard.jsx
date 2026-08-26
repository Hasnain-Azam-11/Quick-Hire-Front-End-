import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { StatusPill } from '../components/StatusPill';
import { CategoryChip } from '../components/CategoryChip';
import { Briefcase, Clock, CheckCircle, Star } from 'lucide-react';

export default function WorkerDashboard() {
  const stats = [
    { icon: Briefcase, label: 'Applications', value: '5', color: 'text-[#FF6B00]' },
    { icon: Clock, label: 'Active Jobs', value: '2', color: 'text-[#F59E0B]' },
    { icon: CheckCircle, label: 'Completed', value: '24', color: 'text-[#22C55E]' },
    { icon: Star, label: 'Rating', value: '4.9', color: 'text-[#FF6B00]' }
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Full-time Nanny Position',
      client: 'Family',
      category: 'Childcare',
      city: 'Karachi',
      pay: '2,000',
      duration: '3 months',
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'Weekend Childcare',
      client: 'Individual',
      category: 'Childcare',
      city: 'Karachi',
      pay: '1,800',
      duration: 'Ongoing',
      posted: '5 hours ago'
    },
    {
      id: 3,
      title: 'Event Childcare - Wedding',
      client: 'Event Organizer',
      category: 'Event Staffing',
      city: 'Lahore',
      pay: '2,500',
      duration: '1 day',
      posted: '1 day ago'
    }
  ];

  const upcomingBookings = [
    {
      job: 'Daily Childcare',
      client: 'Ahmed Family',
      date: 'May 5, 2026',
      time: '9:00 AM - 5:00 PM',
      status: 'confirmed'
    },
    {
      job: 'Weekend Care',
      client: 'Khan Family',
      date: 'May 10, 2026',
      time: '10:00 AM - 6:00 PM',
      status: 'pending'
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="worker" userName="Fatima Ahmed" userRole="Worker" />

      <div className="flex-1 p-8">
        <div className="mb-6">
          <div className="bg-[#22C55E]/10 border border-[#22C55E] text-[#22C55E] px-4 py-3 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 bg-[#22C55E] text-white rounded-full flex items-center justify-center">
              ✓
            </div>
            <div>
              <div>Your account is verified!</div>
              <div className="text-sm">You can now apply for jobs and receive bookings</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl mb-2">Welcome back, Fatima!</h1>
          <p className="text-gray-600">Here's your work overview</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <div className="text-2xl mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">Recommended Jobs</h2>
                <Link to="/browse-jobs">
                  <Button variant="ghost" className="text-sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-[#FF6B00] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-2">{job.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                          <CategoryChip variant="orange">{job.category}</CategoryChip>
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{job.client}</span>
                          <span>{job.city}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="text-[#FF6B00]">PKR {job.pay}/day</span>
                          <span>• {job.duration}</span>
                          <span>• {job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/browse-jobs/${job.id}`}>
                      <Button variant="primary" className="text-sm w-full">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Upcoming Bookings</h2>
              <div className="space-y-3">
                {upcomingBookings.map((booking, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3>{booking.job}</h3>
                      <StatusPill status={booking.status}>
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </StatusPill>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="mb-1">{booking.client}</div>
                      <div>{booking.date} • {booking.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-xl mb-2">Boost Your Profile</h3>
              <p className="text-sm mb-4 text-white/90">
                Complete your profile to get more job matches
              </p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  </div>
                  <span>Add work samples</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  </div>
                  <span>Update availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
                  </div>
                  <span>Add more skills</span>
                </div>
              </div>
              <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-[#FF6B00]">
                Complete Profile
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="text-lg">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="text-lg text-[#22C55E]">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Job Success</span>
                  <span className="text-lg text-[#22C55E]">96%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="text-lg text-[#FF6B00]">PKR 48,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-gray-100">
                  <div className="text-gray-900 mb-1">New job match</div>
                  <div className="text-gray-500">2 hours ago</div>
                </div>
                <div className="pb-3 border-b border-gray-100">
                  <div className="text-gray-900 mb-1">Booking confirmed</div>
                  <div className="text-gray-500">5 hours ago</div>
                </div>
                <div>
                  <div className="text-gray-900 mb-1">New review received</div>
                  <div className="text-gray-500">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}