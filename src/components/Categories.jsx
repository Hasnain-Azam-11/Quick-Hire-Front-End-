import { Link, useNavigate } from "react-router-dom";
import {
  Car,
  Package,
  Hammer,
  HeartHandshake,
  Sparkles,
  ChefHat,
  Construction,
  Shield,
  Flower2,
  GraduationCap,
  SprayCan,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const CATEGORY_ICONS = {
  driving: Car,
  moving: Package,
  handyman: Hammer,
  caregiving: HeartHandshake,
  event_staffing: Sparkles,
  cooking: ChefHat,
  construction: Construction,
  security: Shield,
  gardening: Flower2,
  tutoring: GraduationCap,
  beauty: Sparkles,
  cleaning: SprayCan,
};

export const categoriesList = [
  { slug: "driving", label: "Driving", icon: Car },
  { slug: "moving", label: "Moving", icon: Package },
  { slug: "handyman", label: "Handyman", icon: Hammer },
  { slug: "caregiving", label: "Caregiving", icon: HeartHandshake },
  { slug: "event_staffing", label: "Event Staffing", icon: Sparkles },
  { slug: "cooking", label: "Cooking", icon: ChefHat },
  { slug: "construction", label: "Construction", icon: Construction },
  { slug: "security", label: "Security", icon: Shield },
  { slug: "gardening", label: "Gardening", icon: Flower2 },
  { slug: "tutoring", label: "Tutoring", icon: GraduationCap },
  { slug: "beauty", label: "Beauty", icon: Sparkles },
  { slug: "cleaning", label: "Cleaning", icon: SprayCan },
];

export default function Categories() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const handlePostCustomJob = () => {
    if (isAuthenticated) {
      if (role === 'client') {
        navigate('/post-job');
      } else {
        navigate('/post-job');
      }
    } else {
      navigate('/register?redirect=/post-job');
    }
  };

  return (
    <section className="py-14 bg-[#FAFBFD] border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] tracking-tight">
            Browse by Category
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Pick a category, tell us what you need, and hire from top-rated local workers.
          </p>
        </div>

        {/* Full Responsive Grid - NO slider, NO horizontal scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categoriesList.map(({ slug, label, icon: Icon }) => (
            <Link
              key={slug}
              to={`/categories/${slug}`}
              className="bg-white hover:bg-[#FFF0E6] border border-gray-200 hover:border-[#FF6B00] rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 hover:shadow-md group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] group-hover:bg-[#FF6B00]/10 text-gray-700 group-hover:text-[#FF6B00] flex items-center justify-center transition-colors">
                <Icon size={24} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors leading-tight">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Single "Post a custom job" Button */}
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={handlePostCustomJob}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#FF6B00] text-white font-bold text-sm sm:text-base rounded-full transition-all shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-0.5"
          >
            <span>Can&apos;t find what you need? Post your own job</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}