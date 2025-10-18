/**
 * API Configuration
 * Configurações para a API da SpaceX
 */
export const API_CONFIG = {
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
export const DEFAULT_REQUEST_OPTIONS = {
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
};