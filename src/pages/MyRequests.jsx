import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useClientData } from '../context/ClientDataContext';
import { StatusPill } from '../components/StatusPill';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import PageShell from '../components/PageShell';
import JobsStatusNotice from '../components/JobsStatusNotice';
import { ChevronDown, ChevronUp, UserCheck, Star, X, CheckCircle2, Briefcase, Wallet2 } from 'lucide-react';
import { formatDate, formatDuration, formatPayRange, formatPKR, timeAgo } from '../constants/hiring';
import { useMarketplace } from '../context/MarketplaceContext';

export default function MyRequests() {
  const { clientJobs, jobsStatus, refreshJobs, sentOffers, acceptApplicant, addReview } = useClientData();
  const { myBookingsAsClient } = useMarketplace();
  const bookingById = new Map(myBookingsAsClient.map((b) => [b.id, b]));

  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'offers' ? 'offers' : 'jobs');
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Review Modal State
  const [reviewJob, setReviewJob] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const toggleExpand = (jobId) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewJob) {
      addReview({
        jobId: reviewJob.id,
        workerName: reviewJob.assignedWorker || 'Assigned Worker',
        jobTitle: reviewJob.title,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setReviewJob(null);
        setReviewForm({ rating: 5, comment: '' });
      }, 1500);
    }
  };

  return (
    <PageShell>
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">My Requests</h1>
        <p className="text-gray-600 mt-1">Track the jobs you have posted, the workers who applied, and the hire requests you have sent</p>
      </div>

      <div className="flex bg-gray-200 p-1 rounded-xl w-fit">
        {[
          { id: 'jobs', label: `Job Posts (${clientJobs.length})` },
          { id: 'offers', label: `Hire Requests (${sentOffers.length})` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              tab === t.id ? 'bg-white text-[#0A0A0A] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'offers' && (
        <div className="space-y-4">
          {sentOffers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
              <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-gray-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">No Hire Requests Yet</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Find a worker you like and hire them for a day, a week, a month or permanently.
              </p>
              <Link to="/workers">
                <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold mt-2">Browse Workers</Button>
              </Link>
            </div>
          ) : (
            sentOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Link to={`/worker-profile/${offer.workerId}`} className="text-lg font-bold text-[#0A0A0A] hover:text-[#FF6B00] transition-colors">
                        {offer.workerName}
                      </Link>
                      <StatusPill status={offer.status}>{offer.status.toUpperCase()}</StatusPill>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CategoryChip variant="orange">{offer.category}</CategoryChip>
                      <span>• Sent {timeAgo(offer.createdAt)}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-[#FF6B00] text-sm">{formatPKR(offer.rate)} / {offer.payUnit}</div>
                    <div className="text-[11px] text-gray-400">
                      {offer.durationType === 'permanent' ? 'Monthly salary' : `Total ${formatPKR(offer.total)}`}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Duration: <strong className="text-gray-800">{formatDuration(offer.durationType, offer.durationCount)}</strong></span>
                    <span>Start: <strong className="text-gray-800">{formatDate(offer.startDate)}</strong></span>
                  </div>
                  {offer.status === 'accepted' && offer.bookingId && (
                    <div className="flex items-center gap-2">
                      <Link to={`/bookings/${offer.bookingId}`} className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                        Accepted, view booking
                      </Link>
                      {bookingById.get(offer.bookingId)?.paymentStatus === 'paid' ? (
                        <StatusPill status="confirmed">PAID</StatusPill>
                      ) : (
                        <Link
                          to={`/checkout/${offer.bookingId}`}
                          className="inline-flex items-center gap-1 text-[#FF6B00]! font-semibold bg-[#FFF0E6] px-3 py-1 rounded-full"
                        >
                          <Wallet2 className="w-3.5 h-3.5" />
                          Pay Now
                        </Link>
                      )}
                    </div>
                  )}
                  {offer.status === 'pending' && <span className="text-[#F59E0B] font-medium">Waiting for the worker's reply</span>}
                  {offer.status === 'declined' && <span className="text-[#EF4444] font-medium">The worker declined this request</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'jobs' && <JobsStatusNotice status={jobsStatus} onRetry={refreshJobs} />}

      {tab === 'jobs' && jobsStatus.state === 'ready' && clientJobs.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
          <h3 className="text-lg font-bold text-[#0A0A0A]">No Job Posts Yet</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Can't find the right worker? Post what you need and workers will apply.
          </p>
          <Link to="/post-job">
            <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold mt-2">Post a Job</Button>
          </Link>
        </div>
      )}

      <div className={`space-y-4 ${tab === 'jobs' ? '' : 'hidden'}`}>
        {clientJobs.map((job) => {
          const isExpanded = expandedJobId === job.id;
          const applicantCount = job.applicants?.length || 0;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all"
            >
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-xl font-bold text-[#0A0A0A]">{job.title}</h2>
                      <StatusPill status={job.status === 'Open' ? 'active' : job.status === 'Assigned' ? 'pending' : 'completed'}>
                        {job.status.toUpperCase()}
                      </StatusPill>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CategoryChip variant="orange">{job.category}</CategoryChip>
                      <span>• {job.city}, {job.area}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-left sm:text-right">
                      <div className="font-bold text-[#FF6B00] text-sm">
                        {formatPayRange(job.payMin, job.payMax)}
                      </div>
                      <div className="text-[11px] text-gray-400">Rate / {job.payUnit}</div>
                    </div>

                    {job.status === 'Open' && (
                      <Button
                        variant="outline"
                        className="text-xs py-2 px-4 gap-1.5"
                        onClick={() => toggleExpand(job.id)}
                      >
                        <span>{applicantCount} Applicant(s)</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    )}

                    {job.status === 'Completed' && (
                      <Button
                        variant={job.hasReview ? 'disabled' : 'primary'}
                        disabled={job.hasReview}
                        className="text-xs py-2 px-4 gap-1.5"
                        onClick={() => setReviewJob(job)}
                      >
                        <Star className="w-3.5 h-3.5" />
                        {job.hasReview ? 'Reviewed' : 'Leave a Review'}
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-600">{job.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>Duration: <strong className="text-gray-800">{job.duration}</strong></span>
                    <span>Start: <strong className="text-gray-800">{formatDate(job.startDate)}</strong></span>
                  </div>

                  {job.assignedWorker && (
                    <div className="text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full text-xs">
                      Assigned Worker: {job.assignedWorker}
                    </div>
                  )}
                </div>
              </div>

              {/* Expandable Applicants Section */}
              {isExpanded && (
                <div className="bg-[#F5F5F5] p-6 border-t border-gray-200 space-y-4">
                  <h3 className="font-bold text-sm text-[#0A0A0A]">Applicants for this Position</h3>

                  {applicantCount === 0 ? (
                    <p className="text-xs text-gray-500">No applicants yet. Workers will apply shortly!</p>
                  ) : (
                    <div className="space-y-3">
                      {job.applicants.map((applicant) => (
                        <div
                          key={applicant.id}
                          className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar name={applicant.workerName} size="md" verified />
                            <div>
                              <h4 className="font-semibold text-sm text-[#0A0A0A]">{applicant.workerName}</h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <StarRating rating={Math.floor(applicant.rating)} size="sm" />
                                <span>{applicant.rating}</span>
                                <span>• {applicant.experience} exp</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right text-xs">
                              <span className="text-gray-400 block">Proposed Rate</span>
                              <span className="font-bold text-[#FF6B00] text-sm">PKR {applicant.proposedRate.toLocaleString()} / {job.payUnit}</span>
                            </div>

                            <Button
                              variant="primary"
                              className="text-xs py-2 px-5 font-semibold gap-1.5"
                              onClick={() => acceptApplicant(job.id, applicant.id)}
                            >
                              <UserCheck className="w-4 h-4" />
                              Accept & Assign
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {reviewJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative border border-gray-200">
            <button
              type="button"
              onClick={() => setReviewJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0A0A0A]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b pb-4">
              <h3 className="font-bold text-lg text-[#0A0A0A]">Leave a Review</h3>
              <p className="text-xs text-gray-500">Worker: <strong className="text-gray-800">{reviewJob.assignedWorker || 'Worker'}</strong> ({reviewJob.title})</p>
            </div>

            {reviewSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg text-[#0A0A0A]">Review Submitted!</h4>
                <p className="text-xs text-gray-500">Thank you for helping keep QuickHire safe and transparent.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Rating</label>
                  <StarRating
                    rating={reviewForm.rating}
                    interactive
                    onRatingChange={(r) => setReviewForm({ ...reviewForm, rating: r })}
                    size="lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Feedback Comment</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share your experience working with this service provider..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs py-2 px-4"
                    onClick={() => setReviewJob(null)}
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
    </PageShell>
  );
}
