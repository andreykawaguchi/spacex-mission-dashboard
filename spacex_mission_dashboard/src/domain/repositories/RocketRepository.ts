import { Rocket } from '../entities/Rocket';

/**
 * RocketRepository Interface
 * Define o contrato para operações relacionadas aos foguetes
 */
export abstract class RocketRepository {
  /**
   * Obtém todos os foguetes
   * @returns Promise com array de foguetes
   */
  abstract getAll(): Promise<Rocket[]>;

  /**
   * Obtém um foguete por ID
   * @param id - ID do foguete
   * @returns Promise com o foguete encontrado
   */
  abstract getById(id: string): Promise<Rocket>;
}