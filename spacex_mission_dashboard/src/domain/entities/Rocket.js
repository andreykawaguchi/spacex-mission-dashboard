/**
 * Rocket Entity
 * Representa uma entidade de foguete da SpaceX
 */
export class Rocket {
  constructor({
    id,
    name,
    type,
    active,
    stages,
    boosters,
    costPerLaunch,
    successRatePct,
    firstFlight,
    country,
    company,
    height,
    diameter,
    mass,
    payloadWeights,
    firstStage,
    secondStage,
    engines,
    landingLegs,
    flickrImages,
    wikipedia,
    description
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.active = active;
    this.stages = stages;
    this.boosters = boosters;
    this.costPerLaunch = costPerLaunch;
    this.successRatePct = successRatePct;
    this.firstFlight = firstFlight;
    this.country = country;
    this.company = company;
    this.height = height;
    this.diameter = diameter;
    this.mass = mass;
    this.payloadWeights = payloadWeights || [];
    this.firstStage = firstStage;
    this.secondStage = secondStage;
    this.engines = engines;
    this.landingLegs = landingLegs;
    this.flickrImages = flickrImages || [];
    this.wikipedia = wikipedia;
    this.description = description;
  }

  /**
   * Verifica se o foguete está ativo
   */
  isActive() {
    return this.active === true;
  }

  /**
   * Obtém o custo formatado por lançamento
   */
  getFormattedCost() {
    if (!this.costPerLaunch) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(this.costPerLaunch);
  }

  /**
   * Obtém a taxa de sucesso formatada
   */
  getFormattedSuccessRate() {
    if (this.successRatePct === null || this.successRatePct === undefined) {
      return 'Não informado';
    }
    return `${this.successRatePct}%`;
  }

  /**
   * Obtém a altura formatada
   */
  getFormattedHeight() {
    if (!this.height?.meters) return 'Não informado';
    return `${this.height.meters}m`;
  }
}