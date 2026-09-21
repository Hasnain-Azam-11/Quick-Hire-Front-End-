import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AtSign, Loader2, Lock, Mail, Phone, User } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthField from '../components/ui/AuthField';
import GoogleButton from '../components/ui/GoogleButton';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { describeApiError } from '../api/auth';
import { resolveRedirect } from '../utils/redirect';

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your full name.';
  if (!USERNAME_PATTERN.test(form.username)) {
    errors.username = '3-20 characters: letters, numbers, dots or underscores.';
  }
  if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address.';
  const phone = form.phone.replace(/[\s-]/g, '');
  if (phone.replace(/\D/g, '').length < 10 || phone.length > 15) errors.phone = 'Enter a valid phone number (max 15 characters).';
  if (form.password.length < 8) errors.password = 'Use at least 8 characters.';
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, register, isAuthenticated } = useAuth();
  const redirectTarget = searchParams.get('redirect') || location.state?.from || null;

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Registering signs the user in, which lands here and sends them on to their destination.
  if (isAuthenticated) {
    return <Navigate to={resolveRedirect(user, redirectTarget)} replace />;
  }

  const field = (name) => ({
    value: form[name],
    error: errors[name],
    disabled: loading,
    onChange: (e) => {
      setForm((prev) => ({ ...prev, [name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const { signedIn } = await register(form);
      if (!signedIn) {
        // The account exists but the automatic sign-in failed: ask them to sign in manually.
        navigate('/sign-in', {
          replace: true,
          state: { from: redirectTarget, notice: 'Your account was created. Please sign in to continue.' },
        });
      }
      // Otherwise the session is set and the check above redirects them.
    } catch (err) {
      const { form: formError, fields } = describeApiError(err);
      setErrors({
        username: fields.username,
        email: fields.email,
        password: fields.password,
        phone: fields.phone_number,
        form: formError,
      });
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      wide
      heading="Join QuickHire today"
      subheading="Connect with thousands of verified workers across Pakistan."
    >
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-extrabold text-[#0A0A0A]">Create your account</h1>
        <p className="text-gray-600">It only takes a minute. Already a member?{' '}
          <Link to="/sign-in" state={{ from: redirectTarget }} className="text-[#FF6B00]! hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>

      {errors.form && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <AuthField
            label="Full Name"
            icon={User}
            placeholder="Enter your full name"
            autoComplete="name"
            {...field('name')}
          />
          <AuthField
            label="Username"
            icon={AtSign}
            placeholder="Choose a username"
            autoComplete="username"
            {...field('username')}
          />
          <AuthField
            label="Email"
            icon={Mail}
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            {...field('email')}
          />
          <AuthField
            label="Phone Number"
            icon={Phone}
            type="tel"
            placeholder="+92 300 1234567"
            autoComplete="tel"
            {...field('phone')}
          />
          <AuthField
            label="Password"
            icon={Lock}
            password
            placeholder="Create a password"
            autoComplete="new-password"
            hint="At least 8 characters"
            {...field('password')}
          />
          <AuthField
            label="Confirm Password"
            icon={Lock}
            password
            placeholder="Re-enter your password"
            autoComplete="new-password"
            {...field('confirmPassword')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          aria-busy={loading}
          className={`py-4 font-bold text-sm ${loading ? 'opacity-80 cursor-wait pointer-events-none' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
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

        <GoogleButton label="Sign up with Google" />
      </form>
    </AuthLayout>
  );
}
