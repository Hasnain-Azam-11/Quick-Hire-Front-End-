import heroShowcaseImg from "../assets/hero_showcase.png";

const steps = [
  {
    num: "1",
    text: "Choose a worker by price, skills, and reviews"
  },
  {
    num: "2",
    text: "Schedule a worker as early as today"
  },
  {
    num: "3",
    text: "Chat, pay, and review all in one place"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-[#FFF9E6] border-b border-yellow-200/60">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        
        {/* Soft yellow container box with left overlay card + right photo */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-100/60 to-yellow-100/60 rounded-3xl p-6 sm:p-10 border border-yellow-200 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Overlay Card */}
            <div className="md:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6 z-10">
              <h3 className="text-2xl font-extrabold text-[#0A0A0A]">
                How it works
              </h3>

              <div className="space-y-6">
                {steps.map((item) => (
                  <div key={item.num} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-base flex items-center justify-center flex-shrink-0 shadow-xs">
                      {item.num}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 pt-2 leading-snug">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Photo */}
            <div className="md:col-span-6 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src={heroShowcaseImg}
                alt="How QuickHire works"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs text-[#0A0A0A] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md">
                Fast & Secure Booking
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}