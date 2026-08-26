import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Users,
  Star,
  Settings,
} from "lucide-react";
import WorkerAvatar from "../ui/WorkerAvatar";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/post-job", icon: Briefcase, label: "My Jobs", altMatch: "/client/post-job" },
  { to: "/bookings/1", icon: Calendar, label: "Bookings", altMatch: "/bookings" },
  { to: "/browse-workers", icon: Users, label: "Browse Workers" },
  { to: "/reviews/1", icon: Star, label: "Reviews", altMatch: "/reviews" },
  { to: "/client/dashboard", icon: Settings, label: "Settings" },
];

export default function ClientSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (item) => {
    if (location.pathname === item.to) return true;
    if (item.altMatch && location.pathname.startsWith(item.altMatch)) return true;
    return false;
  };

  return (
    <div className="w-60 bg-[#0A0A0A] text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          <WorkerAvatar initials="AK" />
          <h3 className="mt-3 mb-1">Ahmed Khan</h3>
          <span className="text-xs px-3 py-1 bg-[#FF6B00] rounded-full">Client</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive(item)
                ? "bg-[#FF6B00] text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center justify-center gap-2 px-4 py-3 text-gray-400 hover:text-white transition-colors w-full"
        >
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
