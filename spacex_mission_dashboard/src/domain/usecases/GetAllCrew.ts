import { Crew } from '../entities/Crew';
import { CrewRepository } from '../repositories/CrewRepository';

/**
 * GetAllCrew Use Case
 * Caso de uso para obter todos os membros da tripulação
 */
export class GetAllCrew {
  private readonly crewRepository: CrewRepository;

  constructor(crewRepository: CrewRepository) {
    this.crewRepository = crewRepository;
  }

  /**
   * Executa o caso de uso
   * @returns Promise com array de membros da tripulação
   */
  async execute(): Promise<Crew[]> {
    try {
      return await this.crewRepository.getAll();
    } catch (error) {
      console.error('Error getting all crew:', error);
      throw new Error('Failed to get crew members');
    }
  }
}