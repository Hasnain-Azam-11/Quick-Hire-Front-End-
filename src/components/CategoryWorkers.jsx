import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from './Button';
import WorkerCard from './WorkerCard';
import { useClientData } from '../context/ClientDataContext';
import { subcategoriesFor } from '../constants/hiring';

const offers = (worker, service) => worker.subcategories.includes(service) || worker.skills.includes(service);

// The workers in one category, with their services, so a client can hire directly
// instead of posting a request.
export default function CategoryWorkers({ category, onPostRequest }) {
  const { workers } = useClientData();
  const [service, setService] = useState('All');

  const inCategory = workers.filter((w) => w.category === category.label);
  const services = subcategoriesFor(category.value);
  const visible = (service === 'All' ? inCategory : inCategory.filter((w) => offers(w, service))).sort(
    (a, b) => b.reviewsCount - a.reviewsCount
  );

  const allWorkersPath = `/workers?category=${category.value}`;

  return (
    <div className="space-y-6">
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

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-4">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0A0A0A]">
            {inCategory.length === 0
              ? `No ${category.label} workers are listed yet`
              : `No ${category.label} workers offer ${service} yet`}
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Post your request instead and workers can apply as soon as they join.
          </p>
          <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold" onClick={onPostRequest}>
            Post a request
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
          <div className="text-center">
            <Link to={allWorkersPath} className="text-sm font-semibold text-[#FF6B00]! hover:underline">
              Search all {category.label} workers with more filters
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
