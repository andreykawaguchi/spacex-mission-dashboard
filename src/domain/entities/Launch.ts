/**
 * Launch Entity
 * Representa uma entidade de lançamento da SpaceX
 * Convertido para plain object (interface) para compatibilidade com Redux serialization
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

export interface Launch {
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

/**
 * Utilitários para trabalhar com Launch
 */
export const LaunchUtils = {
  /**
   * Verifica se o lançamento foi bem-sucedido
   */
  isSuccessful: (launch: Launch): boolean => {
    return launch.success === true;
  },

  /**
   * Verifica se o lançamento está planejado para o futuro
   */
  isUpcoming: (launch: Launch): boolean => {
    return launch.upcoming === true;
  },

  /**
   * Obtém a data do lançamento formatada
   */
  getFormattedDate: (launch: Launch): string => {
    if (!launch.dateUtc) return 'Data não disponível';
    return new Date(launch.dateUtc).toLocaleDateString('pt-BR');
  },

  /**
   * Obtém o status do lançamento
   */
  getStatus: (launch: Launch): 'Programado' | 'Sucesso' | 'Falha' | 'Desconhecido' => {
    if (launch.upcoming) return 'Programado';
    if (launch.success === true) return 'Sucesso';
    if (launch.success === false) return 'Falha';
    return 'Desconhecido';
  }
};