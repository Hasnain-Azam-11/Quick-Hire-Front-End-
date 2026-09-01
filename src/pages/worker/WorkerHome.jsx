import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWorkerData } from '../../context/WorkerDataContext';
import { Button } from '../../components/Button';
import { StatusPill } from '../../components/StatusPill';
import { CategoryChip } from '../../components/CategoryChip';
import { Briefcase, Clock, CheckCircle, Star, DollarSign, Power, ChevronRight } from 'lucide-react';

export default function WorkerHome() {
  const { user, toggleDuty } = useAuth();
  const { jobs, schedule, applyForJob } = useWorkerData();

  const userName = user?.name || 'Fatima';
  const isOnDuty = user?.isOnDuty ?? true;
  const rating = user?.rating || 4.9;
  const completedJobs = user?.completedJobs || 24;
  const earningsThisWeek = user?.earningsThisWeek || 18500;

  const activeBookingsCount = schedule.filter(s => s.status === 'confirmed').length;

  const stats = [
    { icon: DollarSign, label: 'Earnings This Week', value: `PKR ${earningsThisWeek.toLocaleString()}`, color: 'text-[#FF6B00]' },
    { icon: CheckCircle, label: 'Jobs Completed', value: completedJobs.toString(), color: 'text-[#22C55E]' },
    { icon: Star, label: 'Rating', value: rating.toString(), color: 'text-[#FF6B00]' },
    { icon: Clock, label: 'Active / Upcoming Jobs', value: activeBookingsCount.toString(), color: 'text-[#F59E0B]' }
  ];

  const openJobs = jobs.filter(j => !j.applied).slice(0, 3);

  return (
    <div className="p-8 space-y-8">
      {/* Account Verification & On-Duty Status Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0">
            ✓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-[#0A0A0A]">Verified Worker Account</h2>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">Active</span>
            </div>
            <p className="text-gray-600 text-sm mt-0.5">
              Ready to receive bookings and apply for open client postings in your area.
            </p>
          </div>
        </div>

        {/* On-Duty Toggle */}
        <div className="flex items-center gap-3 bg-[#F5F5F5] p-2 px-4 rounded-xl self-stretch md:self-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <Power className={`w-4 h-4 ${isOnDuty ? 'text-emerald-500' : 'text-gray-400'}`} />
            <span className="text-sm font-medium text-[#0A0A0A]">
              Status: <span className={isOnDuty ? 'text-emerald-600 font-semibold' : 'text-gray-500'}>{isOnDuty ? 'On-Duty (Available)' : 'Off-Duty'}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={toggleDuty}
            className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isOnDuty ? 'bg-[#FF6B00]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isOnDuty ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Welcome back, {userName}!</h1>
        <p className="text-gray-600 mt-1">Here is your daily service marketplace overview</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center ${stat.color} flex-shrink-0`}>
              <stat.icon size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recommended Jobs & Active Jobs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active / Confirmed Jobs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0A0A]">Active & Upcoming Jobs</h2>
              <Link to="/worker/schedule">
                <Button variant="ghost" className="text-xs">
                  View Full Schedule <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {schedule.map((item) => (
                <div key={item.id} className="p-4 border border-gray-200 rounded-xl hover:border-[#FF6B00] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-base text-[#0A0A0A]">{item.jobTitle}</h3>
                    <StatusPill status={item.status}>
                      {item.status.toUpperCase()}
                    </StatusPill>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Client: <strong className="text-gray-800">{item.clientName}</strong></span>
                      <span className="text-[#FF6B00] font-semibold">{item.pay}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.date} • {item.time} ({item.location})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Open Jobs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0A0A]">Open Opportunities</h2>
              <Link to="/worker/jobs">
                <Button variant="ghost" className="text-xs">
                  Browse All Jobs <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {openJobs.map((job) => (
                <div key={job.id} className="p-5 border border-gray-200 rounded-xl hover:border-[#FF6B00] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-[#0A0A0A] mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <CategoryChip variant="orange">{job.category}</CategoryChip>
                        <span className="px-2 py-0.5 bg-gray-100 rounded">{job.clientName}</span>
                        <span>• {job.city}, {job.area}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-sm">
                      <span className="text-[#FF6B00] font-semibold">PKR {job.payMin.toLocaleString()} - {job.payMax.toLocaleString()}</span>
                      <span className="text-xs text-gray-500"> / day</span>
                    </div>
                    <Button variant="primary" className="text-sm py-2 px-4" onClick={() => applyForJob(job.id)}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Stats & Profile Strength */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg space-y-4">
            <h3 className="text-xl font-bold">Profile Strength</h3>
            <p className="text-xs text-white/90">
              Keep your profile updated to get matched with premium client bookings.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>CNIC Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>Phone Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span>5 Client Reviews</span>
              </div>
            </div>
            <Link to="/worker/settings" className="block pt-2">
              <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-[#FF6B00] text-xs py-2.5">
                Edit Worker Profile
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-xl font-bold text-[#0A0A0A]">Earnings Overview</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">This Week</span>
                <span className="font-semibold text-[#FF6B00]">PKR {earningsThisWeek.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">This Month</span>
                <span className="font-semibold text-gray-900">PKR 64,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-semibold text-[#22C55E]">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
