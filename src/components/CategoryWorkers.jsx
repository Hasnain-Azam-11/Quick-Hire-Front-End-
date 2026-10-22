import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { Button } from './Button';
import WorkerCard from './WorkerCard';
import JobsStatusNotice from './JobsStatusNotice';
import { useClientData } from '../context/ClientDataContext';
import { CATEGORIES, CITIES } from '../constants/categories';
import { categoryLabel, subcategoriesFor } from '../constants/hiring';

const selectClass =
  'w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]';

const offers = (worker, service) => worker.subcategories.includes(service) || worker.skills.includes(service);

function initialCategory(searchParams, defaultLabel) {
  const param = searchParams.get('category');
  if (!param) return defaultLabel;
  if (param.toLowerCase() === 'all') return 'All';
  return categoryLabel(param) || defaultLabel;
}

// Browse workers under a category: preselects the category from the page, while letting the
// client search and change category, service, city, or minimum rating filters.
export default function CategoryWorkers({ category, onPostRequest }) {
  const { workers, workersStatus, refreshWorkers } = useClientData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(() =>
    initialCategory(searchParams, category.label)
  );
  const [service, setService] = useState(() => searchParams.get('sub') || 'All');
  const [city, setCity] = useState(() => searchParams.get('city') || 'All Cities');
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [minRating, setMinRating] = useState(() => Number(searchParams.get('rating')) || 0);

  const inCategory =
    selectedCategory === 'All' ? workers : workers.filter((w) => w.category === selectedCategory);
  const services = selectedCategory === 'All' ? [] : subcategoriesFor(selectedCategory);

  const q = query.trim().toLowerCase();
  const visible = inCategory
    .filter((worker) => {
      const matchesService = service === 'All' || offers(worker, service);
      const matchesCity = city === 'All Cities' || worker.city === city;
      const matchesRating = worker.rating >= minRating;
      const matchesSearch =
        !q ||
        worker.name.toLowerCase().includes(q) ||
        worker.category.toLowerCase().includes(q) ||
        (worker.bio && worker.bio.toLowerCase().includes(q)) ||
        (worker.area && worker.area.toLowerCase().includes(q)) ||
        worker.subcategories.some((s) => s.toLowerCase().includes(q)) ||
        worker.skills.some((s) => s.toLowerCase().includes(q));

      return matchesService && matchesCity && matchesRating && matchesSearch;
    })
    .sort((a, b) => b.reviewsCount - a.reviewsCount);

  const handleCategoryChange = (nextCategory) => {
    setSelectedCategory(nextCategory);
    setService('All');
  };

  const resetFilters = () => {
    setSelectedCategory(category.label);
    setService('All');
    setCity('All Cities');
    setQuery('');
    setMinRating(0);
    if (searchParams.toString()) {
      const next = new URLSearchParams();
      if (searchParams.get('view')) next.set('view', searchParams.get('view'));
      setSearchParams(next, { replace: true });
    }
  };

  const activeCategoryLabel = selectedCategory === 'All' ? '' : selectedCategory;

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100 text-[#0A0A0A]">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-[#FF6B00]" />
            <h2 className="text-lg font-bold">Filters</h2>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="text-xs py-1.5 px-3 text-gray-500 hover:text-[#0A0A0A]"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Search Worker / Skill</label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Fatima, Childcare, Painter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={selectClass}
            >
              {['All', ...CATEGORIES].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={selectClass}
            >
              {['All Cities', ...CITIES].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className={selectClass}
            >
              <option value={0}>All Ratings</option>
              <option value={4.5}>4.5 Stars &amp; Above</option>
              <option value={4.8}>4.8 Stars &amp; Above</option>
            </select>
          </div>
        </div>
      </div>

      {services.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-[#0A0A0A]">Filter by service</div>
          <div className="flex flex-wrap gap-2">
            {['All', ...services].map((name) => {
              const count = name === 'All' ? inCategory.length : inCategory.filter((w) => offers(w, name)).length;
              const active = service === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setService(name)}
                  aria-pressed={active}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00]'
                  }`}
                >
                  {name === 'All' ? 'All services' : name} <span className={active ? 'opacity-80' : 'text-gray-400'}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <JobsStatusNotice status={workersStatus} onRetry={refreshWorkers} label="workers" />

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-600">
          Showing <strong className="text-[#0A0A0A]">{visible.length}</strong> available workers
        </span>
        {service !== 'All' && (
          <button
            type="button"
            onClick={() => setService('All')}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF0E6] text-[#FF6B00] rounded-full text-xs font-semibold cursor-pointer"
          >
            {service}
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {workersStatus.state === 'loading' ? null : visible.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0A0A0A]">
            {inCategory.length === 0 && activeCategoryLabel
              ? `No ${activeCategoryLabel} workers are listed yet`
              : service !== 'All' && activeCategoryLabel
              ? `No ${activeCategoryLabel} workers offer ${service} yet`
              : 'No workers found for this search'}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Post your request instead and workers can apply as soon as they join.
          </p>
          <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold" onClick={onPostRequest}>
            Post a request
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      )}
    </div>
  );
}

