import { useState } from 'react';
import { CheckCircle2, FileText, ShieldCheck, X, XCircle } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { CategoryChip } from '../../components/CategoryChip';
import { StatusPill } from '../../components/StatusPill';
import { useMarketplace } from '../../context/MarketplaceContext';

function RejectModal({ worker, onClose, onConfirm }) {
  const [note, setNote] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 relative border border-gray-200">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-[#0A0A0A]">
          <X className="w-5 h-5" />
        </button>
        <div className="border-b pb-4">
          <h3 className="font-bold text-lg text-[#0A0A0A]">Send back for changes</h3>
          <p className="text-xs text-gray-500">{worker.name} will see this note on their settings page.</p>
        </div>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. CNIC photo is blurry, please re-upload."
          className="w-full px-3 py-2.5 bg-[#F5F5F5] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" className="text-xs py-2 px-4" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-xs py-2 px-5 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
            onClick={() => onConfirm(note)}
          >
            Send Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminVerifications() {
  const { allWorkers, setWorkerVerification } = useMarketplace();
  const [rejecting, setRejecting] = useState(null);

  const pending = allWorkers.filter((w) => !w.verified);
  const reviewed = allWorkers.filter((w) => w.verified);

  const approve = (worker) => setWorkerVerification(worker.id, true);
  const confirmReject = (note) => {
    setWorkerVerification(rejecting.id, false, note);
    setRejecting(null);
  };

  const Card = ({ worker }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-start gap-3">
        <Avatar name={worker.name || 'Worker'} size="lg" verified={worker.verified} />
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-[#0A0A0A] truncate">{worker.name || 'Unnamed worker'}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {worker.category && <CategoryChip variant="orange">{worker.category}</CategoryChip>}
            <span className="text-xs text-gray-500">{worker.city || 'No city set'}</span>
          </div>
        </div>
        <StatusPill status={worker.verified ? 'verified' : 'unverified'}>
          {worker.verified ? 'VERIFIED' : 'PENDING'}
        </StatusPill>
      </div>

      <p className="text-sm text-gray-600 line-clamp-3">{worker.bio || 'No bio provided.'}</p>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FileText className="w-3.5 h-3.5" />
        {worker.cnicFileName ? <span>{worker.cnicFileName}</span> : <span className="italic">No CNIC file on record</span>}
      </div>

      {worker.verificationNote && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Last note sent: “{worker.verificationNote}”
        </p>
      )}

      {!worker.verified && (
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
          <Button
            variant="outline"
            className="text-xs py-2 px-4 gap-1.5 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
            onClick={() => setRejecting(worker)}
          >
            <XCircle className="w-4 h-4" />
            Send Back
          </Button>
          <Button variant="primary" className="text-xs py-2 px-5 gap-1.5" onClick={() => approve(worker)}>
            <CheckCircle2 className="w-4 h-4" />
            Approve
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Worker Verifications</h1>
        <p className="text-gray-600 mt-1">Review CNIC and profile details, then approve or send back for changes</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[#0A0A0A]">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 space-y-2">
            <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="text-sm text-gray-500">All caught up — no workers waiting for review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {pending.map((w) => (
              <Card key={w.id} worker={w} />
            ))}
          </div>
        )}
      </section>

      {reviewed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0A0A0A]">Verified ({reviewed.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {reviewed.map((w) => (
              <Card key={w.id} worker={w} />
            ))}
          </div>
        </section>
      )}

      {rejecting && <RejectModal worker={rejecting} onClose={() => setRejecting(null)} onConfirm={confirmReject} />}
    </div>
  );
}
