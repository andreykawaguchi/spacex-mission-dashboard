import React from 'react';
import { useSelector } from 'react-redux';
import './LaunchesPage.css';
import { useReduxLaunches } from '../../hooks/useReduxLaunches';
import { useAppDispatch } from '../../../store';
import {
  setYearFilter,
  setResultFilter,
  setMissionNameFilter,
  clearLaunchFilters,
  openLaunchModal,
  closeLaunchModal,
  openCreateMissionModal,
  closeCreateMissionModal,
  selectLaunchFilters,
  selectLaunchModal,
  selectCreateMissionModal
} from '../../../store/slices/uiSlice';
import { setSelectedLaunch, CustomMission } from '../../../store/slices/launchesSlice';
import { Launch, LaunchUtils } from '../../../domain/entities/Launch';
import LaunchModal from '../../components/LaunchModal';
import CreateMissionModal from '../../components/CreateMissionModal';

const LaunchesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    
    // Redux hooks
    const {
        upcomingLaunches,
        pastLaunches,
        combinedLaunches,
        hasAnyLoading,
        getError,
        refreshData,
        createCustomMission,
        getFilteredLaunches
    } = useReduxLaunches();
    
    // Seletores de UI
    const filters = useSelector(selectLaunchFilters);
    const launchModal = useSelector(selectLaunchModal);
    const createMissionModal = useSelector(selectCreateMissionModal);
    
    // Estados locais (apenas para filtros de UI que não precisam persistir)
    const { selectedYear, selectedResult, missionNameFilter } = filters;

    // Carrega dados na inicialização
    React.useEffect(() => {
        refreshData();
    }, [refreshData]);

    // Função para abrir a modal com os detalhes da missão
    const handleLaunchClick = (launch: Launch | CustomMission): void => {
        dispatch(setSelectedLaunch(launch as Launch));
        dispatch(openLaunchModal(launch.id));
    };

    // Função para fechar a modal
    const handleCloseModal = (): void => {
        dispatch(closeLaunchModal());
    };

    // Função para criar uma nova missão
    const handleCreateMission = (newMission: Launch): void => {
        // Converter Launch para CustomMission
        const customMission: CustomMission = {
            id: newMission.id,
            name: newMission.name,
            upcoming: newMission.upcoming,
            dateUtc: newMission.dateUtc,
            rocket: newMission.rocket,
            details: newMission.details || undefined,
            custom: true
        };
        createCustomMission(customMission);
    };

    // Função para abrir/fechar modal de criação
    const handleOpenCreateModal = (): void => {
        dispatch(openCreateMissionModal());
    };

    const handleCloseCreateModal = (): void => {
        dispatch(closeCreateMissionModal());
    };

    // Função para atualizar filtros
    const handleYearChange = (year: string): void => {
        dispatch(setYearFilter(year));
    };

    const handleResultChange = (result: string): void => {
        dispatch(setResultFilter(result));
    };

    const handleMissionNameChange = (name: string): void => {
        dispatch(setMissionNameFilter(name));
    };

    const handleClearFilters = (): void => {
        dispatch(clearLaunchFilters());
    };

    const handleRefreshData = (): void => {
        refreshData();
    };

    // Helper functions for mixed types
    const getFormattedDate = (launch: Launch | CustomMission): string => {
        if ('flightNumber' in launch) {
            // It's a Launch
            return LaunchUtils.getFormattedDate(launch);
        }
        // For CustomMission, format the date manually
        const date = new Date(launch.dateUtc);
        return date.toLocaleDateString('pt-BR');
    };

    const getStatus = (launch: Launch | CustomMission): string => {
        if ('flightNumber' in launch) {
            // It's a Launch
            return LaunchUtils.getStatus(launch);
        }
        // For CustomMission
        return launch.upcoming ? 'Futuro' : 'Concluído';
    };

    const isSuccessful = (launch: Launch | CustomMission): boolean => {
        if ('flightNumber' in launch) {
            // It's a Launch
            return LaunchUtils.isSuccessful(launch);
        }
        // CustomMission doesn't have success status, assume true if not upcoming
        return !launch.upcoming;
    };

    // Função para obter anos únicos dos lançamentos
    const getAvailableYears = (): number[] => {
        const allLaunches = [...upcomingLaunches, ...pastLaunches, ...combinedLaunches.all];
        const years = allLaunches
            .map(launch => new Date(launch.dateUtc).getFullYear())
            .filter(year => !isNaN(year))
            .sort((a, b) => b - a); // Ordem decrescente
        return Array.from(new Set(years)); // Remove duplicatas
    };

    // Obter dados filtrados usando o hook Redux
    const filteredData = getFilteredLaunches({
        year: filters.selectedYear,
        result: filters.selectedResult as 'success' | 'failure' | undefined,
        missionName: filters.missionNameFilter
    });
    const filteredPastLaunches = filteredData.past;
    const filteredUpcomingLaunches = filteredData.upcoming;
    
    // Estados de loading e erro
    const loading = hasAnyLoading;
    const error = getError();

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
                    <button onClick={handleRefreshData}>Tentar novamente</button>
                </div>
            </div>
        );
    }

    return (
        <div className="launches-page">
            <header className="page-header">
                <div className="header-content">
                    <div className="header-text">
                        <h1>Lançamentos SpaceX</h1>
                        <p>Histórico completo de missões da SpaceX</p>
                    </div>
                    <div className="header-actions">
                        <button className="create-mission-button" onClick={handleOpenCreateModal}>
                            <span>➕</span> Criar Missão
                        </button>
                        <button className="refresh-button" onClick={handleRefreshData}>
                            <span>🔄</span>
                        </button>
                    </div>
                </div>
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
                            onChange={(e) => handleMissionNameChange(e.target.value)}
                            placeholder="Digite o nome da missão..."
                            className="filter-input"
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="year-filter">Filtrar por Ano:</label>
                        <select
                            id="year-filter"
                            value={selectedYear}
                            onChange={(e) => handleYearChange(e.target.value)}
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
                            onChange={(e) => handleResultChange(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">Todos os resultados</option>
                            <option value="success">Sucesso</option>
                            <option value="failure">Falha</option>
                        </select>
                    </div>

                    <button
                        className="clear-filters-button"
                        onClick={handleClearFilters}
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
                                        <td>{getFormattedDate(launch)}</td>
                                        <td>
                                            <span className="status upcoming">{getStatus(launch)}</span>
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
                                        <td>{getFormattedDate(launch)}</td>
                                        <td>
                                            <span className={`status ${isSuccessful(launch) ? 'success' : 'failure'}`}>
                                                {getStatus(launch)}
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
                launch={launchModal.launchId ? (combinedLaunches.all.find(l => l.id === launchModal.launchId) as Launch) || null : null}
                isOpen={launchModal.isOpen}
                onClose={handleCloseModal}
            />

            {/* Modal de criação de missão */}
            <CreateMissionModal
                isOpen={createMissionModal.isOpen}
                onClose={handleCloseCreateModal}
                onCreateMission={handleCreateMission}
            />
        </div>
    );
};

export default LaunchesPage;