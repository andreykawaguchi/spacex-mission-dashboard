import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, DEFAULT_REQUEST_OPTIONS } from '../../shared/constants/apiConfig';

/**
 * HttpClient
 * Cliente HTTP para fazer requisições à API da SpaceX
 */
export class HttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      ...DEFAULT_REQUEST_OPTIONS
    });

    this.setupInterceptors();
  }

  /**
   * Configura interceptadores para requisições e respostas
   */
  private setupInterceptors(): void {
    // Interceptador de requisição
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        console.log(`Making request to: ${config.url}`);
        return config;
      },
      (error: AxiosError) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Interceptador de resposta
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`Response received from: ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error('Response error:', error);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Trata erros das requisições
   */
  private handleError(error: AxiosError): Error {
    if (error.response) {
      // Erro de resposta do servidor
      return new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Erro de requisição (sem resposta)
      return new Error('Network Error: No response received from server');
    } else {
      // Erro de configuração
      return new Error(`Request Error: ${error.message}`);
    }
  }

  /**
   * Faz uma requisição GET
   */
  async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Faz uma requisição POST
   */
  async post<T = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}