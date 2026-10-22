import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import WorkerProfileFields from '../../components/WorkerProfileFields';
import { workerFormFrom, workerPayloadFrom } from '../../utils/workerProfile';
import { patchWorkerBio } from '../../api/worker';
import { toBackendCategory } from '../../api/categories';
import { updateMe } from '../../api/profile';
import { describeApiError } from '../../api/auth';

export default function WorkerSettings() {
  const { user, updateProfile } = useAuth();
  const { myWorkerProfile, upsertWorkerProfile } = useMarketplace();

  const [account, setAccount] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });
  const [profileForm, setProfileForm] = useState(() => workerFormFrom(myWorkerProfile));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setServerError('');

    try {
      // Only category/experience/bio live on the real WorkerBio - subcategories, rates and city
      // have no backend field yet, so they stay in the local mirror only (upsertWorkerProfile).
      if (user?.workerBioId) {
        await patchWorkerBio(user.workerBioId, {
          expertise_categories: toBackendCategory(profileForm.category),
          years_of_experience: Number(profileForm.experience) || 0,
          bio: profileForm.bio.trim(),
        });
      }
      const [firstName, ...rest] = account.name.trim().split(' ');
      await updateMe({
        first_name: firstName || '',
        last_name: rest.join(' '),
        phone_number: account.phone.replace(/[\s-]/g, ''),
      });

      updateProfile(account);
      upsertWorkerProfile(user.id, {
        ...workerPayloadFrom(profileForm),
        name: account.name,
        city: account.city,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setServerError(describeApiError(err).form || 'Could not save your changes. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Profile Settings</h1>
        <p className="text-gray-600 mt-1">
          Your worker profile is your listing: this is what clients see when they search and hire.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      {serverError && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-[#0A0A0A] border-b pb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={account.phone}
            onChange={(e) => setAccount({ ...account, phone: e.target.value })}
            required
          />

          <Input
            label="City"
            type="text"
            value={account.city}
            onChange={(e) => setAccount({ ...account, city: e.target.value })}
            required
          />
        </div>

        <h2 className="text-xl font-bold text-[#0A0A0A] border-b pb-4 pt-2">Listing Details</h2>

        <WorkerProfileFields
          value={profileForm}
          onChange={setProfileForm}
          showCnic
          cnicFileName={myWorkerProfile?.cnicFileName}
        />

        <div className="pt-4 border-t flex justify-end">
          <Button
            type="submit"
            variant="primary"
            aria-busy={submitting}
            className={`px-8 py-3.5 font-semibold gap-2 ${submitting ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Saving...' : 'Save Profile Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
