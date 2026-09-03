import { ShieldCheck, UserCheck, Headset } from "lucide-react";

export default function SatisfactionGuarantee() {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-10">
        
        {/* Heading */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
            Your satisfaction, <span className="text-[#FF6B00]">guaranteed</span>
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0A0A0A]">Happiness Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every booking is backed by our customer happiness policy and 24/7 support team to ensure your task is completed to your satisfaction.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0A0A0A]">Vetted Workers</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              All service providers undergo mandatory CNIC verification, background checks, and community rating reviews before offering services.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Headset className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-[#0A0A0A]">Dedicated Support</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our responsive customer service representatives are available 24/7 via live chat and phone to resolve any queries immediately.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
