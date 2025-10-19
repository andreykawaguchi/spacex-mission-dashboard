/**
 * Redux Launch Hook
 * Hook personalizado que utiliza Redux para gerenciar estado dos lançamentos
 */
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Launch } from '../../domain/entities/Launch';
import { LaunchQueryOptions } from '../../domain/repositories/LaunchRepository';
import {
  fetchAllLaunches,
  fetchUpcomingLaunches,
  fetchPastLaunches,
  fetchLatestLaunch,
  fetchNextLaunch,
  fetchLaunchById,
  refreshDashboardData,
  forceRefreshAllData
} from '../../store/thunks/launchThunks';
import {
  addCustomMission,
  removeCustomMission,
  updateCustomMission,
  setSelectedLaunch,
  clearSelectedLaunch,
  clearErrors,
  clearError,
  selectAllLaunches,
  selectUpcomingLaunches,
  selectPastLaunches,
  selectLatestLaunch,
  selectNextLaunch,
  selectSelectedLaunch,
  selectCustomMissions,
  selectLaunchesLoading,
  selectLaunchesError,
  selectLastFetch,
  selectIsDataStale,
  selectHasAnyLoading,
  selectHasAnyError,
  selectAllLaunchesCombined,
  CustomMission,
  LoadingStates,
  ErrorStates,
  LastFetchTimes
} from '../../store/slices/launchesSlice';

/**
 * Interface para filtros de lançamentos
 */
interface LaunchFilters {
  year?: string;
  result?: 'success' | 'failure';
  missionName?: string;
}

/**
 * Interface para estatísticas de lançamentos
 */
interface LaunchStatistics {
  totalUpcoming: number;
  totalPast: number;
  totalLaunches: number;
  successfulLaunches: number;
  successRate: number;
  customMissionsCount: number;
}

/**
 * Interface para dados filtrados
 */
interface FilteredLaunches {
  all: (Launch | CustomMission)[];
  upcoming: (Launch | CustomMission)[];
  past: (Launch | CustomMission)[];
}

/**
 * Interface para o retorno do hook
 */
interface UseReduxLaunchesReturn {
  // Dados
  allLaunches: Launch[];
  upcomingLaunches: Launch[];
  pastLaunches: Launch[];
  latestLaunch: Launch | null;
  nextLaunch: Launch | null;
  selectedLaunch: Launch | null;
  customMissions: CustomMission[];
  combinedLaunches: {
    upcoming: (Launch | CustomMission)[];
    past: (Launch | CustomMission)[];
    all: (Launch | CustomMission)[];
  };
  
  // Estados
  loading: LoadingStates;
  error: ErrorStates;
  lastFetch: LastFetchTimes;
  hasAnyLoading: boolean;
  hasAnyError: boolean;
  
  // Ações de carregamento
  loadAllLaunches: (options?: LaunchQueryOptions) => any;
  loadUpcomingLaunches: (limit?: number) => any;
  loadPastLaunches: (limit?: number) => any;
  loadLatestLaunch: () => any;
  loadNextLaunch: () => any;
  loadLaunchById: (id: string) => any;
  refreshData: (options?: { upcomingLimit?: number; pastLimit?: number }) => any;
  forceRefreshAll: () => any;
  
  // Ações de missões customizadas
  createCustomMission: (mission: CustomMission) => void;
  deleteCustomMission: (missionId: string) => void;
  editCustomMission: (id: string, updates: Partial<CustomMission>) => void;
  
  // Ações de seleção
  selectLaunch: (launch: Launch | null) => void;
  clearSelection: () => void;
  
  // Ações de erro
  clearAllErrors: () => void;
  clearSpecificError: (errorType: keyof ErrorStates) => void;
  
  // Funções de utilidade
  isLoading: (type?: keyof LoadingStates) => boolean;
  getError: (type?: keyof ErrorStates) => string | null;
  isDataStale: (type: keyof LastFetchTimes) => boolean;
  getFilteredLaunches: (filters?: LaunchFilters) => FilteredLaunches;
  getStatistics: () => LaunchStatistics;
}

/**
 * Hook para gerenciar lançamentos usando Redux
 * @returns Objeto contendo estados e ações dos lançamentos
 */
