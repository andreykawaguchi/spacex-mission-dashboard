import { Launch } from '../entities/Launch';
import { LaunchRepository } from '../repositories/LaunchRepository';

/**
 * GetLatestLaunch Use Case
 * Caso de uso para obter o último lançamento
 */
export class GetLatestLaunch {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @returns Promise com o último lançamento
   */
  async execute(): Promise<Launch> {
    try {
      return await this.launchRepository.getLatest();
    } catch (error) {
      console.error('Error getting latest launch:', error);
      throw new Error('Failed to get latest launch');
    }
  }
}