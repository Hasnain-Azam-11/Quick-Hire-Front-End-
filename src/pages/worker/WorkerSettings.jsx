import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { CheckCircle2, User, Phone, MapPin, Briefcase, Award } from 'lucide-react';

const availableCategories = [
  'Domestic Help', 'Childcare', 'Elder Care', 'Event Staffing', 'Cooking',
  'Driving', 'Construction', 'Security', 'Gardening', 'Tutoring',
  'Beauty', 'Handyman', 'Moving', 'Office Support'
];

export default function WorkerSettings() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || 'Fatima Ahmed',
    phone: user?.phone || '+92 300 1234567',
    city: user?.city || 'Karachi',
    category: user?.category || 'Childcare',
    experience: user?.experience || 3,
    bio: user?.bio || 'Dedicated childcare & house help specialist with over 3 years of experience serving families in Karachi.',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your worker account info, category, and contact details</p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile information updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-[#0A0A0A] border-b pb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Primary Skill / Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Years of Experience</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, experience: Math.max(0, formData.experience - 1) })}
              className="w-10 h-10 bg-[#F5F5F5] border border-gray-300 rounded-xl font-bold text-lg hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="text-xl font-bold w-12 text-center text-[#0A0A0A]">{formData.experience} yrs</span>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, experience: formData.experience + 1 })}
              className="w-10 h-10 bg-[#F5F5F5] border border-gray-300 rounded-xl font-bold text-lg hover:bg-[#FF6B00] hover:text-white transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Professional Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Describe your skills, qualifications, and past work experience..."
            className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm"
          />
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
