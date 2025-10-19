/**
 * UI Slice
 * Gerencia estados da interface do usuário usando Redux Toolkit
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

/**
 * Tipos para o estado da UI
 */
export type Theme = 'light' | 'dark';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type ActiveView = 'dashboard' | 'launches';

export interface Notification {
  id: number;
  message: string;
  title?: string;
  type: NotificationType;
  autoHide: boolean;
  duration: number;
}

export interface LaunchFilters {
  selectedYear: string;
  selectedResult: string;
  missionNameFilter: string;
}

export interface UIState {
  sidebar: {
    isOpen: boolean;
    activeView: ActiveView;
  };
  modals: {
    launchModal: {
      isOpen: boolean;
      launchId: string | null;
    };
    createMissionModal: {
      isOpen: boolean;
    };
  };
  filters: {
    launches: LaunchFilters;
  };
  notifications: Notification[];
  globalLoading: boolean;
  preferences: {
    theme: Theme;
    autoRefresh: boolean;
    refreshInterval: number;
  };
}

/**
 * Estado inicial do slice de UI
 */
const initialState: UIState = {
  // Estados do sidebar
  sidebar: {
    isOpen: false,
    activeView: 'dashboard'
  },
  
  // Estados dos modais
  modals: {
    launchModal: {
      isOpen: false,
      launchId: null
    },
    createMissionModal: {
      isOpen: false
    }
  },
  
  // Estados dos filtros
  filters: {
    launches: {
      selectedYear: '',
      selectedResult: '',
      missionNameFilter: ''
    }
  },
  
  // Estados de notificações/toasts
  notifications: [],
  
  // Estados de loading global
  globalLoading: false,
  
  // Estados de tema/preferências
  preferences: {
    theme: 'dark',
    autoRefresh: false,
    refreshInterval: 30000 // 30 segundos
  }
};

/**
 * Slice para gerenciar UI
 */
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Ações do sidebar
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    
    openSidebar: (state) => {
      state.sidebar.isOpen = true;
    },
    
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },
    
    setActiveView: (state, action: PayloadAction<ActiveView>) => {
      state.sidebar.activeView = action.payload;
    },
    
    // Ações dos modais
    openLaunchModal: (state, action: PayloadAction<string | undefined>) => {
      state.modals.launchModal.isOpen = true;
      state.modals.launchModal.launchId = action.payload || null;
    },
    
    closeLaunchModal: (state) => {
      state.modals.launchModal.isOpen = false;
      state.modals.launchModal.launchId = null;
    },
    
    openCreateMissionModal: (state) => {
      state.modals.createMissionModal.isOpen = true;
    },
    
    closeCreateMissionModal: (state) => {
      state.modals.createMissionModal.isOpen = false;
    },
    
    closeAllModals: (state) => {
      state.modals.launchModal.isOpen = false;
      state.modals.launchModal.launchId = null;
      state.modals.createMissionModal.isOpen = false;
    },
    
    // Ações dos filtros
    setYearFilter: (state, action: PayloadAction<string>) => {
      state.filters.launches.selectedYear = action.payload;
    },
    
    setResultFilter: (state, action: PayloadAction<string>) => {
      state.filters.launches.selectedResult = action.payload;
    },
    
    setMissionNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.launches.missionNameFilter = action.payload;
    },
    
    clearLaunchFilters: (state) => {
      state.filters.launches = {
        selectedYear: '',
        selectedResult: '',
        missionNameFilter: ''
      };
    },
    
    setLaunchFilters: (state, action: PayloadAction<Partial<LaunchFilters>>) => {
      state.filters.launches = { ...state.filters.launches, ...action.payload };
    },
    
    // Ações de notificações
    addNotification: (state, action: PayloadAction<Partial<Omit<Notification, 'id'>> & { message: string }>) => {
      const notification: Notification = {
        id: Date.now(),
        type: 'info',
        autoHide: true,
        duration: 5000,
        ...action.payload
      };
      state.notifications.push(notification);
    },
    
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Ações de loading global
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    
    // Ações de preferências
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.preferences.theme = action.payload;
    },
    
    toggleAutoRefresh: (state) => {
      state.preferences.autoRefresh = !state.preferences.autoRefresh;
    },
    
    setAutoRefresh: (state, action: PayloadAction<boolean>) => {
      state.preferences.autoRefresh = action.payload;
    },
    
    setRefreshInterval: (state, action: PayloadAction<number>) => {
      state.preferences.refreshInterval = action.payload;
    },
    
    updatePreferences: (state, action: PayloadAction<Partial<UIState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    
    // Ação para reset completo da UI
    resetUI: () => {
      return initialState;
    }
  }
});

// Exportar actions
export const {
  // Sidebar
  toggleSidebar,
  openSidebar,
  closeSidebar,
  setActiveView,
  
  // Modals
  openLaunchModal,
  closeLaunchModal,
  openCreateMissionModal,
  closeCreateMissionModal,
  closeAllModals,
  
  // Filtros
  setYearFilter,
  setResultFilter,
  setMissionNameFilter,
  clearLaunchFilters,
  setLaunchFilters,
  
  // Notificações
  addNotification,
  removeNotification,
  clearNotifications,
  
  // Loading global
  setGlobalLoading,
  
  // Preferências
  setTheme,
  toggleAutoRefresh,
  setAutoRefresh,
  setRefreshInterval,
  updatePreferences,
  
  // Reset
  resetUI
} = uiSlice.actions;

// Seletores tipados
export const selectSidebar = (state: RootState) => state.ui.sidebar;
export const selectIsSidebarOpen = (state: RootState) => state.ui.sidebar.isOpen;
export const selectActiveView = (state: RootState) => state.ui.sidebar.activeView;

export const selectModals = (state: RootState) => state.ui.modals;
export const selectLaunchModal = (state: RootState) => state.ui.modals.launchModal;
export const selectCreateMissionModal = (state: RootState) => state.ui.modals.createMissionModal;

export const selectFilters = (state: RootState) => state.ui.filters;
export const selectLaunchFilters = (state: RootState) => state.ui.filters.launches;

export const selectNotifications = (state: RootState) => state.ui.notifications;
export const selectGlobalLoading = (state: RootState) => state.ui.globalLoading;
export const selectPreferences = (state: RootState) => state.ui.preferences;
export const selectTheme = (state: RootState) => state.ui.preferences.theme;
export const selectAutoRefresh = (state: RootState) => state.ui.preferences.autoRefresh;
export const selectRefreshInterval = (state: RootState) => state.ui.preferences.refreshInterval;

// Seletores combinados
export const selectHasActiveModals = (state: RootState): boolean => {
  const modals = state.ui.modals;
  return modals.launchModal.isOpen || modals.createMissionModal.isOpen;
};

export const selectHasNotifications = (state: RootState): boolean => {
  return state.ui.notifications.length > 0;
};

export const selectActiveFiltersCount = (state: RootState): number => {
  const filters = state.ui.filters.launches;
  let count = 0;
  
  if (filters.selectedYear) count++;
  if (filters.selectedResult) count++;
  if (filters.missionNameFilter.trim()) count++;
  
  return count;
};

export default uiSlice.reducer;