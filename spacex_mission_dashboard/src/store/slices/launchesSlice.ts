/**
 * Launches Slice
 * Gerencia o estado dos lançamentos da SpaceX usando Redux Toolkit
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Launch } from '../../domain/entities/Launch';
import {
  fetchAllLaunches,
  fetchUpcomingLaunches,
  fetchPastLaunches,
  fetchLatestLaunch,
  fetchNextLaunch,
  fetchLaunchById
} from '../thunks/launchThunks';

/**
 * Interface para missão customizada
 */
export interface CustomMission {
  id: string;
  name: string;
  upcoming: boolean;
  dateUtc: string;
  rocket: string;
  details?: string;
  custom: true;
}

/**
 * Interface para estados de loading
 */
export interface LoadingStates {
  all: boolean;
  upcoming: boolean;
  past: boolean;
  latest: boolean;
  next: boolean;
  byId: boolean;
}

/**
 * Interface para estados de erro
 */
export interface ErrorStates {
  all: string | null;
  upcoming: string | null;
  past: string | null;
  latest: string | null;
  next: string | null;
  byId: string | null;
}

/**
 * Interface para timestamps de última busca
 */
export interface LastFetchTimes {
  all: number | null;
  upcoming: number | null;
  past: number | null;
  latest: number | null;
  next: number | null;
}

/**
 * Interface para o estado do slice de lançamentos
 */
export interface LaunchesState {
  // Dados dos lançamentos
  allLaunches: Launch[];
  upcomingLaunches: Launch[];
  pastLaunches: Launch[];
  latestLaunch: Launch | null;
  nextLaunch: Launch | null;
  selectedLaunch: Launch | null;
  customMissions: CustomMission[];
  
  // Estados de loading para cada operação
  loading: LoadingStates;
  
  // Estados de erro
  error: ErrorStates;
  
  // Metadados
  lastFetch: LastFetchTimes;
  
  // Cache configuration (em millisegundos)
  cacheTimeout: number;
}

/**
 * Estado inicial do slice de lançamentos
 */
const initialState: LaunchesState = {
  // Dados dos lançamentos
  allLaunches: [],
  upcomingLaunches: [],
  pastLaunches: [],
  latestLaunch: null,
  nextLaunch: null,
  selectedLaunch: null,
  customMissions: [],
  
  // Estados de loading para cada operação
  loading: {
    all: false,
    upcoming: false,
    past: false,
    latest: false,
    next: false,
    byId: false
  },
  
  // Estados de erro
  error: {
    all: null,
    upcoming: null,
    past: null,
    latest: null,
    next: null,
    byId: null
  },
  
  // Metadados
  lastFetch: {
    all: null,
    upcoming: null,
    past: null,
    latest: null,
    next: null
  },
  
  // Cache configuration (em millisegundos)
  cacheTimeout: 5 * 60 * 1000 // 5 minutos
};

/**
 * Slice para gerenciar lançamentos
 */
