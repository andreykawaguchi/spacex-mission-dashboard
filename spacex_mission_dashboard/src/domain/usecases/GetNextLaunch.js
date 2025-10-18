/**
 * GetNextLaunch Use Case
 * Caso de uso para obter o próximo lançamento
 */
export class GetNextLaunch {
  constructor(launchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @returns {Promise<Launch>}
   */
  async execute() {
    try {
      return await this.launchRepository.getNext();
    } catch (error) {
      console.error('Error getting next launch:', error);
      throw new Error('Failed to get next launch');
    }
  }
}