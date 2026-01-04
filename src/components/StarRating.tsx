import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = false,
  interactive = false,
  onRatingChange
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const partial = !filled && index < rating;
          
          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(index)}
              className={cn(
                'relative transition-transform',
                interactive && 'hover:scale-110 cursor-pointer',
                !interactive && 'cursor-default'
              )}
              aria-label={`${index + 1} star${index !== 0 ? 's' : ''}`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  filled || partial ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                )}
              />
              {partial && (
                <div 
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${(rating - index) * 100}%` }}
                >
                  <Star className={cn(sizeClasses[size], 'text-yellow-400 fill-yellow-400')} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 font-semibold text-sm">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
