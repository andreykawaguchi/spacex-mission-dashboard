/**
 * LaunchRepository Interface
 * Define o contrato para operações relacionadas aos lançamentos
 */
export class LaunchRepository {
  /**
   * Obtém todos os lançamentos
   * @param {Object} options - Opções de filtro e paginação
   * @returns {Promise<Launch[]>}
   */
  async getAll(options = {}) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém um lançamento por ID
   * @param {string} id - ID do lançamento
   * @returns {Promise<Launch>}
   */
  async getById(id) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém os próximos lançamentos
   * @param {number} limit - Limite de resultados
   * @returns {Promise<Launch[]>}
   */
  async getUpcoming(limit = 10) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém os lançamentos passados
   * @param {number} limit - Limite de resultados
   * @returns {Promise<Launch[]>}
   */
  async getPast(limit = 10) {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém o último lançamento
   * @returns {Promise<Launch>}
   */
  async getLatest() {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém o próximo lançamento
   * @returns {Promise<Launch>}
   */
  async getNext() {
    throw new Error('Method not implemented');
  }
}