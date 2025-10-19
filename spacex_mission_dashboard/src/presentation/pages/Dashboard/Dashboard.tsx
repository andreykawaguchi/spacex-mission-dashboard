import React from 'react';
import { Launch } from '../../../domain/entities/Launch';
import './Dashboard.css';

/**
 * Props para o componente Dashboard
 */
interface DashboardProps {
  upcomingLaunches: Launch[];
  pastLaunches: Launch[];
  latestLaunch: Launch | null;
  nextLaunch: Launch | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  upcomingLaunches, 
  pastLaunches, 
  latestLaunch, 
  nextLaunch, 
  loading, 
  error, 
  refreshData 
}) => {
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <h2>Carregando dados da SpaceX...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error">
          <h2>Erro ao carregar dados</h2>
          <p>{error}</p>
          <button onClick={refreshData}>Tentar novamente</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard SpaceX</h1>
        <p>Visão geral das missões da SpaceX</p>
        <button className="refresh-button" onClick={refreshData}>
          <span>🔄</span> Atualizar
        </button>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Próximos Lançamentos</h3>
          <div className="stat-number">{upcomingLaunches.length}</div>
        </div>
        <div className="stat-card">
          <h3>Lançamentos Realizados</h3>
          <div className="stat-number">{pastLaunches.length}</div>
        </div>
        <div className="stat-card">
          <h3>Taxa de Sucesso</h3>
          <div className="stat-number">
            {pastLaunches.length > 0 
              ? `${Math.round((pastLaunches.filter(l => l.isSuccessful()).length / pastLaunches.length) * 100)}%`
              : '0%'
            }
          </div>
        </div>
      </div>

      {/* Próximo Lançamento */}
      {nextLaunch && (
        <section className="launch-section">
          <h2>Próximo Lançamento</h2>
          <div className="launch-card featured">
            <h3>{nextLaunch.name}</h3>
            <p><strong>Data:</strong> {nextLaunch.getFormattedDate()}</p>
            <p><strong>Status:</strong> {nextLaunch.getStatus()}</p>
            {nextLaunch.details && <p><strong>Detalhes:</strong> {nextLaunch.details}</p>}
          </div>
        </section>
      )}

      {/* Último Lançamento */}
      {latestLaunch && (
        <section className="launch-section">
          <h2>Último Lançamento</h2>
          <div className="launch-card featured">
            <h3>{latestLaunch.name}</h3>
            <p><strong>Data:</strong> {latestLaunch.getFormattedDate()}</p>
            <p><strong>Status:</strong> {latestLaunch.getStatus()}</p>
            {latestLaunch.details && <p><strong>Detalhes:</strong> {latestLaunch.details}</p>}
          </div>
        </section>
      )}

      {/* Resumo dos Próximos Lançamentos */}
      {upcomingLaunches.length > 0 && (
        <section className="launch-section">
          <h2>Próximos Lançamentos - Resumo</h2>
          <div className="launches-grid">
            {upcomingLaunches.slice(0, 3).map((launch: Launch) => (
              <div key={launch.id} className="launch-card small">
                <h4>{launch.name}</h4>
                <p>{launch.getFormattedDate()}</p>
                <p className="status upcoming">{launch.getStatus()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Resumo dos Lançamentos Recentes */}
      {pastLaunches.length > 0 && (
        <section className="launch-section">
          <h2>Lançamentos Recentes - Resumo</h2>
          <div className="launches-grid">
            {pastLaunches.slice(0, 3).map((launch: Launch) => (
              <div key={launch.id} className="launch-card small">
                <h4>{launch.name}</h4>
                <p>{launch.getFormattedDate()}</p>
                <p className={`status ${launch.isSuccessful() ? 'success' : 'failure'}`}>
                  {launch.getStatus()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;