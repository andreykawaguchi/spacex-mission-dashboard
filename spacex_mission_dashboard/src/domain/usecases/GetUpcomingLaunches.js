/**
 * GetUpcomingLaunches Use Case
 * Caso de uso para obter os próximos lançamentos
 */
export class GetUpcomingLaunches {
  constructor(launchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param {number} limit - Limite de resultados
   * @returns {Promise<Launch[]>}
   */
  async execute(limit = 10) {
    try {
      return await this.launchRepository.getUpcoming(limit);
    } catch (error) {
      console.error('Error getting upcoming launches:', error);
      throw new Error('Failed to get upcoming launches');
    }
  }
}