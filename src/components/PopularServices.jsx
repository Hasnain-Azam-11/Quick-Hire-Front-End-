import { useNavigate } from "react-router-dom";
import cleaningImg from "../assets/service_cleaning.png";
import handymanImg from "../assets/service_handyman.png";
import heroShowcaseImg from "../assets/hero_showcase.png";

const projects = [
  {
    id: 1,
    title: "Furniture Assembly",
    startingRate: "1,500",
    image: heroShowcaseImg,
    category: "Assembly"
  },
  {
    id: 2,
    title: "TV & Wall Mounting",
    startingRate: "1,800",
    image: handymanImg,
    category: "Mounting"
  },
  {
    id: 3,
    title: "House & Deep Cleaning",
    startingRate: "1,200",
    image: cleaningImg,
    category: "Cleaning"
  },
  {
    id: 4,
    title: "Help Moving & Lifting",
    startingRate: "2,000",
    image: heroShowcaseImg,
    category: "Moving"
  },
  {
    id: 5,
    title: "Plumbing & Sink Repairs",
    startingRate: "1,600",
    image: handymanImg,
    category: "Handyman"
  },
  {
    id: 6,
    title: "Yard Work & Mowing",
    startingRate: "1,400",
    image: cleaningImg,
    category: "Outdoor"
  },
  {
    id: 7,
    title: "Interior Painting",
    startingRate: "2,200",
    image: handymanImg,
    category: "Painting"
  },
  {
    id: 8,
    title: "Heavy Lifting & Rearranging",
    startingRate: "1,500",
    image: heroShowcaseImg,
    category: "Moving"
  }
];

export default function PopularServices() {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-10">
        
        {/* Heading */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
            Popular Projects
          </h2>
          <p className="text-gray-500 text-sm">
            Book top-rated, background-checked service providers for everyday home tasks.
          </p>
        </div>

        {/* 4x2 Grid of Cards matching TaskRabbit card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => navigate(`/register?role=client&category=${encodeURIComponent(proj.category)}`)}
              className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#FF6B00] hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              {/* Card Photo */}
              <div className="h-44 overflow-hidden relative">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#0A0A0A]/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                  {proj.category}
                </span>
              </div>

              {/* Card Footer Pill Box */}
              <div className="p-4 bg-[#F5F5F5] group-hover:bg-[#FFF0E6] transition-colors border-t border-gray-100 text-center space-y-1">
                <h3 className="font-bold text-sm text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500 font-semibold">
                  Projects starting at <span className="text-[#FF6B00] font-bold">PKR {proj.startingRate}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
