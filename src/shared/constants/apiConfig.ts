/**
 * API Configuration
 * Configurações para a API da SpaceX
 */

export interface ApiEndpoints {
  LAUNCHES: string;
  LAUNCHES_UPCOMING: string;
  LAUNCHES_PAST: string;
  LAUNCHES_LATEST: string;
  LAUNCHES_NEXT: string;
}

export interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: ApiEndpoints;
  TIMEOUT: number;
  RETRY_ATTEMPTS: number;
}

export interface RequestOptions {
  timeout: number;
  headers: {
    'Content-Type': string;
  };
}

export const API_CONFIG: ApiConfig = {
  BASE_URL: 'https://api.spacexdata.com/v4',
  ENDPOINTS: {
    LAUNCHES: '/launches',
    LAUNCHES_UPCOMING: '/launches/upcoming',
    LAUNCHES_PAST: '/launches/past',
    LAUNCHES_LATEST: '/launches/latest',
    LAUNCHES_NEXT: '/launches/next'
  },
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3
};

/**
 * Opções padrão para requisições
 */
export const DEFAULT_REQUEST_OPTIONS: RequestOptions = {
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
};