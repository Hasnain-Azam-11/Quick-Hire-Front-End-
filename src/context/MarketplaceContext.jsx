import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { describeApiError } from '../api/auth';
import { fetchJobs, jobFromApi, postJob } from '../api/jobs';
import { createWorkerService } from '../api/worker';
import { fromBackendCategory } from '../api/categories';
import {
  calcTotal,
  categoryLabel,
  formatDate,
  formatDuration,
  payUnitFor,
  timeAgo,
} from '../constants/hiring';

// Single shared store for everything clients and workers exchange.
// Entities are flat and reference each other by id (clientId, workerId, jobId),
// and the actions below are named after the REST resources they will become
// once the Django REST Framework backend exists.
const MarketplaceContext = createContext(null);

const STORAGE_KEY = 'quickhire_market_v1';
// Jobs live on the backend. Everything else here is still local mock data.
const COLLECTIONS = ['workers', 'applications', 'offers', 'bookings', 'reviews'];

const uid = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ===== Seed data =====
const ratesFromDay = (day) => ({ day, week: day * 6, month: day * 24 });

function buildSeed() {
  const worker = (id, name, category, subcategories, skills, city, experience, rating, reviewsCount, verified, day, extra = {}) => ({
    id,
    userId: id,
    name,
    category,
    subcategories,
    skills,
    bio: `${name} is a ${experience}-year ${category.toLowerCase()} professional serving clients across ${city}. Reliable, punctual and background checked.`,
    city,
    experience,
    rating,
    reviewsCount,
    verified,
    rates: ratesFromDay(day),
    isOnDuty: true,
    completedJobs: reviewsCount,
    earningsThisWeek: 0,
    cnicFileName: '',
    ...extra,
  });

  const workers = [
    worker('demo-worker', 'Fatima Ahmed', 'Caregiving', ['Full-time Nanny', 'Newborn Care'], ['Toddler Care', 'CPR Certified', 'Meal Prep'], 'Karachi', 3, 4.9, 24, true, 2000, {
      bio: 'Dedicated childcare & house help specialist with over 3 years of experience serving families in Karachi.',
      earningsThisWeek: 18500,
    }),
    worker('seed-w2', 'Ayesha Khan', 'Caregiving', ['Newborn Care', 'Hourly Babysitting'], ['Newborn Care', 'First Aid', 'Early Learning'], 'Islamabad', 5, 5.0, 38, true, 2400),
    worker('seed-w3', 'Ali Hassan', 'Event Staffing', ['Ushers', 'Setup Crew'], ['Guest Coordination', 'Valet Service', 'Setup'], 'Lahore', 4, 4.8, 19, true, 2200),
    worker('seed-w4', 'Muhammad Raza', 'Handyman', ['Painter', 'Carpenter'], ['Fixture Replacement', 'Painting', 'Carpentry'], 'Karachi', 6, 4.7, 42, false, 2800),
    worker('seed-w5', 'Tariq Mehmood', 'Driving', ['Personal Driver', 'Long Route Driving', 'Airport Transfers'], ['City Navigation', 'Automatic & Manual', 'Clean CNIC'], 'Lahore', 8, 4.9, 51, true, 2600),
    worker('seed-w6', 'Sadia Bibi', 'Cooking', ['Daily Home Cook'], ['Kitchen Deep Cleaning', 'Meal Prep', 'Home Cooking'], 'Islamabad', 4, 4.9, 29, true, 1800),
    worker('seed-w7', 'Bilal Ahmed', 'Handyman', ['Electrician', 'AC Repair'], ['Wiring', 'AC Servicing', 'Fixture Replacement'], 'Karachi', 7, 4.6, 33, true, 3000),
    worker('seed-w8', 'Nadia Iqbal', 'Tutoring', ['School Subjects', 'Quran Tutoring'], ['Primary Maths', 'English', 'Tajweed'], 'Lahore', 5, 4.9, 27, true, 1800),
    worker('seed-w9', 'Rashid Ali', 'Security', ['Guard Services', 'Night Watch'], ['Gate Security', 'Patrolling', 'Access Control'], 'Islamabad', 9, 4.7, 22, true, 2000),
    worker('seed-w12', 'Rukhsana Bibi', 'Caregiving', ['Elderly Companionship', 'Elderly Home Attendant', 'Medical Assistance'], ['Elder Care', 'Medication Reminders', 'Mobility Support'], 'Lahore', 8, 4.9, 44, true, 2200),
    worker('seed-w11', 'Farzana Noor', 'Cleaning', ['House Cleaning', 'Deep Cleaning'], ['Kitchen & Bathroom', 'Laundry', 'Sofa Cleaning'], 'Lahore', 5, 4.8, 31, true, 1800),
    worker('seed-w10', 'Hina Sheikh', 'Beauty', ['Salon at Home', 'Bridal Makeup'], ['Makeup', 'Hair Styling', 'Facials'], 'Karachi', 6, 4.8, 36, true, 3500),
  ];

  const review = (id, o) => ({ clientId: null, workerId: null, ...o, id });
  const reviews = [
    review('r-301', { workerId: 'demo-worker', workerName: 'Fatima Ahmed', clientId: 'seed-c1', clientName: 'Sadia Malik', jobTitle: 'Childcare & House Support', rating: 5, date: '2026-04-28', comment: 'Fatima was incredible with our two toddlers! Punctual, extremely gentle, and responsible. Highly recommended!' }),
    review('r-302', { workerId: 'demo-worker', workerName: 'Fatima Ahmed', clientId: 'seed-c2', clientName: 'Usman Farooq', jobTitle: 'Birthday Party Event Assistant', rating: 5, date: '2026-04-15', comment: 'Managed 10+ kids smoothly at our party. Kept them engaged with games and ensured complete safety.' }),
    review('r-303', { workerId: 'demo-worker', workerName: 'Fatima Ahmed', clientId: 'seed-c3', clientName: 'Ayesha Khan', jobTitle: 'Weekend Babysitting', rating: 4, date: '2026-03-30', comment: 'Very pleasant and trustworthy. Will definitely hire again.' }),
    review('r-401', { workerId: 'seed-w6', workerName: 'Sadia Bibi', clientId: 'demo-client', clientName: 'Ali Raza', jobTitle: 'Daily House Help & Deep Kitchen Clean', rating: 5, date: '2026-04-28', comment: 'Sadia was incredibly thorough and polite! Kept everything sparkling clean and completed all tasks efficiently.' }),
    review('r-402', { workerId: 'seed-w3', workerName: 'Ali Hassan', clientId: 'demo-client', clientName: 'Ali Raza', jobTitle: 'Corporate Dinner Event Assistance', rating: 5, date: '2026-04-10', comment: 'Great attitude, handled guest arrivals smoothly without any supervision needed.' }),
  ];

  return { workers, applications: [], offers: [], bookings: [], reviews, jobState: {}, services: [] };
}

