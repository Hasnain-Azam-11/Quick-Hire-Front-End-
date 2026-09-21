// A guest fills in the request form, then has to sign up. The draft waits in
// sessionStorage so the form is still filled in when they come back.
const KEY = 'quickhire_job_draft';

export function saveJobDraft(categoryValue, form) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ categoryValue, form }));
  } catch {
    // storage unavailable: the guest just has to re-enter the form
  }
}

export function loadJobDraft(categoryValue) {
  try {
    const draft = JSON.parse(sessionStorage.getItem(KEY));
    return draft && draft.categoryValue === categoryValue ? draft.form : null;
  } catch {
    return null;
  }
}

export function clearJobDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}
