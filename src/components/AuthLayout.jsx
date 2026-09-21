import { Link } from 'react-router-dom';
import { ArrowLeft, Headphones, ShieldCheck, Sparkles } from 'lucide-react';

const POINTS = [
  { icon: ShieldCheck, text: 'Verified profiles and secure payments' },
  { icon: Sparkles, text: 'AI-powered matching for best results' },
  { icon: Headphones, text: '24/7 customer support' },
];

function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center shadow-sm">
        <span className="text-white text-xl font-black">Q</span>
      </div>
      <span className={`text-2xl font-bold tracking-tight ${light ? 'text-white' : 'text-[#0A0A0A]'}`}>QuickHire</span>
    </Link>
  );
}

// Shared shell for Sign In and Register: brand panel on the left (large screens),
// form on the right. `wide` gives the form room for a two-column layout.
export default function AuthLayout({ heading, subheading, wide = false, children }) {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel */}
      <aside className="hidden lg:flex relative overflow-hidden bg-[#0A0A0A] text-white p-14 xl:p-16 flex-col justify-between">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#FF6B00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 -right-10 w-96 h-96 bg-[#FF6B00] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Logo light />
        </div>

        <div className="relative z-10 space-y-8 max-w-md">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight">{heading}</h2>
            <p className="text-lg text-gray-300">{subheading}</p>
          </div>

          <ul className="space-y-4">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-gray-300">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#FF6B00]" />
                </span>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-gray-500">
          Pakistan&apos;s marketplace for daily &amp; short-term help.
        </p>
      </aside>

      {/* Form side */}
      <main className="flex flex-col min-h-screen px-6 sm:px-10 py-8">
        <div className="flex items-center justify-between">
          <div className="lg:invisible">
            <Logo />
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500! hover:text-[#FF6B00]! transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center py-10">
          <div className={`w-full ${wide ? 'max-w-xl' : 'max-w-md'}`}>{children}</div>
        </div>
      </main>
    </div>
  );
}
