/**
 * GetLaunchById Use Case
 * Caso de uso para obter um lançamento específico por ID
 */
export class GetLaunchById {
  constructor(launchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @param {string} id - ID do lançamento
   * @returns {Promise<Launch>}
   */
  async execute(id) {
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