import { User } from '../types';

/**
 * Auth Service — Mock authentication logic.
 *
 * This intentionally uses demo credentials so the boilerplate can run offline.
 * // TODO: Replace mock logic with a real API call using api.post(ENDPOINTS.LOGIN, credentials).
 * // TODO: Store the returned token via MMKV or redux-persist — auth slice already handles Redux side.
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

/** Demo credentials — remove before production use */
const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'password123';

/** Demo user returned on successful mock sign-in */
const DEMO_USER: User = {
  id: 'demo-user-001',
  name: 'Demo User',
  email: DEMO_EMAIL,
  phone: '+1-000-000-0000',
  company: { name: 'Ya Boilerplate Corp' },
};

export const authService = {
  /**
   * Simulates a network login request.
   * Rejects on invalid credentials or network failure.
   * // TODO: Replace with: return api.post<AuthResponse>(ENDPOINTS.LOGIN, credentials);
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise<void>(resolve => setTimeout(resolve, 800));

    if (
      credentials.email.trim().toLowerCase() !== DEMO_EMAIL ||
      credentials.password !== DEMO_PASSWORD
    ) {
      throw new Error(
        'Invalid email or password. Use demo@example.com / password123',
      );
    }

    return {
      user: DEMO_USER,
      token: 'demo-jwt-token-replace-with-real-token',
    };
  },

  /**
   * Simulates a logout (clear server session if needed).
   * // TODO: Call api.post(ENDPOINTS.LOGOUT) if backend session invalidation is required.
   */
  logout: async (): Promise<void> => {
    await new Promise<void>(resolve => setTimeout(resolve, 200));
  },
};
