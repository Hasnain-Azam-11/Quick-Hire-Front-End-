import client from './client';

export const ENDPOINTS = {
  register: '/Client/registration/',
  login: '/api-token-auth/',
};

// POST { username, email, password, phone_number } -> created client profile (no token)
export async function registerClient(payload) {
  const { data } = await client.post(ENDPOINTS.register, payload);
  return data;
}

// POST { username, password } -> { token }
export async function requestToken(credentials) {
  const { data } = await client.post(ENDPOINTS.login, credentials);
  return data.token;
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
