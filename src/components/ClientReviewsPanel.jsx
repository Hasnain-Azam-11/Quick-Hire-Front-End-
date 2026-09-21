import { useState } from 'react';
import { useClientData } from '../context/ClientDataContext';
import { StarRating } from './StarRating';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Plus, X, CheckCircle2 } from 'lucide-react';

export default function ClientReviewsPanel() {
  const { clientReviews, addReview } = useClientData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ workerName: '', jobTitle: '', rating: 5, comment: '' });
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(form);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsModalOpen(false);
      setForm({ workerName: '', jobTitle: '', rating: 5, comment: '' });
    }, 1500);
  };

  return (
    <div className="space-y-5 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0A0A0A]">Reviews you've written</h2>
          <p className="text-gray-600 text-sm mt-1">Feedback and ratings you have given to workers</p>
        </div>

        <Button
          variant="primary"
          className="text-xs py-2.5 px-5 font-semibold gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Review
        </Button>
      </div>

      <div className="space-y-4">
        {clientReviews.length === 0 && (
          <p className="text-sm text-gray-500 bg-white rounded-2xl border border-gray-100 p-6">
            You haven&apos;t reviewed anyone yet. Reviews you write help other clients choose.
          </p>
        )}
        {clientReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={rev.workerName} size="md" verified />
                <div>
                  <h3 className="font-semibold text-base text-[#0A0A0A]">{rev.workerName}</h3>
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

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative border border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0A0A0A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b pb-3">
              <h3 className="font-bold text-lg text-[#0A0A0A]">Write a Review</h3>
              <p className="text-xs text-gray-500">Submit rating and feedback for a service provider</p>
            </div>

            {successMsg ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-[#0A0A0A]">Review Submitted!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Worker Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Ahmed"
                    value={form.workerName}
                    onChange={(e) => setForm({ ...form, workerName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Job / Service Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Weekend Childcare"
                    value={form.jobTitle}
                    onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Rating</label>
                  <StarRating
                    rating={form.rating}
                    interactive
                    onRatingChange={(r) => setForm({ ...form, rating: r })}
                    size="lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Comment</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the quality of service, punctuality, and professionalism..."
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs py-2 px-4"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="text-xs py-2 px-6 font-semibold">
                    Submit Review
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
