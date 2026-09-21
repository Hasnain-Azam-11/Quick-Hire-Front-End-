import client from './client';
import { fromBackendCategory, toBackendCategory } from './categories';
import { isOneOff, payUnitFor } from '../constants/hiring';

// Client.JobPost: job_description, city, area, category, price, duration (free text), start_date, status.
// The model has no title, services or price unit, so those are folded into the text fields:
//   job_description = "Title: ...\nServices: A, B\n\n<description>"
//   duration        = "3 months" | "1 day" | "2 years" | "Event" | "Task" | "Session" | "Permanent"
//   price           = the amount offered per hour / day / week / month (the unit follows the duration;
//                     years are paid per month, an event has one flat price)
export const JOB_ENDPOINT = '/Client/jobs/';

const STATUS_LABELS = { open: 'Open', assigned: 'Assigned', completed: 'Completed', cancelled: 'Cancelled' };

export function encodeDuration(type, count) {
  if (type === 'permanent') return 'Permanent';
  if (isOneOff(type)) return `${type[0].toUpperCase()}${type.slice(1)}`;
  const n = Number(count) || 1;
  return `${n} ${type}${n === 1 ? '' : 's'}`;
}

export function decodeDuration(text) {
  const raw = String(text || '').trim();
  if (/^permanent$/i.test(raw)) return { durationType: 'permanent', durationCount: 1 };
  const oneOff = /^(event|task|session)$/i.exec(raw);
  if (oneOff) return { durationType: oneOff[1].toLowerCase(), durationCount: 1 };
  const match = /^(\d+)\s*(hour|day|week|month|year)s?$/i.exec(raw);
  if (match) return { durationType: match[2].toLowerCase(), durationCount: Number(match[1]) };
  return { durationType: null, durationCount: 1 };
}

export function encodeDescription({ title = '', services = [], description = '' }) {
  const lines = [];
  if (title.trim()) lines.push(`Title: ${title.trim()}`);
  if (services.length) lines.push(`Services: ${services.join(', ')}`);
  return lines.length ? `${lines.join('\n')}\n\n${description.trim()}` : description.trim();
}

export function decodeDescription(text) {
  let rest = String(text || '');
  let title = '';
  let services = [];

  const titleMatch = /^Title: (.*)\n/.exec(rest);
  if (titleMatch) {
    title = titleMatch[1];
    rest = rest.slice(titleMatch[0].length);
  }
  const servicesMatch = /^Services: (.*)\n/.exec(rest);
  if (servicesMatch) {
    services = servicesMatch[1].split(', ').filter(Boolean);
    rest = rest.slice(servicesMatch[0].length);
  }
  if ((titleMatch || servicesMatch) && rest.startsWith('\n')) rest = rest.slice(1);

  return { title, services, description: rest };
}

// Website form -> request body for POST /Client/jobs/
export function jobToApi(form) {
  return {
    job_description: encodeDescription(form),
    city: form.city,
    area: form.area.trim(),
    category: toBackendCategory(form.category),
    price: Number(form.price),
    duration: encodeDuration(form.durationType, form.durationCount),
    start_date: form.startDate,
  };
}

// Backend job -> the shape the pages use. `viewer` says which jobs belong to the signed-in user.
export function jobFromApi(api, viewer) {
  const { title, services, description } = decodeDescription(api.job_description);
  const { durationType, durationCount } = decodeDuration(api.duration);
  const price = Number(api.price) || 0;
  const isMine = viewer.clientProfileId != null && api.client === viewer.clientProfileId;

  return {
    id: api.id,
    isMine,
    clientId: isMine ? viewer.id : `client-${api.client}`,
    clientName: isMine ? viewer.name : `Client #${api.client}`,
    clientType: 'Client',
    title: title || (services.length ? `${services.join(' / ')} needed` : `${fromBackendCategory(api.category)} help needed`),
    services,
    category: fromBackendCategory(api.category),
    city: api.city,
    area: api.area,
    payMin: price,
    payMax: price,
    payUnit: durationType ? payUnitFor(durationType) : 'day',
    durationType,
    durationCount,
    durationText: api.duration,
    startDate: api.start_date,
    description,
    status: STATUS_LABELS[api.status] || 'Open',
    createdAt: api.created_at,
    assignedWorkerId: null,
    assignedWorker: '',
    hasReview: false,
  };
}

const unwrap = (data) => (Array.isArray(data) ? data : data?.results ?? []);

export async function fetchJobs() {
  const { data } = await client.get(JOB_ENDPOINT);
  return unwrap(data);
}

export async function postJob(form) {
  const { data } = await client.post(JOB_ENDPOINT, jobToApi(form));
  return data;
}
