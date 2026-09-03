import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Car,
  Package,
  Hammer,
  Baby,
  Users,
  Sparkles,
  ChefHat,
  Construction,
  Shield,
  Trees,
  GraduationCap,
  Building2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import heroShowcaseImg from "../assets/hero_showcase.png";

const categories = [
  {
    id: "driving",
    label: "Driving",
    icon: Car,
    title: "Professional Driving Services",
    bullets: [
      "Personal driver for daily commutes or long-distance travel",
      "Chauffeur services for special events & airport pickups",
      "Background-checked, licensed, and experienced drivers"
    ],
    pills: ["Personal Driver", "Chauffeur", "Airport Pickups", "Outstation Driver"]
  },
  {
    id: "moving",
    label: "Moving",
    icon: Package,
    title: "Help Moving & Hauling",
    bullets: [
      "Heavy lifting, loading, and unloading of moving trucks",
      "In-home furniture rearrangement and appliance transport",
      "Packing and unpacking assistance for smooth relocations"
    ],
    pills: ["Furniture Removal", "Heavy Lifting", "Truck Loading", "Office Moving"]
  },
  {
    id: "handyman",
    label: "Handyman",
    icon: Hammer,
    title: "Handyman & Home Repairs",
    bullets: [
      "Door lock replacements, minor drywall patching, and cabinet fixes",
      "Plumbing repairs for leaking faucets, sinks, and drains",
      "Light electrical fixture and ceiling fan installations"
    ],
    pills: ["Plumbing Fix", "AC Repair", "Locksmith", "Drywall Patching"]
  },
  {
    id: "childcare",
    label: "Childcare",
    icon: Baby,
    title: "Babysitting & Childcare",
    bullets: [
      "Experienced, vetted babysitters for infants and toddlers",
      "After-school care, homework help, and supervision",
      "Flexible hourly babysitting for day or night"
    ],
    pills: ["Babysitter", "Nanny Care", "After-School Care", "Infant Care"]
  },
  {
    id: "elder_care",
    label: "Elder Care",
    icon: Users,
    title: "Compassionate Elder Care",
    bullets: [
      "Daily companionship, mobility assistance, and routine care",
      "Medication reminders and meal preparation support",
      "Trained and empathetic caregivers for senior family members"
    ],
    pills: ["Senior Companionship", "Mobility Assistance", "Daily Home Helper", "Caregiver"]
  },
  {
    id: "event_staffing",
    label: "Event Staffing",
    icon: Sparkles,
    title: "Event & Party Staffing",
    bullets: [
      "Professional waiters, hosts, and setup staff for events",
      "Party cleanup and food presentation support",
      "Experienced crew for corporate and private gatherings"
    ],
    pills: ["Event Waiters", "Party Setup", "Event Host", "Post-Event Cleanup"]
  },
  {
    id: "cooking",
    label: "Cooking",
    icon: ChefHat,
    title: "Home Cook & Meal Prep",
    bullets: [
      "Personal home cooks for daily family meals",
      "Specialized menu preparation for events & dinner parties",
      "Hygienic, customized cooking suited to your diet"
    ],
    pills: ["Daily Home Cook", "Event Catering", "Meal Prep", "Specialty Chef"]
  },
  {
    id: "construction",
    label: "Construction",
    icon: Construction,
    title: "Construction & Labor Help",
    bullets: [
      "Skilled and general labor for home renovation projects",
      "Tile fixing, masonry work, and wall construction",
      "Material handling and site cleanup services"
    ],
    pills: ["Masonry Work", "Renovation Helper", "Tile Fixing", "Site Labor"]
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    title: "Security Guard Services",
    bullets: [
      "Vetted security personnel for homes & residential areas",
      "Event security and crowd control services",
      "Night watchmen and gate security guards"
    ],
    pills: ["Home Security Guard", "Event Security", "Night Watchman", "Gate Keeper"]
  },
  {
    id: "gardening",
    label: "Gardening",
    icon: Trees,
    title: "Yard Work & Gardening",
    bullets: [
      "Lawn mowing, hedge trimming, weed removal, and yard cleanup",
      "Patio pressure washing and outdoor plant care",
      "Seasonal garden maintenance and routine lawn care"
    ],
    pills: ["Lawn Mowing", "Yard Cleanup", "Hedge Trimming", "Garden Maintenance"]
  },
  {
    id: "tutoring",
    label: "Tutoring",
    icon: GraduationCap,
    title: "Home & Online Tutoring",
    bullets: [
      "Subject tutors for school, college, and test preparation",
      "Language learning, math, science, and coding instructors",
      "Personalized 1-on-1 tutoring sessions"
    ],
    pills: ["Math Tutor", "Science Tutor", "Language Teacher", "Exam Prep"]
  },
  {
    id: "beauty",
    label: "Beauty",
    icon: Sparkles,
    title: "At-Home Beauty Services",
    bullets: [
      "Professional salon services right at your doorstep",
      "Hair styling, makeup, manicures & pedicures",
      "Skincare treatments & bridal packages"
    ],
    pills: ["At-Home Salon", "Hair Styling", "Makeup Artist", "Manicure/Pedicure"]
  },
  {
    id: "office_support",
    label: "Office Support",
    icon: Building2,
    title: "Office & Admin Support",
    bullets: [
      "Data entry, document filing & office administrative help",
      "Front desk reception and guest management",
      "Office errand running and clerical support"
    ],
    pills: ["Data Entry", "Office Assistant", "Receptionist", "Office Errand Boy"]
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [selectedCatId, setSelectedCatId] = useState("driving");
  const [searchQuery, setSearchQuery] = useState("");

  const activeCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/register?role=client&q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/register?role=client");
    }
  };

  return (
    <section className="bg-[#FAFBFD] pt-12 pb-16 border-b border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        
        {/* Centered Main Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
            Book trusted help for home tasks
          </h1>
        </div>

        {/* Centered Pill Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="What do you need help with?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-16 py-4 bg-white text-[#0A0A0A] placeholder-gray-400 rounded-full text-base border-2 border-gray-200 focus:border-[#FF6B00] shadow-md focus:outline-none font-medium transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A0A0A] hover:bg-[#FF6B00] text-white p-3 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Icon Category Navigation Tabs Bar */}
        <div className="border-b border-gray-200 pb-2 max-w-5xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 px-2 py-2">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`flex flex-col items-center gap-1.5 pb-2 px-2 transition-all cursor-pointer border-b-2 font-bold text-xs whitespace-nowrap ${
                    isActive
                      ? "border-[#FF6B00] text-[#FF6B00]"
                      : "border-transparent text-gray-500 hover:text-[#0A0A0A]"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-[#FF6B00]/10 text-[#FF6B00]" : "text-gray-500"}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick-filter Pill Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {activeCategory.pills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setSearchQuery(pill)}
              className="px-4 py-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold rounded-full shadow-2xs transition-all cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Interactive Showcase Banner Box (Left Floating White Card + Right Photo) */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50/80 via-emerald-50/50 to-teal-50/80 rounded-3xl p-6 sm:p-10 border border-teal-100 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Overlay Card */}
            <div className="md:col-span-6 bg-white/95 backdrop-blur-xs rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-5 z-10">
              <h3 className="text-2xl font-extrabold text-[#0A0A0A]">
                {activeCategory.title}
              </h3>

              <ul className="space-y-3">
                {activeCategory.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/categories/${activeCategory.id}`)}
                  className="bg-[#0A0A0A] hover:bg-[#FF6B00] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore {activeCategory.label} Subcategories</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="md:col-span-6 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src={heroShowcaseImg}
                alt={activeCategory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[#0A0A0A] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                ✓ Verified QuickHire Worker
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}