const launchesSlice = createSlice({
  name: 'launches',
  initialState,
  reducers: {
    // Ações síncronas para manipulação local
    addCustomMission: (state, action: PayloadAction<CustomMission>) => {
      state.customMissions.push(action.payload);
    },
    
    removeCustomMission: (state, action: PayloadAction<string>) => {
      state.customMissions = state.customMissions.filter(
        mission => mission.id !== action.payload
      );
    },
    
    updateCustomMission: (state, action: PayloadAction<{ id: string; updates: Partial<CustomMission> }>) => {
      const { id, updates } = action.payload;
      const missionIndex = state.customMissions.findIndex(m => m.id === id);
      if (missionIndex !== -1) {
        state.customMissions[missionIndex] = { 
          ...state.customMissions[missionIndex], 
          ...updates 
        };
      }
    },
    
    setSelectedLaunch: (state, action: PayloadAction<Launch | null>) => {
      state.selectedLaunch = action.payload;
    },
    
    clearSelectedLaunch: (state) => {
      state.selectedLaunch = null;
    },
    
    clearErrors: (state) => {
      state.error = {
        all: null,
        upcoming: null,
        past: null,
        latest: null,
        next: null,
        byId: null
      };
    },
    
    clearError: (state, action: PayloadAction<keyof ErrorStates>) => {
      const errorType = action.payload;
      if (state.error[errorType]) {
        state.error[errorType] = null;
      }
    }
  },
  
  extraReducers: (builder) => {
    // Fetch All Launches
    builder
      .addCase(fetchAllLaunches.pending, (state) => {
        state.loading.all = true;
        state.error.all = null;
      })
      .addCase(fetchAllLaunches.fulfilled, (state, action) => {
        state.loading.all = false;
        state.allLaunches = action.payload;
        state.lastFetch.all = Date.now();
      })
      .addCase(fetchAllLaunches.rejected, (state, action) => {
        state.loading.all = false;
        state.error.all = action.payload as string;
      })
      
    // Fetch Upcoming Launches
      .addCase(fetchUpcomingLaunches.pending, (state) => {
        state.loading.upcoming = true;
        state.error.upcoming = null;
      })
      .addCase(fetchUpcomingLaunches.fulfilled, (state, action) => {
        state.loading.upcoming = false;
        state.upcomingLaunches = action.payload;
        state.lastFetch.upcoming = Date.now();
      })
      .addCase(fetchUpcomingLaunches.rejected, (state, action) => {
        state.loading.upcoming = false;
        state.error.upcoming = action.payload as string;
      })
      
    // Fetch Past Launches
      .addCase(fetchPastLaunches.pending, (state) => {
        state.loading.past = true;
        state.error.past = null;
      })
      .addCase(fetchPastLaunches.fulfilled, (state, action) => {
        state.loading.past = false;
        state.pastLaunches = action.payload;
        state.lastFetch.past = Date.now();
      })
      .addCase(fetchPastLaunches.rejected, (state, action) => {
        state.loading.past = false;
        state.error.past = action.payload as string;
      })
      
    // Fetch Latest Launch
      .addCase(fetchLatestLaunch.pending, (state) => {
        state.loading.latest = true;
        state.error.latest = null;
      })
      .addCase(fetchLatestLaunch.fulfilled, (state, action) => {
        state.loading.latest = false;
        state.latestLaunch = action.payload;
        state.lastFetch.latest = Date.now();
      })
      .addCase(fetchLatestLaunch.rejected, (state, action) => {
        state.loading.latest = false;
        state.error.latest = action.payload as string;
      })
      
    // Fetch Next Launch
      .addCase(fetchNextLaunch.pending, (state) => {
        state.loading.next = true;
        state.error.next = null;
      })
      .addCase(fetchNextLaunch.fulfilled, (state, action) => {
        state.loading.next = false;
        state.nextLaunch = action.payload;
        state.lastFetch.next = Date.now();
      })
      .addCase(fetchNextLaunch.rejected, (state, action) => {
        state.loading.next = false;
        state.error.next = action.payload as string;
      })
      
    // Fetch Launch By ID
      .addCase(fetchLaunchById.pending, (state) => {
        state.loading.byId = true;
        state.error.byId = null;
      })
      .addCase(fetchLaunchById.fulfilled, (state, action) => {
        state.loading.byId = false;
        state.selectedLaunch = action.payload;
      })
      .addCase(fetchLaunchById.rejected, (state, action) => {
        state.loading.byId = false;
        state.error.byId = action.payload as string;
      });
  }
});

// Exportar actions
export const {
  addCustomMission,
  removeCustomMission,
  updateCustomMission,
  setSelectedLaunch,
  clearSelectedLaunch,
  clearErrors,
  clearError
} = launchesSlice.actions;

// Seletores personalizados tipados
export const selectAllLaunches = (state: RootState): Launch[] => state.launches.allLaunches;
export const selectUpcomingLaunches = (state: RootState): Launch[] => state.launches.upcomingLaunches;
export const selectPastLaunches = (state: RootState): Launch[] => state.launches.pastLaunches;
export const selectLatestLaunch = (state: RootState): Launch | null => state.launches.latestLaunch;
export const selectNextLaunch = (state: RootState): Launch | null => state.launches.nextLaunch;
export const selectSelectedLaunch = (state: RootState): Launch | null => state.launches.selectedLaunch;
export const selectCustomMissions = (state: RootState): CustomMission[] => state.launches.customMissions;
export const selectLaunchesLoading = (state: RootState): LoadingStates => state.launches.loading;
export const selectLaunchesError = (state: RootState): ErrorStates => state.launches.error;
export const selectLastFetch = (state: RootState): LastFetchTimes => state.launches.lastFetch;
export const selectCacheTimeout = (state: RootState): number => state.launches.cacheTimeout;

// Seletores combinados
export const selectIsDataStale = (type: keyof LastFetchTimes) => (state: RootState): boolean => {
  const lastFetch = state.launches.lastFetch[type];
  const cacheTimeout = state.launches.cacheTimeout;
  
  if (!lastFetch) return true;
  return Date.now() - lastFetch > cacheTimeout;
};

export const selectHasAnyLoading = (state: RootState): boolean => {
  return Object.values(state.launches.loading).some(loading => loading);
};

export const selectHasAnyError = (state: RootState): boolean => {
  return Object.values(state.launches.error).some(error => error !== null);
};

// Seletor para todos os lançamentos combinados (incluindo missões customizadas)
export const selectAllLaunchesCombined = (state: RootState) => {
  const { upcomingLaunches, pastLaunches, customMissions } = state.launches;
  
  const customUpcoming = customMissions.filter((mission: CustomMission) => mission.upcoming);
  const customPast = customMissions.filter((mission: CustomMission) => !mission.upcoming);
  
  return {
    upcoming: [...upcomingLaunches, ...customUpcoming],
    past: [...pastLaunches, ...customPast],
    all: [...upcomingLaunches, ...pastLaunches, ...customMissions]
  };
};

export default launchesSlice.reducer;