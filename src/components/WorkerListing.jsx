import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { useClientData } from '../context/ClientDataContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import WorkerCard from './WorkerCard';
import { CATEGORIES, CITIES } from '../constants/categories';
import { categoryLabel } from '../constants/hiring';

const selectClass =
  'w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]';

// Category / subcategory / city / search / rating come from the URL, so links from
// the category pages (?category=driving&sub=Personal%20Driver) land on a pre-filtered list.
function readFilters(searchParams) {
  return {
    category: categoryLabel(searchParams.get('category')) || 'All',
    sub: searchParams.get('sub') || '',
    city: searchParams.get('city') || 'All Cities',
    query: searchParams.get('q') || '',
    minRating: Number(searchParams.get('rating')) || 0,
  };
}

export default function WorkerListing({ postJobPath = '/post-job' }) {
  const { workers } = useClientData();
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = readFilters(searchParams);

  const updateFilters = (patch) => {
    const next = { ...filters, ...patch };
    const params = new URLSearchParams();
    if (next.category !== 'All') params.set('category', next.category);
    if (next.sub) params.set('sub', next.sub);
    if (next.city !== 'All Cities') params.set('city', next.city);
    if (next.query) params.set('q', next.query);
    if (next.minRating) params.set('rating', String(next.minRating));
    setSearchParams(params, { replace: true });
  };

  const filteredWorkers = workers.filter((worker) => {
    const q = filters.query.toLowerCase();
    const matchesCategory = filters.category === 'All' || worker.category === filters.category;
    const matchesSub =
      !filters.sub || worker.subcategories.includes(filters.sub) || worker.skills.includes(filters.sub);
    const matchesCity = filters.city === 'All Cities' || worker.city === filters.city;
    const matchesRating = worker.rating >= filters.minRating;
    const matchesSearch =
      !q ||
      worker.name.toLowerCase().includes(q) ||
      worker.category.toLowerCase().includes(q) ||
      worker.subcategories.some((s) => s.toLowerCase().includes(q)) ||
      worker.skills.some((s) => s.toLowerCase().includes(q));

    return matchesCategory && matchesSub && matchesCity && matchesRating && matchesSearch;
  });

  const postJobTarget = isAuthenticated
    ? postJobPath
    : `/register?redirect=${encodeURIComponent(postJobPath)}`;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters */}
      <div className="w-full lg:w-72 space-y-6 flex-shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-[#0A0A0A]">
            <Filter size={20} className="text-[#FF6B00]" />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Search Worker / Skill</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Fatima, Childcare, Painter"
                value={filters.query}
                onChange={(e) => updateFilters({ query: e.target.value })}
                className="w-full pl-9 pr-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value, sub: '' })}
              className={selectClass}
            >
              {['All', ...CATEGORIES].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">City</label>
            <select
              value={filters.city}
              onChange={(e) => updateFilters({ city: e.target.value })}
              className={selectClass}
            >
              {['All Cities', ...CITIES].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Minimum Rating</label>
            <select
              value={filters.minRating}
              onChange={(e) => updateFilters({ minRating: parseFloat(e.target.value) })}
              className={selectClass}
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
            onClick={() => setSearchParams({}, { replace: true })}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600">
            Showing <strong className="text-[#0A0A0A]">{filteredWorkers.length}</strong> available workers
          </span>
          {filters.sub && (
            <button
              type="button"
              onClick={() => updateFilters({ sub: '' })}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0E6] text-[#FF6B00] rounded-full text-xs font-semibold cursor-pointer"
            >
              {filters.sub}
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredWorkers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-4">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0A0A0A]">No workers found for this search</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Try widening your filters, or post your requirement and let workers come to you.
            </p>
            <Link to={postJobTarget}>
              <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold mt-2">
                Post a Job Instead
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
