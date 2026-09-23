import { useEffect, useState } from 'react';
import { AlertTriangle, Plus, Tags, Trash2 } from 'lucide-react';
import { Button } from '../../components/Button';
import { BACKEND_CATEGORIES } from '../../api/categories';

const DRAFTS_KEY = 'quickhire_admin_draft_categories';

function loadDrafts() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFTS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// Categories actually come from the backend's CATEGORY_CHOICES — there's no endpoint to manage
// them yet, so this page lists what's live, and lets admins draft new ones to hand to the backend
// developer (rather than editing Django's choices by hand each time).
export default function AdminCategories() {
  const [drafts, setDrafts] = useState(loadDrafts);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  }, [drafts]);

  const addDraft = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const exists = [...BACKEND_CATEGORIES, ...drafts].some((c) => c.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setError('That category already exists.');
      return;
    }
    setDrafts((prev) => [...prev, trimmed]);
    setName('');
    setError('');
  };

  const removeDraft = (label) => setDrafts((prev) => prev.filter((c) => c !== label));

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Categories</h1>
        <p className="text-gray-600 mt-1">What clients can post jobs for and workers can offer services in</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Categories live in the backend&apos;s <code className="font-mono text-xs">CATEGORY_CHOICES</code>. This page can&apos;t change
          that yet — add a draft below and hand it to the backend developer to add for real.
        </p>
      </div>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Tags className="w-5 h-5 text-[#FF6B00]" />
          <h2 className="font-bold text-[#0A0A0A]">Live on the backend ({BACKEND_CATEGORIES.length})</h2>
        </div>
        <div className="p-6 flex flex-wrap gap-2">
          {BACKEND_CATEGORIES.map((c) => (
            <span key={c} className="px-3 py-1.5 bg-[#F5F5F5] text-[#0A0A0A] rounded-full text-sm font-medium">
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0A0A0A]">Draft categories ({drafts.length})</h2>
          <p className="text-xs text-gray-500 mt-0.5">Saved on this browser only, not yet real.</p>
        </div>

        <form onSubmit={addDraft} className="flex gap-3 p-6 pb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="e.g. Pet Care"
            className="flex-1 px-4 py-2.5 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20"
          />
          <Button type="submit" variant="primary" className="text-sm py-2.5 px-5 gap-1.5 flex-shrink-0">
            <Plus className="w-4 h-4" />
            Add Draft
          </Button>
        </form>
        {error && <p className="text-xs text-[#EF4444] px-6 -mt-2 pb-4">{error}</p>}

        <div className="px-6 pb-6">
          {drafts.length === 0 ? (
            <p className="text-sm text-gray-500">No drafts yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {drafts.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF0E6] text-[#FF6B00] rounded-full text-sm font-medium"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removeDraft(c)}
                    aria-label={`Remove draft category ${c}`}
                    className="hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
