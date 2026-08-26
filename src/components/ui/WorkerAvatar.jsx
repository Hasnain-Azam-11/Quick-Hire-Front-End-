import VerifiedBadge from "./VerifiedBadge";

export default function WorkerAvatar({
  initials,
  size = "w-16 h-16",
  textSize = "text-2xl",
  verified = false,
  darkBg = false,
}) {
  return (
    <div
      className={`${size} rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FF8C3A] flex items-center justify-center text-white ${textSize} relative flex-shrink-0`}
    >
      {initials}
      {verified && (
        <div className={`absolute -bottom-1 -right-1 ${darkBg ? "bg-[#0A0A0A]" : "bg-white"} p-0.5 rounded-full`}>
          <VerifiedBadge />
        </div>
      )}
    </div>
  );
}
