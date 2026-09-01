import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useClientData } from '../../context/ClientDataContext';
import { Button } from '../../components/Button';
import { StatusPill } from '../../components/StatusPill';
import { CategoryChip } from '../../components/CategoryChip';
import { Briefcase, CheckCircle, DollarSign, Plus, ChevronRight, Clock, Users } from 'lucide-react';

export default function ClientHome() {
  const { user } = useAuth();
  const { clientJobs } = useClientData();

  const userName = user?.name || 'Ali Raza';

  const activeJobsCount = clientJobs.filter((j) => j.status === 'Open' || j.status === 'Assigned').length;
  const completedJobsCount = clientJobs.filter((j) => j.status === 'Completed').length;
  const totalSpent = 48500; // Mock total spent in PKR

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: activeJobsCount.toString(), color: 'text-[#FF6B00]' },
    { icon: CheckCircle, label: 'Completed Jobs', value: completedJobsCount.toString(), color: 'text-[#22C55E]' },
    { icon: DollarSign, label: 'Total Spent', value: `PKR ${totalSpent.toLocaleString()}`, color: 'text-[#FF6B00]' }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0A0A]">Welcome back, {userName}!</h1>
          <p className="text-gray-600 mt-1">Here is your client hiring dashboard overview</p>
        </div>

        <Link to="/client/post-job">
          <Button variant="primary" className="gap-2 px-6 py-3 font-semibold text-sm">
            <Plus className="w-5 h-5" />
            Post a New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Recent Job Posts Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0A0A0A]">Recent Job Postings</h2>
            <p className="text-xs text-gray-500">Track application status and assigned workers</p>
          </div>
          <Link to="/client/jobs">
            <Button variant="ghost" className="text-xs">
              View All Jobs <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {clientJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 border border-gray-200 rounded-xl hover:border-[#FF6B00] transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg text-[#0A0A0A]">{job.title}</h3>
                    <StatusPill status={job.status === 'Open' ? 'active' : job.status === 'Assigned' ? 'pending' : 'completed'}>
                      {job.status.toUpperCase()}
                    </StatusPill>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <CategoryChip variant="orange">{job.category}</CategoryChip>
                    <span>• {job.city}, {job.area}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-[#FF6B00] text-sm">
                    PKR {job.payMin.toLocaleString()} - {job.payMax.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-400">Offered Rate / day</div>
                </div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2">{job.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Posted {job.postedAt}
                  </span>
                  {job.status === 'Open' && (
                    <span className="flex items-center gap-1 text-[#FF6B00] font-medium">
                      <Users className="w-3.5 h-3.5" /> {job.applicants?.length || 0} Applicant(s)
                    </span>
                  )}
                  {job.assignedWorker && (
                    <span className="text-emerald-600 font-medium">
                      Assigned to: {job.assignedWorker}
                    </span>
                  )}
                </div>

                <Link to="/client/jobs">
                  <Button variant="outline" className="text-xs py-1.5 px-4">
                    Manage Job
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
