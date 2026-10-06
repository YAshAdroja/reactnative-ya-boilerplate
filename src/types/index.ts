export interface User {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase?: string;
  };
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
  };
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  loadingMore: boolean;
}

export interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  refreshing: boolean;
  pagination: PaginationState;
  error: string | null;
  searchQuery: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number | string };
  Form: { user?: User } | undefined;
};

export interface UserFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
