import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  Calendar,
  Star,
  Settings,
} from "lucide-react";
import WorkerAvatar from "../ui/WorkerAvatar";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/worker/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/worker/jobs", icon: Search, label: "Browse Jobs" },
  { to: "/worker/applications", icon: FileText, label: "Applications" },
  { to: "/worker/schedule", icon: Calendar, label: "Schedule" },
  { to: "/worker/reviews", icon: Star, label: "Reviews" },
  { to: "/worker/settings", icon: Settings, label: "Settings" },
];

export default function WorkerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "Fatima Ahmed";
  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="w-60 bg-[#0A0A0A] text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          <WorkerAvatar initials={getInitials(userName)} verified darkBg />
          <h3 className="mt-3 mb-1 font-semibold text-lg">{userName}</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-[#FF6B00] rounded-full font-medium">
              Worker
            </span>
            {user?.isOnDuty !== undefined && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${user.isOnDuty ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-500/20 text-gray-400'}`}>
                {user.isOnDuty ? 'On-Duty' : 'Off-Duty'}
              </span>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#FF6B00] text-white font-medium shadow-md shadow-[#FF6B00]/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors w-full cursor-pointer"
        >
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
