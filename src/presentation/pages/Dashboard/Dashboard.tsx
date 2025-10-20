import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Launch, LaunchUtils } from '../../../domain/entities/Launch';
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
  // Calcular dados para o gráfico de pizza
  const chartData = useMemo(() => {
    const successful = pastLaunches.filter(l => LaunchUtils.isSuccessful(l)).length;
    const failed = pastLaunches.filter(l => !LaunchUtils.isSuccessful(l)).length;
    const pending = upcomingLaunches.length;

    return [
      { name: 'Sucesso', value: successful, color: '#10b981' },
      { name: 'Falha', value: failed, color: '#ef4444' },
      { name: 'Pendente', value: pending, color: '#f59e0b' }
    ];
  }, [upcomingLaunches, pastLaunches]);

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
        <p>Distribuição de Lançamentos</p>
        <button className="refresh-button" onClick={refreshData}>
          <span>🔄</span> Atualizar
        </button>
      </header>

      <section className="chart-section">
        <div className="chart-container">
          <h2>Status dos Lançamentos</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} lançamentos`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;