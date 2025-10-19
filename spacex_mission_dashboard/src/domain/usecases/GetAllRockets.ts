import { Rocket } from '../entities/Rocket';
import { RocketRepository } from '../repositories/RocketRepository';

/**
 * GetAllRockets Use Case
 * Caso de uso para obter todos os foguetes
 */
export class GetAllRockets {
  private readonly rocketRepository: RocketRepository;

  constructor(rocketRepository: RocketRepository) {
    this.rocketRepository = rocketRepository;
  }

  /**
   * Executa o caso de uso
   * @returns Promise com array de foguetes
   */
  async execute(): Promise<Rocket[]> {
    try {
      return await this.rocketRepository.getAll();
    } catch (error) {
      console.error('Error getting all rockets:', error);
      throw new Error('Failed to get rockets');
    }
  }
}