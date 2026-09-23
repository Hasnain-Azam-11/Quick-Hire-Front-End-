import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, User } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import AuthField from '../../components/ui/AuthField';
import { Button } from '../../components/Button';
import { useAdminAuth } from '../../context/AdminAuthContext';

// Mock admin sign-in (no `is_staff` endpoint on the backend yet — see AdminAuthContext).
export default function AdminSignIn() {
  const navigate = useNavigate();
  const { isAdminAuthenticated, login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Incorrect username or password.');
    }
  };

  return (
    <AuthLayout heading="QuickHire Admin" subheading="Verify workers, manage categories and keep the marketplace running smoothly.">
      <div className="space-y-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center mb-2">
          <ShieldCheck size={22} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#0A0A0A]">Admin Portal</h1>
        <p className="text-gray-600">Restricted to QuickHire staff.</p>
      </div>

      {error && (
        <div role="alert" className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <AuthField
          label="Username"
          icon={User}
          placeholder="Enter your admin username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AuthField
          label="Password"
          icon={Lock}
          password
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="primary" fullWidth className="py-4 font-bold text-sm">
          Sign In
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-gray-400">
        Demo access: <span className="font-mono">admin</span> / <span className="font-mono">quickhire2026</span>
        <br />
        Not wired to the backend yet — see CLAUDE.md.
      </p>
    </AuthLayout>
  );
}
