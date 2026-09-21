import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, PlusCircle } from 'lucide-react';
import { useClientData } from '../context/ClientDataContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import PageShell from '../components/PageShell';
import { describeApiError } from '../api/auth';
import { BACKEND_CATEGORIES } from '../api/categories';
import { CITIES } from '../constants/categories';
import DurationPicker from '../components/DurationPicker';
import { dateLabelFor, findCategory, isOneOff, priceLabel, todayISO } from '../constants/hiring';
import { durationRulesFor, sanitizeDuration } from '../constants/durationRules';

const selectClass = (error) =>
  `w-full px-4 py-3 bg-[#F5F5F5] border-2 rounded-xl focus:outline-none focus:ring-4 text-sm font-medium ${
    error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
      : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
  }`;

function Labelled({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">{label}</label>
      {children}
      {error && <p className="mt-2 text-sm text-[#EF4444]">{error}</p>}
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = 'Give your job a short title.';
  if (form.description.trim().length < 10) errors.description = 'Tell us a little more (at least 10 characters).';
  if (!form.area.trim()) errors.area = 'Enter the area or neighbourhood.';
  if (!form.startDate) errors.startDate = 'Pick a start date.';
  if (!isOneOff(form.durationType) && form.durationType !== 'permanent') {
    const n = Number(form.durationCount);
    if (!Number.isInteger(n) || n < 1) errors.durationCount = 'Enter a whole number, 1 or more.';
  }
  if (!(Number(form.price) > 0)) errors.price = 'Enter the price you are offering.';
  return errors;
}

// A job in any category (the category cards on the home page open a shorter, category-specific form).
export default function PostCustomJob() {
  const navigate = useNavigate();
  const { postJob } = useClientData();

  const [formData, setFormData] = useState({
    title: '',
    category: BACKEND_CATEGORIES[0],
    description: '',
    city: CITIES[0],
    area: '',
    price: '',
    durationType: durationRulesFor(findCategory(BACKEND_CATEGORIES[0])?.value).oneOff.type,
    durationCount: 1,
    startDate: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const rules = durationRulesFor(findCategory(formData.category)?.value);

  // Each category offers different lengths, so changing it can change the chosen duration too.
  const changeCategory = (category) => {
    const next = durationRulesFor(findCategory(category)?.value);
    const duration = sanitizeDuration(next, { type: formData.durationType, count: formData.durationCount });
    set({ category, durationType: duration.type, durationCount: duration.count });
  };

  const set = (patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const found = validate(formData);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setServerError('');
    setSubmitting(true);
    try {
      await postJob(formData);
      setSubmitted(true);
      setTimeout(() => navigate('/my-requests'), 1500);
    } catch (err) {
      const { form, fields } = describeApiError(err);
      setErrors({
        description: fields.job_description,
        city: fields.city,
        area: fields.area,
        price: fields.price,
        startDate: fields.start_date,
        durationCount: fields.duration,
      });
      setServerError(fields.category ? 'The server does not accept that category.' : form || 'Please fix the highlighted fields.');
      setSubmitting(false);
    }
  };

  return (
    <PageShell width="max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Post a New Job</h1>
        <p className="text-gray-600 mt-1">Fill in the details to connect with verified service workers in your city</p>
      </div>

      {submitted && (
        <div role="status" className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Job posted successfully! Taking you to My Requests...</span>
        </div>
      )}

      {serverError && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <Input
            label="Job Title"
            type="text"
            placeholder="e.g. Experienced Nanny Needed for Toddler"
            value={formData.title}
            onChange={(e) => set({ title: e.target.value })}
            error={errors.title}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Labelled label="Category">
              <select value={formData.category} onChange={(e) => changeCategory(e.target.value)} className={selectClass(false)}>
                {BACKEND_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </Labelled>

            <Labelled label="City" error={errors.city}>
              <select value={formData.city} onChange={(e) => set({ city: e.target.value })} className={selectClass(errors.city)}>
                {CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </Labelled>
          </div>

          <Input
            label="Area / Neighborhood"
            type="text"
            placeholder="e.g. DHA Phase 6, Clifton, Gulberg"
            value={formData.area}
            onChange={(e) => set({ area: e.target.value })}
            error={errors.area}
          />

          <Labelled label="Job Description" error={errors.description}>
            <textarea
              rows={4}
              placeholder="Describe the duties, work hours, requirements, and any specific experience preferred..."
              value={formData.description}
              onChange={(e) => set({ description: e.target.value })}
              className={`${selectClass(errors.description)} font-normal`}
            />
          </Labelled>

          <Labelled label="How long do you need help?" error={errors.durationCount}>
            <DurationPicker
              key={formData.category}
              rules={rules}
              type={formData.durationType}
              count={formData.durationCount}
              error={errors.durationCount}
              onChange={({ type, count }) => set({ durationType: type, durationCount: count })}
            />
          </Labelled>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={isOneOff(formData.durationType) ? dateLabelFor(formData.durationType) : 'Expected Start Date'}
              type="date"
              min={todayISO()}
              value={formData.startDate}
              onChange={(e) => set({ startDate: e.target.value })}
              error={errors.startDate}
            />
            <Input
              label={priceLabel(formData.durationType)}
              type="number"
              min="0"
              placeholder="e.g. 2000"
              value={formData.price}
              onChange={(e) => set({ price: e.target.value })}
              error={errors.price}
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button
            type="submit"
            variant="primary"
            aria-busy={submitting}
            className={`px-8 py-3.5 font-semibold gap-2 ${submitting ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
            {submitting ? 'Publishing...' : 'Publish Job Posting'}
          </Button>
        </div>
      </form>
    </PageShell>
  );
}
