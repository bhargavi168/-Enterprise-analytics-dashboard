import axios from 'axios';
import { User } from '@/types/auth';

// Create configured Axios instance
export const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach mock JWT from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fintech_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fintech_auth_token');
      localStorage.removeItem('fintech_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pre-configured mock credentials
export const MOCK_USERS: Record<string, { user: User; passwordHash: string; token: string }> = {
  'admin@acme.com': {
    user: {
      id: 'usr_admin_01',
      name: 'Sarah Connor (Admin)',
      email: 'admin@acme.com',
      role: 'admin',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    passwordHash: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhd21lLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MjUxOTIwMH0.mockAdminJwtTokenKey',
  },
  'viewer@acme.com': {
    user: {
      id: 'usr_viewer_02',
      name: 'Alex Rivera (Viewer)',
      email: 'viewer@acme.com',
      role: 'viewer',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
    passwordHash: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2aWV3ZXJAYWNtZS5jb20iLCJyb2xlIjoidmlld2VyIiwiaWF0IjoxNjcyNTE5MjAwfQ.mockViewerJwtTokenKey',
  },
};

/**
 * Mock Auth API login method
 */
export async function mockLoginApi(email: string, password: string): Promise<{ user: User; token: string }> {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 600));

  const account = MOCK_USERS[email.toLowerCase()];
  if (!account || account.passwordHash !== password) {
    throw new Error('Invalid email or password. Please try admin@acme.com or viewer@acme.com with password 123456.');
  }

  return {
    user: account.user,
    token: account.token,
  };
}
