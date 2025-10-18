/**
 * Launch Entity
 * Representa uma entidade de lançamento da SpaceX
 */
export class Launch {
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
  }) {
    this.id = id;
    this.name = name;
    this.flightNumber = flightNumber;
    this.dateUtc = dateUtc;
    this.dateLocal = dateLocal;
    this.success = success;
    this.upcoming = upcoming;
    this.rocket = rocket;
    this.crew = crew || [];
    this.ships = ships || [];
    this.payloads = payloads || [];
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
  isSuccessful() {
    return this.success === true;
  }

  /**
   * Verifica se o lançamento está planejado para o futuro
   */
  isUpcoming() {
    return this.upcoming === true;
  }

  /**
   * Obtém a data do lançamento formatada
   */
  getFormattedDate() {
    if (!this.dateUtc) return 'Data não disponível';
    return new Date(this.dateUtc).toLocaleDateString('pt-BR');
  }

  /**
   * Obtém o status do lançamento
   */
  getStatus() {
    if (this.upcoming) return 'Programado';
    if (this.success === true) return 'Sucesso';
    if (this.success === false) return 'Falha';
    return 'Desconhecido';
  }
}