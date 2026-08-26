export function StatusPill({ status, children }) {
  const styles = {
    pending: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    confirmed: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
    completed: 'bg-[#0A0A0A]/10 text-[#0A0A0A] border-[#0A0A0A]/20',
    active: 'bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/20',
    cancelled: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    verified: 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20',
    unverified: 'bg-gray-100 text-gray-600 border-gray-200'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
      {children}
    </span>
  );
}