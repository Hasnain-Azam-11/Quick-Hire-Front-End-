import client from './client';
import { fromBackendCategory, toBackendCategory } from './categories';

// worker.WorkerBio     (one per account, with ONE main expertise category):  POST /worker/workerBio/
// worker.WorkerService (many per worker):  POST /worker/workerService/  (needs the bio first)
export const WORKER_ENDPOINTS = {
  bio: '/worker/workerBio/',
  service: '/worker/workerService/',
};

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
