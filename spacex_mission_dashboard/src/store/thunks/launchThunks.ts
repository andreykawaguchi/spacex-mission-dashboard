/**
 * Launch Thunks
 * Async thunks para operações de API relacionadas aos lançamentos
 */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Launch } from '../../domain/entities/Launch';
import { LaunchQueryOptions } from '../../domain/repositories/LaunchRepository';
import { dependencyContainer } from '../../shared/DependencyContainer';
import { RootState } from '../index';

// Tipos para parâmetros dos thunks
interface FetchAllLaunchesOptions extends LaunchQueryOptions {
  forceRefresh?: boolean;
}

interface RefreshDashboardOptions {
  upcomingLimit?: number;
  pastLimit?: number;
}

interface RefreshResult {
  success: number;
  total: number;
  failures: number;
}

// Obter dependências dos casos de uso
const getDependencies = () => dependencyContainer.getLaunchDependencies();

/**
 * Thunk para buscar todos os lançamentos
 */
export const fetchAllLaunches = createAsyncThunk<
  Launch[],
  FetchAllLaunchesOptions,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchAll',
  async (options = {}, { rejectWithValue }) => {
    try {
      const deps = getDependencies();
      const launches = await deps.getAllLaunches.execute(options);
      return launches;
    } catch (error) {
      console.error('Error fetching all launches:', error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar todos os lançamentos';
      return rejectWithValue(message);
    }
  },
  {
    condition: (options, { getState }) => {
      const state = getState();
      const { loading, lastFetch, cacheTimeout } = state.launches;
      
      // Não executar se já estiver carregando
      if (loading.all) {
        return false;
      }
      
      // Verificar se os dados ainda estão válidos no cache
      if (lastFetch.all) {
        const isStale = Date.now() - lastFetch.all > cacheTimeout;
        if (!isStale && !options.forceRefresh) {
          return false;
        }
      }
      
      return true;
    }
  }
);

/**
 * Thunk para buscar próximos lançamentos
 */
export const fetchUpcomingLaunches = createAsyncThunk<
  Launch[],
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchUpcoming',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const deps = getDependencies();
      const launches = await deps.getUpcomingLaunches.execute(limit);
      return launches;
    } catch (error) {
      console.error('Error fetching upcoming launches:', error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar próximos lançamentos';
      return rejectWithValue(message);
    }
  },
  {
    condition: (limit, { getState }) => {
      const state = getState();
      const { loading, lastFetch, cacheTimeout } = state.launches;
      
      if (loading.upcoming) return false;
      
      if (lastFetch.upcoming) {
        const isStale = Date.now() - lastFetch.upcoming > cacheTimeout;
        if (!isStale) return false;
      }
      
      return true;
    }
  }
);

/**
 * Thunk para buscar lançamentos passados
 */
export const fetchPastLaunches = createAsyncThunk<
  Launch[],
  number,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchPast',
  async (limit = 10, { rejectWithValue }) => {
    try {
      const deps = getDependencies();
      const launches = await deps.getPastLaunches.execute(limit);
      return launches;
    } catch (error) {
      console.error('Error fetching past launches:', error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar lançamentos passados';
      return rejectWithValue(message);
    }
  },
  {
    condition: (limit, { getState }) => {
      const state = getState();
      const { loading, lastFetch, cacheTimeout } = state.launches;
      
      if (loading.past) return false;
      
      if (lastFetch.past) {
        const isStale = Date.now() - lastFetch.past > cacheTimeout;
        if (!isStale) return false;
      }
      
      return true;
    }
  }
);

/**
 * Thunk para buscar o último lançamento
 */
export const fetchLatestLaunch = createAsyncThunk<
  Launch,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchLatest',
  async (_, { rejectWithValue }) => {
    try {
      const deps = getDependencies();
      const launch = await deps.getLatestLaunch.execute();
      return launch;
    } catch (error) {
      console.error('Error fetching latest launch:', error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar último lançamento';
      return rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const { loading, lastFetch, cacheTimeout } = state.launches;
      
      if (loading.latest) return false;
      
      if (lastFetch.latest) {
        const isStale = Date.now() - lastFetch.latest > cacheTimeout;
        if (!isStale) return false;
      }
      
      return true;
    }
  }
);

