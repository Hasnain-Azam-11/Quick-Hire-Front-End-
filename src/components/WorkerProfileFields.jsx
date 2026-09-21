import { Upload } from 'lucide-react';
import { CATEGORIES } from '../constants/categories';
import { subcategoriesFor } from '../constants/hiring';

const selectClass =
  'w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium';

const RATE_FIELDS = [
  { key: 'day', label: 'Per Day' },
  { key: 'week', label: 'Per Week' },
  { key: 'month', label: 'Per Month' },
];

// The worker's profile *is* their service listing, so this one block of fields
// is shared by the become-a-worker form and the profile settings page.
export default function WorkerProfileFields({ value, onChange, showCnic = false, cnicFileName = '' }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const subcategories = subcategoriesFor(value.category);

  const toggleSub = (name) => {
    const has = value.subcategories.includes(name);
    set({ subcategories: has ? value.subcategories.filter((s) => s !== name) : [...value.subcategories, name] });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Primary Category</label>
        <select
          value={value.category}
          onChange={(e) => set({ category: e.target.value, subcategories: [] })}
          className={selectClass}
          required
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {subcategories.length > 0 && (
        <div>
          <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">
            What exactly do you offer? <span className="text-gray-400 font-normal">(pick all that apply)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((name) => {
              const active = value.subcategories.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleSub(name)}
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
        </div>
      )}

      <div>
        <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Years of Experience</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => set({ experience: Math.max(0, Number(value.experience) - 1) })}
            className="w-10 h-10 bg-[#F5F5F5] border border-gray-300 rounded-xl font-bold text-lg hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
          >
            -
          </button>
          <span className="text-xl font-bold w-16 text-center text-[#0A0A0A]">{value.experience} yrs</span>
          <button
            type="button"
            onClick={() => set({ experience: Number(value.experience) + 1 })}
            className="w-10 h-10 bg-[#F5F5F5] border border-gray-300 rounded-xl font-bold text-lg hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Bio / About You</label>
        <textarea
          rows={4}
          value={value.bio}
          onChange={(e) => set({ bio: e.target.value })}
          placeholder="Describe your skills, qualifications, and past work experience..."
          className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-[#0A0A0A] mb-1 font-medium">Your Rates (PKR)</label>
        <p className="text-xs text-gray-500 mb-3">
          Clients see these when hiring you. For permanent jobs the monthly rate is used as the starting salary.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RATE_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <span className="block text-xs font-semibold text-gray-600 mb-1">{label}</span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 2000"
                value={value.rates[key]}
                onChange={(e) => set({ rates: { ...value.rates, [key]: e.target.value } })}
                className={selectClass}
              />
            </div>
          ))}
        </div>
      </div>

      {showCnic && (
        <div>
          <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">CNIC Upload</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#FF6B00] transition-colors">
            <input
              type="file"
              id="cnic-upload"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && set({ cnicFile: e.target.files[0] })}
              className="hidden"
            />
            <label htmlFor="cnic-upload" className="cursor-pointer">
              {value.cnicFile || cnicFileName ? (
                <div className="text-[#22C55E]">
                  <div className="text-3xl mb-1">✓</div>
                  <div className="text-xs font-semibold">{value.cnicFile?.name || cnicFileName}</div>
                </div>
              ) : (
                <div className="text-gray-400">
                  <Upload className="w-7 h-7 mx-auto mb-2 text-[#FF6B00]" />
                  <div className="text-xs font-medium">Click to upload CNIC (front & back)</div>
                </div>
              )}
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your CNIC will be kept confidential and used for verification only
          </p>
        </div>
      )}
    </div>
  );
}
