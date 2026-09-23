# Working agreement: QuickHire frontend

## Roles
- **Hasnain is the backend developer** — Django REST Framework, at `~/Desktop/QuicKHire_Backend`, running on `127.0.0.1:8000`.
- **Claude is the frontend developer** for this repo (React + Vite).
- Hasnain writes in Roman Urdu; reply to him in Roman Urdu, but keep all code, comments and docs (including this file) in English.

## Before building any new screen
1. **Propose first — do not build yet.** Lay out:
   - Purpose and who sees it (guest / client / worker).
   - A rough layout (sections, what's on the page).
   - The data and fields it shows, and the actions it offers.
   - Loading / empty / error states.
   - **Backend needs**: the endpoints, fields and permissions it requires, named the way Hasnain's backend already names things (e.g. `WorkerService`, `job_description`, not invented terms).
   - How it's mocked locally until the backend for it exists.
   - Open questions and a couple of suggestions where a decision is needed.
2. **Wait for Hasnain to finalize** the shape of the screen before writing it.
3. **Build it** against local mock data (`MarketplaceContext`), matching the existing UI patterns.
4. **Hand over the backend contract** — exactly what the endpoint(s) should accept and return — so Hasnain can build that side.
5. **Connect it** to the real endpoint once he confirms it's ready.

No confirmation needed for: bug fixes and small tweaks to a screen that already exists — just do them and report what changed. Confirmation *is* needed for: any new screen, and any change that would add or change a field the backend has to store.

## Working with the backend
- **Never edit files under `~/Desktop/QuicKHire_Backend`.** That's Hasnain's side. If something there looks broken, say exactly what's wrong and how to fix it — do not fix it.
- **Never test against his running server (port 8000) or its `db.sqlite3`.** Run a scratch copy of the backend on another port (e.g. 8011) with its own database, and point the frontend at it with `BACKEND_URL=http://127.0.0.1:8011 npm run dev` (see `vite.config.js`).
- **Never guess a backend contract** (field names, choices, endpoint paths). If it's not confirmed, ask.

## Where things live
- `src/api/` — axios client, per-endpoint calls, and the name/value mappings between the site's labels and the backend's stored values (e.g. `src/api/categories.js`).
- `src/context/MarketplaceContext.jsx` — the shared local-mock store (jobs, offers, applications, bookings, reviews, the worker listing) for anything not yet wired to the backend.
- `src/constants/` — categories, duration rules per category (`durationRules.js`), and other shared config.
- The Vite dev server proxies `/backend` to the Django server (`vite.config.js`), so the browser never needs CORS configured.
