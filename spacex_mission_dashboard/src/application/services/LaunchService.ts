import { Launch } from '../../domain/entities/Launch';
import { LaunchQueryOptions } from '../../domain/repositories/LaunchRepository';
import { GetAllLaunches } from '../../domain/usecases/GetAllLaunches';
import { GetUpcomingLaunches } from '../../domain/usecases/GetUpcomingLaunches';
import { GetPastLaunches } from '../../domain/usecases/GetPastLaunches';
import { GetLatestLaunch } from '../../domain/usecases/GetLatestLaunch';
import { GetNextLaunch } from '../../domain/usecases/GetNextLaunch';
import { GetLaunchById } from '../../domain/usecases/GetLaunchById';

/**
 * LaunchService
 * Application Service que coordena múltiplos use cases
 * Faz parte da camada de aplicação, intermediando entre a apresentação e o domínio
 */
export class LaunchService {
  constructor(
    private readonly getAllLaunches: GetAllLaunches,
    private readonly getUpcomingLaunches: GetUpcomingLaunches,
    private readonly getPastLaunches: GetPastLaunches,
    private readonly getLatestLaunch: GetLatestLaunch,
    private readonly getNextLaunch: GetNextLaunch,
    private readonly getLaunchById: GetLaunchById
  ) {}

  /**
   * Busca todos os lançamentos
   */
  async fetchAllLaunches(options: LaunchQueryOptions = {}): Promise<Launch[]> {
    try {
      return await this.getAllLaunches.execute(options);
    } catch (error) {
      console.error('LaunchService: Error fetching all launches', error);
      throw new Error('Erro ao carregar todos os lançamentos');
    }
  }

  /**
   * Busca próximos lançamentos
   */
  async fetchUpcomingLaunches(limit: number = 10): Promise<Launch[]> {
    try {
      return await this.getUpcomingLaunches.execute(limit);
    } catch (error) {
      console.error('LaunchService: Error fetching upcoming launches', error);
      throw new Error('Erro ao carregar próximos lançamentos');
    }
  }

  /**
   * Busca lançamentos passados
   */
  async fetchPastLaunches(limit: number = 10): Promise<Launch[]> {
    try {
      return await this.getPastLaunches.execute(limit);
    } catch (error) {
      console.error('LaunchService: Error fetching past launches', error);
      throw new Error('Erro ao carregar lançamentos passados');
    }
  }

  /**
   * Busca o último lançamento
   */
  async fetchLatestLaunch(): Promise<Launch> {
    try {
      return await this.getLatestLaunch.execute();
    } catch (error) {
      console.error('LaunchService: Error fetching latest launch', error);
      throw new Error('Erro ao carregar último lançamento');
    }
  }

  /**
   * Busca o próximo lançamento
   */
  async fetchNextLaunch(): Promise<Launch> {
    try {
      return await this.getNextLaunch.execute();
    } catch (error) {
      console.error('LaunchService: Error fetching next launch', error);
      throw new Error('Erro ao carregar próximo lançamento');
    }
  }

  /**
   * Busca um lançamento específico por ID
   */
  async fetchLaunchById(id: string): Promise<Launch> {
    try {
      if (!id) {
        throw new Error('ID do lançamento é obrigatório');
      }
      return await this.getLaunchById.execute(id);
    } catch (error) {
      console.error('LaunchService: Error fetching launch by id', error);
      throw new Error('Erro ao carregar detalhes do lançamento');
    }
  }

  /**
   * Atualiza dados essenciais do dashboard
   * Coordena múltiplos use cases
   */
  async refreshDashboardData(
    upcomingLimit: number = 5,
    pastLimit: number = 5
  ): Promise<{
    upcoming: Launch[];
    past: Launch[];
    latest: Launch;
    next: Launch;
  }> {
    try {
      const [upcoming, past, latest, next] = await Promise.all([
        this.fetchUpcomingLaunches(upcomingLimit),
        this.fetchPastLaunches(pastLimit),
        this.fetchLatestLaunch(),
        this.fetchNextLaunch()
      ]);

      return { upcoming, past, latest, next };
    } catch (error) {
      console.error('LaunchService: Error refreshing dashboard data', error);
      throw new Error('Erro ao atualizar dados do dashboard');
    }
  }
}
