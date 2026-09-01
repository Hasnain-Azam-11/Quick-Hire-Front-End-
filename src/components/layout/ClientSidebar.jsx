import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Briefcase,
  Star,
  Settings,
} from "lucide-react";
import WorkerAvatar from "../ui/WorkerAvatar";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/client/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/client/post-job", icon: PlusCircle, label: "Post a Job" },
  { to: "/client/workers", icon: Users, label: "Browse Workers" },
  { to: "/client/jobs", icon: Briefcase, label: "My Jobs" },
  { to: "/client/reviews", icon: Star, label: "Reviews" },
  { to: "/client/settings", icon: Settings, label: "Settings" },
];

export default function ClientSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || "Ali Raza";
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
          <WorkerAvatar initials={getInitials(userName)} darkBg />
          <h3 className="mt-3 mb-1 font-semibold text-lg">{userName}</h3>
          <span className="text-xs px-3 py-1 bg-[#FF6B00] rounded-full font-medium">
            Client
          </span>
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
