// Where to send a user right after signing in / registering.
// A page a guest was bounced from (`from`) is honoured, except worker-only pages for someone
// without a worker profile. Otherwise workers land on their dashboard and everyone else on the home page.
export function resolveRedirect(user, from) {
  const isWorker = user.roles.includes('worker');

  if (from && typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')) {
    if (!from.startsWith('/worker/') || isWorker) return from;
  }
  return isWorker ? '/worker/dashboard' : '/';
}
