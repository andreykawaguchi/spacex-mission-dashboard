/**
 * Crew Entity
 * Representa um membro da tripulação da SpaceX
 */
export class Crew {
  constructor({
    id,
    name,
    agency,
    image,
    wikipedia,
    launches,
    status
  }) {
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
  isActive() {
    return this.status === 'active';
  }

  /**
   * Obtém o número total de lançamentos
   */
  getTotalLaunches() {
    return this.launches.length;
  }

  /**
   * Obtém a agência formatada
   */
  getFormattedAgency() {
    return this.agency || 'SpaceX';
  }
}