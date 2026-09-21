import { useState } from 'react';
import { BookOpen, CalendarClock, CalendarHeart, Infinity as InfinityIcon, Wrench } from 'lucide-react';
import { CUSTOM_DURATION_UNITS, formatDuration, isOneOff } from '../constants/hiring';

const ONE_OFF_ICONS = { event: CalendarHeart, task: Wrench, session: BookOpen };
const COLUMNS = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' };

const modeOf = (type) => (isOneOff(type) ? 'oneOff' : type === 'permanent' ? 'permanent' : 'custom');

const controlClass = (error) =>
  `w-full px-4 py-3 bg-white border-2 rounded-xl text-sm transition-all focus:outline-none focus:ring-4 ${
    error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
      : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20'
  }`;

// "How long do you need help?" Only the choices that make sense for the category are shown (see
// constants/durationRules.js): a one-off job (an event, a task or a session), a length of time the
// client types in, or permanent work.
// Reports `{ type, count }`; type is event | task | session | permanent | hour | day | week | month | year.
export default function DurationPicker({ rules, type, count, onChange, error }) {
  const mode = modeOf(type);
  // Remember the last typed length so switching to another choice and back doesn't lose it.
  const [custom, setCustom] = useState(mode === 'custom' ? { type, count } : { type: 'day', count: 1 });

  const options = [
    { mode: 'oneOff', title: rules.oneOff.title, text: rules.oneOff.text, icon: ONE_OFF_ICONS[rules.oneOff.type] },
    rules.custom && { mode: 'custom', title: 'For a set time', text: 'You choose exactly how long', icon: CalendarClock },
    rules.permanent && { mode: 'permanent', title: 'Permanent', text: 'Ongoing work with no end date', icon: InfinityIcon },
  ].filter(Boolean);

  const choose = (nextMode) => {
    if (nextMode === 'oneOff') onChange({ type: rules.oneOff.type, count: 1 });
    else if (nextMode === 'permanent') onChange({ type: 'permanent', count: 1 });
    else onChange(custom);
  };

  const setCustomValue = (patch) => {
    const next = { type: custom.type, count: custom.count, ...patch };
    setCustom(next);
    onChange(next);
  };

  const shown = mode === 'custom' ? { type, count } : custom;

  return (
    <div className="space-y-3">
      <div
        role="radiogroup"
        aria-label="How long do you need help?"
        className={`grid grid-cols-1 ${COLUMNS[options.length]} gap-3`}
      >
        {options.map(({ mode: optionMode, title, text, icon: Icon }) => {
          const selected = mode === optionMode;
          return (
            <button
              key={optionMode}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => choose(optionMode)}
              className={`text-left rounded-2xl border-2 p-4 flex sm:flex-col gap-3 transition-all cursor-pointer ${
                selected
                  ? 'border-[#FF6B00] bg-[#FFF0E6] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-[#FF6B00]/60'
              }`}
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selected ? 'bg-[#FF6B00] text-white' : 'bg-[#F5F5F5] text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-bold ${selected ? 'text-[#FF6B00]' : 'text-[#0A0A0A]'}`}>{title}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{text}</span>
              </span>
            </button>
          );
        })}
      </div>

      {rules.custom && mode === 'custom' && (
        <div className="bg-[#F5F5F5] border-2 border-gray-200 rounded-2xl p-4 space-y-3">
          <div className="text-sm font-medium text-[#0A0A0A]">How long?</div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={shown.count}
              onChange={(e) => setCustomValue({ count: e.target.value })}
              aria-label="Number"
              placeholder="e.g. 2"
              className={`${controlClass(error)} sm:max-w-[10rem]`}
            />
            <select
              value={shown.type}
              onChange={(e) => setCustomValue({ type: e.target.value })}
              aria-label="Unit"
              className={controlClass(false)}
            >
              {CUSTOM_DURATION_UNITS.map((u) => (
                <option key={u.value} value={u.value}>
                  {u.plural}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-gray-500" aria-live="polite">
            Selected: <strong className="text-[#FF6B00]">{formatDuration(shown.type, Number(shown.count) || 1)}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
