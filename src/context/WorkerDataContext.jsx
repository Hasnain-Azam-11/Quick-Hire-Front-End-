import { useMarketplace } from './MarketplaceContext';

// Worker-facing view over the shared marketplace store.
export function useWorkerData() {
  const m = useMarketplace();
  return {
    jobs: m.openJobs,
    jobsStatus: m.jobsStatus,
    refreshJobs: m.refreshJobs,
    applications: m.myApplications,
    schedule: m.mySchedule,
    reviews: m.workerReviews,
    offers: m.receivedOffers,
    pendingOfferCount: m.pendingOfferCount,
    profile: m.myWorkerProfile,
    applyForJob: m.applyToJob,
    respondToOffer: m.respondToOffer,
    setWorkerDuty: m.setWorkerDuty,
    services: m.myServices,
    postService: m.postWorkerService,
  };
}
