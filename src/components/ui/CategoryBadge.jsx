export default function CategoryBadge({ children }) {
  return (
    <span className="px-3 py-1 bg-[#FFF0E6] text-[#FF6B00] rounded-full text-xs font-medium border border-[#FF6B00]/20">
      {children}
    </span>
  );
}
