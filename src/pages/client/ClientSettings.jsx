import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { CheckCircle2 } from 'lucide-react';

export default function ClientSettings() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Ali Raza',
    phone: user?.phone || '+92 302 9876543',
    city: user?.city || 'Lahore',
    accountType: user?.accountType || 'individual'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Client Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account profile details and account classification</p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Client profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-[#0A0A0A] border-b pb-4">Personal Details</h2>

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="City"
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Account Type</label>
            <select
              value={formData.accountType}
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium"
            >
              <option value="individual">Individual / Family</option>
              <option value="organizer">Event Organizer</option>
              <option value="business">Business / Corporate</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" variant="primary" className="px-8 py-3.5 font-semibold">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
