import { Launch } from '../entities/Launch';
import { LaunchRepository } from '../repositories/LaunchRepository';

/**
 * GetNextLaunch Use Case
 * Caso de uso para obter o próximo lançamento
 */
export class GetNextLaunch {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @returns Promise com o próximo lançamento
   */
  async execute(): Promise<Launch> {
    try {
      return await this.launchRepository.getNext();
    } catch (error) {
      console.error('Error getting next launch:', error);
      throw new Error('Failed to get next launch');
    }
  }
}