export const useReduxLaunches = (): UseReduxLaunchesReturn => {
  const dispatch = useAppDispatch();
  
  // Seletores de dados
  const allLaunches = useAppSelector(selectAllLaunches);
  const upcomingLaunches = useAppSelector(selectUpcomingLaunches);
  const pastLaunches = useAppSelector(selectPastLaunches);
  const latestLaunch = useAppSelector(selectLatestLaunch);
  const nextLaunch = useAppSelector(selectNextLaunch);
  const selectedLaunch = useAppSelector(selectSelectedLaunch);
  const customMissions = useAppSelector(selectCustomMissions);
  const combinedLaunches = useAppSelector(selectAllLaunchesCombined);
  
  // Seletores de estado
  const loading = useAppSelector(selectLaunchesLoading);
  const error = useAppSelector(selectLaunchesError);
  const lastFetch = useAppSelector(selectLastFetch);
  const hasAnyLoading = useAppSelector(selectHasAnyLoading);
  const hasAnyError = useAppSelector(selectHasAnyError);
  
  // Seletores de cache
  const isAllDataStale = useAppSelector(selectIsDataStale('all'));
  const isUpcomingDataStale = useAppSelector(selectIsDataStale('upcoming'));
  const isPastDataStale = useAppSelector(selectIsDataStale('past'));
  const isLatestDataStale = useAppSelector(selectIsDataStale('latest'));
  const isNextDataStale = useAppSelector(selectIsDataStale('next'));

  // Ações de carregamento de dados
  const loadAllLaunches = useCallback((options: LaunchQueryOptions = {}) => {
    return dispatch(fetchAllLaunches(options));
  }, [dispatch]);

  const loadUpcomingLaunches = useCallback((limit: number = 10) => {
    return dispatch(fetchUpcomingLaunches(limit));
  }, [dispatch]);

  const loadPastLaunches = useCallback((limit: number = 10) => {
    return dispatch(fetchPastLaunches(limit));
  }, [dispatch]);

  const loadLatestLaunch = useCallback(() => {
    return dispatch(fetchLatestLaunch());
  }, [dispatch]);

  const loadNextLaunch = useCallback(() => {
    return dispatch(fetchNextLaunch());
  }, [dispatch]);

  const loadLaunchById = useCallback((id: string) => {
    return dispatch(fetchLaunchById(id));
  }, [dispatch]);

  // Ações de atualização
  const refreshData = useCallback((options: { upcomingLimit?: number; pastLimit?: number } = {}) => {
    return dispatch(refreshDashboardData(options));
  }, [dispatch]);

  const forceRefreshAll = useCallback(() => {
    return dispatch(forceRefreshAllData());
  }, [dispatch]);

  // Ações de missões customizadas
  const createCustomMission = useCallback((mission: CustomMission) => {
    dispatch(addCustomMission(mission));
  }, [dispatch]);

  const deleteCustomMission = useCallback((missionId: string) => {
    dispatch(removeCustomMission(missionId));
  }, [dispatch]);

  const editCustomMission = useCallback((id: string, updates: Partial<CustomMission>) => {
    dispatch(updateCustomMission({ id, updates }));
  }, [dispatch]);

  // Ações de seleção
  const selectLaunch = useCallback((launch: Launch | null) => {
    dispatch(setSelectedLaunch(launch));
  }, [dispatch]);

  const clearSelection = useCallback(() => {
    dispatch(clearSelectedLaunch());
  }, [dispatch]);

  // Ações de erro
  const clearAllErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const clearSpecificError = useCallback((errorType: keyof ErrorStates) => {
    dispatch(clearError(errorType));
  }, [dispatch]);

  // Funções de utilidade
  const isLoading = useCallback((type?: keyof LoadingStates): boolean => {
    if (type) {
      return loading[type] || false;
    }
    return hasAnyLoading;
  }, [loading, hasAnyLoading]);

  const getError = useCallback((type?: keyof ErrorStates): string | null => {
    if (type) {
      return error[type] || null;
    }
    return hasAnyError ? 
      error.all || error.upcoming || error.past || error.latest || error.next : null;
  }, [error, hasAnyError]);

  const isDataStale = useCallback((type: keyof LastFetchTimes): boolean => {
    switch (type) {
      case 'all': return isAllDataStale;
      case 'upcoming': return isUpcomingDataStale;
      case 'past': return isPastDataStale;
      case 'latest': return isLatestDataStale;
      case 'next': return isNextDataStale;
      default: return true;
    }
  }, [isAllDataStale, isUpcomingDataStale, isPastDataStale, isLatestDataStale, isNextDataStale]);

  // Função para obter dados filtrados
  const getFilteredLaunches = useCallback((filters: LaunchFilters = {}): FilteredLaunches => {
    const { year, result, missionName } = filters;
    let filtered = [...combinedLaunches.all];

    if (missionName && missionName.trim()) {
      filtered = filtered.filter(launch =>
        launch.name.toLowerCase().includes(missionName.toLowerCase().trim())
      );
    }

    if (year) {
      filtered = filtered.filter(launch => {
        const launchYear = new Date(launch.dateUtc).getFullYear();
        return launchYear === parseInt(year);
      });
    }

    if (result) {
      filtered = filtered.filter(launch => {
        if ('isSuccessful' in launch) {
          // É um Launch
          if (result === 'success') return launch.isSuccessful();
          if (result === 'failure') return launch.success === false;
        }
        return true;
      });
    }

    return {
      all: filtered,
      upcoming: filtered.filter(launch => launch.upcoming),
      past: filtered.filter(launch => !launch.upcoming)
    };
  }, [combinedLaunches]);

  // Função para obter estatísticas
  const getStatistics = useCallback((): LaunchStatistics => {
    const totalUpcoming = combinedLaunches.upcoming.length;
    const totalPast = combinedLaunches.past.length;
    const successfulLaunches = combinedLaunches.past.filter(l => 
      'isSuccessful' in l && l.isSuccessful()
    ).length;
    const successRate = totalPast > 0 ? Math.round((successfulLaunches / totalPast) * 100) : 0;
    const customMissionsCount = customMissions.length;

    return {
      totalUpcoming,
      totalPast,
      totalLaunches: totalUpcoming + totalPast,
      successfulLaunches,
      successRate,
      customMissionsCount
    };
  }, [combinedLaunches, customMissions]);

  return {
    // Dados
    allLaunches,
    upcomingLaunches,
    pastLaunches,
    latestLaunch,
    nextLaunch,
    selectedLaunch,
    customMissions,
    combinedLaunches,
    
    // Estados
    loading,
    error,
    lastFetch,
    hasAnyLoading,
    hasAnyError,
    
    // Ações de carregamento
    loadAllLaunches,
    loadUpcomingLaunches,
    loadPastLaunches,
    loadLatestLaunch,
    loadNextLaunch,
    loadLaunchById,
    refreshData,
    forceRefreshAll,
    
    // Ações de missões customizadas
    createCustomMission,
    deleteCustomMission,
    editCustomMission,
    
    // Ações de seleção
    selectLaunch,
    clearSelection,
    
    // Ações de erro
    clearAllErrors,
    clearSpecificError,
    
    // Funções de utilidade
    isLoading,
    getError,
    isDataStale,
    getFilteredLaunches,
    getStatistics
  };
};