function loadDb() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && COLLECTIONS.every((key) => Array.isArray(saved[key]))) {
      // Childcare and Elder Care were merged into Caregiving: move data saved under the old names.
      return {
        jobState: {},
        services: [],
        ...saved,
        workers: saved.workers.map((w) => ({ ...w, category: fromBackendCategory(w.category) })),
      };
    }
  } catch (e) {
    console.error('Error loading marketplace data from localStorage:', e);
  }
  return buildSeed();
}

const blankProfile = (userId) => ({
  id: userId,
  userId,
  name: '',
  category: '',
  subcategories: [],
  skills: [],
  bio: '',
  city: '',
  experience: 0,
  rates: {},
  isOnDuty: true,
  verified: false,
  rating: 5,
  reviewsCount: 0,
  completedJobs: 0,
  earningsThisWeek: 0,
  cnicFileName: '',
});

function bookingFrom(fields) {
  return {
    id: uid('b'),
    jobId: null,
    offerId: null,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    ...fields,
  };
}

export function MarketplaceProvider({ children }) {
  const { user, updateProfile } = useAuth();
  const [db, setDb] = useState(loadDb);
  const [apiJobs, setApiJobs] = useState([]);
  const [jobsStatus, setJobsStatus] = useState({ state: 'loading', error: '' });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Error saving marketplace data to localStorage:', e);
    }
  }, [db]);

  const meId = user?.id ?? null;
  const clientProfileId = user?.clientProfileId ?? null;

  // Every job on the backend (GET /Client/jobs/). Loaded when someone signs in; `refreshJobs` retries.
  const loadJobs = useCallback(async () => {
    setJobsStatus({ state: 'loading', error: '' });
    try {
      setApiJobs(await fetchJobs());
      setJobsStatus({ state: 'ready', error: '' });
    } catch (err) {
      setJobsStatus({ state: 'error', error: describeApiError(err).form });
    }
  }, []);

  useEffect(() => {
    if (!meId) return undefined;
    let cancelled = false;
    fetchJobs()
      .then((list) => {
        if (cancelled) return;
        setApiJobs(list);
        setJobsStatus({ state: 'ready', error: '' });
      })
      .catch((err) => {
        if (!cancelled) setJobsStatus({ state: 'error', error: describeApiError(err).form });
      });
    return () => {
      cancelled = true;
    };
  }, [meId]);

  // Backend jobs in the shape the pages use, plus local-only state (assigned worker, reviewed).
  const jobs = useMemo(() => {
    if (!user) return [];
    return apiJobs.map((api) => {
      const job = jobFromApi(api, { id: user.id, name: user.name, clientProfileId });
      const local = db.jobState[job.id];
      return local ? { ...job, ...local } : job;
    });
  }, [apiJobs, user, clientProfileId, db.jobState]);

  // ===== Actions =====
  const upsertWorkerProfile = (userId, data) => {
    setDb((prev) => {
      const existing = prev.workers.find((w) => w.id === userId);
      const merged = { ...(existing || blankProfile(userId)), ...data, id: userId, userId };
      if (data.rates) merged.rates = { ...(existing?.rates || {}), ...data.rates };
      if (data.category) merged.category = categoryLabel(data.category);
      if (data.subcategories && !data.skills) merged.skills = data.subcategories;
      return {
        ...prev,
        workers: existing ? prev.workers.map((w) => (w.id === userId ? merged : w)) : [...prev.workers, merged],
      };
    });
  };

  const setWorkerDuty = (userId, isOnDuty) => upsertWorkerProfile(userId, { isOnDuty });

  // POST /Client/jobs/. Rejects with the axios error so the form can show the server's messages.
  const createJob = async (data) => {
    const created = await postJob(data);
    setApiJobs((prev) => [created, ...prev]);
    // The job says which client profile it belongs to: that is how we learn "our" id after a fresh sign-in.
    if (created.client != null && created.client !== clientProfileId) {
      updateProfile({ clientProfileId: created.client });
    }
    return created;
  };

  // POST /worker/workerService/, then remember it here (the list endpoint doesn't say who owns which).
  const postWorkerService = async (form) => {
    const created = await createWorkerService(form);
    const service = { ...created, category: fromBackendCategory(created.category), workerUserId: meId };
    setDb((prev) => ({ ...prev, services: [service, ...prev.services] }));
    return created;
  };

  const applyToJob = (jobId, proposedRate) => {
    const target = jobs.find((j) => j.id === jobId);
    const profile = db.workers.find((w) => w.id === meId);
    if (!user || !target || !profile || target.status !== 'Open' || target.isMine) return;
    if (db.applications.some((a) => a.jobId === jobId && a.workerId === meId)) return;

    const application = {
      id: uid('app'),
      jobId,
      workerId: meId,
      workerName: profile.name || user.name,
      proposedRate: Number(proposedRate) || Number(profile.rates?.[target.payUnit]) || target.payMin,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };
    setDb((prev) => ({ ...prev, applications: [application, ...prev.applications] }));
  };

  const acceptApplicant = (jobId, applicationId) => {
    const target = jobs.find((j) => j.id === jobId);
    if (!target) return;

    setDb((prev) => {
      const chosen = prev.applications.find((a) => a.id === applicationId && a.jobId === jobId);
      if (!chosen || target.status !== 'Open') return prev;

      const created = bookingFrom({
        source: 'job',
        jobId,
        clientId: target.clientId,
        clientName: target.clientName,
        workerId: chosen.workerId,
        workerName: chosen.workerName,
        title: target.title,
        category: target.category,
        city: target.city,
        area: target.area,
        durationType: target.durationType,
        durationCount: target.durationCount,
        startDate: target.startDate,
        rate: chosen.proposedRate,
        payUnit: target.payUnit,
        total: calcTotal(chosen.proposedRate, target.durationType, target.durationCount),
      });

      return {
        ...prev,
        jobState: {
          ...prev.jobState,
          [jobId]: {
            ...prev.jobState[jobId],
            status: 'Assigned',
            assignedWorkerId: chosen.workerId,
            assignedWorker: chosen.workerName,
          },
        },
        applications: prev.applications.map((a) => {
          if (a.jobId !== jobId) return a;
          return { ...a, status: a.id === applicationId ? 'accepted' : 'declined' };
        }),
        bookings: [created, ...prev.bookings],
      };
    });
  };

  const createOffer = (workerId, data) => {
    const target = db.workers.find((w) => w.id === workerId);
    if (!user || !target || target.userId === user.id) return null;

    const durationType = data.durationType || 'day';
    const durationCount = durationType === 'permanent' ? 1 : Number(data.durationCount) || 1;
    const rate = Number(data.rate) || 0;
    const offer = {
      id: uid('offer'),
      clientId: user.id,
      clientName: user.name,
      city: user.city || '',
      workerId,
      workerName: target.name,
      category: target.category,
      durationType,
      durationCount,
      startDate: data.startDate || 'Immediate',
      rate,
      payUnit: payUnitFor(durationType),
      total: calcTotal(rate, durationType, durationCount),
      note: data.note || '',
      status: 'pending',
      bookingId: null,
      createdAt: new Date().toISOString(),
    };
    setDb((prev) => ({ ...prev, offers: [offer, ...prev.offers] }));
    return offer;
  };

  const respondToOffer = (offerId, decision) => {
    setDb((prev) => {
      const offer = prev.offers.find((o) => o.id === offerId);
      if (!offer || offer.status !== 'pending') return prev;

      if (decision !== 'accepted') {
        return { ...prev, offers: prev.offers.map((o) => (o.id === offerId ? { ...o, status: 'declined' } : o)) };
      }

      const created = bookingFrom({
        source: 'offer',
        offerId,
        clientId: offer.clientId,
        clientName: offer.clientName,
        workerId: offer.workerId,
        workerName: offer.workerName,
        title: `${offer.category} Hire`,
        category: offer.category,
        city: offer.city,
        area: '',
        durationType: offer.durationType,
        durationCount: offer.durationCount,
        startDate: offer.startDate,
        rate: offer.rate,
        payUnit: offer.payUnit,
        total: offer.total,
        notes: offer.note,
      });

      return {
        ...prev,
        offers: prev.offers.map((o) => (o.id === offerId ? { ...o, status: 'accepted', bookingId: created.id } : o)),
        bookings: [created, ...prev.bookings],
      };
    });
  };

  const addReview = (data) => {
    if (!user) return;
    const rating = Number(data.rating) || 5;
    setDb((prev) => {
      const reviewed =
        prev.workers.find((w) => w.id === data.workerId) ||
        prev.workers.find((w) => w.name.toLowerCase() === String(data.workerName || '').trim().toLowerCase());

      const newReview = {
        id: uid('r'),
        clientId: user.id,
        clientName: user.name,
        workerId: reviewed?.id ?? null,
        workerName: data.workerName || reviewed?.name || 'Worker',
        jobTitle: data.jobTitle || 'Service Contract',
        rating,
        date: new Date().toISOString(),
        comment: data.comment,
      };

      return {
        ...prev,
        reviews: [newReview, ...prev.reviews],
        jobState: data.jobId
          ? { ...prev.jobState, [data.jobId]: { ...prev.jobState[data.jobId], hasReview: true } }
          : prev.jobState,
        workers: reviewed
          ? prev.workers.map((w) => {
              if (w.id !== reviewed.id) return w;
              const count = w.reviewsCount + 1;
              const avg = Math.round(((w.rating * w.reviewsCount + rating) / count) * 10) / 10;
              return { ...w, reviewsCount: count, rating: avg };
            })
          : prev.workers,
      };
    });
  };

  // ===== Derived views =====
  const views = useMemo(() => {
    const workerById = new Map(db.workers.map((w) => [w.id, w]));
    const jobById = new Map(jobs.map((j) => [j.id, j]));
    const jobDuration = (j) => (j.durationType ? formatDuration(j.durationType, j.durationCount) : j.durationText);

    const applicantView = (a) => {
      const w = workerById.get(a.workerId);
      return {
        id: a.id,
        workerId: a.workerId,
        workerName: a.workerName,
        rating: w?.rating ?? 5,
        proposedRate: a.proposedRate,
        experience: `${w?.experience ?? 0} yrs`,
        category: w?.category ?? '',
        status: a.status,
      };
    };

    const jobView = (j) => {
      const applicants = db.applications.filter((a) => a.jobId === j.id).map(applicantView);
      return {
        ...j,
        duration: jobDuration(j),
        postedAt: timeAgo(j.createdAt),
        applicants,
        applicationsCount: applicants.length,
      };
    };

    const profileFallback =
      user?.roles?.includes('worker') && !workerById.has(user.id)
        ? {
            ...blankProfile(user.id),
            name: user.name,
            city: user.city || '',
            category: categoryLabel(user.category),
            experience: Number(user.experience) || 0,
            bio: user.bio || '',
          }
        : null;
    const myWorkerProfile = user?.roles?.includes('worker') ? workerById.get(user.id) || profileFallback : null;

    const myApplicationsRaw = db.applications.filter((a) => a.workerId === meId);
    const appliedJobIds = new Set(myApplicationsRaw.map((a) => a.jobId));

    const scheduleView = (b) => ({
      id: b.id,
      bookingId: b.id,
      jobTitle: b.title,
      clientName: b.clientName,
      startDate: b.startDate,
      durationType: b.durationType,
      durationCount: b.durationCount,
      date: formatDate(b.startDate),
      time: formatDuration(b.durationType, b.durationCount),
      status: b.status,
      location: [b.area, b.city].filter(Boolean).join(', ') || '—',
      pay: `PKR ${(Number(b.rate) || 0).toLocaleString()} / ${b.payUnit}`,
      rate: b.rate,
      payUnit: b.payUnit,
      total: b.total,
    });

    const reviewView = (r) => ({ ...r, date: formatDate(r.date) });
    const receivedOffers = db.offers.filter((o) => o.workerId === meId);

    return {
      myWorkerProfile,
      listedWorkers: db.workers.filter((w) => w.isOnDuty && w.category && w.id !== meId),
      myJobs: jobs.filter((j) => j.isMine).map(jobView),
      openJobs: jobs
        .filter((j) => j.status === 'Open' && !j.isMine)
        .map((j) => ({ ...jobView(j), applied: appliedJobIds.has(j.id) })),
      myApplications: myApplicationsRaw.map((a) => {
        const j = jobById.get(a.jobId);
        return {
          id: a.id,
          jobId: a.jobId,
          title: j?.title ?? 'Job no longer available',
          clientName: j?.clientName ?? '—',
          category: j?.category ?? '',
          city: j?.city ?? '',
          payMin: j?.payMin ?? 0,
          payMax: j?.payMax ?? 0,
          payUnit: j?.payUnit ?? 'day',
          duration: j ? jobDuration(j) : '—',
          startDate: j?.startDate ?? '',
          proposedRate: a.proposedRate,
          status: a.status,
          appliedDate: formatDate(a.appliedAt),
        };
      }),
      mySchedule: db.bookings.filter((b) => b.workerId === meId).map(scheduleView),
      receivedOffers,
      pendingOfferCount: receivedOffers.filter((o) => o.status === 'pending').length,
      sentOffers: db.offers.filter((o) => o.clientId === meId),
      clientReviews: db.reviews.filter((r) => r.clientId === meId).map(reviewView),
      workerReviews: db.reviews.filter((r) => r.workerId === meId).map(reviewView),
      getWorker: (id) => workerById.get(id) || null,
      getWorkerReviews: (id) => db.reviews.filter((r) => r.workerId === id).map(reviewView),
      myServices: db.services.filter((s) => s.workerUserId === meId),
      getBooking: (id) => db.bookings.find((b) => b.id === id) || null,
    };
  }, [db, jobs, user, meId]);

  return (
    <MarketplaceContext.Provider
      value={{
        ...views,
        jobsStatus,
        refreshJobs: loadJobs,
        postWorkerService,
        upsertWorkerProfile,
        setWorkerDuty,
        createJob,
        applyToJob,
        acceptApplicant,
        createOffer,
        respondToOffer,
        addReview,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
