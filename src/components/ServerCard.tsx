import { Link } from 'react-router-dom';
import { Copy, Users, Wifi, Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import type { Server } from '@/types';

interface ServerCardProps {
  server: Server;
  onIpCopy?: (serverId: string) => void;
}

export function ServerCard({ server, onIpCopy }: ServerCardProps) {
  const handleCopyIp = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(server.ipAddress);
      toast.success('IP copied to clipboard!');
      onIpCopy?.(server.id);
    } catch {
      toast.error('Failed to copy IP');
    }
  };

  const getPingClass = (latency: number) => {
    if (latency < 50) return 'ping-excellent';
    if (latency < 100) return 'ping-good';
    if (latency < 200) return 'ping-poor';
    return 'ping-bad';
  };

  const getPingBars = (latency: number) => {
    if (latency < 50) return 4;
    if (latency < 100) return 3;
    if (latency < 200) return 2;
    return 1;
  };

  return (
    <Link to={`/server/${server.id}`}>
      <Card className="card-hover group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-200">
        <CardContent className="p-0">
          {/* Sponsored Badge */}
          {server.isSponsored && (
            <div className="badge-sponsored px-3 py-1 text-xs text-center font-sans">
              ⭐ SPONSORED
            </div>
          )}
          
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              {/* Server Icon */}
              <div className="relative shrink-0">
                <img
                  src={server.iconUrl}
                  alt={`${server.name} icon`}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border-2 border-muted"
                  loading="lazy"
                />
                {/* Online/Offline Indicator */}
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                    server.isOnline ? 'status-online' : 'status-offline'
                  }`}
                />
              </div>

              {/* Server Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-pixel text-xs sm:text-sm truncate text-foreground group-hover:text-primary transition-colors">
                    {server.name}
                  </h3>
                  {server.isVerified && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>

                {/* IP Address */}
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs sm:text-sm font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {server.ipAddress}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCopyIp}
                    aria-label="Copy IP address"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2">
                  {server.shortDescription}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge variant="secondary" className="text-xs px-2">
                    {server.gameType}
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2">
                    {server.version}
                  </Badge>
                  {server.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs px-2 hidden sm:inline-flex">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 star-filled fill-current" />
                  <span className="font-semibold text-sm">{server.rating.toFixed(1)}</span>
                </div>

                {/* Players */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>
                    {server.playersOnline.toLocaleString()}/{server.maxPlayers.toLocaleString()}
                  </span>
                </div>

                {/* Ping */}
                <div className={`flex items-center gap-1.5 text-sm ${getPingClass(server.latency)}`}>
                  <div className="flex items-end gap-0.5 h-4">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 rounded-sm transition-all ${
                          bar <= getPingBars(server.latency)
                            ? 'bg-current'
                            : 'bg-muted-foreground/20'
                        }`}
                        style={{ height: `${bar * 3 + 2}px` }}
                      />
                    ))}
                  </div>
                  <span>{server.latency}ms</span>
                </div>

                {/* Votes */}
                <div className="text-xs text-muted-foreground">
                  {server.totalVotes.toLocaleString()} votes
                </div>
              </div>
            </div>

            {/* Mobile Stats Row */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border sm:hidden">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 star-filled fill-current" />
                <span className="text-xs font-semibold">{server.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                <span>{server.playersOnline.toLocaleString()}</span>
              </div>
              <div className={`flex items-center gap-1 text-xs ${getPingClass(server.latency)}`}>
                <Wifi className="w-3 h-3" />
                <span>{server.latency}ms</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{server.totalVotes.toLocaleString()} votes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
