import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, Loader2, Pencil } from 'lucide-react';
import { Button } from '../components/Button';
import WorkerServiceForm from '../components/WorkerServiceForm';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { describeApiError } from '../api/auth';
import { BACKEND_CATEGORIES } from '../api/categories';
import { CNIC_PATTERN, GENDERS, createWorkerBio, fetchWorkerBio, formatCnic, updateWorkerBio } from '../api/worker';

const controlClass = (error) =>
  `w-full px-4 py-3 bg-[#F5F5F5] border-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-4 ${
    error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
      : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
  }`;

function Field({ label, hint, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
        {label}
        {hint && <span className="text-gray-400 font-normal"> {hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

function validateBio(form) {
  const errors = {};
  if (!CNIC_PATTERN.test(form.cnic)) errors.cnic = 'Use the format 12345-1234567-1.';
  const age = Number(form.age);
  if (!(age >= 18 && age <= 100)) errors.age = 'Age must be between 18 and 100.';
  if (form.yearsOfExperience === '' || Number(form.yearsOfExperience) < 0) errors.yearsOfExperience = 'Enter your years of experience (0 if new).';
  if (!form.expertiseCategory) errors.expertiseCategory = 'Choose your main area of expertise.';
  return errors;
}

// Two steps, matching the backend: 1) the worker bio (WorkerBio), 2) the first service (WorkerService).
export default function BecomeWorker() {
  const navigate = useNavigate();
  const { user, roles, addRole, updateProfile } = useAuth();
  const { upsertWorkerProfile, postWorkerService } = useMarketplace();

  // The bio can only be created once; if it already exists (an earlier attempt), go straight to the service.
  const [step, setStep] = useState(user?.workerBioId ? 2 : 1);
  const [bioForm, setBioForm] = useState({
    cnic: '',
    age: '',
    yearsOfExperience: '',
    gender: '',
    expertiseCategory: user?.workerBio?.expertiseCategory || user?.workerBio?.expertiseCategories?.[0] || '',
    bio: user?.workerBio?.bio || '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Once the bio exists on the server, "About you" is an edit (PATCH) rather than a new bio.
  const hasSavedBio = Boolean(user?.workerBioId);

  if (roles.includes('worker')) {
    return <Navigate to="/worker/dashboard" replace />;
  }

  const setBio = (patch) => {
    setBioForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  // Back from the service step: reload what was saved so the client can correct it (a wrong category, say).
  const goBackToBio = async () => {
    setServerError('');
    setLoadError('');
    setErrors({});
    setStep(1);
    if (!user?.workerBioId) return;

    setLoadingSaved(true);
    try {
      setBioForm(await fetchWorkerBio(user.workerBioId));
    } catch (err) {
      setLoadError(describeApiError(err).form);
    } finally {
      setLoadingSaved(false);
    }
  };

  const submitBio = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const found = validateBio(bioForm);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setServerError('');
    setSubmitting(true);
    try {
      const created = hasSavedBio ? await updateWorkerBio(user.workerBioId, bioForm) : await createWorkerBio(bioForm);
      // Keep the CNIC out of local storage; only what step 2 needs is remembered.
      updateProfile({
        workerBioId: created.id,
        workerBio: {
          yearsOfExperience: Number(bioForm.yearsOfExperience) || 0,
          bio: bioForm.bio.trim(),
          expertiseCategory: bioForm.expertiseCategory,
        },
      });
      setStep(2);
    } catch (err) {
      const { form, fields } = describeApiError(err);
      setErrors({
        expertiseCategory: fields.expertise_categories,
        cnic: fields.cnic,
        age: fields.age,
        yearsOfExperience: fields.years_of_experience,
        gender: fields.gender,
        bio: fields.bio,
      });
      setServerError(form || 'Please fix the highlighted fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const postService = async (serviceForm) => {
    const service = await postWorkerService(serviceForm);
    const rate = Number(serviceForm.rate);

    // Mirror the worker locally so the listing, dashboard and hire flow keep working.
    upsertWorkerProfile(user.id, {
      name: user.name,
      city: serviceForm.city,
      category: serviceForm.category,
      experience: user.workerBio?.yearsOfExperience ?? (Number(bioForm.yearsOfExperience) || 0),
      bio: user.workerBio?.bio ?? bioForm.bio.trim(),
      rates: { day: rate, week: rate * 6, month: rate * 24 },
      verified: false,
    });
    addRole('worker');
    navigate('/worker/dashboard');
    return service;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-10 px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500! hover:text-[#FF6B00]! transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white">
              <BadgeCheck size={22} />
            </div>
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Become a Worker</h1>
          </div>
          <p className="text-gray-600">
            Add a worker profile to your account, <strong>{user?.name}</strong>. You keep the same login and can still hire
            as a client.
          </p>
        </div>

        <ol className="flex items-center gap-3 text-sm font-semibold" aria-label="Progress">
          {['About you', 'Your first service'].map((label, index) => {
            const number = index + 1;
            const active = step === number;
            const done = step > number;
            // A finished step can be reopened.
            const Wrapper = done ? 'button' : 'span';
            return (
              <li key={label} className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
                <Wrapper
                  {...(done ? { type: 'button', onClick: goBackToBio, 'aria-label': `Go back to ${label}` } : {})}
                  className={`flex items-center gap-2 ${done ? 'cursor-pointer group' : ''}`}
                >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    active || done ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {done ? '✓' : number}
                </span>
                <span className={`${active ? 'text-[#0A0A0A]' : 'text-gray-400'} ${done ? 'group-hover:text-[#FF6B00]' : ''}`}>{label}</span>
                </Wrapper>
                {number === 1 && <span className="w-8 h-px bg-gray-300" />}
              </li>
            );
          })}
        </ol>

        {step === 1 && loadingSaved ? (
          <div role="status" className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 flex items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-[#FF6B00]" />
            Loading your saved details...
          </div>
        ) : step === 1 && loadError ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4">
            <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
              {loadError}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="text-sm py-2.5 px-6 font-semibold" onClick={goBackToBio}>Try again</Button>
              <Button variant="ghost" className="text-sm py-2.5 px-6 font-semibold" onClick={() => { setLoadError(''); setStep(2); }}>
                Back to my service
              </Button>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={submitBio} noValidate className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">{hasSavedBio ? 'Edit your details' : 'Tell us about yourself'}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {hasSavedBio
                  ? 'Change anything that is wrong, then save. Nothing is posted as a service yet.'
                  : 'This is your worker profile. Your CNIC is kept private and used for verification only.'}
              </p>
            </div>

            {serverError && (
              <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="CNIC number" error={errors.cnic}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={bioForm.cnic}
                  onChange={(e) => setBio({ cnic: formatCnic(e.target.value) })}
                  placeholder="12345-1234567-1"
                  className={controlClass(errors.cnic)}
                />
              </Field>
              <Field label="Age" error={errors.age}>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={bioForm.age}
                  onChange={(e) => setBio({ age: e.target.value })}
                  className={controlClass(errors.age)}
                />
              </Field>
              <Field label="Years of experience" error={errors.yearsOfExperience}>
                <input
                  type="number"
                  min="0"
                  value={bioForm.yearsOfExperience}
                  onChange={(e) => setBio({ yearsOfExperience: e.target.value })}
                  className={controlClass(errors.yearsOfExperience)}
                />
              </Field>
              <Field label="Gender" hint="(optional)" error={errors.gender}>
                <select value={bioForm.gender} onChange={(e) => setBio({ gender: e.target.value })} className={controlClass(errors.gender)}>
                  {GENDERS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="What is your main area of expertise?" hint="(pick one)" error={errors.expertiseCategory}>
              <div role="radiogroup" aria-label="Main area of expertise" className="flex flex-wrap gap-2">
                {BACKEND_CATEGORIES.map((label) => {
                  const active = bioForm.expertiseCategory === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      onClick={() => setBio({ expertiseCategory: label })}
                      aria-checked={active}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="About you" hint="(optional)" error={errors.bio}>
              <textarea
                rows={4}
                value={bioForm.bio}
                onChange={(e) => setBio({ bio: e.target.value })}
                placeholder="A short description of your skills and past work..."
                className={controlClass(errors.bio)}
              />
            </Field>

            <div className={`pt-4 border-t flex items-center gap-3 ${hasSavedBio ? 'justify-between' : 'justify-end'}`}>
              {hasSavedBio && (
                <Button type="button" variant="ghost" className="px-5 py-3.5 font-semibold" onClick={() => setStep(2)} disabled={submitting}>
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="primary"
                aria-busy={submitting}
                className={`px-8 py-3.5 font-semibold gap-2 ${submitting ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? 'Saving...' : hasSavedBio ? 'Save changes & continue' : 'Save & continue'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#0A0A0A]">Post your first service</h2>
              <p className="text-sm text-gray-500 mt-1">Clients find you through your services. You can add more later.</p>
            </div>

            <div className="flex items-center justify-between gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm">
              <span className="text-gray-600">
                Your main expertise: <strong className="text-[#0A0A0A]">{bioForm.expertiseCategory || 'not set'}</strong>
              </span>
              <button
                type="button"
                onClick={goBackToBio}
                className="inline-flex items-center gap-1.5 font-semibold text-[#FF6B00] hover:underline cursor-pointer"
              >
                <Pencil className="w-3.5 h-3.5" />
                Change
              </button>
            </div>

            <WorkerServiceForm
              categories={BACKEND_CATEGORIES}
              defaultCategory={bioForm.expertiseCategory}
              defaultCity={user?.city || ''}
              submitLabel="Post service & finish"
              onPost={postService}
              onBack={goBackToBio}
            />
          </div>
        )}
      </div>
    </div>
  );
}
