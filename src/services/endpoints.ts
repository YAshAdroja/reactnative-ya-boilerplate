export const ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: number | string) => `/users/${id}`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const;
