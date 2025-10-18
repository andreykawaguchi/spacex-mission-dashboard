/**
 * RocketRepository Interface
 * Define o contrato para operações relacionadas aos foguetes
 */
export class RocketRepository {
  /**
   * Obtém todos os foguetes
   * @returns {Promise<Rocket[]>}
   */
  async getAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém um foguete por ID
   * @param {string} id - ID do foguete
   * @returns {Promise<Rocket>}
   */
  async getById(id) {
    throw new Error('Method not implemented');
  }
}