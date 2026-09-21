import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, MapPin, MessageCircle } from 'lucide-react';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import HireModal from '../components/HireModal';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { formatPKR } from '../constants/hiring';

const RATE_ROWS = [
  { key: 'day', label: 'Per day' },
  { key: 'week', label: 'Per week' },
  { key: 'month', label: 'Per month / permanent' },
];

export default function WorkerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { getWorker, getWorkerReviews } = useMarketplace();
  const [hiring, setHiring] = useState(false);

  const worker = getWorker(id);
  const backTo = location.state?.from || '/workers';

  if (!worker) {
    return (
      <div className="max-w-md mx-auto py-24 px-6 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-[#0A0A0A]">Worker Not Found</h1>
        <p className="text-gray-500">This profile doesn't exist or has been removed.</p>
        <Link to="/workers">
          <Button variant="primary" className="gap-2">
            <ArrowLeft size={18} />
            Browse Workers
          </Button>
        </Link>
      </div>
    );
  }

  const reviews = getWorkerReviews(worker.id);
  const isOwnProfile = user?.id === worker.userId;
  const hasRates = RATE_ROWS.some(({ key }) => worker.rates?.[key]);

  const handleHire = () => {
    if (isAuthenticated) {
      setHiring(true);
    } else {
      navigate('/sign-in', { state: { from: location.pathname } });
    }
  };

  const hireButton = isOwnProfile ? (
    <Link to="/worker/settings">
      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A0A0A]">
        Edit My Profile
      </Button>
    </Link>
  ) : (
    <Button variant="primary" className="gap-2" onClick={handleHire}>
      <Calendar size={18} />
      Hire {worker.name.split(' ')[0]}
    </Button>
  );

  return (
    <div className="bg-[#F5F5F5]">
      <div className="bg-[#0A0A0A] text-white px-6 sm:px-12 py-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <Avatar name={worker.name} size="xl" verified={worker.verified} />
            <div className="flex-1 space-y-3">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-3">
                  <h1 className="text-4xl">{worker.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <CategoryChip variant="orange">{worker.category}</CategoryChip>
                    <span className={worker.verified ? 'text-[#22C55E]' : 'text-gray-400'}>
                      {worker.verified ? '✓ Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    {worker.reviewsCount > 0 ? (
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.floor(worker.rating)} size="md" />
                        <span className="text-white">{worker.rating}</span>
                        <span>({worker.reviewsCount} reviews)</span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">New on QuickHire</span>
                    )}
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      <span>{worker.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{worker.city}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    disabled
                    title="Messaging is coming soon"
                    className="gap-2"
                  >
                    <MessageCircle size={18} />
                    Message
                  </Button>
                  {hireButton}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {worker.bio || `${worker.name} hasn't added a bio yet.`}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Reviews ({reviews.length})</h2>
              {reviews.length === 0 ? (
                <p className="text-sm text-gray-500">No reviews yet. Be the first to hire and review {worker.name.split(' ')[0]}.</p>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar name={review.clientName} size="sm" />
                        <div>
                          <h4 className="text-sm">{review.clientName}</h4>
                          <div className="flex items-center gap-2">
                            <StarRating rating={Math.floor(review.rating)} size="sm" />
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-400">{review.jobTitle}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Availability</h2>
              <div className={`flex items-center gap-2 text-sm font-semibold ${worker.isOnDuty ? 'text-emerald-600' : 'text-gray-500'}`}>
                <CheckCircle2 size={18} />
                {worker.isOnDuty ? 'Available for new work' : 'Currently unavailable'}
              </div>
              <div className="text-xs text-gray-500 mt-2">{worker.completedJobs} jobs completed</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">What they offer</h2>
              <div className="flex gap-2 flex-wrap">
                {(worker.subcategories.length ? worker.subcategories : worker.skills).map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[#F5F5F5] text-sm rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Rates</h2>
              {hasRates ? (
                <div className="space-y-3 text-sm">
                  {RATE_ROWS.filter(({ key }) => worker.rates?.[key]).map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold text-[#FF6B00]">{formatPKR(worker.rates[key])}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Rates are agreed when you send a hire request.</p>
              )}
            </div>

            {!isOwnProfile && (
              <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl mb-2">Ready to hire?</h3>
                <p className="text-sm mb-4 text-white/90">
                  Hire {worker.name.split(' ')[0]} for a day, a week, a month or permanently.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  className="border-white text-white hover:bg-white hover:text-[#FF6B00] gap-2"
                  onClick={handleHire}
                >
                  <Calendar size={18} />
                  Hire Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {hiring && <HireModal worker={worker} onClose={() => setHiring(false)} />}
    </div>
  );
}
