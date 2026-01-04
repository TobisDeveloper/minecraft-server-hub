import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import type { ServerFilters, GameType, MinecraftVersion } from '@/types';

const gameTypes: GameType[] = [
  'Survival', 'Creative', 'Skyblock', 'Prison', 'Factions', 
  'RPG', 'Minigames', 'PvP', 'Hardcore', 'Modded'
];

const versions: MinecraftVersion[] = [
  '1.20.4', '1.20.2', '1.19.4', '1.18.2', '1.16.5', '1.12.2', '1.8.9'
];

const popularTags = [
  'Economy', 'Ranks', 'Custom Plugins', 'Discord', 'Events', 
  'Friendly', 'PvE', 'Quests', 'Land Claims', 'McMMO'
];

interface FilterPanelProps {
  filters: ServerFilters;
  onFiltersChange: (filters: ServerFilters) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [maxLatency, setMaxLatency] = useState(filters.maxLatency || 200);

  const updateFilter = <K extends keyof ServerFilters>(
    key: K, 
    value: ServerFilters[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleTag = (tag: string) => {
    const currentTags = filters.tags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    updateFilter('tags', newTags.length > 0 ? newTags : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search servers by name, IP, or description..."
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value || undefined)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.gameType || ''}
          onValueChange={(v) => updateFilter('gameType', v as GameType || undefined)}
        >
          <SelectTrigger className="w-auto min-w-[140px]">
            <SelectValue placeholder="Game Type" />
          </SelectTrigger>
          <SelectContent>
            {gameTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.version || ''}
          onValueChange={(v) => updateFilter('version', v as MinecraftVersion || undefined)}
        >
          <SelectTrigger className="w-auto min-w-[120px]">
            <SelectValue placeholder="Version" />
          </SelectTrigger>
          <SelectContent>
            {versions.map((version) => (
              <SelectItem key={version} value={version}>
                {version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy || ''}
          onValueChange={(v) => updateFilter('sortBy', v as ServerFilters['sortBy'] || undefined)}
        >
          <SelectTrigger className="w-auto min-w-[120px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="votes">Most Voted</SelectItem>
            <SelectItem value="players">Most Players</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          More Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {activeFilterCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="gap-1">
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg border">
            {/* Max Latency */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Max Ping: {maxLatency}ms
              </label>
              <Slider
                value={[maxLatency]}
                onValueChange={([v]) => {
                  setMaxLatency(v);
                  updateFilter('maxLatency', v < 200 ? v : undefined);
                }}
                min={20}
                max={200}
                step={10}
                className="w-full"
              />
            </div>

            {/* Min Players */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Players</label>
              <Select
                value={filters.minPlayers?.toString() || ''}
                onValueChange={(v) => updateFilter('minPlayers', v ? parseInt(v) : undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10+</SelectItem>
                  <SelectItem value="50">50+</SelectItem>
                  <SelectItem value="100">100+</SelectItem>
                  <SelectItem value="500">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="space-y-3 md:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Active Filters Display */}
      {(filters.tags?.length || 0) > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active tags:</span>
          {filters.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-1 cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
