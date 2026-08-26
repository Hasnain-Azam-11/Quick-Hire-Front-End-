import { useState } from 'react';
import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { CategoryChip } from '../components/CategoryChip';
import { Button } from '../components/Button';
import { Filter, Users } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Full-time Nanny Position',
    client: 'Family',
    category: 'Childcare',
    city: 'Karachi',
    area: 'DHA Phase 6',
    pay: { min: 1800, max: 2200 },
    duration: '3 months',
    startDate: 'May 10, 2026',
    description: 'Looking for an experienced nanny to care for our 2-year-old daughter. Must have experience with toddlers and CPR certification.',
    applications: 8,
    posted: '2 hours ago',
    applied: false
  },
  {
    id: 2,
    title: 'Weekend Childcare Needed',
    client: 'Individual',
    category: 'Childcare',
    city: 'Karachi',
    area: 'Clifton',
    pay: { min: 1500, max: 1800 },
    duration: 'Ongoing',
    startDate: 'May 8, 2026',
    description: 'Need reliable childcare for weekends (Saturday & Sunday) for our 5-year-old son. Meal prep skills preferred.',
    applications: 5,
    posted: '5 hours ago',
    applied: false
  },
  {
    id: 3,
    title: 'Event Childcare - Wedding',
    client: 'Event Organizer',
    category: 'Event Staffing',
    city: 'Lahore',
    area: 'Gulberg',
    pay: { min: 2500, max: 3000 },
    duration: '1 day',
    startDate: 'May 15, 2026',
    description: 'Need 3 childcare providers for wedding event. Must be comfortable managing multiple children (ages 2-8) in a festive environment.',
    applications: 15,
    posted: '1 day ago',
    applied: true
  },
  {
    id: 4,
    title: 'Daily House Help',
    client: 'Family',
    category: 'Domestic Help',
    city: 'Islamabad',
    area: 'F-7',
    pay: { min: 1200, max: 1500 },
    duration: '6 months',
    startDate: 'May 5, 2026',
    description: 'Looking for daily house help for cleaning, laundry, and light meal preparation. 5 days a week.',
    applications: 12,
    posted: '2 days ago',
    applied: false
  }
];

const categories = ['All', 'Domestic Help', 'Childcare', 'Driving', 'Cooking', 'Construction', 'Event Staffing'];
const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
const durations = ['All', 'Days', 'Weeks', 'Months', 'Ongoing'];

export default function BrowseJobs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [payRange, setPayRange] = useState([0, 5000]);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="worker" userName="Fatima Ahmed" userRole="Worker" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Browse Jobs</h1>
          <p className="text-gray-600">Find jobs that match your skills and schedule</p>
        </div>

        <div className="flex gap-6">
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-[#FF6B00]" />
                <h2 className="text-lg">Filters</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Pay Range (PKR/day)</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={payRange[1]}
                    onChange={(e) => setPayRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>PKR 0</span>
                    <span>PKR {payRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {durations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {jobs.length} jobs
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]">
                <option>Sort by: Recommended</option>
                <option>Highest Pay</option>
                <option>Most Recent</option>
                <option>Closest Match</option>
              </select>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#FF6B00] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{job.title}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">{job.client}</span>
                        <CategoryChip variant="orange">{job.category}</CategoryChip>
                        <span className="text-sm text-gray-600">{job.city}, {job.area}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                  <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Pay Rate</div>
                      <div className="text-[#FF6B00]">
                        PKR {job.pay.min.toLocaleString()} - {job.pay.max.toLocaleString()}/day
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Duration</div>
                      <div>{job.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Start Date</div>
                      <div>{job.startDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Applications</div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span>{job.applications}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Posted {job.posted}</span>
                    {job.applied ? (
                      <Button variant="disabled" disabled>
                        ✓ Applied
                      </Button>
                    ) : (
                      <Link to={`/browse-jobs/${job.id}`}>
                        <Button variant="primary">
                          Apply Now
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}