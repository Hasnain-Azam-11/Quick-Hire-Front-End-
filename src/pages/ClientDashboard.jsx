import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { StatusPill } from '../components/StatusPill';
import { CategoryChip } from '../components/CategoryChip';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Plus, Briefcase, Clock, CheckCircle, Star } from 'lucide-react';

export default function ClientDashboard() {
  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '3', color: 'text-[#FF6B00]' },
    { icon: Clock, label: 'Pending', value: '2', color: 'text-[#F59E0B]' },
    { icon: CheckCircle, label: 'Completed', value: '12', color: 'text-[#22C55E]' },
    { icon: Star, label: 'Avg Rating', value: '4.8', color: 'text-[#FF6B00]' }
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Experienced Nanny Needed',
      category: 'Childcare',
      city: 'Karachi',
      applications: 8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Wedding Event Staff (20 People)',
      category: 'Event Staffing',
      city: 'Lahore',
      applications: 15,
      status: 'active'
    },
    {
      id: 3,
      title: 'Daily House Cleaning',
      category: 'Domestic Help',
      city: 'Islamabad',
      applications: 5,
      status: 'pending'
    }
  ];

  const recommendedWorkers = [
    {
      name: 'Fatima Ahmed',
      category: 'Childcare',
      rating: 4.9,
      city: 'Karachi',
      availability: 'Available Now'
    },
    {
      name: 'Ali Hassan',
      category: 'Event Staffing',
      rating: 4.8,
      city: 'Lahore',
      availability: 'Available Now'
    },
    {
      name: 'Ayesha Khan',
      category: 'Domestic Help',
      rating: 5.0,
      city: 'Islamabad',
      availability: 'Available Now'
    }
  ];

  const recentBookings = [
    { worker: 'Muhammad Raza', job: 'Construction Worker', date: 'Apr 28, 2026', status: 'completed' },
    { worker: 'Sara Ali', job: 'House Cleaning', date: 'Apr 25, 2026', status: 'completed' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Welcome back, Ahmed!</h1>
            <p className="text-gray-600">Here's what's happening with your jobs</p>
          </div>
          <Link to="/post-job">
            <Button variant="primary" className="gap-2">
              <Plus size={20} />
              Post a Job
            </Button>
          </Link>
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
              <h2 className="text-xl mb-4">Active Jobs</h2>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-[#FF6B00] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-2">{job.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <CategoryChip variant="orange">{job.category}</CategoryChip>
                          <span>{job.city}</span>
                        </div>
                      </div>
                      <StatusPill status={job.status}>
                        {job.status === 'active' ? 'Active' : 'Pending'}
                      </StatusPill>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-sm">
                          {job.applications}
                        </div>
                        <span className="text-sm text-gray-600">Applications</span>
                      </div>
                      <Link to={`/client/jobs/${job.id}`}>
                        <Button variant="ghost" className="text-sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Recent Bookings</h2>
              <div className="space-y-3">
                {recentBookings.map((booking, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Avatar name={booking.worker} size="sm" />
                      <div>
                        <div className="text-sm">{booking.worker}</div>
                        <div className="text-xs text-gray-500">{booking.job}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{booking.date}</span>
                      <StatusPill status={booking.status}>Completed</StatusPill>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#FF6B00]/10 rounded flex items-center justify-center">
                <span className="text-[#FF6B00] text-sm">🤖</span>
              </div>
              <h2 className="text-xl">AI Recommendations</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Top workers matching your recent jobs</p>
            <div className="space-y-4">
              {recommendedWorkers.map((worker) => (
                <div key={worker.name} className="p-4 bg-[#F5F5F5] rounded-xl">
                  <div className="flex flex-col items-center text-center mb-3">
                    <Avatar name={worker.name} size="md" verified />
                    <h4 className="text-sm mt-2 mb-1">{worker.name}</h4>
                    <CategoryChip variant="orange">{worker.category}</CategoryChip>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Rating</span>
                      <StarRating rating={Math.floor(worker.rating)} size="sm" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location</span>
                      <span>{worker.city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#22C55E]">● {worker.availability}</span>
                    </div>
                  </div>
                  <Link to={`/worker/${worker.name.toLowerCase().replace(' ', '-')}`}>
                    <Button variant="outline" fullWidth className="mt-3 text-sm py-2">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}