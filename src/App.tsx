import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { store, useAppDispatch, useAppSelector } from './store';
import { 
  toggleSidebar, 
  closeSidebar,
  selectIsSidebarOpen,
  ActiveView
} from './store/slices/uiSlice';
import { refreshDashboardData } from './store/thunks/launchThunks';
import { 
  selectUpcomingLaunches,
  selectPastLaunches,
  selectLatestLaunch,
  selectNextLaunch,
  selectLaunchesLoading,
  selectLaunchesError
} from './store/slices/launchesSlice';
import Sidebar from './presentation/components/Sidebar';
import Dashboard from './presentation/pages/Dashboard';
import LaunchesPage from './presentation/pages/LaunchesPage';
import NotificationSystem from './presentation/components/NotificationSystem';
import { ServicesProvider } from './presentation/context';

// Componente interno que tem acesso ao useLocation e Redux
function AppContent(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  // Estados do Redux
  const sidebarOpen = useAppSelector(selectIsSidebarOpen);
  const upcomingLaunches = useAppSelector(selectUpcomingLaunches);
  const pastLaunches = useAppSelector(selectPastLaunches);
  const latestLaunch = useAppSelector(selectLatestLaunch);
  const nextLaunch = useAppSelector(selectNextLaunch);
  const loading = useAppSelector(selectLaunchesLoading);
  const error = useAppSelector(selectLaunchesError);

  // Determina a view ativa baseada na URL
  const getActiveView = (): ActiveView => {
    if (location.pathname === '/launches') return 'launches';
    return 'dashboard';
  };

  const activeView = getActiveView();

  // Carrega dados na inicialização apenas para o Dashboard
  React.useEffect(() => {
    if (activeView === 'dashboard') {
      dispatch(refreshDashboardData({}));
    }
  }, [dispatch, activeView]);

  const handleToggleSidebar = (): void => {
    dispatch(toggleSidebar());
  };

  const handleCloseSidebar = (): void => {
    dispatch(closeSidebar());
  };

  // Adiciona listener para fechar sidebar com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && sidebarOpen) {
        dispatch(closeSidebar());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen, dispatch]);

  const handleViewChange = (): void => {
    // Fecha o sidebar em dispositivos móveis após selecionar uma opção
    if (window.innerWidth <= 768) {
      dispatch(closeSidebar());
    }
  };

  const handleRefreshData = (): void => {
    dispatch(refreshDashboardData({}));
  };

  // Verifica se há loading ou erro geral
  const isLoading = loading.upcoming || loading.past || loading.latest || loading.next;
  const hasError = error.upcoming || error.past || error.latest || error.next;
  const errorMessage = hasError ? 
    error.upcoming || error.past || error.latest || error.next : null;

  return (
    <div className="App">
      {/* Sistema de Notificações */}
      <NotificationSystem />
      
      {/* Botão hamburger para dispositivos móveis */}
      <button className={`hamburger-button ${sidebarOpen ? 'open' : ''}`} onClick={handleToggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay para fechar sidebar em dispositivos móveis */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={handleCloseSidebar}></div>}

      <Sidebar 
        activeView={activeView} 
        onViewChange={handleViewChange}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />
      <main className={`App-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                upcomingLaunches={upcomingLaunches}
                pastLaunches={pastLaunches}
                latestLaunch={latestLaunch}
                nextLaunch={nextLaunch}
                loading={isLoading}
                error={errorMessage}
                refreshData={handleRefreshData}
              />
            } 
          />
          <Route path="/launches" element={<LaunchesPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <ServicesProvider>
        <Router>
          <AppContent />
        </Router>
      </ServicesProvider>
    </Provider>
  );
}

export default App;