/**
 * Thunk para buscar o próximo lançamento
 */
export const fetchNextLaunch = createAsyncThunk<
  Launch,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchNext',
  async (_, { rejectWithValue }) => {
    try {
      const deps = getDependencies();
      const launch = await deps.getNextLaunch.execute();
      return launch;
    } catch (error) {
      console.error('Error fetching next launch:', error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar próximo lançamento';
      return rejectWithValue(message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const { loading, lastFetch, cacheTimeout } = state.launches;
      
      if (loading.next) return false;
      
      if (lastFetch.next) {
        const isStale = Date.now() - lastFetch.next > cacheTimeout;
        if (!isStale) return false;
      }
      
      return true;
    }
  }
);

/**
 * Thunk para buscar um lançamento por ID
 */
export const fetchLaunchById = createAsyncThunk<
  Launch,
  string,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        throw new Error('ID do lançamento é obrigatório');
      }
      
      const deps = getDependencies();
      const launch = await deps.getLaunchById.execute(id);
      return launch;
    } catch (error) {
      console.error(`Error fetching launch ${id}:`, error);
      const message = error instanceof Error ? error.message : 'Erro ao carregar detalhes do lançamento';
      return rejectWithValue(message);
    }
  },
  {
    condition: (id, { getState }) => {
      const state = getState();
      const { loading } = state.launches;
      
      // Não carregar se já estiver buscando
      if (loading.byId) return false;
      
      // Verificar se o lançamento já está selecionado
      const selectedLaunch = state.launches.selectedLaunch;
      if (selectedLaunch && (selectedLaunch as Launch).id === id) {
        return false;
      }
      
      return true;
    }
  }
);

/**
 * Thunk combinado para atualizar dados essenciais do dashboard
 */
export const refreshDashboardData = createAsyncThunk<
  RefreshResult,
  RefreshDashboardOptions,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/refreshDashboard',
  async (options = {}, { dispatch, rejectWithValue }) => {
    try {
      const { upcomingLimit = 5, pastLimit = 5 } = options;
      
      // Executar todas as operações em paralelo
      const results = await Promise.allSettled([
        dispatch(fetchUpcomingLaunches(upcomingLimit)).unwrap(),
        dispatch(fetchPastLaunches(pastLimit)).unwrap(),
        dispatch(fetchLatestLaunch()).unwrap(),
        dispatch(fetchNextLaunch()).unwrap()
      ]);
      
      // Verificar se alguma operação falhou
      const failures = results.filter(result => result.status === 'rejected');
      
      if (failures.length > 0) {
        console.warn('Some dashboard data refresh operations failed:', failures);
      }
      
      return {
        success: results.filter(result => result.status === 'fulfilled').length,
        total: results.length,
        failures: failures.length
      };
    } catch (error) {
      console.error('Error refreshing dashboard data:', error);
      const message = error instanceof Error ? error.message : 'Erro ao atualizar dados do dashboard';
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk para forçar atualização de todos os dados
 */
export const forceRefreshAllData = createAsyncThunk<
  RefreshResult,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'launches/forceRefreshAll',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Forçar atualização de todos os dados ignorando o cache
      const results = await Promise.allSettled([
        dispatch(fetchAllLaunches({ forceRefresh: true })).unwrap(),
        dispatch(fetchUpcomingLaunches(10)).unwrap(),
        dispatch(fetchPastLaunches(10)).unwrap(),
        dispatch(fetchLatestLaunch()).unwrap(),
        dispatch(fetchNextLaunch()).unwrap()
      ]);
      
      const failures = results.filter(result => result.status === 'rejected');
      
      return {
        success: results.filter(result => result.status === 'fulfilled').length,
        total: results.length,
        failures: failures.length
      };
    } catch (error) {
      console.error('Error force refreshing all data:', error);
      const message = error instanceof Error ? error.message : 'Erro ao forçar atualização dos dados';
      return rejectWithValue(message);
    }
  }
);