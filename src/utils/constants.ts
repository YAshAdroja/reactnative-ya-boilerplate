import Config from '../config/env';

export const API_BASE_URL = Config.API_BASE_URL;
export const API_TIMEOUT = Config.API_TIMEOUT;

export const DEFAULT_PAGE_LIMIT = 10;
export const DEBOUNCE_DELAY = 400;

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  SETTINGS: '@app_settings',
} as const;
