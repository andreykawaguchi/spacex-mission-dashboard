import { HttpClient } from '../infrastructure/api/HttpClient';
import { SpaceXLaunchRepository } from '../infrastructure/repositories/SpaceXLaunchRepository';

// Use Cases
import { GetAllLaunches } from '../domain/usecases/GetAllLaunches';
import { GetUpcomingLaunches } from '../domain/usecases/GetUpcomingLaunches';
import { GetPastLaunches } from '../domain/usecases/GetPastLaunches';
import { GetLatestLaunch } from '../domain/usecases/GetLatestLaunch';
import { GetNextLaunch } from '../domain/usecases/GetNextLaunch';
import { GetLaunchById } from '../domain/usecases/GetLaunchById';

/**
 * DependencyContainer
 * Container para injeção de dependências seguindo o padrão Clean Architecture
 */
class DependencyContainer {
  constructor() {
    this.dependencies = {};
    this.setupDependencies();
  }

  /**
   * Configura todas as dependências
   */
  setupDependencies() {
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
  }

  /**
   * Obtém uma dependência específica
   */
  get(name) {
    if (!this.dependencies[name]) {
      throw new Error(`Dependency ${name} not found`);
    }
    return this.dependencies[name];
  }

  /**
   * Obtém todas as dependências relacionadas aos lançamentos
   */
  getLaunchDependencies() {
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