import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/ui/PasswordInput";
import GoogleButton from "../components/ui/GoogleButton";
import { btnPrimary } from "../constants/categories";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated, role: userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "client") {
        navigate("/client/dashboard", { replace: true });
      } else {
        navigate("/worker/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, role);
      if (role === "client") {
        navigate("/client/dashboard");
      } else {
        navigate("/worker/dashboard");
      }
    } else {
      setError("Please fill in both email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#FF6B00] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">Q</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[#0A0A0A]">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your QuickHire account</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-[#F5F5F5] rounded-xl">
          <button
            type="button"
            onClick={() => setRole("client")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              role === "client"
                ? "bg-white text-[#FF6B00] shadow-sm"
                : "text-gray-600 hover:text-[#0A0A0A]"
            }`}
          >
            Client Login
          </button>
          <button
            type="button"
            onClick={() => setRole("worker")}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              role === "worker"
                ? "bg-white text-[#FF6B00] shadow-sm"
                : "text-gray-600 hover:text-[#0A0A0A]"
            }`}
          >
            Worker Login
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F5F5F5] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#0A0A0A] mb-2 font-medium">Password</label>
            <PasswordInput
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <Link to="/sign-in" className="text-sm text-[#FF6B00] hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className={`w-full py-4 ${btnPrimary} cursor-pointer`}>
            Sign In as {role === "client" ? "Client" : "Worker"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <GoogleButton label="Sign in with Google" />
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to={`/register?role=${role}`} className="text-[#FF6B00] hover:underline font-semibold">
            Register here
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link to="/admin/dashboard" className="text-xs text-gray-400 hover:text-[#FF6B00]">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}
