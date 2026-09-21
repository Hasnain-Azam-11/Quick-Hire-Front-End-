import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { CATEGORY_ALIASES, CATEGORY_CHOICES, SUBCATEGORIES_MAP } from "../constants/categories";

// "plumber" / "driver" / "cooking": find the category whose name or services contain the text.
function findCategoryFor(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    CATEGORY_CHOICES.find(({ value, label }) => {
      const services = SUBCATEGORIES_MAP[value] || [];
      const aliases = CATEGORY_ALIASES[value] || [];
      return (
        aliases.some((a) => a.includes(q) || q.includes(a)) ||
        label.toLowerCase().includes(q) ||
        q.includes(label.toLowerCase()) ||
        services.some((s) => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()))
      );
    }) || null
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const match = findCategoryFor(searchQuery);
    if (match) {
      navigate(`/categories/${match.value}`);
    } else if (searchQuery.trim()) {
      navigate(`/register?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="bg-[#FAFBFD] pt-14 pb-10 overflow-hidden">
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
              aria-label="What do you need help with?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-16 py-4 bg-white text-[#0A0A0A] placeholder-gray-400 rounded-full text-base border-2 border-gray-200 focus:border-[#FF6B00] shadow-md focus:outline-none font-medium transition-all"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0A0A0A] hover:bg-[#FF6B00] text-white p-3 rounded-full transition-all shadow-sm cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
