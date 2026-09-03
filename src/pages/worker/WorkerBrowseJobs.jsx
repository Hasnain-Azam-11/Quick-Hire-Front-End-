import { useState } from 'react';
import { useWorkerData } from '../../context/WorkerDataContext';
import { CategoryChip } from '../../components/CategoryChip';
import { Button } from '../../components/Button';
import { Filter, Users, Search, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';

const categories = ['All', ...CATEGORIES];
const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'];
const durations = ['All', '1 day', '2 days', '3 months', '6 months', 'Ongoing'];

export default function WorkerBrowseJobs() {
  const { jobs, applyForJob } = useWorkerData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [maxPay, setMaxPay] = useState(5000);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || job.city === selectedCity;
    const matchesDuration = selectedDuration === 'All' || job.duration === selectedDuration;
    const matchesPay = job.payMax <= maxPay || job.payMin <= maxPay;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesCity && matchesDuration && matchesPay && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Browse Jobs</h1>
        <p className="text-gray-600 mt-1">Explore open service requests posted by clients and apply directly</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-[#0A0A0A]">
              <Filter size={20} className="text-[#FF6B00]" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Search Keyword</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Nanny, Driver, Helper"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Pay Range Filter */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 mb-2">
                <span>Max Pay Rate</span>
                <span className="text-[#FF6B00]">Up to PKR {maxPay.toLocaleString()}/day</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="250"
                value={maxPay}
                onChange={(e) => setMaxPay(parseInt(e.target.value))}
                className="w-full accent-[#FF6B00]"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>PKR 1,000</span>
                <span>PKR 5,000</span>
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                {durations.map((dur) => (
                  <option key={dur} value={dur}>{dur}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <Button
              variant="ghost"
              fullWidth
              className="text-xs text-gray-500 hover:text-[#0A0A0A]"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCity('All Cities');
                setSelectedDuration('All');
                setMaxPay(5000);
              }}
            >
              Reset All Filters
            </Button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Showing <strong className="text-[#0A0A0A]">{filteredJobs.length}</strong> open jobs
            </span>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
              <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">No Jobs Found</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                No open positions match your search criteria. Try adjusting your filters or search keywords.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#FF6B00] transition-all space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <CategoryChip variant="orange">{job.category}</CategoryChip>
                        <span className="px-3 py-1 bg-gray-100 rounded-full font-medium text-gray-700">
                          Client: {job.clientName} ({job.clientType})
                        </span>
                        <span className="text-gray-500 font-medium">{job.city}, {job.area}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5F5F5] rounded-xl text-xs">
                    <div>
                      <div className="text-gray-500 mb-0.5">Pay Rate</div>
                      <div className="font-bold text-[#FF6B00] text-sm">
                        PKR {job.payMin.toLocaleString()} - {job.payMax.toLocaleString()}/day
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-0.5">Duration</div>
                      <div className="font-semibold text-gray-800 text-sm">{job.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-0.5">Start Date</div>
                      <div className="font-semibold text-gray-800 text-sm">{job.startDate}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-0.5">Applicants</div>
                      <div className="flex items-center gap-1 font-semibold text-gray-800 text-sm">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{job.applicationsCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-400">Posted {job.postedAt}</span>
                    {job.applied ? (
                      <Button variant="disabled" disabled className="text-xs py-2.5 px-6">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Applied
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="text-xs py-2.5 px-6 font-semibold"
                        onClick={() => applyForJob(job.id)}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
