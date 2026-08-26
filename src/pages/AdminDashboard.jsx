import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { StatusPill } from '../components/StatusPill';
import { Button } from '../components/Button';
import { Users, Briefcase, Calendar, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { icon: Users, label: 'Total Users', value: '52,341', change: '+12%', color: 'text-[#FF6B00]' },
    { icon: AlertCircle, label: 'Pending Verifications', value: '23', change: 'Urgent', color: 'text-[#F59E0B]' },
    { icon: Briefcase, label: 'Active Jobs', value: '1,247', change: '+8%', color: 'text-[#22C55E]' },
    { icon: Calendar, label: 'Completed Jobs', value: '203,492', change: '+15%', color: 'text-[#0A0A0A]' }
  ];

  const verificationQueue = [
    {
      id: 1,
      name: 'Sara Ali',
      city: 'Karachi',
      category: 'Childcare',
      date: 'May 3, 2026',
      cnic: '/placeholder-cnic.jpg'
    },
    {
      id: 2,
      name: 'Muhammad Raza',
      city: 'Lahore',
      category: 'Construction',
      date: 'May 3, 2026',
      cnic: '/placeholder-cnic.jpg'
    },
    {
      id: 3,
      name: 'Hina Rasheed',
      city: 'Islamabad',
      category: 'Domestic Help',
      date: 'May 2, 2026',
      cnic: '/placeholder-cnic.jpg'
    },
    {
      id: 4,
      name: 'Ali Hassan',
      city: 'Karachi',
      category: 'Driving',
      date: 'May 2, 2026',
      cnic: '/placeholder-cnic.jpg'
    }
  ];

  const recentActivity = [
    { type: 'user', action: 'New user registered', user: 'Ayesha Khan', time: '5 min ago' },
    { type: 'job', action: 'Job posted', user: 'Ahmed Family', time: '12 min ago' },
    { type: 'booking', action: 'Booking completed', user: 'Fatima Ahmed', time: '1 hour ago' },
    { type: 'review', action: 'Review submitted', user: 'Sarah Khan', time: '2 hours ago' },
    { type: 'verification', action: 'Worker verified', user: 'Imran Sheikh', time: '3 hours ago' }
  ];

  const bookingsData = [
    { month: 'Jan', count: 1200 },
    { month: 'Feb', count: 1400 },
    { month: 'Mar', count: 1600 },
    { month: 'Apr', count: 1800 },
    { month: 'May', count: 1247 }
  ];

  const categoryData = [
    { category: 'Childcare', count: 320 },
    { category: 'Domestic Help', count: 280 },
    { category: 'Event Staffing', count: 210 },
    { category: 'Driving', count: 180 },
    { category: 'Construction', count: 150 },
    { category: 'Other', count: 107 }
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="admin" userName="Admin" userRole="Administrator" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 bg-[#F5F5F5] rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className={`text-sm ${stat.change.includes('+') ? 'text-[#22C55E]' : stat.change === 'Urgent' ? 'text-[#FF6B00]' : 'text-gray-600'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Verification Queue</h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FF6B00] text-white rounded-full text-sm">
                  {verificationQueue.length} Pending
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Worker</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">City</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Applied</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">CNIC</th>
                    <th className="text-right py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationQueue.map((worker) => (
                    <tr key={worker.id} className="border-b border-gray-100 hover:bg-[#F5F5F5]">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={worker.name} size="sm" />
                          <span>{worker.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{worker.city}</td>
                      <td className="py-4 px-4">
                        <span className="text-xs bg-[#F5F5F5] px-2 py-1 rounded">
                          {worker.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{worker.date}</td>
                      <td className="py-4 px-4">
                        <button className="text-sm text-[#FF6B00] hover:underline">
                          View
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="primary" className="text-xs px-3 py-1">
                            Approve
                          </Button>
                          <Button variant="outline" className="text-xs px-3 py-1 border-[#EF4444] text-[#EF4444]">
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#FF6B00] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm mb-1">{activity.action}</div>
                      <div className="text-xs text-gray-600 mb-1">{activity.user}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl mb-6">Bookings Trend</h2>
            <div className="space-y-4">
              {bookingsData.map((data) => {
                const maxCount = Math.max(...bookingsData.map(d => d.count));
                const percentage = (data.count / maxCount) * 100;
                return (
                  <div key={data.month}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{data.month}</span>
                      <span className="text-sm">{data.count.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B00] rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl mb-6">Jobs by Category</h2>
            <div className="space-y-4">
              {categoryData.map((data) => {
                const maxCount = Math.max(...categoryData.map(d => d.count));
                const percentage = (data.count / maxCount) * 100;
                return (
                  <div key={data.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{data.category}</span>
                      <span className="text-sm">{data.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#22C55E] rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl mb-1">Platform Health</h2>
              <p className="text-sm text-gray-600">Key performance indicators</p>
            </div>
            <StatusPill status="verified">All Systems Operational</StatusPill>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
              <div className="text-2xl mb-1">4.8★</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
              <div className="text-2xl mb-1">96%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
              <div className="text-2xl mb-1">24min</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
            <div className="text-center p-4 bg-[#F5F5F5] rounded-xl">
              <div className="text-2xl mb-1">98%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}