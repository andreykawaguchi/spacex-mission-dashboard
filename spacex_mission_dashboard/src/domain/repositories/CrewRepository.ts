import { Crew } from '../entities/Crew';

/**
 * CrewRepository Interface
 * Define o contrato para operações relacionadas à tripulação
 */
export abstract class CrewRepository {
  /**
   * Obtém todos os membros da tripulação
   * @returns Promise com array de membros da tripulação
   */
  abstract getAll(): Promise<Crew[]>;

  /**
   * Obtém um membro da tripulação por ID
   * @param id - ID do membro da tripulação
   * @returns Promise com o membro da tripulação encontrado
   */
  abstract getById(id: string): Promise<Crew>;
}