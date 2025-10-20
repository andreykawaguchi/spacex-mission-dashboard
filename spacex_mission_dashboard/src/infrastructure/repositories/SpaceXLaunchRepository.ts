import { LaunchRepository, LaunchQueryOptions } from '../../domain/repositories/LaunchRepository';
import { Launch } from '../../domain/entities/Launch';
import { API_CONFIG } from '../../shared/constants/apiConfig';
import { HttpClient } from '../api/HttpClient';

/**
 * Dados da API da SpaceX para Launch
 */
interface SpaceXLaunchApiData {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
  date_local: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  crew: string[];
  ships: string[];
  payloads: string[];
  launchpad: string;
  details: string | null;
  links: any;
  auto_update: boolean;
  tbd: boolean;
  net: boolean;
  window: number | null;
}

/**
 * SpaceXLaunchRepository
 * Implementação concreta do repositório de lançamentos para a API da SpaceX
 */
export class SpaceXLaunchRepository extends LaunchRepository {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    super();
    this.httpClient = httpClient;
  }

  /**
   * Mapeia dados da API para entidade Launch (plain object)
   */
  private mapToEntity(data: SpaceXLaunchApiData): Launch {
    return {
      id: data.id,
      name: data.name,
      flightNumber: data.flight_number,
      dateUtc: data.date_utc,
      dateLocal: data.date_local,
      success: data.success,
      upcoming: data.upcoming,
      rocket: data.rocket,
      crew: data.crew || [],
      ships: data.ships || [],
      payloads: data.payloads || [],
      launchpad: data.launchpad,
      details: data.details,
      links: data.links,
      autoUpdate: data.auto_update,
      tbd: data.tbd,
      net: data.net,
      window: data.window
    };
  }

  /**
   * Obtém todos os lançamentos
   */
  async getAll(options: LaunchQueryOptions = {}): Promise<Launch[]> {
    try {
      const config: any = {};
      
      // Adiciona parâmetros de query se fornecidos
      if (Object.keys(options).length > 0) {
        config.params = options;
      }

      const data = await this.httpClient.get<SpaceXLaunchApiData[]>(API_CONFIG.ENDPOINTS.LAUNCHES, config);
      return data.map(launch => this.mapToEntity(launch));
    } catch (error) {
      console.error('Error fetching all launches:', error);
      throw error;
    }
  }

  /**
   * Obtém um lançamento por ID
   */
  async getById(id: string): Promise<Launch> {
    try {
      const data = await this.httpClient.get<SpaceXLaunchApiData>(`${API_CONFIG.ENDPOINTS.LAUNCHES}/${id}`);
      return this.mapToEntity(data);
    } catch (error) {
      console.error(`Error fetching launch with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtém os próximos lançamentos
   */
  async getUpcoming(limit: number = 10): Promise<Launch[]> {
    try {
      const config = {
        params: { limit }
      };
      
      const data = await this.httpClient.get<SpaceXLaunchApiData[]>(API_CONFIG.ENDPOINTS.LAUNCHES_UPCOMING, config);
      return data.map(launch => this.mapToEntity(launch));
    } catch (error) {
      console.error('Error fetching upcoming launches:', error);
      throw error;
    }
  }

  /**
   * Obtém os lançamentos passados
   */
  async getPast(limit: number = 10): Promise<Launch[]> {
    try {
      const config = {
        params: { limit }
      };
      
      const data = await this.httpClient.get<SpaceXLaunchApiData[]>(API_CONFIG.ENDPOINTS.LAUNCHES_PAST, config);
      return data.map(launch => this.mapToEntity(launch));
    } catch (error) {
      console.error('Error fetching past launches:', error);
      throw error;
    }
  }

  /**
   * Obtém o último lançamento
   */
  async getLatest(): Promise<Launch> {
    try {
      const data = await this.httpClient.get<SpaceXLaunchApiData>(API_CONFIG.ENDPOINTS.LAUNCHES_LATEST);
      return this.mapToEntity(data);
    } catch (error) {
      console.error('Error fetching latest launch:', error);
      throw error;
    }
  }

  /**
   * Obtém o próximo lançamento
   */
  async getNext(): Promise<Launch> {
    try {
      const data = await this.httpClient.get<SpaceXLaunchApiData>(API_CONFIG.ENDPOINTS.LAUNCHES_NEXT);
      return this.mapToEntity(data);
    } catch (error) {
      console.error('Error fetching next launch:', error);
      throw error;
    }
  }
}