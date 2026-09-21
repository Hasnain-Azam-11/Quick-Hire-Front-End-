import { Loader2 } from 'lucide-react';

// Shown while jobs load from the backend, or when loading failed.
export default function JobsStatusNotice({ status, onRetry }) {
  if (status.state === 'loading') {
    return (
      <div role="status" className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl p-5 text-sm text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin text-[#FF6B00]" />
        Loading jobs...
      </div>
    );
  }

  if (status.state === 'error') {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 bg-red-500/10 border border-red-500 text-red-500 rounded-2xl p-4 text-sm">
        <span>{status.error || "Couldn't load jobs."}</span>
        <button type="button" onClick={onRetry} className="font-bold underline cursor-pointer">
          Try again
        </button>
      </div>
    );
  }

  return null;
}
