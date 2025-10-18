import React from 'react';
import './LaunchesPage.css';
import { dependencyContainer } from '../../shared/DependencyContainer';
import { useLaunches } from '../hooks/useLaunches';
import LaunchModal from '../components/LaunchModal';

const LaunchesPage = () => {
    const launchDependencies = dependencyContainer.getLaunchDependencies();
    const {
        upcomingLaunches,
        pastLaunches,
        loading,
        error,
        refreshData
    } = useLaunches(launchDependencies);

    // Estados para filtros
    const [selectedYear, setSelectedYear] = React.useState('');
    const [selectedResult, setSelectedResult] = React.useState('');
    const [missionNameFilter, setMissionNameFilter] = React.useState('');

    // Estados para a modal
    const [selectedLaunch, setSelectedLaunch] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Carrega dados na inicialização
    React.useEffect(() => {
        refreshData();
    }, [refreshData]);

    // Função para abrir a modal com os detalhes da missão
    const handleLaunchClick = (launch) => {
        setSelectedLaunch(launch);
        setIsModalOpen(true);
    };

    // Função para fechar a modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLaunch(null);
    };

    // Função para obter anos únicos dos lançamentos
    const getAvailableYears = () => {
        const allLaunches = [...upcomingLaunches, ...pastLaunches];
        const years = allLaunches
            .map(launch => new Date(launch.dateUtc).getFullYear())
            .filter(year => !isNaN(year))
            .sort((a, b) => b - a); // Ordem decrescente
        return [...new Set(years)]; // Remove duplicatas
    };

    // Função para filtrar lançamentos passados
    const getFilteredPastLaunches = () => {
        let filtered = [...pastLaunches];

        // Filtro por nome de missão
        if (missionNameFilter.trim()) {
            filtered = filtered.filter(launch => 
                launch.name.toLowerCase().includes(missionNameFilter.toLowerCase().trim())
            );
        }

        // Filtro por ano
        if (selectedYear) {
            filtered = filtered.filter(launch => {
                const launchYear = new Date(launch.dateUtc).getFullYear();
                return launchYear === parseInt(selectedYear);
            });
        }

        // Filtro por resultado
        if (selectedResult) {
            filtered = filtered.filter(launch => {
                if (selectedResult === 'success') return launch.isSuccessful();
                if (selectedResult === 'failure') return launch.success === false;
                return true;
            });
        }

        return filtered;
    };

    // Função para filtrar lançamentos futuros (apenas por ano, já que não têm resultado)
    const getFilteredUpcomingLaunches = () => {
        let filtered = [...upcomingLaunches];

        // Filtro por nome de missão
        if (missionNameFilter.trim()) {
            filtered = filtered.filter(launch => 
                launch.name.toLowerCase().includes(missionNameFilter.toLowerCase().trim())
            );
        }

        // Filtro por ano
        if (selectedYear) {
            filtered = filtered.filter(launch => {
                const launchYear = new Date(launch.dateUtc).getFullYear();
                return launchYear === parseInt(selectedYear);
            });
        }

        return filtered;
    };

    const filteredPastLaunches = getFilteredPastLaunches();
    const filteredUpcomingLaunches = getFilteredUpcomingLaunches();
    if (loading) {
        return (
            <div className="launches-page">
                <div className="loading">
                    <h2>Carregando lançamentos...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="launches-page">
                <div className="error">
                    <h2>Erro ao carregar lançamentos</h2>
                    <p>{error}</p>
                    <button onClick={refreshData}>Tentar novamente</button>
                </div>
            </div>
        );
    }

    return (
        <div className="launches-page">
            <header className="page-header">
                <h1>Lançamentos SpaceX</h1>
                <p>Histórico completo de missões da SpaceX</p>
                <button className="refresh-button" onClick={refreshData}>
                    <span>🔄</span> Atualizar
                </button>
            </header>

            {/* Filtros */}
            <section className="filters-section">
                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="mission-name-filter">Filtrar por Nome da Missão:</label>
                        <input 
                            type="text"
                            id="mission-name-filter"
                            value={missionNameFilter} 
                            onChange={(e) => setMissionNameFilter(e.target.value)}
                            placeholder="Digite o nome da missão..."
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="year-filter">Filtrar por Ano:</label>
                        <select 
                            id="year-filter"
                            value={selectedYear} 
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Todos os anos</option>
                            {getAvailableYears().map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="result-filter">Filtrar por Resultado:</label>
                        <select 
                            id="result-filter"
                            value={selectedResult} 
                            onChange={(e) => setSelectedResult(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Todos os resultados</option>
                            <option value="success">Sucesso</option>
                            <option value="failure">Falha</option>
                        </select>
                    </div>

                    <button 
                        className="clear-filters-button"
                        onClick={() => {
                            setMissionNameFilter('');
                            setSelectedYear('');
                            setSelectedResult('');
                        }}
                    >
                        Limpar Filtros
                    </button>
                </div>
            </section>

            {/* Próximos Lançamentos */}
            <section className="launch-section">
                <h2>Próximos Lançamentos ({filteredUpcomingLaunches.length})</h2>
                {filteredUpcomingLaunches.length > 0 ? (
                    <div className="table-container">
                        <table className="launches-table">
                            <thead>
                                <tr>
                                    <th>Missão</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Foguete</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUpcomingLaunches.map(launch => (
                                    <tr 
                                        key={launch.id} 
                                        className="clickable-row"
                                        onClick={() => handleLaunchClick(launch)}
                                        title="Clique para ver mais detalhes"
                                    >
                                        <td className="mission-name">{launch.name}</td>
                                        <td>{launch.getFormattedDate()}</td>
                                        <td>
                                            <span className="status upcoming">{launch.getStatus()}</span>
                                        </td>
                                        <td>{launch.rocket || 'N/A'}</td>
                                        <td className="details-cell">
                                            {launch.details ? (
                                                <span title={launch.details}>
                                                    {launch.details.length > 50 
                                                        ? `${launch.details.substring(0, 50)}...`
                                                        : launch.details
                                                    }
                                                </span>
                                            ) : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>{selectedYear || selectedResult || missionNameFilter.trim() ? 'Nenhum lançamento futuro encontrado com os filtros aplicados.' : 'Nenhum lançamento futuro programado no momento.'}</p>
                    </div>
                )}
            </section>

            {/* Lançamentos Passados */}
            <section className="launch-section">
                <h2>Lançamentos Realizados ({filteredPastLaunches.length})</h2>
                {filteredPastLaunches.length > 0 ? (
                    <div className="table-container">
                        <table className="launches-table">
                            <thead>
                                <tr>
                                    <th>Missão</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Foguete</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPastLaunches.map(launch => (
                                    <tr 
                                        key={launch.id} 
                                        className="clickable-row"
                                        onClick={() => handleLaunchClick(launch)}
                                        title="Clique para ver mais detalhes"
                                    >
                                        <td className="mission-name">{launch.name}</td>
                                        <td>{launch.getFormattedDate()}</td>
                                        <td>
                                            <span className={`status ${launch.isSuccessful() ? 'success' : 'failure'}`}>
                                                {launch.getStatus()}
                                            </span>
                                        </td>
                                        <td>{launch.rocket || 'N/A'}</td>
                                        <td className="details-cell">
                                            {launch.details ? (
                                                <span title={launch.details}>
                                                    {launch.details.length > 50 
                                                        ? `${launch.details.substring(0, 50)}...`
                                                        : launch.details
                                                    }
                                                </span>
                                            ) : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>{selectedYear || selectedResult || missionNameFilter.trim() ? 'Nenhum lançamento encontrado com os filtros aplicados.' : 'Nenhum lançamento encontrado.'}</p>
                    </div>
                )}
            </section>

            {/* Modal de detalhes da missão */}
            <LaunchModal 
                launch={selectedLaunch}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default LaunchesPage;