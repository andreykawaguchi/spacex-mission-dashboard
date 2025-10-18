/**
 * CrewRepository Interface
 * Define o contrato para operações relacionadas à tripulação
 */
export class CrewRepository {
  /**
   * Obtém todos os membros da tripulação
   * @returns {Promise<Crew[]>}
   */
  async getAll() {
    throw new Error('Method not implemented');
  }

  /**
   * Obtém um membro da tripulação por ID
   * @param {string} id - ID do membro da tripulação
   * @returns {Promise<Crew>}
   */
  async getById(id) {
    throw new Error('Method not implemented');
  }
}