import { useState } from 'react';
import { ThumbsUp, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoteButtonProps {
  serverId: string;
  totalVotes: number;
  hasVotedToday?: boolean;
  isLoggedIn?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function VoteButton({ 
  serverId, 
  totalVotes, 
  hasVotedToday = false, 
  isLoggedIn = false,
  size = 'default'
}: VoteButtonProps) {
  const [isVoting, setIsVoting] = useState(false);
  const [voted, setVoted] = useState(hasVotedToday);
  const [voteCount, setVoteCount] = useState(totalVotes);

  const handleVote = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to vote');
      return;
    }

    if (voted) {
      toast.info('You have already voted today!');
      return;
    }

    setIsVoting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setVoted(true);
    setVoteCount((prev) => prev + 1);
    setIsVoting(false);
    toast.success('Vote submitted! Thank you for your support.');
  };

  return (
    <Button
      onClick={handleVote}
      disabled={isVoting || voted}
      variant={voted ? 'secondary' : 'default'}
      size={size}
      className={`gap-2 ${voted ? '' : 'btn-pixel'}`}
    >
      {isVoting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : voted ? (
        <Clock className="w-4 h-4" />
      ) : (
        <ThumbsUp className="w-4 h-4" />
      )}
      <span className="font-sans">
        {voted ? 'Voted Today' : 'Vote'}
      </span>
      <span className="font-sans text-sm opacity-80">
        ({voteCount.toLocaleString()})
      </span>
    </Button>
  );
}
