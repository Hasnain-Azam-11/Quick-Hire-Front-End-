import { isOneOff } from './hiring';

// "How long do you need help?" only offers what makes sense for the kind of work:
//   oneOff    - the single-job choice, worded to suit the category (an event, a task or a session)
//   custom    - "for a set time": any number of hours / days / weeks / months / years
//   permanent - ongoing work with no end date
const EVENT = { type: 'event', title: 'For an event', text: 'A one-time occasion, like a wedding or a party' };
const task = (text) => ({ type: 'task', title: 'For a task', text });

export const DEFAULT_DURATION_RULES = { oneOff: EVENT, custom: true, permanent: true };

// Keyed by category value. Categories not listed here use the defaults above.
export const DURATION_RULES = {
  handyman: { oneOff: task('A single repair or fix'), custom: true, permanent: true },
  moving: { oneOff: task('A single move or lifting job'), custom: true, permanent: false },
  event_staffing: { oneOff: { ...EVENT, text: 'A wedding, party or any single event' }, custom: false, permanent: false },
  construction: { oneOff: task('A single job or piece of work'), custom: false, permanent: false },
  gardening: { oneOff: task('A one-time garden job'), custom: false, permanent: true },
  tutoring: {
    oneOff: { type: 'session', title: 'For a session', text: 'A single class or a trial lesson' },
    custom: true,
    permanent: false,
  },
  beauty: { oneOff: { ...EVENT, text: 'A bridal, party or special-occasion booking' }, custom: false, permanent: false },
  cleaning: { oneOff: task('A one-time clean'), custom: true, permanent: true },
  caregiving: { oneOff: { ...EVENT, text: 'A one-time need, like a party or a hospital visit' }, custom: true, permanent: true },
};

export const durationRulesFor = (categoryValue) => DURATION_RULES[categoryValue] || DEFAULT_DURATION_RULES;

// Is this duration one the category offers?
export function isDurationAllowed(rules, type) {
  if (type === 'permanent') return rules.permanent;
  if (isOneOff(type)) return type === rules.oneOff.type;
  return rules.custom;
}

// A duration the category does not offer falls back to its one-off choice.
export function sanitizeDuration(rules, { type, count }) {
  return isDurationAllowed(rules, type) ? { type, count } : { type: rules.oneOff.type, count: 1 };
}
