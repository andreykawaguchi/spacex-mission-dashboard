import { Launch } from '../entities/Launch';
import { LaunchRepository } from '../repositories/LaunchRepository';

/**
 * GetLaunchById Use Case
 * Caso de uso para obter um lançamento específico por ID
 */
export class GetLaunchById {
  private readonly launchRepository: LaunchRepository;

  constructor(launchRepository: LaunchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param id - ID do lançamento
   * @returns Promise com o lançamento encontrado
   */
  async execute(id: string): Promise<Launch> {
    if (!id) {
      throw new Error('Launch ID is required');
    }

    try {
      return await this.launchRepository.getById(id);
    } catch (error) {
      console.error(`Error getting launch ${id}:`, error);
      throw new Error('Failed to get launch details');
    }
  }
}