/**
 * GetAllLaunches Use Case
 * Caso de uso para obter todos os lançamentos
 */
export class GetAllLaunches {
  constructor(launchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param {Object} options - Opções de filtro e paginação
   * @returns {Promise<Launch[]>}
   */
  async execute(options = {}) {
    try {
      return await this.launchRepository.getAll(options);
    } catch (error) {
      console.error('Error getting all launches:', error);
      throw new Error('Failed to get launches');
    }
  }
}