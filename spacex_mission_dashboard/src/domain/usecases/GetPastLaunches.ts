import { Launch } from '../entities/Launch';
import { LaunchRepository } from '../repositories/LaunchRepository';

/**
 * GetPastLaunches Use Case
 * Caso de uso para obter lançamentos passados
 */
export class GetPastLaunches {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param limit - Limite de resultados
   * @returns Promise com array de lançamentos passados
   */
  async execute(limit: number = 10): Promise<Launch[]> {
    try {
      return await this.launchRepository.getPast(limit);
    } catch (error) {
      console.error('Error getting past launches:', error);
      throw new Error('Failed to get past launches');
    }
  }
}