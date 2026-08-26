import { ButtonHTMLAttributes, ReactNode } from 'react';

export function Button({ variant = 'primary', children, fullWidth, className = '', disabled, ...props }) {
  const baseStyles = 'px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-[#FF6B00] text-white hover:bg-[#FF7A1A] hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border-2 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-[#0A0A0A] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed',
    disabled: 'bg-[#F5F5F5] text-gray-400 cursor-not-allowed'
  };

  const variantClass = disabled ? variants.disabled : variants[variant];
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantClass} ${widthClass} ${className}`}
      disabled={disabled || variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
}