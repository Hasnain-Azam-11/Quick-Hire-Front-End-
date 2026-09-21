import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, roles, isAuthenticated, workerEntryPath, logout } = useAuth();

  const isWorker = roles.includes("worker");
  const firstName = user?.name?.split(" ")[0];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-[#0A0A0A] font-extrabold tracking-tight">
          <div className="w-9 h-9 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">
            Q
          </div>
          <span className="text-[#0A0A0A] text-2xl font-bold tracking-tight">QuickHire</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <a href="/#services" className="hover:text-[#FF6B00] transition-colors">
            Services
          </a>
          <Link to="/workers" className="hover:text-[#FF6B00] transition-colors">
            Find Workers
          </Link>
          {isAuthenticated && (
            <Link to="/my-requests" className="hover:text-[#FF6B00] transition-colors">
              My Requests
            </Link>
          )}
          <Link to={workerEntryPath} className="hover:text-[#FF6B00] font-bold text-[#FF6B00] transition-colors">
            {isWorker ? "Worker Dashboard" : isAuthenticated ? "Become a Worker" : "Start Earning"}
          </Link>
          <a href="/#how-it-works" className="hover:text-[#FF6B00] transition-colors">
            How It Works
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                aria-label="My profile and bio"
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Avatar name={user?.name || "Me"} size="sm" />
                <span className="hidden sm:inline text-sm font-semibold text-[#0A0A0A]!">{firstName}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-bold text-gray-700 hover:text-[#FF6B00] transition-colors cursor-pointer whitespace-nowrap"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="text-sm font-bold text-gray-700 hover:text-[#FF6B00] transition-colors hidden sm:inline-block">
                Sign In
              </Link>

              <Link to="/register">
                <button
                  type="button"
                  className="bg-[#0A0A0A] hover:bg-[#FF6B00] text-white text-xs font-bold py-2.5 px-5 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
