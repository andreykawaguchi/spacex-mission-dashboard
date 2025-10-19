import { Launch } from '../entities/Launch';
import { LaunchRepository, LaunchQueryOptions } from '../repositories/LaunchRepository';

/**
 * GetAllLaunches Use Case
 * Caso de uso para obter todos os lançamentos
 */
export class GetAllLaunches {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param options - Opções de filtro e paginação
   * @returns Promise com array de lançamentos
   */
  async execute(options: LaunchQueryOptions = {}): Promise<Launch[]> {
    try {
      return await this.launchRepository.getAll(options);
    } catch (error) {
      console.error('Error getting all launches:', error);
      throw new Error('Failed to get launches');
    }
  }
}