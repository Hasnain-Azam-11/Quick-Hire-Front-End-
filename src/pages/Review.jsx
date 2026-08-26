import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

const quickTags = [
  'Punctual',
  'Reliable',
  'Professional',
  'Friendly',
  'Skilled',
  'Hardworking',
  'Late',
  'Unprofessional',
  'Not Recommended'
];

export default function Review() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const workerData = {
    name: 'Fatima Ahmed',
    category: 'Childcare',
    jobTitle: 'Full-time Nanny Position'
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getSentiment = () => {
    if (rating >= 4) return { label: 'Positive', emoji: '🟢', color: 'text-[#22C55E]' };
    if (rating === 3) return { label: 'Neutral', emoji: '🟡', color: 'text-[#F59E0B]' };
    if (rating > 0) return { label: 'Negative', emoji: '🔴', color: 'text-[#EF4444]' };
    return { label: 'Not rated', emoji: '⚪', color: 'text-gray-400' };
  };

  const getRatingLabel = () => {
    if (rating === 5) return 'Excellent!';
    if (rating === 4) return 'Great';
    if (rating === 3) return 'Good';
    if (rating === 2) return 'Fair';
    if (rating === 1) return 'Poor';
    return 'Select a rating';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/client/bookings');
  };

  const sentiment = getSentiment();

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] mb-6"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <h1 className="text-3xl mb-6">Leave a Review</h1>

            <div className="flex items-center gap-4 p-6 bg-[#F5F5F5] rounded-xl mb-8">
              <Avatar name={workerData.name} size="lg" verified />
              <div>
                <h3 className="mb-1">{workerData.name}</h3>
                <div className="text-sm text-gray-600 mb-1">{workerData.category}</div>
                <div className="text-sm text-gray-500">{workerData.jobTitle}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg mb-4">How would you rate your experience?</label>
                <div className="flex flex-col items-center gap-4 p-8 bg-[#F5F5F5] rounded-xl">
                  <StarRating
                    rating={rating}
                    maxRating={5}
                    size="lg"
                    interactive
                    onRatingChange={setRating}
                  />
                  <div className="text-2xl text-[#FF6B00]">{getRatingLabel()}</div>
                </div>
              </div>

              <div>
                <label className="block text-lg mb-4">Tell us more about your experience</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share details about your experience with this worker..."
                  className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 min-h-32 resize-y"
                  maxLength={500}
                  required
                />
                <div className="text-sm text-gray-500 mt-2">
                  {review.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-lg mb-4">Quick tags (select all that apply)</label>
                <div className="flex flex-wrap gap-3">
                  {quickTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {(rating > 0 || review.length > 0) && (
                <div className="bg-[#FFF0E6] rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FF6B00]">🤖</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">AI Sentiment Analysis</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Based on your rating and review, the overall sentiment is:
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{sentiment.emoji}</span>
                        <span className={`text-lg ${sentiment.color}`}>
                          {sentiment.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={rating === 0 || review.length === 0}
                  className="flex-1"
                >
                  Submit Review
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center flex-shrink-0">
                ℹ️
              </div>
              <div>
                <div className="mb-2">Your review helps other clients make informed decisions and helps workers improve their services.</div>
                <div>Reviews are public and cannot be edited once submitted.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}