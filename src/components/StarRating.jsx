import { Star } from 'lucide-react';

export function StarRating({ rating, maxRating = 5, size = 'md', interactive = false, onRatingChange }) {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const iconSize = sizes[size];

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            size={iconSize}
            fill={star <= rating ? '#FF6B00' : 'none'}
            stroke={star <= rating ? '#FF6B00' : '#D1D5DB'}
            strokeWidth={2}
          />
        </button>
      ))}
    </div>
  );
}