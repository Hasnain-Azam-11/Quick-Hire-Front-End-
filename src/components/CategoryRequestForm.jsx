import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { describeApiError } from '../api/auth';
import { CITIES } from '../constants/categories';
import DurationPicker from './DurationPicker';
import { dateLabelFor, isOneOff, priceLabel, subcategoriesFor, todayISO } from '../constants/hiring';
import { durationRulesFor, sanitizeDuration } from '../constants/durationRules';
import { clearJobDraft, loadJobDraft, saveJobDraft } from '../utils/jobDraft';

const EMPTY_FORM = {
  services: [],
  description: '',
  city: '',
  area: '',
  durationType: 'event',
  durationCount: 1,
  startDate: '',
  price: '',
};

const controlClass = (error) =>
  `w-full px-4 py-3 bg-[#F5F5F5] border-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-4 ${
    error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
      : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
  }`;

function Field({ label, hint, error, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
        {label}
        {hint && <span className="text-gray-400 font-normal"> {hint}</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (form.description.trim().length < 10) errors.description = 'Tell us a little more (at least 10 characters).';
  if (!form.city) errors.city = 'Choose your city.';
  if (!form.startDate) errors.startDate = 'Pick a start date.';
  if (!isOneOff(form.durationType) && form.durationType !== 'permanent') {
    const n = Number(form.durationCount);
    if (!Number.isInteger(n) || n < 1) errors.durationCount = 'Enter a whole number, 1 or more.';
  }
  if (!(Number(form.price) > 0)) errors.price = 'Enter the price you are offering.';
  if (!form.area.trim()) errors.area = 'Enter your area or neighbourhood.';
  return errors;
}

// Opens straight from a category card: asks the client what help they need,
// then posts it as a job that workers in this category can apply to.
export default function CategoryRequestForm({ category, onBrowseWorkers }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createJob } = useMarketplace();

  const [restored] = useState(() => loadJobDraft(category.value));
  const rules = durationRulesFor(category.value);
  const [form, setForm] = useState(() => {
    // The first choice for this category is the starting point; a saved draft keeps what was typed
    // (unless it used a length this category doesn't offer).
    const base = restored ?? { ...EMPTY_FORM, city: user?.city || '', durationType: rules.oneOff.type };
    const duration = sanitizeDuration(rules, { type: base.durationType, count: base.durationCount });
    return { ...base, durationType: duration.type, durationCount: duration.count };
  });
  const [errors, setErrors] = useState({});
  const [posted, setPosted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const services = subcategoriesFor(category.value);

  const set = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const toggleService = (name) =>
    set({ services: form.services.includes(name) ? form.services.filter((s) => s !== name) : [...form.services, name] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    if (!isAuthenticated) {
      // Keep what they typed and bring them back here after they sign up.
      saveJobDraft(category.value, form);
      navigate(`/register?redirect=${encodeURIComponent(`/categories/${category.value}`)}`);
      return;
    }

    setServerError('');
    setSubmitting(true);
    try {
      await createJob({ ...form, category: category.label });
      clearJobDraft();
      setPosted(true);
    } catch (err) {
      const { form: formError, fields } = describeApiError(err);
      setErrors({
        description: fields.job_description,
        city: fields.city,
        area: fields.area,
        price: fields.price,
        startDate: fields.start_date,
        durationCount: fields.duration,
      });
      setServerError(
        fields.category
          ? `The server doesn't accept the "${category.label}" category yet.`
          : formError || 'Please fix the highlighted fields and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (posted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-extrabold text-[#0A0A0A]">Your request is posted</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {category.label} workers can see it now and apply. You'll find their applications under My Requests.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link to="/my-requests">
            <Button variant="primary" className="text-sm py-3 px-6 font-semibold">View my jobs</Button>
          </Link>
          <Button variant="outline" className="text-sm py-3 px-6 font-semibold" onClick={onBrowseWorkers}>
            Browse {category.label} workers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-7">
      {restored && isAuthenticated && (
        <div role="status" className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl text-sm">
          Welcome! We kept your request. Check the details and post it.
        </div>
      )}

      {serverError && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      {services.length > 0 && (
        <Field label={`What kind of ${category.label.toLowerCase()} help do you need?`} hint="(pick all that apply)">
          <div className="flex flex-wrap gap-2">
            {services.map((name) => {
              const active = form.services.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleService(name)}
                  aria-pressed={active}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border-2 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00]'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </Field>
      )}

      <Field label="Describe what you need" error={errors.description}>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="e.g. What the work is, the hours, anything the worker should know or bring..."
          className={controlClass(errors.description)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="City" error={errors.city}>
          <select value={form.city} onChange={(e) => set({ city: e.target.value })} className={controlClass(errors.city)}>
            <option value="">Select your city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Area / neighbourhood" error={errors.area}>
          <input
            type="text"
            value={form.area}
            onChange={(e) => set({ area: e.target.value })}
            placeholder="e.g. DHA Phase 6, Gulberg"
            className={controlClass(errors.area)}
          />
        </Field>
      </div>

      <Field label="How long do you need help?" error={errors.durationCount}>
        <DurationPicker
          rules={rules}
          type={form.durationType}
          count={form.durationCount}
          error={errors.durationCount}
          onChange={({ type, count }) => set({ durationType: type, durationCount: count })}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label={dateLabelFor(form.durationType)} error={errors.startDate}>
          <input
            type="date"
            min={todayISO()}
            value={form.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
            className={controlClass(errors.startDate)}
          />
        </Field>
        <Field label={priceLabel(form.durationType)} error={errors.price}>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => set({ price: e.target.value })}
            placeholder="e.g. 2000"
            className={controlClass(errors.price)}
          />
        </Field>
      </div>

      <div className="pt-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-gray-500">
          {isAuthenticated
            ? 'Workers in this category will see your request and apply.'
            : "You'll be asked to create a free account. Your request is saved while you sign up."}
        </p>
        <Button
          type="submit"
          variant="primary"
          aria-busy={submitting}
          className={`px-8 py-3.5 font-bold text-sm gap-2 ${submitting ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting ? 'Posting...' : 'Post my request'}
        </Button>
      </div>
    </form>
  );
}
