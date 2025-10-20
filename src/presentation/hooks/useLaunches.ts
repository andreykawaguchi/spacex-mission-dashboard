import { useState, useCallback } from 'react';
import { Launch } from '../../domain/entities/Launch';
import { LaunchQueryOptions } from '../../domain/repositories/LaunchRepository';
import { useLaunchService } from '../context';

/**
 * Interface para o estado do hook
 */
interface LaunchesState {
  launches: Launch[];
  upcomingLaunches: Launch[];
  pastLaunches: Launch[];
  latestLaunch: Launch | null;
  nextLaunch: Launch | null;
  loading: boolean;
  error: string | null;
}

/**
 * Interface para as ações do hook
 */
interface LaunchesActions {
  loadAllLaunches: (options?: LaunchQueryOptions) => Promise<Launch[]>;
  loadUpcomingLaunches: (limit?: number) => Promise<Launch[]>;
  loadPastLaunches: (limit?: number) => Promise<Launch[]>;
  loadLatestLaunch: () => Promise<Launch>;
  loadNextLaunch: () => Promise<Launch>;
  loadLaunchById: (id: string) => Promise<Launch>;
  refreshData: () => Promise<void>;
  clearError: () => void;
}

/**
 * Tipo de retorno do hook
 */
type UseLaunchesReturn = LaunchesState & LaunchesActions;

/**
 * Custom Hook para gerenciar lançamentos
 * Usa o LaunchService injetado via Context
 */
export const useLaunches = (): UseLaunchesReturn => {
  const launchService = useLaunchService();
  
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [upcomingLaunches, setUpcomingLaunches] = useState<Launch[]>([]);
  const [pastLaunches, setPastLaunches] = useState<Launch[]>([]);
  const [latestLaunch, setLatestLaunch] = useState<Launch | null>(null);
  const [nextLaunch, setNextLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função genérica para executar operações do serviço
   */
  const executeServiceMethod = useCallback(async <T>(
    method: () => Promise<T>,
    setter: (value: T) => void
  ): Promise<T> => {
    try {
      setLoading(true);
      setError(null);
      const result = await method();
      setter(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      console.error('Service method execution error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carrega todos os lançamentos
   */
  const loadAllLaunches = useCallback(async (options: LaunchQueryOptions = {}): Promise<Launch[]> => {
    return executeServiceMethod(
      () => launchService.fetchAllLaunches(options),
      setLaunches
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Carrega próximos lançamentos
   */
  const loadUpcomingLaunches = useCallback(async (limit: number = 10): Promise<Launch[]> => {
    return executeServiceMethod(
      () => launchService.fetchUpcomingLaunches(limit),
      setUpcomingLaunches
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Carrega lançamentos passados
   */
  const loadPastLaunches = useCallback(async (limit: number = 10): Promise<Launch[]> => {
    return executeServiceMethod(
      () => launchService.fetchPastLaunches(limit),
      setPastLaunches
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Carrega o último lançamento
   */
  const loadLatestLaunch = useCallback(async (): Promise<Launch> => {
    return executeServiceMethod(
      () => launchService.fetchLatestLaunch(),
      setLatestLaunch
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Carrega o próximo lançamento
   */
  const loadNextLaunch = useCallback(async (): Promise<Launch> => {
    return executeServiceMethod(
      () => launchService.fetchNextLaunch(),
      setNextLaunch
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Carrega um lançamento específico por ID
   */
  const loadLaunchById = useCallback(async (id: string): Promise<Launch> => {
    return executeServiceMethod(
      () => launchService.fetchLaunchById(id),
      () => {} // Não armazena no estado local
    );
  }, [launchService, executeServiceMethod]);

  /**
   * Recarrega dados essenciais
   */
  const refreshData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        loadUpcomingLaunches(5),
        loadPastLaunches(5),
        loadLatestLaunch(),
        loadNextLaunch()
      ]);
    } catch (err) {
      setError('Erro ao carregar dados dos lançamentos');
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  }, [loadUpcomingLaunches, loadPastLaunches, loadLatestLaunch, loadNextLaunch]);

  /**
   * Limpa erros
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    // Estados
    launches,
    upcomingLaunches,
    pastLaunches,
    latestLaunch,
    nextLaunch,
    loading,
    error,
    
    // Ações
    loadAllLaunches,
    loadUpcomingLaunches,
    loadPastLaunches,
    loadLatestLaunch,
    loadNextLaunch,
    loadLaunchById,
    refreshData,
    clearError
  };
};