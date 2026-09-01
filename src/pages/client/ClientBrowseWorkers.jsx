import { useState } from 'react';
import { useClientData } from '../../context/ClientDataContext';
import { CategoryChip } from '../../components/CategoryChip';
import { StarRating } from '../../components/StarRating';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import { Filter, Send, X, CheckCircle2, Search, MapPin, Award } from 'lucide-react';

const categories = ['All', 'Domestic Help', 'Childcare', 'Driving', 'Cooking', 'Handyman', 'Event Staffing'];
const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad'];

export default function ClientBrowseWorkers() {
  const { workers, sendOffer } = useClientData();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [selectedWorkerForOffer, setSelectedWorkerForOffer] = useState(null);
  const [offerForm, setOfferForm] = useState({ proposedRate: '', jobDescription: '' });
  const [offerSuccess, setOfferSuccess] = useState(false);

  const filteredWorkers = workers.filter((worker) => {
    const matchesCategory = selectedCategory === 'All' || worker.category === selectedCategory;
    const matchesCity = selectedCity === 'All Cities' || worker.city === selectedCity;
    const matchesRating = worker.rating >= minRating;
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesCity && matchesRating && matchesSearch;
  });

  const handleSendOfferSubmit = (e) => {
    e.preventDefault();
    if (selectedWorkerForOffer) {
      sendOffer(selectedWorkerForOffer.id, offerForm);
      setOfferSuccess(true);
      setTimeout(() => {
        setOfferSuccess(false);
        setSelectedWorkerForOffer(null);
        setOfferForm({ proposedRate: '', jobDescription: '' });
      }, 1500);
    }
  };

  return (
    <div className="p-8 space-y-8 relative">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Browse Workers</h1>
        <p className="text-gray-600 mt-1">Discover verified skilled workers, view credentials, and send direct job offers</p>
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
              <label className="block text-xs font-semibold text-gray-700 mb-2">Search Worker / Skill</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Fatima, Childcare, Painting"
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

            {/* Minimum Rating */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5 Stars & Above</option>
                <option value={4.8}>4.8 Stars & Above</option>
              </select>
            </div>

            <Button
              variant="ghost"
              fullWidth
              className="text-xs text-gray-500 hover:text-[#0A0A0A]"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedCity('All Cities');
                setMinRating(0);
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Workers Grid */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Showing <strong className="text-[#0A0A0A]">{filteredWorkers.length}</strong> available workers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#FF6B00] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={worker.name} size="lg" verified={worker.verified} />
                      <div>
                        <h3 className="font-bold text-lg text-[#0A0A0A]">{worker.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <CategoryChip variant="orange">{worker.category}</CategoryChip>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {worker.city}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1 font-semibold text-gray-800">
                      <StarRating rating={Math.floor(worker.rating)} size="sm" />
                      <span>{worker.rating}</span>
                      <span className="text-gray-400 font-normal">({worker.reviewsCount})</span>
                    </div>

                    <span className="text-gray-300">•</span>

                    <span className="text-gray-600 font-medium">
                      {worker.experience} yrs exp
                    </span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {worker.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-[#F5F5F5] text-gray-600 rounded-lg text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs">
                    <span className="text-gray-400 block">Est. Rate</span>
                    <span className="font-bold text-[#FF6B00] text-sm">PKR {worker.hourlyRate} / hr</span>
                  </div>

                  <Button
                    variant="primary"
                    className="text-xs py-2 px-5 font-semibold gap-1.5"
                    onClick={() => {
                      setSelectedWorkerForOffer(worker);
                      setOfferForm({ proposedRate: (worker.hourlyRate * 8).toString(), jobDescription: '' });
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Offer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Send Offer Modal */}
      {selectedWorkerForOffer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative border border-gray-200">
            <button
              type="button"
              onClick={() => setSelectedWorkerForOffer(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0A0A0A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b pb-4">
              <Avatar name={selectedWorkerForOffer.name} size="md" verified={selectedWorkerForOffer.verified} />
              <div>
                <h3 className="font-bold text-lg text-[#0A0A0A]">Send Offer to {selectedWorkerForOffer.name}</h3>
                <span className="text-xs text-gray-500">{selectedWorkerForOffer.category} • {selectedWorkerForOffer.city}</span>
              </div>
            </div>

            {offerSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-[#0A0A0A]">Offer Sent Successfully!</h4>
                <p className="text-xs text-gray-500">
                  {selectedWorkerForOffer.name} will be notified of your proposed rate and job description.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendOfferSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Proposed Daily Rate (PKR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2500"
                    value={offerForm.proposedRate}
                    onChange={(e) => setOfferForm({ ...offerForm, proposedRate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Short Job Description / Requirements</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what you need help with, preferred dates, and shift timings..."
                    value={offerForm.jobDescription}
                    onChange={(e) => setOfferForm({ ...offerForm, jobDescription: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs py-2 px-4"
                    onClick={() => setSelectedWorkerForOffer(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="text-xs py-2 px-6 font-semibold">
                    Submit Offer
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
