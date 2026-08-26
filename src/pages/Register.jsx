import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Upload } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role');
  const [role, setRole] = useState(roleParam === 'worker' ? 'worker' : 'client');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual',
    category: '',
    experience: 0,
    cnic: null
  });

  const categories = [
    'Domestic Help', 'Childcare', 'Elder Care', 'Event Staffing', 'Cooking',
    'Driving', 'Construction', 'Security', 'Gardening', 'Tutoring',
    'Beauty', 'Handyman', 'Moving', 'Office Support'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'client') {
      navigate('/client/dashboard');
    } else {
      navigate('/worker/dashboard');
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cnic: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0A0A0A] text-white p-16 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF6B00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF6B00] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <h2 className="text-5xl mb-6">Join QuickHire Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            {role === 'client'
              ? 'Connect with thousands of verified workers across Pakistan'
              : 'Start earning by offering your skills to clients nationwide'}
          </p>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span>Verified profiles and secure payments</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span>AI-powered matching for best results</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">Q</span>
              </div>
              <span className="text-xl text-[#0A0A0A]">QuickHire</span>
            </Link>
            <h1 className="text-3xl mb-2">Create Account</h1>
            <p className="text-gray-600">Get started with QuickHire</p>
          </div>

          <div className="flex gap-2 mb-8 p-1 bg-[#F5F5F5] rounded-xl">
            <button
              onClick={() => setRole('client')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                role === 'client'
                  ? 'bg-white text-[#FF6B00] shadow-sm'
                  : 'text-gray-600 hover:text-[#0A0A0A]'
              }`}
            >
              Client
            </button>
            <button
              onClick={() => setRole('worker')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                role === 'worker'
                  ? 'bg-white text-[#FF6B00] shadow-sm'
                  : 'text-gray-600 hover:text-[#0A0A0A]'
              }`}
            >
              Worker
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              type="tel"
              label="Phone"
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <Input
              type="text"
              label="City"
              placeholder="e.g., Karachi, Lahore"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />

            {role === 'client' && (
              <div>
                <label className="block text-sm text-[#0A0A0A] mb-2">Account Type</label>
                <select
                  value={formData.accountType}
                  onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20"
                >
                  <option value="individual">Individual/Family</option>
                  <option value="organizer">Event Organizer</option>
                  <option value="business">Business</option>
                </select>
              </div>
            )}

            {role === 'worker' && (
              <>
                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">Primary Category</label>
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
                  <label className="block text-sm text-[#0A0A0A] mb-2">Years of Experience</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: Math.max(0, formData.experience - 1) })}
                      className="w-10 h-10 bg-[#F5F5F5] rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-xl w-16 text-center">{formData.experience}</span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: formData.experience + 1 })}
                      className="w-10 h-10 bg-[#F5F5F5] rounded-lg hover:bg-[#FF6B00] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#0A0A0A] mb-2">CNIC Upload</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#FF6B00] transition-colors">
                    <input
                      type="file"
                      id="cnic-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="cnic-upload" className="cursor-pointer">
                      {formData.cnic ? (
                        <div className="text-[#22C55E]">
                          <div className="text-4xl mb-2">✓</div>
                          <div className="text-sm">{formData.cnic.name}</div>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-sm">Click to upload CNIC (front & back)</div>
                        </div>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your CNIC will be kept confidential and used for verification only
                  </p>
                </div>
              </>
            )}

            <Input
              type="password"
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            {role === 'worker' && (
              <div className="bg-[#FFF0E6] border border-[#FF6B00]/20 rounded-xl p-4 text-sm">
                <p className="text-[#FF6B00]">
                  Your account will be reviewed within 24 hours. You'll be notified once verified.
                </p>
              </div>
            )}

            <Button type="submit" variant="primary" fullWidth className="py-4">
              Create Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              fullWidth
              className="py-4 border-gray-200 text-[#0A0A0A] hover:bg-[#F5F5F5]"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-[#FF6B00] hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}