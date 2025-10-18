/**
 * GetAllCrew Use Case
 * Caso de uso para obter todos os membros da tripulação
 */
export class GetAllCrew {
  constructor(crewRepository) {
    this.crewRepository = crewRepository;
  }

  /**
   * Executa o caso de uso
   * @returns {Promise<Crew[]>}
   */
  async execute() {
    try {
      return await this.crewRepository.getAll();
    } catch (error) {
      console.error('Error getting all crew members:', error);
      throw new Error('Failed to get crew members');
    }
  }
}