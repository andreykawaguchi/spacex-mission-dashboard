/**
 * GetPastLaunches Use Case
 * Caso de uso para obter lançamentos passados
 */
export class GetPastLaunches {
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
      return await this.launchRepository.getPast(limit);
    } catch (error) {
      console.error('Error getting past launches:', error);
      throw new Error('Failed to get past launches');
    }
  }
}