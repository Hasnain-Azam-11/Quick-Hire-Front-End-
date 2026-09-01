import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

const categories = [
  'Domestic Help', 'Childcare', 'Elder Care', 'Event Staffing', 'Cooking',
  'Driving', 'Construction', 'Security', 'Gardening', 'Tutoring',
  'Beauty', 'Handyman', 'Moving', 'Office Support'
];

const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar', 'Multan'];

export default function ClientPostJob() {
  const navigate = useNavigate();
  const { postJob } = useClientData();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Childcare',
    description: '',
    city: 'Karachi',
    area: '',
    payMin: '',
    payMax: '',
    duration: 'One-time',
    startDate: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    postJob(formData);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/client/jobs');
    }, 1500);
  };

  return (
    <div className="p-8 max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0A0A0A]">Post a New Job</h1>
        <p className="text-gray-600 mt-1">Fill in the details to connect with verified service workers in your city</p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Job posted successfully! Redirecting to My Jobs...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <Input
            label="Job Title"
            type="text"
            placeholder="e.g. Experienced Nanny Needed for Toddler"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Area / Neighborhood"
            type="text"
            placeholder="e.g. DHA Phase 6, Clifton, Gulberg"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />

          <div>
            <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Job Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the duties, work hours, requirements, and any specific experience preferred..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Offered Rate (PKR / day)"
              type="number"
              placeholder="1500"
              value={formData.payMin}
              onChange={(e) => setFormData({ ...formData, payMin: e.target.value })}
              required
            />

            <Input
              label="Maximum Offered Rate (PKR / day)"
              type="number"
              placeholder="2500"
              value={formData.payMax}
              onChange={(e) => setFormData({ ...formData, payMax: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm font-medium"
              >
                <option value="One-time">One-time / Single Shift</option>
                <option value="Ongoing">Ongoing / Full-time</option>
                <option value="1 Week">1 Week Contract</option>
                <option value="1 Month">1 Month Contract</option>
              </select>
            </div>

            <Input
              label="Expected Start Date"
              type="text"
              placeholder="e.g. May 10, 2026 or Immediate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button type="submit" variant="primary" className="px-8 py-3.5 font-semibold gap-2">
            <PlusCircle className="w-5 h-5" />
            Publish Job Posting
          </Button>
        </div>
      </form>
    </div>
  );
}
