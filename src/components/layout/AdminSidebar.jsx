import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  AlertCircle,
  Settings,
} from "lucide-react";
import WorkerAvatar from "../ui/WorkerAvatar";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/dashboard", icon: Users, label: "Users" },
  { to: "/admin/dashboard", icon: Briefcase, label: "Jobs" },
  { to: "/admin/dashboard", icon: AlertCircle, label: "Verifications" },
  { to: "/admin/dashboard", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-[#0A0A0A] text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          <WorkerAvatar initials="A" />
          <h3 className="mt-3 mb-1">Admin</h3>
          <span className="text-xs px-3 py-1 bg-[#FF6B00] rounded-full">Administrator</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname.startsWith("/admin") && item.label === "Dashboard"
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
