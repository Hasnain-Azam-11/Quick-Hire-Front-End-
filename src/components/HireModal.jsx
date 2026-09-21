import { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  DURATION_TYPES,
  calcTotal,
  formatDuration,
  formatPKR,
  payUnitFor,
  rateForDuration,
  todayISO,
} from '../constants/hiring';

const fieldClass =
  'w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]';

// Client-side hire request. The worker's own rates prefill the price, and the
// resulting offer lands in the worker's "Offers" inbox.
export default function HireModal({ worker, onClose }) {
  const { createOffer } = useMarketplace();

  const [form, setForm] = useState({
    durationType: 'day',
    durationCount: 1,
    startDate: '',
    rate: String(rateForDuration(worker.rates, 'day') || ''),
    note: '',
  });
  const [sent, setSent] = useState(false);

  const isPermanent = form.durationType === 'permanent';
  const total = calcTotal(form.rate, form.durationType, form.durationCount);

  const chooseDuration = (durationType) => {
    setForm((prev) => ({
      ...prev,
      durationType,
      rate: String(rateForDuration(worker.rates, durationType) || ''),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createOffer(worker.id, form);
    setSent(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl space-y-4 relative border border-gray-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-[#0A0A0A] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b pb-4 pr-6">
          <Avatar name={worker.name} size="md" verified={worker.verified} />
          <div>
            <h3 className="font-bold text-lg text-[#0A0A0A]">Hire {worker.name}</h3>
            <span className="text-xs text-gray-500">{worker.category} • {worker.city}</span>
          </div>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-lg text-[#0A0A0A]">Hire Request Sent!</h4>
            <p className="text-xs text-gray-500">
              {worker.name} will see your request for {formatDuration(form.durationType, form.durationCount)} and can accept or decline.
              You can track it under My Requests → Hire Requests.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">For how long?</label>
              <div className="grid grid-cols-4 gap-2">
                {DURATION_TYPES.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    onClick={() => chooseDuration(d.value)}
                    aria-pressed={form.durationType === d.value}
                    className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-colors cursor-pointer ${
                      form.durationType === d.value
                        ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00]'
                    }`}
                  >
                    {d.value === 'permanent' ? 'Permanent' : d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {!isPermanent && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Number of {payUnitFor(form.durationType)}s
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.durationCount}
                    onChange={(e) => setForm({ ...form, durationCount: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              )}

              <div className={isPermanent ? 'col-span-2' : ''}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  min={todayISO()}
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {isPermanent ? 'Monthly Salary (PKR)' : `Rate per ${payUnitFor(form.durationType)} (PKR)`}
              </label>
              <input
                type="number"
                min="1"
                required
                placeholder="e.g. 2500"
                value={form.rate}
                onChange={(e) => setForm({ ...form, rate: e.target.value })}
                className={fieldClass}
              />
              <p className="text-[11px] text-gray-400 mt-1">
                {rateForDuration(worker.rates, form.durationType)
                  ? `${worker.name.split(' ')[0]}'s listed rate is ${formatPKR(rateForDuration(worker.rates, form.durationType))}. You can adjust your offer.`
                  : `${worker.name.split(' ')[0]} hasn't listed a rate for this. Enter what you'd like to offer.`}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Note for the worker</label>
              <textarea
                rows={3}
                placeholder="Describe the work, timings, location..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className={fieldClass}
              />
            </div>

            <div className="flex items-center justify-between bg-[#FFF0E6] rounded-xl px-4 py-3">
              <span className="text-xs font-semibold text-gray-700">
                {isPermanent ? 'Monthly salary' : `Estimated total (${formatDuration(form.durationType, form.durationCount)})`}
              </span>
              <span className="font-bold text-[#FF6B00]">{formatPKR(total)}</span>
            </div>

            <div className="pt-1 flex justify-end gap-3">
              <Button type="button" variant="ghost" className="text-xs py-2 px-4" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="text-xs py-2 px-6 font-semibold">
                Send Hire Request
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
