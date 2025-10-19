/**
 * Crew Entity
 * Representa um membro da tripulação da SpaceX
 */

export type CrewStatus = 'active' | 'inactive' | 'retired' | 'unknown';

export interface CrewConstructorParams {
  id: string;
  name: string;
  agency: string;
  image: string;
  wikipedia: string;
  launches: string[];
  status: CrewStatus;
}

export class Crew {
  public readonly id: string;
  public readonly name: string;
  public readonly agency: string;
  public readonly image: string;
  public readonly wikipedia: string;
  public readonly launches: string[];
  public readonly status: CrewStatus;

  constructor({
    id,
    name,
    agency,
    image,
    wikipedia,
    launches,
    status
  }: CrewConstructorParams) {
    this.id = id;
    this.name = name;
    this.agency = agency;
    this.image = image;
    this.wikipedia = wikipedia;
    this.launches = launches || [];
    this.status = status;
  }

  /**
   * Verifica se o tripulante está ativo
   */
  isActive(): boolean {
    return this.status === 'active';
  }

  /**
   * Obtém o número total de lançamentos
   */
  getTotalLaunches(): number {
    return this.launches.length;
  }

  /**
   * Obtém a agência formatada
   */
  getFormattedAgency(): string {
    return this.agency || 'SpaceX';
  }
}