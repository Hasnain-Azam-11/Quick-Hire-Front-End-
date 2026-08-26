import { useState } from 'react';
import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { Filter } from 'lucide-react';

const workers = [
  {
    id: 1,
    name: 'Fatima Ahmed',
    category: 'Childcare',
    city: 'Karachi',
    rating: 4.9,
    reviews: 127,
    bio: 'Experienced childcare provider with 8+ years working with families',
    verified: true,
    availability: 'available',
    aiTags: ['Punctual', 'Reliable']
  },
  {
    id: 2,
    name: 'Ali Hassan',
    category: 'Driving',
    city: 'Lahore',
    rating: 4.8,
    reviews: 93,
    bio: 'Professional driver with clean record and knowledge of all major cities',
    verified: true,
    availability: 'available',
    aiTags: ['Professional', 'Experienced']
  },
  {
    id: 3,
    name: 'Ayesha Khan',
    category: 'Domestic Help',
    city: 'Islamabad',
    rating: 5.0,
    reviews: 156,
    bio: 'Detail-oriented house cleaner specializing in deep cleaning',
    verified: true,
    availability: 'busy',
    aiTags: ['Reliable', 'Thorough']
  },
  {
    id: 4,
    name: 'Muhammad Raza',
    category: 'Construction',
    city: 'Karachi',
    rating: 4.7,
    reviews: 84,
    bio: 'Skilled construction worker with expertise in residential projects',
    verified: true,
    availability: 'available',
    aiTags: ['Skilled', 'Hardworking']
  },
  {
    id: 5,
    name: 'Sana Malik',
    category: 'Cooking',
    city: 'Lahore',
    rating: 4.9,
    reviews: 112,
    bio: 'Professional cook specializing in Pakistani and continental cuisine',
    verified: true,
    availability: 'available',
    aiTags: ['Talented', 'Creative']
  },
  {
    id: 6,
    name: 'Imran Sheikh',
    category: 'Security',
    city: 'Islamabad',
    rating: 4.6,
    reviews: 67,
    bio: 'Former security personnel with 10 years experience',
    verified: true,
    availability: 'available',
    aiTags: ['Alert', 'Trustworthy']
  }
];

const categories = ['All', 'Domestic Help', 'Childcare', 'Driving', 'Cooking', 'Construction', 'Security'];
const cities = ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'];
const ratings = ['All Ratings', '5 Stars', '4+ Stars', '3+ Stars'];

export default function BrowseWorkers() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedRating, setSelectedRating] = useState('All Ratings');

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Browse Workers</h1>
          <p className="text-gray-600">Find verified workers across Pakistan</p>
        </div>

        <div className="flex gap-6">
          <div className="w-64 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-[#FF6B00]" />
                <h2 className="text-lg">Filters</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F5F5] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]"
                  >
                    {ratings.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Availability</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#FF6B00]" defaultChecked />
                      <span>Available Now</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#FF6B00]" />
                      <span>This Week</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Experience</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#FF6B00]" />
                      <span>0-2 years</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#FF6B00]" />
                      <span>3-5 years</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-[#FF6B00]" />
                      <span>5+ years</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {workers.length} workers
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B00]">
                <option>Sort by: Recommended</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Recently Active</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#FF6B00] hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar name={worker.name} size="lg" verified={worker.verified} />
                    <h3 className="mt-3 mb-2">{worker.name}</h3>
                    <CategoryChip variant="orange">{worker.category}</CategoryChip>
                    <div className="flex items-center gap-1 mt-2 mb-1">
                      <StarRating rating={Math.floor(worker.rating)} size="sm" />
                      <span className="text-sm ml-1">{worker.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ({worker.reviews} reviews)
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 text-center">{worker.bio}</p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <span>{worker.city}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4 justify-center flex-wrap">
                    {worker.aiTags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 bg-[#FFF0E6] text-[#FF6B00] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4 text-sm">
                    <span className={`w-2 h-2 rounded-full ${worker.availability === 'available' ? 'bg-[#22C55E]' : 'bg-gray-400'}`}></span>
                    <span className={worker.availability === 'available' ? 'text-[#22C55E]' : 'text-gray-500'}>
                      {worker.availability === 'available' ? 'Available Now' : 'Busy'}
                    </span>
                  </div>

                  <Link to={`/worker/${worker.id}`}>
                    <Button variant="primary" fullWidth className="text-sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}