export type Environment = 'development' | 'staging' | 'production';

export interface EnvConfig {
  ENV: Environment;
  API_BASE_URL: string;
  API_TIMEOUT: number;
  ENABLE_LOGS: boolean;
}

const DEV_CONFIG: EnvConfig = {
  ENV: 'development',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT: 10000,
  ENABLE_LOGS: true,
};

const STAGING_CONFIG: EnvConfig = {
  ENV: 'staging',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT: 10000,
  ENABLE_LOGS: true,
};

const PROD_CONFIG: EnvConfig = {
  ENV: 'production',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  API_TIMEOUT: 15000,
  ENABLE_LOGS: false,
};

declare const process: {
  env?: {
    NODE_ENV?: string;
  };
};

const currentEnv: Environment =
  (typeof process !== 'undefined' && process.env?.NODE_ENV as Environment) ||
  'development';

const configs: Record<Environment, EnvConfig> = {
  development: DEV_CONFIG,
  staging: STAGING_CONFIG,
  production: PROD_CONFIG,
};

export const Config: EnvConfig = configs[currentEnv] || DEV_CONFIG;

export default Config;
