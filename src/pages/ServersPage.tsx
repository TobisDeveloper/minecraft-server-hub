import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServerCard } from '@/components/ServerCard';
import { FilterPanel } from '@/components/FilterPanel';
import { Pagination } from '@/components/Pagination';
import { mockServers } from '@/data/mockData';
import type { ServerFilters } from '@/types';

const ITEMS_PER_PAGE = 12;

export default function ServersPage() {
  const [filters, setFilters] = useState<ServerFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort servers
  const filteredServers = useMemo(() => {
    let result = [...mockServers];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.ipAddress.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.gameType.toLowerCase().includes(searchLower)
      );
    }

    // Game type filter
    if (filters.gameType) {
      result = result.filter((s) => s.gameType === filters.gameType);
    }

    // Version filter
    if (filters.version) {
      result = result.filter((s) => s.version === filters.version);
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter((s) =>
        filters.tags!.some((tag) => s.tags.includes(tag))
      );
    }

    // Max latency filter
    if (filters.maxLatency) {
      result = result.filter((s) => s.latency <= filters.maxLatency!);
    }

    // Min players filter
    if (filters.minPlayers) {
      result = result.filter((s) => s.playersOnline >= filters.minPlayers!);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'votes':
          result.sort((a, b) => b.totalVotes - a.totalVotes);
          break;
        case 'players':
          result.sort((a, b) => b.playersOnline - a.playersOnline);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }

    return result;
  }, [filters]);

  // Ensure sponsored servers appear at most every 4th position
  const displayServers = useMemo(() => {
    const sponsored = filteredServers.filter((s) => s.isSponsored);
    const regular = filteredServers.filter((s) => !s.isSponsored);
    const result = [];
    let sponsoredIndex = 0;
    let regularIndex = 0;

    for (let i = 0; result.length < filteredServers.length; i++) {
      if ((i + 1) % 4 === 0 && sponsoredIndex < sponsored.length) {
        result.push(sponsored[sponsoredIndex++]);
      } else if (regularIndex < regular.length) {
        result.push(regular[regularIndex++]);
      } else if (sponsoredIndex < sponsored.length) {
        result.push(sponsored[sponsoredIndex++]);
      }
    }

    return result;
  }, [filteredServers]);

  // Pagination
  const totalPages = Math.ceil(displayServers.length / ITEMS_PER_PAGE);
  const paginatedServers = displayServers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFiltersChange = (newFilters: ServerFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="font-pixel text-lg sm:text-xl mb-2">Browse Servers</h1>
            <p className="text-muted-foreground">
              Showing {displayServers.length} Minecraft servers
            </p>
          </div>

          <div className="mb-8">
            <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
          </div>

          {paginatedServers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                {paginatedServers.map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className="text-center py-16">
              <p className="font-pixel text-sm text-muted-foreground mb-4">
                No servers found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
