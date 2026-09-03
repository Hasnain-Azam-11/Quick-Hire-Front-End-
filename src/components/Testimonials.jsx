import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Elizabeth P.",
    rating: 5,
    quote: "Fatima arrived right on time with all necessary tools. She assembled two complex IKEA wardrobes and a bed frame in under 3 hours!",
    service: "Furniture Assembly"
  },
  {
    id: 2,
    name: "Tariq B.",
    rating: 5,
    quote: "Amazing experience! The driver arrived promptly, helped with heavy luggage, and navigated weekend city traffic smoothly.",
    service: "On-Demand Driver"
  },
  {
    id: 3,
    name: "Gemma H.",
    rating: 5,
    quote: "Needed 4 event assistants for our corporate dinner. The QuickHire team handled guest seating and catering setup flawlessly.",
    service: "Event Staffing"
  },
  {
    id: 4,
    name: "Salman S.",
    rating: 5,
    quote: "Very impressed with the deep kitchen clean. The worker was thorough, polite, and left everything spotless.",
    service: "House Cleaning"
  },
  {
    id: 5,
    name: "Aria E.",
    rating: 5,
    quote: "Mounted my 65-inch OLED TV and concealed all the cables cleanly inside the wall. Highly professional finish!",
    service: "TV & Wall Mounting"
  },
  {
    id: 6,
    name: "Chris R.",
    rating: 5,
    quote: "Helped move heavy furniture across town. Fast, careful with delicate items, and extremely courteous. Will hire again!",
    service: "Help Moving"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#FAFBFD] border-t border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-10">
        
        {/* Heading */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
            See what happy customers are saying about QuickHire
          </h2>
        </div>

        {/* 3x2 Grid of Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-200 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#0A0A0A]">{rev.name}</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[#FF6B00] font-bold underline cursor-pointer">
                  {rev.service}
                </span>
                <span className="text-gray-400">Verified Hire</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust rating bar */}
        <div className="flex items-center justify-center gap-2 pt-4 text-xs sm:text-sm font-semibold text-gray-700">
          <span>Great</span>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            ))}
          </div>
          <span>4.8 out of 5 based on <strong>30,000+ reviews</strong></span>
        </div>

      </div>
    </section>
  );
}
