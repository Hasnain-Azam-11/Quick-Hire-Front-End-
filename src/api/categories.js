// The website shows category names ("Event Staffing"); the Django models store short values ("event_staffing")
// in CATEGORY_CHOICES (jobs, services) and CATEGORY_EXPERTISE_CHOICES (the worker's expertise).
// Names go through `toBackendCategory` on the way out and `fromBackendCategory` on the way back in.
const PAIRS = [
  ['Driving', 'driving'],
  ['Moving', 'moving'],
  ['Handyman', 'handyman'],
  ['Caregiving', 'caregiving'],
  ['Event Staffing', 'event_staffing'],
  ['Cooking', 'cooking'],
  ['Construction', 'construction'],
  ['Security', 'security'],
  ['Gardening', 'gardening'],
  ['Tutoring', 'tutoring'],
  ['Beauty', 'beauty'],
  ['Cleaning', 'cleaning'],
];

// Names, as shown on the website.
export const BACKEND_CATEGORIES = PAIRS.map(([label]) => label);

// "Event Staffing" -> "event_staffing"
export const toBackendCategory = (label) => PAIRS.find(([l]) => l === label)?.[1] ?? label;

// "caregiving" -> "Caregiving". Rows saved before the values changed still hold the old ones ("Driving",
// "childcare", "eldercare"...), and anything unknown is shown as it is.
const LEGACY = new Set(['childcare', 'eldercare', 'Childcare', 'Elder Care', 'Child Care']);
export const fromBackendCategory = (value) =>
  LEGACY.has(value) ? 'Caregiving' : PAIRS.find(([l, v]) => v === value || l === value)?.[0] ?? value;
