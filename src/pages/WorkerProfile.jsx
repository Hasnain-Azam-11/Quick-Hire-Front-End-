import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { MapPin, Briefcase, Calendar, MessageCircle, ThumbsUp } from 'lucide-react';

const workerData = {
  name: 'Fatima Ahmed',
  category: 'Childcare',
  city: 'Karachi',
  rating: 4.9,
  reviews: 127,
  experience: 8,
  verified: true,
  bio: 'Experienced and caring childcare provider with over 8 years of experience working with families across Karachi. Specialized in newborn care, toddler development, and educational activities. CPR certified and background checked. I believe in creating a safe, nurturing environment where children can learn and grow.',
  skills: ['Newborn Care', 'CPR Certified', 'Early Education', 'Meal Preparation', 'First Aid'],
  jobHistory: [
    { title: 'Full-time Nanny', client: 'Khan Family', duration: 'Jan 2024 - Present', rating: 5.0 },
    { title: 'Weekend Childcare', client: 'Ahmed Family', duration: 'Nov 2023 - Dec 2023', rating: 4.8 },
    { title: 'Event Childcare', client: 'Wedding Event', duration: 'Oct 2023', rating: 5.0 }
  ],
  availability: {
    available: [1, 2, 3, 5, 6],
    today: 3
  }
};

const reviews = [
  {
    client: 'Sarah Khan',
    rating: 5.0,
    date: 'Apr 15, 2026',
    comment: 'Fatima is absolutely wonderful with our two kids. Very punctual and professional. Highly recommend!',
    tags: ['Punctual', 'Reliable', 'Professional']
  },
  {
    client: 'Ali Ahmed',
    rating: 4.8,
    date: 'Mar 22, 2026',
    comment: 'Great experience overall. Our daughter really enjoyed spending time with Fatima.',
    tags: ['Friendly', 'Experienced']
  },
  {
    client: 'Zainab Malik',
    rating: 5.0,
    date: 'Feb 10, 2026',
    comment: 'Best childcare provider we have ever hired. Will definitely book again!',
    tags: ['Reliable', 'Caring', 'Trustworthy']
  }
];

export default function WorkerProfile() {
  const getDaysInMonth = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }
    return days;
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1">
        <div className="bg-[#0A0A0A] text-white p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-8">
              <Avatar name={workerData.name} size="xl" verified={workerData.verified} />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl mb-2">{workerData.name}</h1>
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryChip variant="orange">{workerData.category}</CategoryChip>
                      <div className="flex items-center gap-1 text-white">
                        {workerData.verified && <span className="text-[#22C55E]">✓</span>}
                        <span>Verified</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.floor(workerData.rating)} size="md" />
                        <span className="text-white">{workerData.rating}</span>
                        <span>({workerData.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span>{workerData.experience} years experience</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0A0A0A] gap-2">
                      <MessageCircle size={18} />
                      Message
                    </Button>
                    <Button variant="primary" className="gap-2">
                      <Calendar size={18} />
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{workerData.bio}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">AI Sentiment Analysis</h2>
                <div className="bg-[#FFF0E6] rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#FF6B00]/20 rounded-lg flex items-center justify-center">
                      <span className="text-[#FF6B00]">🤖</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">Review Analysis</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Based on {workerData.reviews} reviews, here are the most common themes:
                      </p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Punctual (92%)</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Reliable (88%)</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Professional (85%)</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Caring (90%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🟢</span>
                        <span className="text-lg">Overall Sentiment: Very Positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Recent Jobs</h2>
                <div className="space-y-4">
                  {workerData.jobHistory.map((job, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="mb-1">{job.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{job.client}</p>
                          <p className="text-xs text-gray-500">{job.duration}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <StarRating rating={Math.floor(job.rating)} size="sm" />
                          <span className="text-sm ml-1">{job.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Reviews ({workerData.reviews})</h2>
                <div className="space-y-6">
                  {reviews.map((review, i) => (
                    <div key={i} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar name={review.client} size="sm" />
                            <div>
                              <h4 className="text-sm">{review.client}</h4>
                              <div className="flex items-center gap-2">
                                <StarRating rating={Math.floor(review.rating)} size="sm" />
                                <span className="text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{review.comment}</p>
                      <div className="flex gap-2 flex-wrap">
                        {review.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-[#F5F5F5] text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Quick Info</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-[#FF6B00]" />
                    <div>
                      <div className="text-gray-500">Location</div>
                      <div>{workerData.city}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={18} className="text-[#FF6B00]" />
                    <div>
                      <div className="text-gray-500">Experience</div>
                      <div>{workerData.experience} years</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ThumbsUp size={18} className="text-[#FF6B00]" />
                    <div>
                      <div className="text-gray-500">Success Rate</div>
                      <div>98%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Skills</h2>
                <div className="flex gap-2 flex-wrap">
                  {workerData.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-[#F5F5F5] text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl mb-4">Availability</h2>
                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth().map(day => {
                    const isAvailable = workerData.availability.available.includes(day % 7);
                    const isToday = day === workerData.availability.today;
                    return (
                      <div
                        key={day}
                        className={`aspect-square flex items-center justify-center text-xs rounded-lg ${
                          isToday
                            ? 'bg-[#FF6B00] text-white'
                            : isAvailable
                            ? 'bg-white border border-gray-200'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#FF6B00] rounded"></div>
                    <span>Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-white border border-gray-200 rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-100 rounded"></div>
                    <span>Busy</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl mb-2">Ready to hire?</h3>
                <p className="text-sm mb-4 text-white/90">Book Fatima for your next job</p>
                <Button variant="outline" fullWidth className="border-white text-white hover:bg-white hover:text-[#FF6B00] gap-2">
                  <Calendar size={18} />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}