import { CATEGORY_CHOICES, LEGACY_CATEGORY_KEYS, SUBCATEGORIES_MAP } from './categories';

// ===== Duration types =====
// `unit` is the pay unit used to quote a rate for that duration.
// Permanent hires are paid monthly.
const DAY = { value: 'day', label: 'Day', plural: 'Days', unit: 'day' };
const WEEK = { value: 'week', label: 'Week', plural: 'Weeks', unit: 'week' };
const MONTH = { value: 'month', label: 'Month', plural: 'Months', unit: 'month' };
const PERMANENT = { value: 'permanent', label: 'Permanent', plural: 'Permanent', unit: 'month' };
export const DURATION_TYPES = [DAY, WEEK, MONTH, PERMANENT];

// Job posting offers more ways to say how long the help is needed than the hire flow above:
// hours, years, permanent work, and "one-off" jobs. A one-off job has a single flat price and is called
// an event, a task or a session depending on the category. Years are paid per month.
const HOUR = { value: 'hour', label: 'Hour', plural: 'Hours', unit: 'hour' };
const YEAR = { value: 'year', label: 'Year', plural: 'Years', unit: 'month' };
const EVENT = { value: 'event', label: 'Event', plural: 'Event', unit: 'event' };
const TASK = { value: 'task', label: 'Task', plural: 'Task', unit: 'task' };
const SESSION = { value: 'session', label: 'Session', plural: 'Session', unit: 'session' };

export const ONE_OFF_TYPES = ['event', 'task', 'session'];
export const isOneOff = (type) => ONE_OFF_TYPES.includes(type);

// Every duration a job can have (used to read them back and to filter the job board).
export const JOB_DURATION_TYPES = [EVENT, TASK, SESSION, HOUR, DAY, WEEK, MONTH, YEAR, PERMANENT];

// The units a client can pick when they type their own length of time.
export const CUSTOM_DURATION_UNITS = [HOUR, DAY, WEEK, MONTH, YEAR];

// "Event date", "Task date"... for one-off jobs; "Start date" otherwise.
export const dateLabelFor = (type) => (isOneOff(type) ? `${type[0].toUpperCase()}${type.slice(1)} date` : 'Start date');

export function formatDuration(type, count = 1) {
  if (type === 'permanent') return 'Permanent';
  if (isOneOff(type)) return `${type[0].toUpperCase()}${type.slice(1)}`;
  const t = JOB_DURATION_TYPES.find((d) => d.value === type);
  if (!t) return '—';
  const n = Number(count) || 1;
  return `${n} ${n === 1 ? t.label : t.plural}`;
}

export function payUnitFor(type) {
  return JOB_DURATION_TYPES.find((d) => d.value === type)?.unit || 'day';
}

// Lets pay quoted per hour / day / week / month be compared on one scale (8-hour day, 6-day week, 24-day month).
export function dailyEquivalent(amount, unit) {
  const value = Number(amount) || 0;
  if (unit === 'hour') return value * 8;
  return value / (unit === 'week' ? 6 : unit === 'month' ? 24 : 1);
}

export function rateForDuration(rates, type) {
  return Number(rates?.[payUnitFor(type)]) || 0;
}

// The label for the price field: what the client offers, and per what.
export function priceLabel(type) {
  const unit = payUnitFor(type);
  return isOneOff(type) ? `Your offered price (PKR for the ${unit})` : `Your offered price (PKR / ${unit})`;
}

// Permanent hires quote a monthly salary and a one-off job has one flat price, so the "total" is just the rate.
// Years are priced per month.
export function calcTotal(rate, type, count) {
  const r = Number(rate) || 0;
  if (type === 'permanent' || isOneOff(type)) return r;
  if (type === 'year') return r * 12 * (Number(count) || 1);
  return r * (Number(count) || 1);
}

// "PKR 30,000" when a job has one price, "PKR 1,500 - 2,500" when it has a range.
export function formatPayRange(min, max) {
  return Number(min) === Number(max) ? formatPKR(min) : `${formatPKR(min)} - ${(Number(max) || 0).toLocaleString()}`;
}

export function formatPKR(amount) {
  return `PKR ${(Number(amount) || 0).toLocaleString()}`;
}

// ===== Categories =====
// Accepts either a category value ("event_staffing") or label ("Event Staffing"), and the names of
// categories that were merged into another one ("Childcare" finds Caregiving).
export function findCategory(any) {
  if (!any) return null;
  const typed = String(any).toLowerCase().replace(/_/g, ' ').trim();
  const s = (LEGACY_CATEGORY_KEYS[typed] || typed).replace(/_/g, ' ');
  return (
    CATEGORY_CHOICES.find(
      (c) => c.value.replace(/_/g, ' ') === s || c.label.toLowerCase() === s
    ) || null
  );
}

export function categoryLabel(any) {
  return findCategory(any)?.label || any || '';
}

export function subcategoriesFor(any) {
  const cat = findCategory(any);
  return cat ? SUBCATEGORIES_MAP[cat.value] || [] : [];
}

// ===== Dates =====
const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})/;

export function parseDate(value) {
  const m = ISO_DATE.exec(String(value));
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(value);
}

export function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// "Immediate" and other free text pass through untouched.
export function formatDate(value) {
  if (!value) return '—';
  const d = parseDate(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function endDateFor(startDate, type, count = 1) {
  if (type === 'permanent') return null;
  const d = parseDate(startDate);
  if (Number.isNaN(d.getTime())) return null;
  const n = Number(count) || 1;
  if (type === 'day') d.setDate(d.getDate() + n - 1);
  if (type === 'week') d.setDate(d.getDate() + n * 7 - 1);
  if (type === 'month') {
    d.setMonth(d.getMonth() + n);
    d.setDate(d.getDate() - 1);
  }
  if (type === 'year') {
    d.setFullYear(d.getFullYear() + n);
    d.setDate(d.getDate() - 1);
  }
  return d;
}

export function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diff)) return '';
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}
