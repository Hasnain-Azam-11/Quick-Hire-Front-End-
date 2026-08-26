export default function VerifiedBadge({ className = "w-5 h-5" }) {
  return (
    <div className={`bg-[#22C55E] text-white rounded-full p-0.5 flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
  );
}
