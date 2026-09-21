import { useState } from 'react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { Button } from './Button';
import { describeApiError } from '../api/auth';
import { CITIES } from '../constants/categories';

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

function validate(form) {
  const errors = {};
  if (!form.category) errors.category = 'Choose a category.';
  if (form.description.trim().length < 10) errors.description = 'Describe the service (at least 10 characters).';
  if (!form.city) errors.city = 'Choose a city.';
  if (!form.area.trim()) errors.area = 'Enter the area you work in.';
  if (!(Number(form.rate) > 0)) errors.rate = 'Enter your rate.';
  return errors;
}

// One service a worker offers (worker.WorkerService): category, description, city, area, rate, availability.
export default function WorkerServiceForm({ categories, defaultCategory = '', defaultCity = '', submitLabel = 'Post service', onPost, onBack }) {
  const [form, setForm] = useState({
    category: categories.includes(defaultCategory) ? defaultCategory : categories.length === 1 ? categories[0] : '',
    description: '',
    city: defaultCity,
    area: '',
    rate: '',
    isAvailable: true,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const set = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setServerError('');
    setSubmitting(true);
    try {
      await onPost(form);
      setForm((prev) => ({ ...prev, description: '', area: '', rate: '' }));
    } catch (err) {
      const { form: formError, fields } = describeApiError(err);
      setErrors({
        category: fields.category,
        description: fields.job_description,
        city: fields.city,
        area: fields.area,
        rate: fields.rate,
      });
      setServerError(formError || (Object.keys(fields).length ? '' : 'Something went wrong. Please try again.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {serverError && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Category" error={errors.category}>
          <select value={form.category} onChange={(e) => set({ category: e.target.value })} className={controlClass(errors.category)}>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Your daily rate (PKR)" error={errors.rate}>
          <input
            type="number"
            min="0"
            value={form.rate}
            onChange={(e) => set({ rate: e.target.value })}
            placeholder="e.g. 2000"
            className={controlClass(errors.rate)}
          />
        </Field>
      </div>

      <Field label="Describe the service you offer" error={errors.description}>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set({ description: e.target.value })}
          placeholder="What you do, your hours, tools or experience clients should know about..."
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
        <Field label="Area you work in" error={errors.area}>
          <input
            type="text"
            value={form.area}
            onChange={(e) => set({ area: e.target.value })}
            placeholder="e.g. DHA, Gulberg"
            className={controlClass(errors.area)}
          />
        </Field>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-[#0A0A0A] cursor-pointer">
        <input
          type="checkbox"
          checked={form.isAvailable}
          onChange={(e) => set({ isAvailable: e.target.checked })}
          className="w-4 h-4 accent-[#FF6B00]"
        />
        I&apos;m available for this service right now
      </label>

      <div className={`pt-4 border-t flex items-center gap-3 ${onBack ? 'justify-between' : 'justify-end'}`}>
        {onBack && (
          <Button type="button" variant="ghost" className="px-5 py-3.5 font-semibold gap-2" onClick={onBack} disabled={submitting}>
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          aria-busy={submitting}
          className={`px-8 py-3.5 font-semibold gap-2 ${submitting ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {submitting ? 'Posting...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
