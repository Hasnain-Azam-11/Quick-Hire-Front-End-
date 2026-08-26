export function CategoryChip({ children, variant = 'orange' }) {
  const styles = variant === 'orange'
    ? 'bg-[#FF6B00] text-white'
    : 'bg-[#F5F5F5] text-[#0A0A0A]';

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${styles}`}>
      {children}
    </span>
  );
}