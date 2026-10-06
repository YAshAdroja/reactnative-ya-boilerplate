import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../utils/constants';
import { ENDPOINTS } from './endpoints';
import { User, UserFormValues } from '../types';

// Mock initial data as fallback for live interview demonstration
const MOCK_USERS: User[] = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', phone: '1-770-736-8031', company: { name: 'Romaguera-Crona' } },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', phone: '010-692-6593', company: { name: 'Deckow-Crist' } },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', company: { name: 'Romaguera-Jacobson' } },
  { id: 4, name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org', phone: '493-170-9623', company: { name: 'Robel-Swaniawski' } },
  { id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289', company: { name: 'Keebler LLC' } },
  { id: 6, name: 'Mrs. Dennis Schulist', email: 'Karley_Dach@jasper.info', phone: '1-477-935-8478', company: { name: 'Considine-Lockman' } },
  { id: 7, name: 'Kurtis Weissnat', email: 'Telly.Hoeger@billy.biz', phone: '210.067.6132', company: { name: 'Johns Group' } },
  { id: 8, name: 'Nicholas Runolfsdottir V', email: 'Sherwood@rosamond.me', phone: '586.493.6943', company: { name: 'Abernathy Group' } },
];

let mockUsersStore = [...MOCK_USERS];
let tokenSupplier: (() => string | null) | null = null;
let unauthorizedHandler: (() => void) | null = null;

export const setAuthTokenSupplier = (fn: () => string | null) => {
  tokenSupplier = fn;
};

export const setUnauthorizedHandler = (fn: () => void) => {
  unauthorizedHandler = fn;
};

// Create Axios Instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenSupplier ? tokenSupplier() : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// User API Services
export const userService = {
  getUsers: async (page = 1, limit = 10, search = ''): Promise<{ data: User[]; hasMore: boolean; total: number }> => {
    try {
      const response = await api.get<User[]>(ENDPOINTS.USERS);
      let list = response.data;
      if (search) {
        const query = search.toLowerCase();
        list = list.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            u.phone.toLowerCase().includes(query)
        );
      }
      const total = list.length;
      const startIndex = (page - 1) * limit;
      const paginatedData = list.slice(startIndex, startIndex + limit);
      const hasMore = startIndex + limit < total;

      return { data: paginatedData, hasMore, total };
    } catch (error) {
      console.warn('[userService.getUsers] Network error, serving mock data:', error);
      let list = mockUsersStore;
      if (search) {
        const query = search.toLowerCase();
        list = list.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            u.phone.toLowerCase().includes(query)
        );
      }
      const total = list.length;
      const startIndex = (page - 1) * limit;
      const paginatedData = list.slice(startIndex, startIndex + limit);
      const hasMore = startIndex + limit < total;
      return { data: paginatedData, hasMore, total };
    }
  },

  getUserById: async (id: number | string): Promise<User> => {
    try {
      const response = await api.get<User>(ENDPOINTS.USER_BY_ID(id));
      return response.data;
    } catch {
      console.warn(`[userService.getUserById] Fallback lookup for id ${id}`);
      const found = mockUsersStore.find((u) => String(u.id) === String(id));
      if (found) return found;
      throw new Error(`User with ID ${id} not found`);
    }
  },

  createUser: async (userData: UserFormValues): Promise<User> => {
    try {
      const response = await api.post<User>(ENDPOINTS.USERS, userData);
      const newUser: User = {
        ...response.data,
        id: response.data.id || Date.now(),
        ...userData,
      };
      mockUsersStore.unshift(newUser);
      return newUser;
    } catch {
      const newUser: User = {
        id: Date.now(),
        ...userData,
      };
      mockUsersStore.unshift(newUser);
      return newUser;
    }
  },

  updateUser: async (id: number | string, userData: Partial<UserFormValues>): Promise<User> => {
    try {
      const response = await api.put<User>(ENDPOINTS.USER_BY_ID(id), userData);
      const updated = { ...response.data, ...userData };
      mockUsersStore = mockUsersStore.map((u) => (String(u.id) === String(id) ? { ...u, ...updated } : u));
      return updated;
    } catch {
      const existing = mockUsersStore.find((u) => String(u.id) === String(id));
      const updated: User = existing
        ? { ...existing, ...userData }
        : { id, name: userData.name || '', email: userData.email || '', phone: userData.phone || '' };
      mockUsersStore = mockUsersStore.map((u) => (String(u.id) === String(id) ? updated : u));
      return updated;
    }
  },

  deleteUser: async (id: number | string): Promise<boolean> => {
    try {
      await api.delete(ENDPOINTS.USER_BY_ID(id));
      mockUsersStore = mockUsersStore.filter((u) => String(u.id) !== String(id));
      return true;
    } catch {
      mockUsersStore = mockUsersStore.filter((u) => String(u.id) !== String(id));
      return true;
    }
  },
};
