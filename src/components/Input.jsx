import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, success, className = '', ...props }, ref) => {
    const stateStyles = error
      ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20'
      : success
      ? 'border-[#22C55E] focus:border-[#22C55E] focus:ring-[#22C55E]/20'
      : 'border-gray-200 focus:border-[#FF6B00] focus:ring-[#FF6B00]/20';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-[#0A0A0A] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-[#F5F5F5] border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${stateStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[#EF4444]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';