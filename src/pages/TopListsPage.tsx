import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { mockServers, topCategories } from '@/data/mockData';
import type { GameType } from '@/types';

export default function TopListsPage() {
  const [selectedCategory, setSelectedCategory] = useState<GameType | 'all'>('all');

  const getFilteredServers = () => {
    if (selectedCategory === 'all') return mockServers;
    return mockServers.filter((s) => s.gameType === selectedCategory);
  };

  const topVoted = [...getFilteredServers()].sort((a, b) => b.totalVotes - a.totalVotes).slice(0, 10);
  const topRated = [...getFilteredServers()].sort((a, b) => b.rating - a.rating).slice(0, 10);
  const mostPlayers = [...getFilteredServers()].sort((a, b) => b.playersOnline - a.playersOnline).slice(0, 10);

  const renderServerList = (servers: typeof mockServers, statKey: 'votes' | 'rating' | 'players') => (
    <div className="space-y-3">
      {servers.map((server, index) => (
        <Link
          key={server.id}
          to={`/server/${server.id}`}
          className="flex items-center gap-4 p-4 bg-card rounded-lg border hover:border-primary/50 transition-all group"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-pixel text-sm shrink-0 ${
            index === 0 ? 'bg-yellow-400 text-yellow-900' :
            index === 1 ? 'bg-gray-300 text-gray-700' :
            index === 2 ? 'bg-amber-600 text-amber-100' :
            'bg-muted text-muted-foreground'
          }`}>
            #{index + 1}
          </div>
          
          <img
            src={server.iconUrl}
            alt={server.name}
            className="w-12 h-12 rounded-lg shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate group-hover:text-primary transition-colors">
              {server.name}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{server.gameType}</span>
              <span>•</span>
              <span>{server.version}</span>
            </div>
          </div>
          
          <div className="text-right shrink-0">
            {statKey === 'votes' && (
              <>
                <p className="font-bold text-primary">{server.totalVotes.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">votes</p>
              </>
            )}
            {statKey === 'rating' && (
              <>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{server.rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{server.totalReviews} reviews</p>
              </>
            )}
            {statKey === 'players' && (
              <>
                <p className="font-bold text-primary">{server.playersOnline.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">online</p>
              </>
            )}
          </div>
          
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Trophy className="w-8 h-8 text-primary" />
              <h1 className="font-pixel text-lg sm:text-xl">Top Lists</h1>
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the best Minecraft servers voted by the community
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/20 transition-colors px-4 py-2"
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Badge>
            {topCategories.map((cat) => (
              <Badge
                key={cat.name}
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors px-4 py-2"
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.icon} {cat.name}
              </Badge>
            ))}
          </div>

          <Tabs defaultValue="voted" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
              <TabsTrigger value="voted" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Most Voted</span>
                <span className="sm:hidden">Votes</span>
              </TabsTrigger>
              <TabsTrigger value="rated" className="gap-2">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Top Rated</span>
                <span className="sm:hidden">Rating</span>
              </TabsTrigger>
              <TabsTrigger value="players" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Most Players</span>
                <span className="sm:hidden">Players</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voted" className="mt-8">
              <h2 className="font-pixel text-sm mb-6 text-center">
                Most Voted Servers {selectedCategory !== 'all' && `- ${selectedCategory}`}
              </h2>
              {renderServerList(topVoted, 'votes')}
            </TabsContent>

            <TabsContent value="rated" className="mt-8">
              <h2 className="font-pixel text-sm mb-6 text-center">
                Top Rated Servers {selectedCategory !== 'all' && `- ${selectedCategory}`}
              </h2>
              {renderServerList(topRated, 'rating')}
            </TabsContent>

            <TabsContent value="players" className="mt-8">
              <h2 className="font-pixel text-sm mb-6 text-center">
                Most Active Servers {selectedCategory !== 'all' && `- ${selectedCategory}`}
              </h2>
              {renderServerList(mostPlayers, 'players')}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
