import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  Globe,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings,
  Star,
  Store,
  UserRound,
  X,
} from "lucide-react";
import { Avatar } from "../Avatar";
import NotificationsBell from "../NotificationsBell";
import { useAuth } from "../../context/AuthContext";
import { useWorkerData } from "../../context/WorkerDataContext";
import { useMarketplace } from "../../context/MarketplaceContext";

const NAV_ITEMS = [
  { to: "/worker/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/worker/jobs", label: "Jobs", icon: Search },
  { to: "/worker/offers", label: "Offers", icon: Inbox },
  { to: "/worker/services", label: "Services", icon: Briefcase },
  { to: "/worker/applications", label: "Applications", icon: FileText },
  { to: "/worker/schedule", label: "Schedule", icon: Calendar },
  { to: "/worker/reviews", label: "Reviews", icon: Star },
];

// Anchors inherit their colour globally (index.css), so link colours need `!`.
const linkClass = ({ isActive }) =>
  `relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
    isActive ? "bg-[#FFF0E6] text-[#FF6B00]!" : "text-gray-600! hover:bg-gray-100 hover:text-[#0A0A0A]!"
  }`;

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#FF6B00] text-white text-[11px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
}

export default function WorkerTopNav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { profile, pendingOfferCount, setWorkerDuty } = useWorkerData();
  const { unreadMessageCount } = useMarketplace();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  const isOnDuty = profile?.isOnDuty ?? true;
  const name = user?.name || "Worker";
  const firstName = name.split(" ")[0];

  // Close the profile menu on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointerDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const toggleDuty = () => setWorkerDuty(user.id, !isOnDuty);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/sign-in");
  };

  const dutyChip = (
    <button
      type="button"
      onClick={toggleDuty}
      role="switch"
      aria-checked={isOnDuty}
      aria-label="Toggle on-duty status"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
        isOnDuty
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-gray-100 border-gray-200 text-gray-500"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${isOnDuty ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
      {isOnDuty ? "On-Duty" : "Off-Duty"}
    </button>
  );

  const menuItemClass =
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700! hover:bg-[#F5F5F5] transition-colors cursor-pointer text-left";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link to="/worker/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-[#FF6B00] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-lg font-black">Q</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold tracking-tight text-[#0A0A0A]">QuickHire</span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Worker navigation">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={linkClass}>
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {to === "/worker/offers" && <Badge count={pendingOfferCount} />}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">{dutyChip}</div>

          <Link
            to="/messages"
            aria-label={`Messages${unreadMessageCount ? `, ${unreadMessageCount} unread` : ""}`}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600! hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {unreadMessageCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FF6B00] ring-2 ring-white" />
            )}
          </Link>

          <NotificationsBell />

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Avatar name={name} size="sm" verified={profile?.verified} />
              <span className="hidden sm:inline text-sm font-semibold text-[#0A0A0A]">{firstName}</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-xl p-2"
              >
                <div className="px-3 py-3 border-b border-gray-100 mb-1">
                  <div className="font-semibold text-[#0A0A0A] truncate">{name}</div>
                  <div className="text-xs text-gray-500">Worker account</div>
                </div>

                <Link
                  role="menuitem"
                  to={`/worker-profile/${user?.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={menuItemClass}
                >
                  <UserRound className="w-4 h-4 text-gray-400" />
                  My public profile
                </Link>
                <Link role="menuitem" to="/worker/settings" onClick={() => setMenuOpen(false)} className={menuItemClass}>
                  <Settings className="w-4 h-4 text-gray-400" />
                  Profile settings
                </Link>
                <Link role="menuitem" to="/profile" onClick={() => setMenuOpen(false)} className={menuItemClass}>
                  <UserRound className="w-4 h-4 text-gray-400" />
                  My account &amp; bio
                </Link>
                <Link role="menuitem" to="/" onClick={() => setMenuOpen(false)} className={menuItemClass}>
                  <Globe className="w-4 h-4 text-gray-400" />
                  Hire as a client (website)
                </Link>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button type="button" role="menuitem" onClick={handleLogout} className={`${menuItemClass} text-red-600!`}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="xl:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1" aria-label="Worker navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={linkClass}>
              <Icon className="w-4 h-4" />
              <span className="flex-1">{label}</span>
              {to === "/worker/offers" && <Badge count={pendingOfferCount} />}
            </NavLink>
          ))}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold text-[#FF6B00]! hover:bg-[#FFF0E6] transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Hire as a client</span>
          </Link>
          <div className="pt-2 sm:hidden">{dutyChip}</div>
        </nav>
      )}
    </header>
  );
}
