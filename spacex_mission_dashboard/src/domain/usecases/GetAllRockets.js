/**
 * GetAllRockets Use Case
 * Caso de uso para obter todos os foguetes
 */
export class GetAllRockets {
  constructor(rocketRepository) {
    this.rocketRepository = rocketRepository;
  }

  /**
   * Executa o caso de uso
   * @returns {Promise<Rocket[]>}
   */
  async execute() {
    try {
      return await this.rocketRepository.getAll();
    } catch (error) {
      console.error('Error getting all rockets:', error);
      throw new Error('Failed to get rockets');
    }
  }
}