import { Link } from "react-router-dom";
import { Button } from "./Button";
import { UserCheck, Briefcase, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DualCTA() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Client CTA */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1F1F1F] text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-[#FF6B00] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-[#FF6B00] text-xs font-extrabold uppercase tracking-wider block">
                FOR CLIENTS & HOUSEHOLDS
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Need something done?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Connect with background-checked local professionals for house cleaning, childcare, moving, handyman work, and event staffing.
              </p>

              <div className="space-y-2 text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Free to post tasks & browse profile ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Transparent daily & hourly rates</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/register?role=client" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full text-sm py-3.5 px-8 font-bold gap-2">
                  <span>Sign Up as Client</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Card: Worker CTA */}
          <div className="bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-white text-[#FF6B00] rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-white/90 text-xs font-extrabold uppercase tracking-wider block">
                FOR SKILLED WORKERS & FREELANCERS
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Want to earn money?
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Offer your skills, set your own availability and daily rates, and get hired by top clients in your city.
              </p>

              <div className="space-y-2 text-xs text-white/90 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Keep 100% of your listed earnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Flexible schedule — work when you want</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex flex-col sm:flex-row items-center gap-3">
              <Link to="/register?role=worker" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-[#FF6B00] text-sm py-3.5 px-8 font-bold gap-2"
                >
                  <span>Become a Worker</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
