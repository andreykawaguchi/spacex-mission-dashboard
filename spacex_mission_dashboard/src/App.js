import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { dependencyContainer } from './shared/DependencyContainer';
import { useLaunches } from './presentation/hooks/useLaunches';
import Sidebar from './presentation/components/Sidebar';
import Dashboard from './presentation/pages/Dashboard';
import LaunchesPage from './presentation/pages/LaunchesPage';

// Componente interno que tem acesso ao useLocation
function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const launchDependencies = dependencyContainer.getLaunchDependencies();
  const {
    upcomingLaunches,
    pastLaunches,
    latestLaunch,
    nextLaunch,
    loading,
    error,
    refreshData
  } = useLaunches(launchDependencies);

  // Determina a view ativa baseada na URL
  const getActiveView = () => {
    if (location.pathname === '/launches') return 'launches';
    return 'dashboard';
  };

  const activeView = getActiveView();

  // Carrega dados na inicialização apenas para o Dashboard
  React.useEffect(() => {
    if (activeView === 'dashboard') {
      refreshData();
    }
  }, [refreshData, activeView]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Adiciona listener para fechar sidebar com tecla ESC
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  const handleViewChange = () => {
    // Fecha o sidebar em dispositivos móveis após selecionar uma opção
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="App">
      {/* Botão hamburger para dispositivos móveis */}
      <button className={`hamburger-button ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay para fechar sidebar em dispositivos móveis */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <Sidebar 
        activeView={activeView} 
        onViewChange={handleViewChange}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
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
                loading={loading}
                error={error}
                refreshData={refreshData}
              />
            } 
          />
          <Route path="/launches" element={<LaunchesPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
