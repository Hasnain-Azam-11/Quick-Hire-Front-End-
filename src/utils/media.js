import client from '../api/client';

// Image fields (profile_picture, client_picture, worker_picture, ...) come back from the API as
// a relative path, e.g. /media/client_profiles/me.jpg - turn that into a URL an <img> can load.
export function mediaUrl(path) {
  if (!path) return undefined;
  return /^https?:/.test(path) ? path : `${client.defaults.baseURL}${path}`;
}
