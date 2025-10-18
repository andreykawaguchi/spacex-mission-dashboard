/**
 * GetLatestLaunch Use Case
 * Caso de uso para obter o último lançamento
 */
export class GetLatestLaunch {
  constructor(launchRepository) {
    this.launchRepository = launchRepository;
  }

  /**
   * Executa o caso de uso
   * @returns {Promise<Launch>}
   */
  async execute() {
    try {
      return await this.launchRepository.getLatest();
    } catch (error) {
      console.error('Error getting latest launch:', error);
      throw new Error('Failed to get latest launch');
    }
  }
}