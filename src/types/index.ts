// Core TypeScript interfaces for the application

export type GameType = 
  | 'Survival' 
  | 'Creative' 
  | 'Skyblock' 
  | 'Prison' 
  | 'Factions' 
  | 'RPG' 
  | 'Minigames' 
  | 'PvP' 
  | 'Hardcore' 
  | 'Modded';

export type ServerRegion = 
  | 'north-america' 
  | 'south-america' 
  | 'europe' 
  | 'asia' 
  | 'oceania' 
  | 'africa';

export type MinecraftVersion = 
  | '1.20.4' 
  | '1.20.2' 
  | '1.19.4' 
  | '1.18.2' 
  | '1.16.5' 
  | '1.12.2' 
  | '1.8.9';

export interface Server {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  gameType: GameType;
  description: string;
  shortDescription: string;
  iconUrl: string;
  bannerUrl: string;
  isOnline: boolean;
  playersOnline: number;
  maxPlayers: number;
  latency: number; // in ms
  version: MinecraftVersion;
  tags: string[];
  rating: number; // 1-5
  totalVotes: number;
  totalReviews: number;
  ownerId: string;
  region: ServerRegion;
  isSponsored: boolean;
  isVerified: boolean;
  lastPinged: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  isAdmin: boolean;
}

export interface Review {
  id: string;
  serverId: string;
  userId: string;
  user: Pick<User, 'id' | 'username' | 'avatarUrl'>;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isReported: boolean;
}

export interface Vote {
  id: string;
  serverId: string;
  userId: string;
  votedAt: Date;
}

export interface Campaign {
  id: string;
  serverId: string;
  dailyBudget: number;
  totalSpent: number;
  clicks: number;
  ipCopies: number;
  isActive: boolean;
  startDate: Date;
  endDate?: Date;
}

export interface ServerStats {
  serverId: string;
  playerHistory: { date: string; players: number }[];
  voteHistory: { date: string; votes: number }[];
  clickHistory: { date: string; clicks: number }[];
}

export interface ServerFilters {
  search?: string;
  gameType?: GameType;
  version?: MinecraftVersion;
  tags?: string[];
  maxLatency?: number;
  minPlayers?: number;
  maxPlayers?: number;
  sortBy?: 'votes' | 'players' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
