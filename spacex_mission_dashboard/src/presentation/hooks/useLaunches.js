import { useState, useCallback } from 'react';

/**
 * Custom Hook para gerenciar lançamentos
 * @param {Object} dependencies - Dependências injetadas (casos de uso)
 */
export const useLaunches = (dependencies) => {
  const [launches, setLaunches] = useState([]);
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);
  const [pastLaunches, setPastLaunches] = useState([]);
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [nextLaunch, setNextLaunch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    getAllLaunches,
    getUpcomingLaunches,
    getPastLaunches,
    getLatestLaunch,
    getNextLaunch,
    getLaunchById
  } = dependencies;

  /**
   * Função genérica para executar casos de uso
   */
  const executeUseCase = useCallback(async (useCase, setter, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await useCase.execute(...args);
      setter(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Use case execution error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Carrega todos os lançamentos
   */
  const loadAllLaunches = useCallback(async (options = {}) => {
    return executeUseCase(getAllLaunches, setLaunches, options);
  }, [getAllLaunches, executeUseCase]);

  /**
   * Carrega próximos lançamentos
   */
  const loadUpcomingLaunches = useCallback(async (limit = 10) => {
    return executeUseCase(getUpcomingLaunches, setUpcomingLaunches, limit);
  }, [getUpcomingLaunches, executeUseCase]);

  /**
   * Carrega lançamentos passados
   */
  const loadPastLaunches = useCallback(async (limit = 10) => {
    return executeUseCase(getPastLaunches, setPastLaunches, limit);
  }, [getPastLaunches, executeUseCase]);

  /**
   * Carrega o último lançamento
   */
  const loadLatestLaunch = useCallback(async () => {
    return executeUseCase(getLatestLaunch, setLatestLaunch);
  }, [getLatestLaunch, executeUseCase]);

  /**
   * Carrega o próximo lançamento
   */
  const loadNextLaunch = useCallback(async () => {
    return executeUseCase(getNextLaunch, setNextLaunch);
  }, [getNextLaunch, executeUseCase]);

  /**
   * Carrega um lançamento específico por ID
   */
  const loadLaunchById = useCallback(async (id) => {
    return executeUseCase(getLaunchById, () => {}, id);
  }, [getLaunchById, executeUseCase]);

  /**
   * Recarrega dados essenciais
   */
  const refreshData = useCallback(async () => {
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
  const clearError = useCallback(() => {
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