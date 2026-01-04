import type { Server, Review, User, GameType, ServerRegion, MinecraftVersion } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  username: 'StevePlayer',
  email: 'steve@minecraft.com',
  avatarUrl: 'https://mc-heads.net/avatar/MHF_Steve',
  createdAt: new Date('2024-01-01'),
  isAdmin: false,
};

const gameTypes: GameType[] = ['Survival', 'Creative', 'Skyblock', 'Prison', 'Factions', 'RPG', 'Minigames', 'PvP', 'Hardcore', 'Modded'];
const regions: ServerRegion[] = ['north-america', 'europe', 'asia', 'oceania', 'south-america', 'africa'];
const versions: MinecraftVersion[] = ['1.20.4', '1.20.2', '1.19.4', '1.18.2', '1.16.5', '1.12.2', '1.8.9'];
const tags = ['Economy', 'Ranks', 'Custom Plugins', 'Discord', 'Events', 'Friendly', 'PvE', 'Quests', 'Land Claims', 'McMMO'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTags(): string[] {
  const count = Math.floor(Math.random() * 4) + 2;
  const shuffled = [...tags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const mockServers: Server[] = [
  {
    id: 'server-1',
    name: 'Hypixel',
    ipAddress: 'mc.hypixel.net',
    port: 25565,
    gameType: 'Minigames',
    description: 'The largest Minecraft server in the world! Join millions of players for an epic gaming experience. We offer Bedwars, Skyblock, Skywars, and many more game modes. New updates every month!',
    shortDescription: 'The largest Minecraft server with Bedwars, Skyblock & more!',
    iconUrl: 'https://mc-heads.net/avatar/Hypixel',
    bannerUrl: '',
    isOnline: true,
    playersOnline: 89432,
    maxPlayers: 200000,
    latency: 45,
    version: '1.20.4',
    tags: ['Minigames', 'Bedwars', 'Skyblock', 'Large Community'],
    rating: 4.8,
    totalVotes: 125000,
    totalReviews: 8500,
    ownerId: 'owner-1',
    region: 'north-america',
    isSponsored: true,
    isVerified: true,
    lastPinged: new Date(),
    createdAt: new Date('2013-04-13'),
    updatedAt: new Date(),
  },
  {
    id: 'server-2',
    name: 'CubeCraft Games',
    ipAddress: 'play.cubecraft.net',
    port: 25565,
    gameType: 'Minigames',
    description: 'Premium minigames server featuring Eggwars, Tower Defence, Lucky Islands, and more. Active community with regular tournaments and events.',
    shortDescription: 'Premium minigames: Eggwars, Tower Defence & Lucky Islands',
    iconUrl: 'https://mc-heads.net/avatar/CubeCraft',
    bannerUrl: '',
    isOnline: true,
    playersOnline: 15678,
    maxPlayers: 50000,
    latency: 62,
    version: '1.20.4',
    tags: ['Eggwars', 'Tower Defence', 'Tournaments'],
    rating: 4.6,
    totalVotes: 45000,
    totalReviews: 3200,
    ownerId: 'owner-2',
    region: 'europe',
    isSponsored: false,
    isVerified: true,
    lastPinged: new Date(),
    createdAt: new Date('2014-02-20'),
    updatedAt: new Date(),
  },
  {
    id: 'server-3',
    name: 'PurplePrison',
    ipAddress: 'purpleprison.org',
    port: 25565,
    gameType: 'Prison',
    description: 'The #1 Prison server with custom enchants, mines, and gangs. Reach prestige 100 and become a legend!',
    shortDescription: '#1 Prison server with custom enchants and gangs',
    iconUrl: 'https://mc-heads.net/avatar/PurplePrison',
    bannerUrl: '',
    isOnline: true,
    playersOnline: 2341,
    maxPlayers: 5000,
    latency: 38,
    version: '1.20.2',
    tags: ['Prison', 'Custom Enchants', 'Gangs', 'Economy'],
    rating: 4.5,
    totalVotes: 28000,
    totalReviews: 1800,
    ownerId: 'owner-3',
    region: 'north-america',
    isSponsored: true,
    isVerified: true,
    lastPinged: new Date(),
    createdAt: new Date('2016-08-15'),
    updatedAt: new Date(),
  },
];

// Generate more mock servers
for (let i = 4; i <= 24; i++) {
  const gameType = randomFrom(gameTypes);
  const isOnline = Math.random() > 0.1;
  const maxPlayers = Math.floor(Math.random() * 500) + 50;
  
  mockServers.push({
    id: `server-${i}`,
    name: `${randomFrom(['Epic', 'Crystal', 'Dragon', 'Phoenix', 'Shadow', 'Storm', 'Frost', 'Fire', 'Terra', 'Cosmic'])}${randomFrom(['MC', 'Craft', 'Network', 'World', 'Realm', 'Land', 'Empire', 'Kingdom'])}`,
    ipAddress: `play.server${i}.net`,
    port: 25565,
    gameType,
    description: `An amazing ${gameType} server with active staff and friendly community. Join us for a unique Minecraft experience!`,
    shortDescription: `Quality ${gameType} server with active community`,
    iconUrl: `https://mc-heads.net/avatar/Player${i}`,
    bannerUrl: '',
    isOnline,
    playersOnline: isOnline ? Math.floor(Math.random() * maxPlayers * 0.8) : 0,
    maxPlayers,
    latency: Math.floor(Math.random() * 150) + 20,
    version: randomFrom(versions),
    tags: randomTags(),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    totalVotes: Math.floor(Math.random() * 10000),
    totalReviews: Math.floor(Math.random() * 500),
    ownerId: `owner-${i}`,
    region: randomFrom(regions),
    isSponsored: i % 5 === 0,
    isVerified: Math.random() > 0.3,
    lastPinged: new Date(),
    createdAt: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    updatedAt: new Date(),
  });
}

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    serverId: 'server-1',
    userId: 'user-1',
    user: { id: 'user-1', username: 'StevePlayer', avatarUrl: 'https://mc-heads.net/avatar/MHF_Steve' },
    rating: 5,
    content: 'Best server ever! The staff is amazing and there are so many game modes to play. Highly recommended!',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isReported: false,
  },
  {
    id: 'review-2',
    serverId: 'server-1',
    userId: 'user-2',
    user: { id: 'user-2', username: 'DiamondMiner', avatarUrl: 'https://mc-heads.net/avatar/DiamondMiner' },
    rating: 4,
    content: 'Great minigames but sometimes the queue times are long during peak hours. Overall a fantastic experience.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    isReported: false,
  },
  {
    id: 'review-3',
    serverId: 'server-1',
    userId: 'user-3',
    user: { id: 'user-3', username: 'CreeperHunter', avatarUrl: 'https://mc-heads.net/avatar/CreeperHunter' },
    rating: 5,
    content: 'Been playing here for 3 years and it keeps getting better. Love the new updates!',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    isReported: false,
  },
];

export const topCategories: { name: GameType; icon: string; count: number }[] = [
  { name: 'Survival', icon: '⚔️', count: 1250 },
  { name: 'Skyblock', icon: '🏝️', count: 890 },
  { name: 'Prison', icon: '🔒', count: 650 },
  { name: 'Minigames', icon: '🎮', count: 1100 },
  { name: 'RPG', icon: '🗡️', count: 420 },
  { name: 'Factions', icon: '🏰', count: 380 },
  { name: 'Creative', icon: '🎨', count: 520 },
  { name: 'PvP', icon: '💥', count: 710 },
];
