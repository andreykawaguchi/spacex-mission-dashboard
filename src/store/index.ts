/**
 * Redux Store Configuration
 * Configuração central do Redux Store usando Redux Toolkit
 */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import launchesReducer from './slices/launchesSlice';
import uiReducer from './slices/uiSlice';

/**
 * Store principal da aplicação
 * Combina todos os reducers e configura middleware
 */
export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar ações específicas para dados não serializáveis
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados para usar em toda a aplicação
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Seletores para compatibilidade (podem ser removidos futuramente)
export const selectLaunches = (state: RootState) => state.launches;
export const selectUI = (state: RootState) => state.ui;

export default store;