import client from './client';
import { fromBackendCategory, toBackendCategory } from './categories';
import { mediaUrl } from '../utils/media';

// worker.WorkerBio     (one per account, with ONE main expertise category):  POST /worker/workerBio/
// worker.WorkerService (many per worker):  POST /worker/workerService/  (needs the bio first)
export const WORKER_ENDPOINTS = {
  bio: '/worker/workerBio/',
  service: '/worker/workerService/',
};

// Public, read-only list of worker services (joined with their WorkerBio), task 9 - no auth needed.
// One row per WorkerService, so a worker offering 2 categories shows up as 2 cards.
export const WORKER_LISTING_ENDPOINT = '/worker/browseworkers/';

export const GENDERS = [
  { value: '', label: 'Prefer not to say' },
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];

// "12345-1234567-1": keeps digits only and inserts the dashes while typing.
export function formatCnic(value) {
  const d = String(value).replace(/\D/g, '').slice(0, 13);
  return [d.slice(0, 5), d.slice(5, 12), d.slice(12)].filter(Boolean).join('-');
}

export const CNIC_PATTERN = /^\d{5}-\d{7}-\d$/;

const bioPayload = (form) => ({
  cnic: form.cnic,
  age: Number(form.age),
  years_of_experience: Number(form.yearsOfExperience) || 0,
  expertise_categories: toBackendCategory(form.expertiseCategory),
  gender: form.gender,
  bio: form.bio.trim(),
});

export async function createWorkerBio(form) {
  const { data } = await client.post(WORKER_ENDPOINTS.bio, bioPayload(form));
  return data;
}

// The bio can only be created once per account, so changing it afterwards is a PATCH on its id.
export async function updateWorkerBio(id, form) {
  const { data } = await client.patch(`${WORKER_ENDPOINTS.bio}${id}/`, bioPayload(form));
  return data;
}

// Partial PATCH /worker/workerBio/<id>/ - only sends the given fields (unlike updateWorkerBio,
// which always sends the full bio form and would overwrite fields a caller doesn't have, like
// cnic/age/gender on the Settings page, which only edits category/experience/bio).
export async function patchWorkerBio(id, fields) {
  const { data } = await client.patch(`${WORKER_ENDPOINTS.bio}${id}/`, fields);
  return data;
}

// GET /worker/workerBio/<id>/ -> the values for the "About you" form
export async function fetchWorkerBio(id) {
  const { data } = await client.get(`${WORKER_ENDPOINTS.bio}${id}/`);
  return {
    cnic: data.cnic || '',
    age: data.age == null ? '' : String(data.age),
    yearsOfExperience: data.years_of_experience == null ? '' : String(data.years_of_experience),
    gender: data.gender || '',
    expertiseCategory: fromBackendCategory(data.expertise_categories) || '',
    bio: data.bio || '',
  };
}

export async function createWorkerService(form) {
  const { data } = await client.post(WORKER_ENDPOINTS.service, {
    category: toBackendCategory(form.category),
    job_description: form.description.trim(),
    city: form.city,
    area: form.area.trim(),
    rate: Number(form.rate),
    is_available: form.isAvailable,
  });
  return data;
}

const unwrapList = (data) => (Array.isArray(data) ? data : data?.results ?? []);

// Backend WorkerService (public listing row) -> the shape WorkerCard / WorkerProfile / HireModal use.
// The model has no subcategories/skills list and one flat `rate` (no per-duration tiers, no price
// unit) - those mock-only fields are left empty/flat rather than guessed.
export function workerFromApi(api) {
  const rate = Number(api.rate) || 0;
  return {
    id: api.id,
    workerBioId: api.worker,
    userId: `worker-${api.worker}`,
    name: api.worker_username || 'Worker',
    category: fromBackendCategory(api.category),
    subcategories: [],
    skills: [],
    bio: api.job_description || '',
    city: api.city,
    area: api.area,
    experience: api.worker_years_of_experience || 0,
    rating: Number(api.worker_average_rating) || 0,
    reviewsCount: 0,
    verified: !!api.worker_is_verified,
    rate,
    // Not a real per-duration schedule - just prefills HireModal with the worker's one asking rate.
    rates: { hour: rate, day: rate, week: rate, month: rate },
    isOnDuty: !!api.is_available,
    picture: mediaUrl(api.worker_picture),
    completedJobs: 0,
  };
}

// GET /worker/browseworkers/ - public, unauthenticated, not paginated. `params` can carry any of
// the backend's filters: category, city, area, is_available, min_rate, max_rate, search.
export async function fetchWorkerListing(params = {}) {
  const { data } = await client.get(WORKER_LISTING_ENDPOINT, { params });
  return unwrapList(data).map(workerFromApi);
}

// GET /worker/workerService/ - requires auth, returns every worker's services (no "mine" filter on
// the backend), so the caller filters by `worker === their own workerBioId`.
export async function fetchAllWorkerServices() {
  const { data } = await client.get(WORKER_ENDPOINTS.service);
  return unwrapList(data);
}

export async function fetchMyWorkerServices(workerBioId) {
  const all = await fetchAllWorkerServices();
  return all.filter((s) => s.worker === workerBioId);
}

export async function updateWorkerService(id, form) {
  const { data } = await client.patch(`${WORKER_ENDPOINTS.service}${id}/`, {
    category: toBackendCategory(form.category),
    job_description: form.description.trim(),
    city: form.city,
    area: form.area.trim(),
    rate: Number(form.rate),
    is_available: form.isAvailable,
  });
  return data;
}
