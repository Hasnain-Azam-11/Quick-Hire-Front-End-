import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Labelled input with a leading icon, inline error / hint and (for passwords) a show/hide toggle.
export default function AuthField({ label, icon: Icon, error, hint, password = false, type = 'text', ...props }) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const messageId = `${id}-message`;

  const stateStyles = error
    ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
    : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20';

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-[#0A0A0A] mb-2">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}

        <input
          id={id}
          type={password ? (visible ? 'text' : 'password') : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? messageId : undefined}
          className={`w-full py-3 ${Icon ? 'pl-11' : 'pl-4'} ${password ? 'pr-12' : 'pr-4'} bg-[#F5F5F5] border-2 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-4 ${stateStyles}`}
          {...props}
        />

        {password && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6B00] transition-colors cursor-pointer"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {(error || hint) && (
        <p id={messageId} className={`mt-1.5 text-xs ${error ? 'text-[#EF4444]' : 'text-gray-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
