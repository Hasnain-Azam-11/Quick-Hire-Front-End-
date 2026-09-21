import { useMarketplace } from './MarketplaceContext';

// Client-facing view over the shared marketplace store.
export function useClientData() {
  const m = useMarketplace();
  return {
    clientJobs: m.myJobs,
    jobsStatus: m.jobsStatus,
    refreshJobs: m.refreshJobs,
    workers: m.listedWorkers,
    clientReviews: m.clientReviews,
    sentOffers: m.sentOffers,
    postJob: m.createJob,
    acceptApplicant: m.acceptApplicant,
    sendOffer: m.createOffer,
    addReview: m.addReview,
  };
}
