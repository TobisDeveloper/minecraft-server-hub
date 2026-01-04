import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Copy, Users, Wifi, Clock, Calendar, CheckCircle, 
  Share2, Heart, Flag, ExternalLink, TrendingUp, 
  ThumbsUp, MessageSquare, BarChart3 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServerBanner } from '@/components/ServerBanner';
import { StarRating } from '@/components/StarRating';
import { VoteButton } from '@/components/VoteButton';
import { ReviewList } from '@/components/ReviewList';
import { mockServers, mockReviews } from '@/data/mockData';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

export default function ServerDetailPage() {
  const { id } = useParams();
  const server = mockServers.find((s) => s.id === id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!server) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-pixel text-xl mb-4">Server Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The server you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/servers">Browse Servers</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCopyIp = async () => {
    try {
      await navigator.clipboard.writeText(server.ipAddress);
      toast.success('IP copied to clipboard!');
    } catch {
      toast.error('Failed to copy IP');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: server.name,
        text: server.shortDescription,
        url: window.location.href,
      });
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const getPingClass = (latency: number) => {
    if (latency < 50) return 'ping-excellent';
    if (latency < 100) return 'ping-good';
    if (latency < 200) return 'ping-poor';
    return 'ping-bad';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 sm:py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/servers" className="hover:text-foreground">Servers</Link>
            <span>/</span>
            <span className="text-foreground">{server.name}</span>
          </nav>

          {/* Banner */}
          <ServerBanner 
            bannerUrl={server.bannerUrl} 
            serverName={server.name} 
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Server Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={server.iconUrl}
                      alt={server.name}
                      className="w-20 h-20 rounded-lg border-2 border-muted"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h1 className="font-pixel text-sm sm:text-base">{server.name}</h1>
                        {server.isVerified && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                        {server.isSponsored && (
                          <Badge className="badge-sponsored text-xs">Sponsored</Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={server.rating} showValue />
                        <span className="text-sm text-muted-foreground">
                          ({server.totalReviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-4">{server.shortDescription}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{server.gameType}</Badge>
                        <Badge variant="outline">{server.version}</Badge>
                        {server.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* IP Copy Section */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Server Address</p>
                      <code className="font-mono text-lg font-bold">{server.ipAddress}</code>
                    </div>
                    <Button onClick={handleCopyIp} className="btn-pixel gap-2">
                      <Copy className="w-4 h-4" />
                      Copy IP
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews ({server.totalReviews})
                  </TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">About This Server</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {server.description}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Player Reviews</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ReviewList 
                        reviews={mockReviews.filter(r => r.serverId === server.id)} 
                        isLoggedIn={true}
                        onAddReview={async (rating, content) => {
                          toast.success('Review submitted!');
                        }}
                        onReportReview={(reviewId) => {
                          toast.success('Review reported');
                        }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="stats" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Server Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="font-bold text-lg">{server.totalVotes.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Total Votes</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="font-bold text-lg">{server.playersOnline.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Players Online</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <MessageSquare className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="font-bold text-lg">{server.totalReviews.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Reviews</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <BarChart3 className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="font-bold text-lg">{server.rating.toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">Avg Rating</p>
                        </div>
                      </div>

                      {/* Placeholder for graphs */}
                      <div className="mt-6 space-y-4">
                        <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed text-center">
                          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Player trend graph will appear here
                          </p>
                        </div>
                        <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed text-center">
                          <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Vote history graph will appear here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Server Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Online Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={server.isOnline ? 'status-online' : 'status-offline'}>
                      {server.isOnline ? 'Online' : 'Offline'}
                    </Badge>
                  </div>

                  {/* Players */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" /> Players
                    </span>
                    <span className="font-medium">
                      {server.playersOnline.toLocaleString()} / {server.maxPlayers.toLocaleString()}
                    </span>
                  </div>

                  {/* Latency */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Wifi className="w-4 h-4" /> Latency
                    </span>
                    <span className={`font-medium ${getPingClass(server.latency)}`}>
                      {server.latency}ms
                    </span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Last Ping
                    </span>
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(server.lastPinged), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Created */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Listed
                    </span>
                    <span className="text-sm">
                      {formatDistanceToNow(new Date(server.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <VoteButton 
                    serverId={server.id} 
                    totalVotes={server.totalVotes} 
                    isLoggedIn={true}
                    size="lg"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={isFavorite ? 'default' : 'outline'}
                      className="gap-2"
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                      }}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Saved' : 'Save'}
                    </Button>

                    <Button variant="outline" className="gap-2" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>

                  <Button variant="ghost" className="w-full gap-2 text-destructive hover:text-destructive">
                    <Flag className="w-4 h-4" />
                    Report Server
                  </Button>
                </CardContent>
              </Card>

              {/* Votifier Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Vote Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This server supports Votifier! Vote daily to receive in-game rewards.
                  </p>
                  <div className="p-4 bg-muted/30 rounded-lg border-2 border-dashed text-center">
                    <p className="text-xs text-muted-foreground">
                      Votifier integration coming soon
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
