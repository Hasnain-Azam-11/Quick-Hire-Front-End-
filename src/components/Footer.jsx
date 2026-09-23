import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Globe, Share2, MessageCircle, Mail, Shield } from "lucide-react";

const footerColumns = [
  {
    heading: "Discover",
    links: [
      { label: "Become a Worker", to: "/become-worker" },
      { label: "Services By City", to: "/#services" },
      { label: "Elite Workers", to: "/#services" },
      { label: "Help Nearby", to: "/register" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/#services" },
      { label: "Careers", to: "/register" },
      { label: "Press & News", to: "/#services" },
      { label: "Terms & Privacy", to: "/#services" },
    ],
  },
  {
    heading: "For Clients",
    links: [
      { label: "How It Works", to: "/#how-it-works" },
      { label: "Happiness Guarantee", to: "/#services" },
      { label: "Safety & Verification", to: "/register" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", to: "/sign-in" },
      { label: "Contact Us", to: "/sign-in" },
      { label: "Admin Login", to: "/admin/login" },
    ],
  },
];

export default function Footer() {
  const { workerEntryPath } = useAuth();

  return (
    <footer className="bg-[#14202E] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand & Mission Col */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-white text-xl font-extrabold tracking-tight">
              <div className="w-9 h-9 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
                Q
              </div>
              <span className="text-white text-2xl font-bold">QuickHire</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Pakistan's leading platform for daily & short-term labor hiring. Connecting verified workers with clients.
            </p>
          </div>

          {/* 4 Multi-Column Links */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.heading} className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{col.heading}</h4>
                <ul className="space-y-2 text-xs">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.label === "Become a Worker" ? workerEntryPath : link.to} className="text-gray-400 hover:text-[#FF6B00] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar: App Store Badges, Social Icons & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF6B00]" />
            <span>© 2026 QuickHire Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}