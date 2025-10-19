import React from 'react';
import { Launch } from '../../../domain/entities/Launch';
import { CustomMission } from '../../../store/slices/launchesSlice';
import './LaunchModal.css';

interface LaunchModalProps {
  launch: Launch | CustomMission | null;
  isOpen: boolean;
  onClose: () => void;
}

const LaunchModal: React.FC<LaunchModalProps> = ({ launch, isOpen, onClose }) => {
    // Helper functions to handle differences between Launch and CustomMission
    const isLaunch = (item: Launch | CustomMission): item is Launch => {
        return 'flightNumber' in item;
    };

    const getFlightNumber = (item: Launch | CustomMission): string => {
        return isLaunch(item) ? item.flightNumber?.toString() || 'N/A' : 'N/A';
    };

    const getLaunchpad = (item: Launch | CustomMission): string => {
        return isLaunch(item) ? item.launchpad || 'N/A' : 'N/A';
    };

    const getAutoUpdate = (item: Launch | CustomMission): boolean => {
        return isLaunch(item) ? item.autoUpdate : false;
    };

    const getTbd = (item: Launch | CustomMission): boolean => {
        return isLaunch(item) ? item.tbd : false;
    };

    const getWindow = (item: Launch | CustomMission): number | null => {
        return isLaunch(item) ? item.window : null;
    };

    const getNet = (item: Launch | CustomMission): boolean => {
        return isLaunch(item) ? item.net : false;
    };

    const isSuccessful = (item: Launch | CustomMission): boolean => {
        if (isLaunch(item)) {
            return item.isSuccessful();
        }
        // For CustomMission, assume success if not upcoming
        return !item.upcoming;
    };

    const getStatus = (item: Launch | CustomMission): string => {
        if (isLaunch(item)) {
            return item.getStatus();
        }
        // For CustomMission
        return item.upcoming ? 'Futuro' : 'Concluído';
    };

    const getPayloads = (item: Launch | CustomMission): string[] => {
        return isLaunch(item) ? item.payloads || [] : [];
    };

    const getCrew = (item: Launch | CustomMission): string[] => {
        return isLaunch(item) ? item.crew || [] : [];
    };

    const getShips = (item: Launch | CustomMission): string[] => {
        return isLaunch(item) ? item.ships || [] : [];
    };

    const getLinks = (item: Launch | CustomMission) => {
        return isLaunch(item) ? item.links : null;
    };
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = React.useCallback((e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen || !launch) return null;

    const formatDateTime = (dateString: string | null): { date: string; time: string } => {
        if (!dateString) return { date: 'Data não disponível', time: 'Horário não disponível' };
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('pt-BR'),
            time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const dateTime = formatDateTime(launch.dateUtc);

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{launch.name}</h2>
                    <button className="modal-close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-body">
                    {/* Informações principais */}
                    <div className="launch-info-grid">
                        <div className="info-section">
                            <h3>Informações da Missão</h3>
                            <div className="info-item">
                                <span className="info-label">Número do Voo:</span>
                                <span className="info-value">{getFlightNumber(launch)}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Data de Lançamento:</span>
                                <span className="info-value">{dateTime.date}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Horário:</span>
                                <span className="info-value">{dateTime.time}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Status:</span>
                                <span className={`status ${isSuccessful(launch) ? 'success' : launch.upcoming ? 'upcoming' : 'failure'}`}>
                                    {getStatus(launch)}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Foguete:</span>
                                <span className="info-value">{launch.rocket || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Plataforma de Lançamento:</span>
                                <span className="info-value">{getLaunchpad(launch)}</span>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>Detalhes Técnicos</h3>
                            <div className="info-item">
                                <span className="info-label">Atualização Automática:</span>
                                <span className="info-value">{getAutoUpdate(launch) ? 'Sim' : 'Não'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Data a ser determinada:</span>
                                <span className="info-value">{getTbd(launch) ? 'Sim' : 'Não'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Janela de Lançamento:</span>
                                <span className="info-value">{getWindow(launch) ? `${getWindow(launch)} segundos` : 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">NET (No Earlier Than):</span>
                                <span className="info-value">{getNet(launch) ? 'Sim' : 'Não'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Detalhes da missão */}
                    {launch.details && (
                        <div className="details-section">
                            <h3>Descrição da Missão</h3>
                            <p className="mission-details">{launch.details}</p>
                        </div>
                    )}

                    {/* Cargas úteis */}
                    {getPayloads(launch).length > 0 && (
                        <div className="payloads-section">
                            <h3>Cargas Úteis</h3>
                            <div className="payload-list">
                                {getPayloads(launch).map((payload, index) => (
                                    <div key={index} className="payload-item">
                                        <span className="payload-name">{payload || `Payload ${index + 1}`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tripulação */}
                    <div className="crew-section">
                        <h3>Tripulação</h3>
                        {getCrew(launch).length > 0 ? (
                            <div className="crew-list">
                                {getCrew(launch).map((crewMember, index) => (
                                    <div key={index} className="crew-member">
                                        <div className="crew-info">
                                            <span className="crew-name">{crewMember || `Tripulante ${index + 1}`}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-crew">
                                <p>Esta missão não possui tripulação (missão não tripulada)</p>
                            </div>
                        )}
                    </div>

                    {/* Navios */}
                    {getShips(launch).length > 0 && (
                        <div className="ships-section">
                            <h3>Navios de Apoio</h3>
                            <div className="ships-list">
                                {getShips(launch).map((ship, index) => (
                                    <span key={index} className="ship-item">
                                        {ship || `Navio ${index + 1}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links externos */}
                    {getLinks(launch) && (getLinks(launch)?.webcast || getLinks(launch)?.article || getLinks(launch)?.wikipedia || getLinks(launch)?.reddit?.campaign) && (
                        <div className="links-section">
                            <h3>Links Externos</h3>
                            <div className="external-links">
                                {getLinks(launch)?.webcast && (
                                    <a
                                        href={getLinks(launch)!.webcast}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        🎥 Transmissão ao Vivo
                                    </a>
                                )}
                                {getLinks(launch)?.article && (
                                    <a
                                        href={getLinks(launch)!.article}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        📰 Artigo
                                    </a>
                                )}
                                {getLinks(launch)?.wikipedia && (
                                    <a
                                        href={getLinks(launch)!.wikipedia}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        📖 Wikipedia
                                    </a>
                                )}
                                {getLinks(launch)?.reddit?.campaign && (
                                    <a
                                        href={getLinks(launch)!.reddit!.campaign}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        💬 Reddit
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LaunchModal;