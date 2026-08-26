import { Star } from "lucide-react";

export default function StarRating({ rating, size = "w-4 h-4", max = 5 }) {
  return (
    <div className={`flex items-center text-[#FF6B00]`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`${size} ${i < Math.floor(rating) ? "fill-current" : "fill-current text-gray-300"}`}
        />
      ))}
    </div>
  );
}
