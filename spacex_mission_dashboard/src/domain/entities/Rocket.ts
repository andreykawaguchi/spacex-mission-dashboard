/**
 * Rocket Entity
 * Representa uma entidade de foguete da SpaceX
 */

export interface RocketDimensions {
  meters: number | null;
  feet: number | null;
}

export interface RocketMass {
  kg: number | null;
  lb: number | null;
}

export interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export interface RocketStage {
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number | null;
  reusable: boolean;
  thrust_sea_level?: {
    kN: number;
    lbf: number;
  };
  thrust_vacuum?: {
    kN: number;
    lbf: number;
  };
}

export interface RocketEngines {
  isp: {
    sea_level: number;
    vacuum: number;
  };
  thrust_sea_level: {
    kN: number;
    lbf: number;
  };
  thrust_vacuum: {
    kN: number;
    lbf: number;
  };
  number: number;
  type: string;
  version: string;
  layout: string | null;
  engine_loss_max: number | null;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

export interface LandingLegs {
  number: number;
  material: string | null;
}

export interface RocketConstructorParams {
  id: string;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  costPerLaunch: number | null;
  successRatePct: number | null;
  firstFlight: string;
  country: string;
  company: string;
  height: RocketDimensions;
  diameter: RocketDimensions;
  mass: RocketMass;
  payloadWeights: PayloadWeight[];
  firstStage: RocketStage;
  secondStage: RocketStage;
  engines: RocketEngines;
  landingLegs: LandingLegs;
  flickrImages: string[];
  wikipedia: string;
  description: string;
}

export class Rocket {
  public readonly id: string;
  public readonly name: string;
  public readonly type: string;
  public readonly active: boolean;
  public readonly stages: number;
  public readonly boosters: number;
  public readonly costPerLaunch: number | null;
  public readonly successRatePct: number | null;
  public readonly firstFlight: string;
  public readonly country: string;
  public readonly company: string;
  public readonly height: RocketDimensions;
  public readonly diameter: RocketDimensions;
  public readonly mass: RocketMass;
  public readonly payloadWeights: PayloadWeight[];
  public readonly firstStage: RocketStage;
  public readonly secondStage: RocketStage;
  public readonly engines: RocketEngines;
  public readonly landingLegs: LandingLegs;
  public readonly flickrImages: string[];
  public readonly wikipedia: string;
  public readonly description: string;

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
  }: RocketConstructorParams) {
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
  isActive(): boolean {
    return this.active === true;
  }

  /**
   * Obtém o custo formatado por lançamento
   */
  getFormattedCost(): string {
    if (!this.costPerLaunch) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(this.costPerLaunch);
  }

  /**
   * Obtém a taxa de sucesso formatada
   */
  getFormattedSuccessRate(): string {
    if (this.successRatePct === null || this.successRatePct === undefined) {
      return 'Não informado';
    }
    return `${this.successRatePct}%`;
  }

  /**
   * Obtém a altura formatada
   */
  getFormattedHeight(): string {
    if (!this.height?.meters) return 'Não informado';
    return `${this.height.meters}m`;
  }
}