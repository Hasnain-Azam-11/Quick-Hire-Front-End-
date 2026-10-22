import client from './client';

// Client.ClientProfile (+ the User fields folded in): GET/PATCH /Client/me/
export const ME_ENDPOINT = '/Client/me/';

export async function fetchMe() {
  const { data } = await client.get(ME_ENDPOINT);
  return data;
}

// PATCH /Client/me/ now works (fixed 2026-10-05). Not called from any screen yet - there is no
// edit-profile UI (Profile.jsx is still read-only); wire a Save button in once one exists.
export async function updateMe(payload) {
  const { data } = await client.patch(ME_ENDPOINT, payload);
  return data;
}

// Backend Me shape -> the fields the app's `user` object uses.
export function meFromApi(api) {
  const firstName = api.first_name || '';
  const lastName = api.last_name || '';
  return {
    clientProfileId: api.id,
    username: api.username,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    email: api.email || '',
    phone: api.phone_number || '',
    profilePicture: api.profile_picture || null,
    averageRating: Number(api.average_rating) || 0,
    joinedAt: api.created_at || null,
    // Present once the account has a worker bio (null otherwise) - confirms the worker role
    // independently of the local roles registry.
    workerBioId: api.worker_bio_id ?? null,
  };
}
