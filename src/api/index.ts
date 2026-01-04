// API abstraction layer - all backend calls go through here
import type { 
  Server, 
  User, 
  Review, 
  Vote, 
  Campaign, 
  ServerStats, 
  ServerFilters,
  PaginatedResponse,
  ApiResponse
} from '@/types';

const API_BASE = '/api'; // Replace with actual API URL

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Server endpoints
export const serversApi = {
  getAll: (filters?: ServerFilters, page = 1, pageSize = 12) => 
    apiFetch<PaginatedResponse<Server>>(`/servers?page=${page}&pageSize=${pageSize}`),
  
  getById: (id: string) => 
    apiFetch<Server>(`/servers/${id}`),
  
  getRecommended: () => 
    apiFetch<Server[]>('/servers/recommended'),
  
  getTopRated: () => 
    apiFetch<Server[]>('/servers/top-rated'),
  
  getMostVoted: () => 
    apiFetch<Server[]>('/servers/most-voted'),
  
  getByCategory: (category: string) => 
    apiFetch<Server[]>(`/servers/category/${category}`),
  
  create: (data: Partial<Server>) => 
    apiFetch<Server>('/servers', { method: 'POST', body: JSON.stringify(data) }),
  
  update: (id: string, data: Partial<Server>) => 
    apiFetch<Server>(`/servers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  delete: (id: string) => 
    apiFetch<void>(`/servers/${id}`, { method: 'DELETE' }),
  
  getStats: (id: string) => 
    apiFetch<ServerStats>(`/servers/${id}/stats`),
};

// Review endpoints
export const reviewsApi = {
  getByServer: (serverId: string, page = 1) => 
    apiFetch<PaginatedResponse<Review>>(`/servers/${serverId}/reviews?page=${page}`),
  
  create: (serverId: string, data: { rating: number; content: string }) => 
    apiFetch<Review>(`/servers/${serverId}/reviews`, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  
  update: (id: string, data: { rating: number; content: string }) => 
    apiFetch<Review>(`/reviews/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  
  delete: (id: string) => 
    apiFetch<void>(`/reviews/${id}`, { method: 'DELETE' }),
  
  report: (id: string, reason: string) => 
    apiFetch<void>(`/reviews/${id}/report`, { 
      method: 'POST', 
      body: JSON.stringify({ reason }) 
    }),
};

// Vote endpoints
export const votesApi = {
  vote: (serverId: string) => 
    apiFetch<Vote>(`/servers/${serverId}/vote`, { method: 'POST' }),
  
  canVote: (serverId: string) => 
    apiFetch<{ canVote: boolean; nextVoteAt?: Date }>(`/servers/${serverId}/can-vote`),
  
  getLeaderboard: () => 
    apiFetch<Server[]>('/votes/leaderboard'),
};

// User endpoints
export const usersApi = {
  getCurrentUser: () => 
    apiFetch<User>('/users/me'),
  
  login: (email: string, password: string) => 
    apiFetch<{ user: User; token: string }>('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    }),
  
  register: (username: string, email: string, password: string) => 
    apiFetch<{ user: User; token: string }>('/auth/register', { 
      method: 'POST', 
      body: JSON.stringify({ username, email, password }) 
    }),
  
  logout: () => 
    apiFetch<void>('/auth/logout', { method: 'POST' }),
  
  resetPassword: (email: string) => 
    apiFetch<void>('/auth/reset-password', { 
      method: 'POST', 
      body: JSON.stringify({ email }) 
    }),
  
  getMyServers: () => 
    apiFetch<Server[]>('/users/me/servers'),
  
  getFavorites: () => 
    apiFetch<Server[]>('/users/me/favorites'),
  
  addFavorite: (serverId: string) => 
    apiFetch<void>(`/users/me/favorites/${serverId}`, { method: 'POST' }),
  
  removeFavorite: (serverId: string) => 
    apiFetch<void>(`/users/me/favorites/${serverId}`, { method: 'DELETE' }),
};

// Campaign endpoints
export const campaignsApi = {
  getByServer: (serverId: string) => 
    apiFetch<Campaign>(`/servers/${serverId}/campaign`),
  
  create: (serverId: string, data: Partial<Campaign>) => 
    apiFetch<Campaign>(`/servers/${serverId}/campaign`, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  
  update: (serverId: string, data: Partial<Campaign>) => 
    apiFetch<Campaign>(`/servers/${serverId}/campaign`, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  
  trackClick: (serverId: string) => 
    apiFetch<void>(`/servers/${serverId}/campaign/click`, { method: 'POST' }),
  
  trackIpCopy: (serverId: string) => 
    apiFetch<void>(`/servers/${serverId}/campaign/ip-copy`, { method: 'POST' }),
};
