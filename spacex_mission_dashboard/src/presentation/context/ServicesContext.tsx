import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { LaunchService } from '../../application/services/LaunchService';
import { dependencyContainer } from '../../shared/DependencyContainer';

/**
 * Interface do contexto de serviços
 */
interface ServicesContextValue {
  launchService: LaunchService;
}

/**
 * Contexto para injeção de dependências na camada de apresentação
 */
const ServicesContext = createContext<ServicesContextValue | undefined>(undefined);

/**
 * Props do provider
 */
interface ServicesProviderProps {
  children: ReactNode;
}

/**
 * Provider que fornece os serviços da aplicação via Context
 * Segue o princípio da Clean Architecture mantendo a camada de apresentação
 * desacoplada dos detalhes de implementação
 */
export const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
  const services = useMemo<ServicesContextValue>(() => {
    return {
      launchService: dependencyContainer.get('launchService')
    };
  }, []);

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

/**
 * Hook para acessar os serviços injetados
 * @throws Error se usado fora do ServicesProvider
 */
export const useServices = (): ServicesContextValue => {
  const context = useContext(ServicesContext);
  
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  
  return context;
};

/**
 * Hook específico para o LaunchService
 */
export const useLaunchService = (): LaunchService => {
  const { launchService } = useServices();
  return launchService;
};
