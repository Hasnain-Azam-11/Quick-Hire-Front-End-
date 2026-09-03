import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Wrench,
  Tv,
  Package,
  Sparkles,
  Trees,
  Hammer,
  Paintbrush,
  Flame,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import heroShowcaseImg from "../assets/hero_showcase.png";

const categories = [
  {
    id: "assembly",
    label: "Assembly",
    icon: Wrench,
    title: "Assembly Services",
    bullets: [
      "Assemble or disassemble furniture items (beds, dressers, desks, tables)",
      "Experienced with flat-pack & complex home fixtures",
      "All necessary tools & equipment brought to your doorstep"
    ],
    pills: ["Furniture Assembly", "IKEA Assembly", "Bed Frame Assembly", "Desk Assembly"]
  },
  {
    id: "mounting",
    label: "Mounting",
    icon: Tv,
    title: "TV & Wall Mounting",
    bullets: [
      "Secure wall mounting for TVs of all sizes onto drywall or brick",
      "Hang heavy mirrors, artwork, shelves, and window blinds",
      "Conceal wiring for a clean, professional finish"
    ],
    pills: ["TV Mounting", "Wall Shelves", "Mirror Hanging", "Curtain Rods"]
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
    id: "cleaning",
    label: "Cleaning",
    icon: Sparkles,
    title: "House & Deep Cleaning",
    bullets: [
      "Routine room cleaning, kitchen degreasing, and floor scrubbing",
      "Move-in / move-out deep cleaning for apartments & houses",
      "Safe eco-friendly cleaning supplies provided upon request"
    ],
    pills: ["House Cleaning", "Deep Clean", "Move-Out Clean", "Kitchen Cleaning"]
  },
  {
    id: "outdoor",
    label: "Outdoor Help",
    icon: Trees,
    title: "Yard Work & Gardening",
    bullets: [
      "Lawn mowing, hedge trimming, weed removal, and yard cleanup",
      "Patio pressure washing and outdoor furniture setup",
      "Seasonal garden maintenance and plant care"
    ],
    pills: ["Lawn Mowing", "Yard Cleanup", "Hedge Trimming", "Garden Care"]
  },
  {
    id: "repairs",
    label: "Home Repairs",
    icon: Hammer,
    title: "Handyman & Repairs",
    bullets: [
      "Door lock replacements, minor drywall patching, and cabinet fixes",
      "Plumbing repairs for leaking faucets, sinks, and drains",
      "Light electrical fixture and ceiling fan installations"
    ],
    pills: ["AC Repair", "Plumbing Fix", "Locksmith", "Drywall Patching"]
  },
  {
    id: "painting",
    label: "Painting",
    icon: Paintbrush,
    title: "Interior Painting",
    bullets: [
      "Accent walls, full room interior painting, and trim touch-ups",
      "Surface preparation, caulking, and furniture protection dropcloths",
      "Precision lines and clean finish without mess"
    ],
    pills: ["Accent Wall", "Room Painting", "Trim Touch-Up", "Fence Paint"]
  },
  {
    id: "trending",
    label: "Trending",
    icon: Flame,
    title: "Top Requested Tasks",
    bullets: [
      "Book top-rated service providers for urgent same-day help",
      "Transparent hourly or per-task pricing upfront",
      "100% Satisfaction guarantee backed by 24/7 customer support"
    ],
    pills: ["Same-Day Help", "Event Staff", "Driver on Demand", "Baby Sitting"]
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [selectedCatId, setSelectedCatId] = useState("assembly");
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
          <div className="flex items-center justify-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none px-2 py-2">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`flex flex-col items-center gap-1.5 pb-2 px-3 transition-all cursor-pointer border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap ${
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
                  onClick={() => navigate(`/register?role=client&category=${encodeURIComponent(activeCategory.label)}`)}
                  className="bg-[#0A0A0A] hover:bg-[#FF6B00] text-white text-xs sm:text-sm font-bold py-3 px-6 rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Book {activeCategory.label}</span>
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