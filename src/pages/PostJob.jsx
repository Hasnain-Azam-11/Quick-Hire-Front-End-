import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Eye } from 'lucide-react';

const categories = [
  'Domestic Help', 'Childcare', 'Elder Care', 'Event Staffing', 'Cooking',
  'Driving', 'Construction', 'Security', 'Gardening', 'Tutoring',
  'Beauty', 'Handyman', 'Moving', 'Office Support'
];

const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

export default function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    city: '',
    area: '',
    startDate: '',
    endDate: '',
    durationType: 'days',
    workerCount: 1,
    payRate: '',
    skills: '',
    gender: 'any',
    notes: ''
  });

  const [aiSuggestion, setAiSuggestion] = useState({
    min: 1500,
    max: 2000,
    reasoning: 'Based on the category, location, and current market rates'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/client/ai-recommendations');
  };

  const useSuggestedRate = () => {
    setFormData({ ...formData, payRate: `${aiSuggestion.min}-${aiSuggestion.max}` });
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Post a New Job</h1>
            <p className="text-gray-600">Fill in the details to find the perfect workers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Job Details</h2>
              <div className="space-y-4">
                <Input
                  label="Job Title"
                  placeholder="e.g., Experienced Nanny Needed"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">Job Description</label>
                  <textarea
                    placeholder="Describe the work required, expectations, and any special requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 min-h-32 resize-y"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Location & Schedule</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20"
                    required
                  >
                    <option value="">Select city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Area/Neighborhood"
                  placeholder="e.g., DHA, Gulberg"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  required
                />

                <Input
                  type="date"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />

                <Input
                  type="date"
                  label="End Date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm text-[#0A0A0A] mb-2">Duration Type</label>
                <div className="flex gap-2 p-1 bg-[#F5F5F5] rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, durationType: 'days' })}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      formData.durationType === 'days'
                        ? 'bg-white text-[#FF6B00] shadow-sm'
                        : 'text-gray-600 hover:text-[#0A0A0A]'
                    }`}
                  >
                    Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, durationType: 'weeks' })}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      formData.durationType === 'weeks'
                        ? 'bg-white text-[#FF6B00] shadow-sm'
                        : 'text-gray-600 hover:text-[#0A0A0A]'
                    }`}
                  >
                    Weeks
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, durationType: 'event' })}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      formData.durationType === 'event'
                        ? 'bg-white text-[#FF6B00] shadow-sm'
                        : 'text-gray-600 hover:text-[#0A0A0A]'
                    }`}
                  >
                    Event
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-[#0A0A0A] mb-2">Number of Workers</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, workerCount: Math.max(1, formData.workerCount - 1) })}
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl w-16 text-center">{formData.workerCount}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, workerCount: formData.workerCount + 1 })}
                    className="w-10 h-10 bg-[#F5F5F5] rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Pay Rate</h2>
              <Input
                label="Pay Rate (PKR per day)"
                placeholder="e.g., 1500-2000"
                value={formData.payRate}
                onChange={(e) => setFormData({ ...formData, payRate: e.target.value })}
                required
              />

              <div className="mt-4 bg-[#FFF0E6] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FF6B00]">🤖</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">AI Suggested Rate</h3>
                    <div className="text-2xl mb-2">
                      PKR {aiSuggestion.min.toLocaleString()} – {aiSuggestion.max.toLocaleString()}/day
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{aiSuggestion.reasoning}</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={useSuggestedRate}
                      className="text-sm border-[#FF6B00] text-[#FF6B00]"
                    >
                      Use Suggested Rate
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl mb-4">Requirements</h2>
              <div className="space-y-4">
                <Input
                  label="Required Skills (comma separated)"
                  placeholder="e.g., CPR Certified, Early Education, Meal Prep"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />

                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">Gender Preference</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20"
                  >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">Additional Notes</label>
                  <textarea
                    placeholder="Any other requirements or information..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 min-h-24 resize-y"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-200 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                className="gap-2"
              >
                <Eye size={18} />
                Preview
              </Button>
              <Button type="submit" variant="primary" className="px-8">
                Post Job Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}