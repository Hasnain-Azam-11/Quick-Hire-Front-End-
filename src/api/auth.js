import client from './client';

export const ENDPOINTS = {
  register: '/Client/registration/',
  login: '/api-token-auth/',
};

// POST { username, email, password, first_name, last_name, phone_number } -> created client
// profile (no token). first_name/last_name are required by the backend as of Phase B task 6.

export async function registerClient(payload) {
  const { data } = await client.post(ENDPOINTS.register, payload);
  return data;
}

// POST { username, password } -> { token, client_profile_id, worker_Bio_id, is_worker } (task 7).
// Login is the only place that reliably tells us "is this account a worker" on a device/browser
// that has never seen this account before - the local registry (quickhire_users) doesn't travel.
export async function requestToken(credentials) {
  const { data } = await client.post(ENDPOINTS.login, credentials);
  return data;
}

// Backend login response -> the fields AuthContext needs.
// NOTE: the backend spells this `worker_Bio_id` (capital B) here but `worker_bio_id` (lowercase)
// on GET /Client/me/ - reading both until Hasnain picks one and fixes the other.
export function loginFromApi(data) {
  return {
    token: data.token,
    clientProfileId: data.client_profile_id ?? null,
    workerBioId: data.worker_Bio_id ?? data.worker_bio_id ?? null,
    isWorker: !!data.is_worker,
  };
}

// Turns an axios error into `{ form, fields }`: `form` is a message for the whole form,
// `fields` maps API field names (username, email, password, phone_number) to their first error.
export function describeApiError(error) {
  const result = { form: '', fields: {} };

  if (!error.response) {
    result.form =
      error.code === 'ECONNABORTED'
        ? 'The server took too long to respond. Please try again.'
        : "Can't reach the server. Please check your connection and that the backend is running.";
    return result;
  }

  const { status, data } = error.response;

  if (status === 400 && data && typeof data === 'object') {
    Object.entries(data).forEach(([key, value]) => {
      const message = Array.isArray(value) ? value[0] : typeof value === 'string' ? value : null;
      if (!message) return;
      if (key === 'non_field_errors' || key === 'detail') result.form = message;
      else result.fields[key] = message;
    });
    if (!result.form && Object.keys(result.fields).length === 0) {
      result.form = 'Please check your details and try again.';
    }
    return result;
  }

  if (status === 404) result.form = 'The server endpoint was not found (404). Please contact support.';
  else if (status >= 500) {
    // The dev proxy answers with an empty 500 when Django is not running; a real Django error has a body.
    const hasBody = data !== '' && data != null;
    result.form = hasBody
      ? `Something went wrong on the server (HTTP ${status}). Check the backend's console for the error.`
      : "The server isn't responding right now. Please make sure the backend is running and try again.";
  }
  else result.form = data?.detail || 'Something went wrong. Please try again.';

  return result;
}
