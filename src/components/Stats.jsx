import { Star, ShieldCheck, MapPin, CheckCircle2, Award } from "lucide-react";

const stats = [
  {
    value: "1.1 Million+",
    label: "Positive Reviews",
    icon: Star
  },
  {
    value: "10 Million+",
    label: "Tasks Done",
    icon: CheckCircle2
  },
  {
    value: "140,000+",
    label: "Verified Workers",
    icon: ShieldCheck
  },
  {
    value: "50+ Cities",
    label: "Covered Nationwide",
    icon: MapPin
  },
  {
    value: "4.8 / 5.0",
    label: "Average Worker Rating",
    icon: Award
  }
];

export default function Stats() {
  return (
    <section className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="flex flex-wrap items-center justify-around gap-6 text-center">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-[#0A0A0A]">{stat.label}</div>
                  <div className="text-base font-extrabold text-emerald-700">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}