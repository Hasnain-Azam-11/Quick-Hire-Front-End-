import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Avatar } from '../components/Avatar';
import { CategoryChip } from '../components/CategoryChip';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { ArrowLeft, Sparkles, BrainCircuit, UserCheck, MessageSquare, Send } from 'lucide-react';

const initialRecommendedWorkers = [
  {
    id: 1,
    name: 'Fatima Ahmed',
    category: 'Childcare',
    rating: 4.9,
    reviews: 127,
    city: 'Karachi',
    matchScore: 98,
    availability: 'Available Now',
    aiRationale: 'Fatima is a top-rated Childcare provider in Karachi with 8+ years of experience. She holds a CPR certification and matches your requirement for toddler experience. Her client feedback highlights extreme punctuality and reliability.',
    skills: ['Newborn Care', 'CPR Certified', 'Toddler Dev'],
    hourlyRate: '200 / hr'
  },
  {
    id: 4,
    name: 'Muhammad Raza',
    category: 'Construction',
    rating: 4.7,
    reviews: 84,
    city: 'Karachi',
    matchScore: 94,
    availability: 'Available Now',
    aiRationale: 'Muhammad Raza has residential construction experience in Karachi. He matches your criteria for manual labor and masonry. Clients frequently praise his diligence and high-quality finishes.',
    skills: ['Residential Projects', 'Masonry', 'Plastering'],
    hourlyRate: '250 / hr'
  },
  {
    id: 3,
    name: 'Ayesha Khan',
    category: 'Domestic Help',
    rating: 5.0,
    reviews: 156,
    city: 'Islamabad',
    matchScore: 91,
    availability: 'Available Tomorrow',
    aiRationale: 'Ayesha is highly matches for Domestic Help and deep cleaning. Although based in Islamabad, she has indicated willingness for regional project assistance. Rated 5.0/5.0 across 150+ bookings.',
    skills: ['Deep Cleaning', 'Meal Prep', 'Organizing'],
    hourlyRate: '150 / hr'
  }
];

export default function AIRecommendations() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState(initialRecommendedWorkers);
  const [invitedIds, setInvitedIds] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleInvite = (id, name) => {
    if (invitedIds.includes(id)) return;
    setInvitedIds([...invitedIds, id]);
    showToast(`Successfully sent an invitation to ${name}!`);
  };

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Client Sidebar */}
      <Sidebar userType="client" userName="Ahmed Khan" userRole="Client" />

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Back Navigation */}
          <Link to="/client/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF6B00] mb-6 transition-colors">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>

          {/* Toast Notification */}
          {notification && (
            <div className="fixed bottom-8 right-8 z-50 bg-[#0A0A0A] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-300">
              <div className="w-6 h-6 bg-[#22C55E] rounded-full flex items-center justify-center text-xs text-white">✓</div>
              <span className="text-sm font-medium">{notification}</span>
            </div>
          )}

          {/* Page Title & Intro */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                  <BrainCircuit className="text-[#FF6B00]" size={20} />
                </div>
                <span className="text-sm text-[#FF6B00] font-semibold tracking-wide uppercase">AI Engine Match</span>
              </div>
              <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">AI-Powered Recommendations</h1>
              <p className="text-gray-600">
                We analyzed your job details and matched it against top qualified service providers.
              </p>
            </div>
            <div className="bg-[#FFF0E6] border border-[#FF6B00]/20 rounded-xl px-4 py-3 text-right">
              <span className="text-xs text-gray-500 block">Total Active Matches</span>
              <span className="text-lg font-bold text-[#FF6B00]">{workers.length} Top Picks</span>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {workers.map((worker) => {
              const isInvited = invitedIds.includes(worker.id);
              return (
                <div 
                  key={worker.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#FF6B00]/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                    
                    {/* Worker Profile Summary */}
                    <div className="flex items-center gap-4">
                      <Avatar name={worker.name} size="lg" verified={true} />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-[#0A0A0A]">{worker.name}</h3>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-[#22C55E]/10 text-[#22C55E] rounded">
                            Verified
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                          <CategoryChip variant="orange">{worker.category}</CategoryChip>
                          <span>•</span>
                          <span>{worker.city}</span>
                          <span>•</span>
                          <span className="text-[#22C55E] font-medium">{worker.availability}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={Math.floor(worker.rating)} size="sm" />
                          <span className="text-sm font-semibold text-[#0A0A0A]">{worker.rating}</span>
                          <span className="text-xs text-gray-500">({worker.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4">
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Match Score</span>
                        <div className="flex items-center gap-1.5 md:justify-end">
                          <Sparkles size={16} className="text-[#FF6B00] animate-pulse" />
                          <span className="text-2xl font-extrabold text-[#FF6B00]">{worker.matchScore}%</span>
                        </div>
                      </div>
                      <div className="bg-[#F5F5F5] rounded-lg px-3 py-1.5 text-center">
                        <span className="text-xs text-gray-500 block">Est. Rate</span>
                        <span className="text-sm font-bold text-[#0A0A0A]">{worker.hourlyRate}</span>
                      </div>
                    </div>

                  </div>

                  {/* AI Match Reason / Insights */}
                  <div className="py-5">
                    <div className="flex gap-2 items-center mb-2 text-sm font-semibold text-[#FF6B00]">
                      <BrainCircuit size={16} />
                      <span>AI Insights</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed bg-[#FFF0E6]/30 border border-[#FF6B00]/10 rounded-xl p-4">
                      {worker.aiRationale}
                    </p>
                  </div>

                  {/* Skills & Actions Row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2 flex-wrap">
                      {worker.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-[#F5F5F5] text-xs text-gray-600 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Link to={`/worker/${worker.id}`} className="flex-1 sm:flex-none">
                        <Button variant="ghost" className="w-full text-sm">
                          View Profile
                        </Button>
                      </Link>
                      
                      <Button 
                        variant={isInvited ? 'disabled' : 'outline'} 
                        disabled={isInvited}
                        onClick={() => handleInvite(worker.id, worker.name)}
                        className="text-sm gap-2 whitespace-nowrap min-w-[140px]"
                      >
                        <Send size={14} />
                        {isInvited ? 'Invited' : 'Invite to Job'}
                      </Button>
                      
                      <Link to={`/client/bookings/${worker.id}`} className="flex-1 sm:flex-none">
                        <Button variant="primary" className="w-full text-sm gap-2">
                          <UserCheck size={14} />
                          Quick Book
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Support Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#0A0A0A] to-[#262626] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div>
              <h3 className="text-lg font-bold mb-1">Need a custom worker pool or special assistance?</h3>
              <p className="text-sm text-gray-400">Our customer success representatives can manually source candidates matching specific security clearances.</p>
            </div>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black gap-2 text-sm py-2">
              <MessageSquare size={16} />
              Contact Support
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
