import WorkerListing from '../components/WorkerListing';

// Public worker directory (guests can browse; hiring asks them to sign in).
export default function WorkersPage() {
  return (
    <div className="bg-[#FAFBFD] min-h-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-10 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">Find a Worker</h1>
          <p className="text-gray-600 mt-1">
            Browse verified local professionals, then hire them for a day, a week, a month or permanently.
          </p>
        </div>

        <WorkerListing />
      </div>
    </div>
  );
}
