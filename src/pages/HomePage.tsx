import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Award, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ServerCard } from '@/components/ServerCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockServers, topCategories } from '@/data/mockData';

export default function HomePage() {
  const recommendedServers = mockServers.filter(s => s.isVerified).slice(0, 6);
  const topVotedServers = [...mockServers].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 5);
  const mostPlayersServers = [...mockServers].sort((a, b) => b.playersOnline - a.playersOnline).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-accent via-background to-background py-16 sm:py-24">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-20 w-3 h-3 bg-primary rounded animate-float" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-primary/50 rounded animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-40 right-1/3 w-4 h-4 bg-primary/30 rounded animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Over 10,000 servers listed
              </Badge>
              
              <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl leading-relaxed mb-6">
                Find Your Perfect{' '}
                <span className="text-primary glow-primary inline-block">Minecraft</span>{' '}
                Server
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Discover, vote, and join the best Minecraft servers. From survival to skyblock, 
                find your next adventure.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search servers by name, IP, or game type..."
                  className="h-14 pl-12 pr-4 text-base rounded-full shadow-lg border-2 focus-visible:ring-primary"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full btn-pixel h-10">
                  Search
                </Button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Popular:</span>
                {['Survival', 'Skyblock', 'Prison', 'Minigames'].map((type) => (
                  <Link key={type} to={`/servers?gameType=${type}`}>
                    <Badge variant="outline" className="hover:bg-primary/10 cursor-pointer transition-colors">
                      {type}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-secondary text-secondary-foreground py-6">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-pixel text-lg sm:text-2xl text-primary">10,000+</p>
                <p className="text-sm text-secondary-foreground/70">Servers Listed</p>
              </div>
              <div>
                <p className="font-pixel text-lg sm:text-2xl text-primary">500K+</p>
                <p className="text-sm text-secondary-foreground/70">Monthly Votes</p>
              </div>
              <div>
                <p className="font-pixel text-lg sm:text-2xl text-primary">1M+</p>
                <p className="text-sm text-secondary-foreground/70">Players Connected</p>
              </div>
              <div>
                <p className="font-pixel text-lg sm:text-2xl text-primary">99.9%</p>
                <p className="text-sm text-secondary-foreground/70">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-pixel text-sm sm:text-base">Browse by Category</h2>
              <Link to="/servers" className="text-sm text-primary hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {topCategories.map((category) => (
                <Link
                  key={category.name}
                  to={`/servers?gameType=${category.name}`}
                  className="group flex flex-col items-center gap-2 p-4 bg-card rounded-lg border hover:border-primary/50 hover:shadow-glow transition-all"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-sm text-center">{category.name}</span>
                  <span className="text-xs text-muted-foreground">{category.count} servers</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended Servers */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="font-pixel text-sm sm:text-base">Recommended Servers</h2>
              </div>
              <Link to="/servers" className="text-sm text-primary hover:underline flex items-center gap-1">
                See All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendedServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Lists */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Most Voted */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="font-pixel text-sm">Most Voted</h2>
                </div>
                <div className="space-y-3">
                  {topVotedServers.map((server, index) => (
                    <Link
                      key={server.id}
                      to={`/server/${server.id}`}
                      className="flex items-center gap-4 p-3 bg-card rounded-lg border hover:border-primary/50 transition-all group"
                    >
                      <span className={`font-pixel text-sm w-6 ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{index + 1}
                      </span>
                      <img
                        src={server.iconUrl}
                        alt={server.name}
                        className="w-10 h-10 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {server.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{server.gameType}</p>
                      </div>
                      <Badge variant="secondary">
                        {server.totalVotes.toLocaleString()} votes
                      </Badge>
                    </Link>
                  ))}
                </div>
                <Link 
                  to="/top?sort=votes" 
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  View Full Leaderboard
                </Link>
              </div>

              {/* Most Players */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="font-pixel text-sm">Most Players</h2>
                </div>
                <div className="space-y-3">
                  {mostPlayersServers.map((server, index) => (
                    <Link
                      key={server.id}
                      to={`/server/${server.id}`}
                      className="flex items-center gap-4 p-3 bg-card rounded-lg border hover:border-primary/50 transition-all group"
                    >
                      <span className={`font-pixel text-sm w-6 ${index < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{index + 1}
                      </span>
                      <img
                        src={server.iconUrl}
                        alt={server.name}
                        className="w-10 h-10 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate group-hover:text-primary transition-colors">
                          {server.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{server.gameType}</p>
                      </div>
                      <Badge variant="secondary">
                        <Users className="w-3 h-3 mr-1" />
                        {server.playersOnline.toLocaleString()}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <Link 
                  to="/top?sort=players" 
                  className="block mt-4 text-center text-sm text-primary hover:underline"
                >
                  View Full Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-secondary text-secondary-foreground">
          <div className="container text-center">
            <h2 className="font-pixel text-lg sm:text-xl mb-4">Own a Minecraft Server?</h2>
            <p className="text-secondary-foreground/70 mb-8 max-w-xl mx-auto">
              List your server for free and reach thousands of players. Get votes, 
              reviews, and grow your community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="btn-pixel bg-primary text-primary-foreground" asChild>
                <Link to="/add-server">Add Your Server</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 hover:bg-secondary-foreground/10" asChild>
                <Link to="/advertise">Advertise with Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
