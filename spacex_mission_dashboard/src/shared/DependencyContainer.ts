import { HttpClient } from '../infrastructure/api/HttpClient';
import { SpaceXLaunchRepository } from '../infrastructure/repositories/SpaceXLaunchRepository';

// Use Cases
import { GetAllLaunches } from '../domain/usecases/GetAllLaunches';
import { GetUpcomingLaunches } from '../domain/usecases/GetUpcomingLaunches';
import { GetPastLaunches } from '../domain/usecases/GetPastLaunches';
import { GetLatestLaunch } from '../domain/usecases/GetLatestLaunch';
import { GetNextLaunch } from '../domain/usecases/GetNextLaunch';
import { GetLaunchById } from '../domain/usecases/GetLaunchById';

// Application Services
import { LaunchService } from '../application/services/LaunchService';

/**
 * Interface para as dependências
 */
interface Dependencies {
  httpClient: HttpClient;
  launchRepository: SpaceXLaunchRepository;
  getAllLaunches: GetAllLaunches;
  getUpcomingLaunches: GetUpcomingLaunches;
  getPastLaunches: GetPastLaunches;
  getLatestLaunch: GetLatestLaunch;
  getNextLaunch: GetNextLaunch;
  getLaunchById: GetLaunchById;
  launchService: LaunchService;
}

/**
 * Interface para dependências de lançamentos
 */
export interface LaunchDependencies {
  getAllLaunches: GetAllLaunches;
  getUpcomingLaunches: GetUpcomingLaunches;
  getPastLaunches: GetPastLaunches;
  getLatestLaunch: GetLatestLaunch;
  getNextLaunch: GetNextLaunch;
  getLaunchById: GetLaunchById;
}

/**
 * DependencyContainer
 * Container para injeção de dependências seguindo o padrão Clean Architecture
 */
class DependencyContainer {
  private dependencies: Partial<Dependencies> = {};

  constructor() {
    this.setupDependencies();
  }

  /**
   * Configura todas as dependências
   */
  private setupDependencies(): void {
    // Infrastructure Layer
    this.dependencies.httpClient = new HttpClient();
    this.dependencies.launchRepository = new SpaceXLaunchRepository(
      this.dependencies.httpClient
    );

    // Use Cases Layer
    this.dependencies.getAllLaunches = new GetAllLaunches(
      this.dependencies.launchRepository
    );
    this.dependencies.getUpcomingLaunches = new GetUpcomingLaunches(
      this.dependencies.launchRepository
    );
    this.dependencies.getPastLaunches = new GetPastLaunches(
      this.dependencies.launchRepository
    );
    this.dependencies.getLatestLaunch = new GetLatestLaunch(
      this.dependencies.launchRepository
    );
    this.dependencies.getNextLaunch = new GetNextLaunch(
      this.dependencies.launchRepository
    );
    this.dependencies.getLaunchById = new GetLaunchById(
      this.dependencies.launchRepository
    );

    // Application Services
    this.dependencies.launchService = new LaunchService(
      this.dependencies.getAllLaunches,
      this.dependencies.getUpcomingLaunches,
      this.dependencies.getPastLaunches,
      this.dependencies.getLatestLaunch,
      this.dependencies.getNextLaunch,
      this.dependencies.getLaunchById
    );
  }

  /**
   * Obtém uma dependência específica
   */
  get<K extends keyof Dependencies>(name: K): Dependencies[K] {
    const dependency = this.dependencies[name];
    if (!dependency) {
      throw new Error(`Dependency ${String(name)} not found`);
    }
    return dependency;
  }

  /**
   * Obtém todas as dependências relacionadas aos lançamentos
   */
  getLaunchDependencies(): LaunchDependencies {
    return {
      getAllLaunches: this.get('getAllLaunches'),
      getUpcomingLaunches: this.get('getUpcomingLaunches'),
      getPastLaunches: this.get('getPastLaunches'),
      getLatestLaunch: this.get('getLatestLaunch'),
      getNextLaunch: this.get('getNextLaunch'),
      getLaunchById: this.get('getLaunchById')
    };
  }
}

// Instância singleton do container
export const dependencyContainer = new DependencyContainer();