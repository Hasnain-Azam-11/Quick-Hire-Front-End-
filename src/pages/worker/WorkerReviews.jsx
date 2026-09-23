import { useWorkerData } from '../../context/WorkerDataContext';
import { StarRating } from '../../components/StarRating';
import { ThumbsUp, Award } from 'lucide-react';
import { Avatar } from '../../components/Avatar';

export default function WorkerReviews() {
  const { reviews } = useWorkerData();

  const totalReviews = reviews.length;
  const avgRating = 4.9;

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Client Reviews</h1>
        <p className="text-gray-600 mt-1">Feedback and ratings from clients you have worked with</p>
      </div>

      {/* Review Summary Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center p-4 border-r-0 md:border-r border-gray-100 text-center">
          <div className="text-5xl font-bold text-[#0A0A0A] mb-2">{avgRating}</div>
          <StarRating rating={5} size="md" />
          <div className="text-xs text-gray-500 mt-2">Based on {totalReviews} client reviews</div>
        </div>

        <div className="space-y-2 justify-center flex flex-col px-0 md:px-4 border-r-0 md:border-r border-gray-100">
          <div className="flex items-center gap-3 text-xs">
            <span className="w-12 text-gray-600 font-medium">5 Stars</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[90%] h-full bg-[#FF6B00] rounded-full"></div>
            </div>
            <span className="w-8 text-gray-500">90%</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="w-12 text-gray-600 font-medium">4 Stars</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[10%] h-full bg-[#FF6B00] rounded-full"></div>
            </div>
            <span className="w-8 text-gray-500">10%</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="w-12 text-gray-600 font-medium">3 Stars</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-0 h-full bg-[#FF6B00] rounded-full"></div>
            </div>
            <span className="w-8 text-gray-500">0%</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-50 text-[#FF6B00] rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#0A0A0A]">100% Punctuality</div>
              <div className="text-gray-500">Arrives on time for shifts</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-[#0A0A0A]">Top Rated Worker</div>
              <div className="text-gray-500">Recognized for quality service</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0A0A0A]">All Feedback</h2>

        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={rev.clientName} size="md" />
                <div>
                  <h3 className="font-semibold text-base text-[#0A0A0A]">{rev.clientName}</h3>
                  <div className="text-xs text-gray-500">Service: <strong className="text-gray-700">{rev.jobTitle}</strong></div>
                </div>
              </div>

              <div className="text-right">
                <StarRating rating={rev.rating} size="sm" />
                <span className="text-[11px] text-gray-400 mt-1 block">{rev.date}</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed bg-[#F5F5F5] p-4 rounded-xl">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
