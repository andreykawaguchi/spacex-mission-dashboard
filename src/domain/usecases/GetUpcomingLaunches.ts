import { Launch } from '../entities/Launch';
import { LaunchRepository } from '../repositories/LaunchRepository';

/**
 * GetUpcomingLaunches Use Case
 * Caso de uso para obter lançamentos futuros
 */
export class GetUpcomingLaunches {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param limit - Limite de resultados
   * @returns Promise com array de lançamentos futuros
   */
  async execute(limit: number = 10): Promise<Launch[]> {
    try {
      return await this.launchRepository.getUpcoming(limit);
    } catch (error) {
      console.error('Error getting upcoming launches:', error);
      throw new Error('Failed to get upcoming launches');
    }
  }
}