import { Launch } from '../entities/Launch';

/**
 * LaunchRepository Interface
 * Define o contrato para operações relacionadas aos lançamentos
 */

export interface LaunchQueryOptions {
  limit?: number;
  offset?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export abstract class LaunchRepository {
  /**
   * Obtém todos os lançamentos
   * @param options - Opções de filtro e paginação
   * @returns Promise com array de lançamentos
   */
  abstract getAll(options?: LaunchQueryOptions): Promise<Launch[]>;

  /**
   * Obtém um lançamento por ID
   * @param id - ID do lançamento
   * @returns Promise com o lançamento encontrado
   */
  abstract getById(id: string): Promise<Launch>;

  /**
   * Obtém os próximos lançamentos
   * @param limit - Limite de resultados
   * @returns Promise com array de lançamentos futuros
   */
  abstract getUpcoming(limit?: number): Promise<Launch[]>;

  /**
   * Obtém os lançamentos passados
   * @param limit - Limite de resultados
   * @returns Promise com array de lançamentos passados
   */
  abstract getPast(limit?: number): Promise<Launch[]>;

  /**
   * Obtém o último lançamento
   * @returns Promise com o último lançamento
   */
  abstract getLatest(): Promise<Launch>;

  /**
   * Obtém o próximo lançamento
   * @returns Promise com o próximo lançamento
   */
  abstract getNext(): Promise<Launch>;
}