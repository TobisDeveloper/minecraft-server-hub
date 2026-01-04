import { useState } from 'react';
import { Flag, ThumbsUp, MoreVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StarRating } from './StarRating';
import type { Review } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
  isLoggedIn?: boolean;
  currentUserId?: string;
  onAddReview?: (rating: number, content: string) => Promise<void>;
  onReportReview?: (reviewId: string, reason: string) => void;
}

export function ReviewList({ 
  reviews, 
  isLoggedIn = false,
  currentUserId,
  onAddReview,
  onReportReview 
}: ReviewListProps) {
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onAddReview || !newContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddReview(newRating, newContent);
      setNewContent('');
      setNewRating(5);
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Review Button/Form */}
      {isLoggedIn ? (
        !showForm ? (
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
            Write a Review
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted/30 rounded-lg border">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Rating</label>
              <StarRating 
                rating={newRating} 
                size="lg" 
                interactive 
                onRatingChange={setNewRating} 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="review-content" className="text-sm font-medium">
                Your Review
              </label>
              <Textarea
                id="review-content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Share your experience with this server..."
                rows={4}
                required
                minLength={10}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Submit Review
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )
      ) : (
        <p className="text-muted-foreground text-sm">
          Please <a href="/login" className="text-primary hover:underline">login</a> to write a review.
        </p>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((review) => (
            <article 
              key={review.id} 
              className="p-4 bg-card rounded-lg border space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.avatarUrl}
                    alt={review.user.username}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-medium">{review.user.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size="sm" />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => onReportReview?.(review.id, 'inappropriate')}
                        className="text-destructive"
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Report Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-sm leading-relaxed">{review.content}</p>

              <div className="flex items-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">Helpful</span>
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
