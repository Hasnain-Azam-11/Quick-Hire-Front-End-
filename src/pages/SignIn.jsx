import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Loader2, Lock, User } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import AuthField from "../components/ui/AuthField";
import GoogleButton from "../components/ui/GoogleButton";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { describeApiError } from "../api/auth";
import { resolveRedirect } from "../utils/redirect";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { login, user, isAuthenticated } = useAuth();
  const from = location.state?.from;
  const notice = location.state?.notice;

  // Signed in (already, or just now): go to where they were headed, else their dashboard.
  if (isAuthenticated) {
    return <Navigate to={resolveRedirect(user, from)} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const next = {};
    if (!username.trim()) next.username = "Enter your username.";
    if (!password) next.password = "Enter your password.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (err) {
      const { form } = describeApiError(err);
      // A 400 from the login endpoint means the credentials were rejected.
      setErrors({ form: err.response?.status === 400 ? "Incorrect username or password." : form });
      setLoading(false);
    }
  };

  const clearError = (field) => setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));

  return (
    <AuthLayout
      heading="Welcome back to QuickHire"
      subheading="Sign in to hire trusted workers or pick up where you left off."
    >
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-[#0A0A0A]">Sign in</h1>
        <p className="text-gray-600">Enter your details to access your account.</p>
      </div>

      {notice && !errors.form && (
        <div role="status" className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl mb-6 text-sm">
          {notice}
        </div>
      )}

      {errors.form && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <AuthField
          label="Username"
          icon={User}
          placeholder="Enter your username"
          autoComplete="username"
          disabled={loading}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            clearError("username");
          }}
          error={errors.username}
        />

        <div className="space-y-2">
          <AuthField
            label="Password"
            icon={Lock}
            password
            placeholder="Enter your password"
            autoComplete="current-password"
            disabled={loading}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError("password");
            }}
            error={errors.password}
          />
          <div className="flex justify-end">
            <Link to="/sign-in" className="text-sm text-[#FF6B00]! hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          aria-busy={loading}
          className={`py-4 font-bold text-sm ${loading ? "opacity-80 cursor-wait pointer-events-none" : ""}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleButton label="Sign in with Google" />
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        New to QuickHire?{" "}
        <Link to="/register" state={{ from }} className="text-[#FF6B00]! hover:underline font-semibold">
          Create an account
        </Link>
      </p>

      <p className="mt-3 text-center">
        <Link to="/admin/dashboard" className="text-xs text-gray-400! hover:text-[#FF6B00]!">
          Admin Login
        </Link>
      </p>
    </AuthLayout>
  );
}
