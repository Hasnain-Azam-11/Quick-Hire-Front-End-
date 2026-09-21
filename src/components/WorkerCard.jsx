import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { CategoryChip } from './CategoryChip';
import { StarRating } from './StarRating';
import HireModal from './HireModal';

function startingRate(worker) {
  const { day, week, month } = worker.rates || {};
  if (day) return { amount: day, unit: 'day' };
  if (week) return { amount: week, unit: 'week' };
  if (month) return { amount: month, unit: 'month' };
  return null;
}

// One worker in a list. Signed-in users hire in a modal; guests are sent to sign in
// and come back to this worker's profile afterwards.
export default function WorkerCard({ worker }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hiring, setHiring] = useState(false);

  const rate = startingRate(worker);
  const profileState = { from: location.pathname + location.search };

  const handleHire = () => {
    if (isAuthenticated) setHiring(true);
    else navigate('/sign-in', { state: { from: `/worker-profile/${worker.id}` } });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#FF6B00] transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <Link to={`/worker-profile/${worker.id}`} state={profileState} className="flex items-center gap-3">
          <Avatar name={worker.name} size="lg" verified={worker.verified} />
          <div>
            <h3 className="font-bold text-lg text-[#0A0A0A] hover:text-[#FF6B00] transition-colors">{worker.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <CategoryChip variant="orange">{worker.category}</CategoryChip>
              {worker.city && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {worker.city}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs pt-1">
          {worker.reviewsCount > 0 ? (
            <div className="flex items-center gap-1 font-semibold text-gray-800">
              <StarRating rating={Math.floor(worker.rating)} size="sm" />
              <span>{worker.rating}</span>
              <span className="text-gray-400 font-normal">({worker.reviewsCount})</span>
            </div>
          ) : (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-semibold">New</span>
          )}
          <span className="text-gray-300">•</span>
          <span className="text-gray-600 font-medium">{worker.experience} yrs exp</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {(worker.subcategories.length ? worker.subcategories : worker.skills).map((skill) => (
            <span key={skill} className="px-2.5 py-1 bg-[#F5F5F5] text-gray-600 rounded-lg text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
        <div className="text-xs">
          <span className="text-gray-400 block">Starting from</span>
          <span className="font-bold text-[#FF6B00] text-sm">
            {rate ? `PKR ${rate.amount.toLocaleString()} / ${rate.unit}` : 'On request'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/worker-profile/${worker.id}`} state={profileState}>
            <Button variant="outline" className="text-xs py-2 px-4 font-semibold">
              Profile
            </Button>
          </Link>
          <Button variant="primary" className="text-xs py-2 px-5 font-semibold gap-1.5" onClick={handleHire}>
            <Send className="w-3.5 h-3.5" />
            Hire
          </Button>
        </div>
      </div>

      {hiring && <HireModal worker={worker} onClose={() => setHiring(false)} />}
    </div>
  );
}
