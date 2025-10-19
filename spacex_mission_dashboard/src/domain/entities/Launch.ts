/**
 * Launch Entity
 * Representa uma entidade de lançamento da SpaceX
 */

export interface LaunchLinks {
  patch?: {
    small?: string;
    large?: string;
  };
  reddit?: {
    campaign?: string;
    launch?: string;
    media?: string;
    recovery?: string;
  };
  flickr?: {
    small?: string[];
    original?: string[];
  };
  presskit?: string;
  webcast?: string;
  youtube_id?: string;
  article?: string;
  wikipedia?: string;
}

export interface LaunchConstructorParams {
  id: string;
  name: string;
  flightNumber: number;
  dateUtc: string;
  dateLocal: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  crew: string[];
  ships: string[];
  payloads: string[];
  launchpad: string;
  details: string | null;
  links: LaunchLinks;
  autoUpdate: boolean;
  tbd: boolean;
  net: boolean;
  window: number | null;
}

export class Launch {
  public readonly id: string;
  public readonly name: string;
  public readonly flightNumber: number;
  public readonly dateUtc: string;
  public readonly dateLocal: string;
  public readonly success: boolean | null;
  public readonly upcoming: boolean;
  public readonly rocket: string;
  public readonly crew: string[];
  public readonly ships: string[];
  public readonly payloads: string[];
  public readonly launchpad: string;
  public readonly details: string | null;
  public readonly links: LaunchLinks;
  public readonly autoUpdate: boolean;
  public readonly tbd: boolean;
  public readonly net: boolean;
  public readonly window: number | null;

  constructor({
    id,
    name,
    flightNumber,
    dateUtc,
    dateLocal,
    success,
    upcoming,
    rocket,
    crew,
    ships,
    payloads,
    launchpad,
    details,
    links,
    autoUpdate,
    tbd,
    net,
    window
  }: LaunchConstructorParams) {
    this.id = id;
    this.name = name;
    this.flightNumber = flightNumber;
    this.dateUtc = dateUtc;
    this.dateLocal = dateLocal;
    this.success = success;
    this.upcoming = upcoming;
    this.rocket = rocket;
    this.crew = crew ? [...crew] : [];
    this.ships = ships ? [...ships] : [];
    this.payloads = payloads ? [...payloads] : [];
    this.launchpad = launchpad;
    this.details = details;
    this.links = links;
    this.autoUpdate = autoUpdate;
    this.tbd = tbd;
    this.net = net;
    this.window = window;
  }

  /**
   * Verifica se o lançamento foi bem-sucedido
   */
  isSuccessful(): boolean {
    return this.success === true;
  }

  /**
   * Verifica se o lançamento está planejado para o futuro
   */
  isUpcoming(): boolean {
    return this.upcoming === true;
  }

  /**
   * Obtém a data do lançamento formatada
   */
  getFormattedDate(): string {
    if (!this.dateUtc) return 'Data não disponível';
    return new Date(this.dateUtc).toLocaleDateString('pt-BR');
  }

  /**
   * Obtém o status do lançamento
   */
  getStatus(): 'Programado' | 'Sucesso' | 'Falha' | 'Desconhecido' {
    if (this.upcoming) return 'Programado';
    if (this.success === true) return 'Sucesso';
    if (this.success === false) return 'Falha';
    return 'Desconhecido';
  }
}