import React from 'react';
import './LaunchModal.css';

const LaunchModal = ({ launch, isOpen, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = React.useCallback((e) => {
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

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Data não disponível';
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
                                <span className="info-value">{launch.flightNumber || 'N/A'}</span>
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
                                <span className={`status ${launch.isSuccessful() ? 'success' : launch.upcoming ? 'upcoming' : 'failure'}`}>
                                    {launch.getStatus()}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Foguete:</span>
                                <span className="info-value">{launch.rocket || 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Plataforma de Lançamento:</span>
                                <span className="info-value">{launch.launchpad || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>Detalhes Técnicos</h3>
                            <div className="info-item">
                                <span className="info-label">Atualização Automática:</span>
                                <span className="info-value">{launch.autoUpdate ? 'Sim' : 'Não'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Data a ser determinada:</span>
                                <span className="info-value">{launch.tbd ? 'Sim' : 'Não'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Janela de Lançamento:</span>
                                <span className="info-value">{launch.window ? `${launch.window} segundos` : 'N/A'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">NET (No Earlier Than):</span>
                                <span className="info-value">{launch.net ? 'Sim' : 'Não'}</span>
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
                    {launch.payloads && launch.payloads.length > 0 && (
                        <div className="payloads-section">
                            <h3>Cargas Úteis</h3>
                            <div className="payload-list">
                                {launch.payloads.map((payload, index) => (
                                    <div key={index} className="payload-item">
                                        <span className="payload-name">{payload.name || `Payload ${index + 1}`}</span>
                                        {payload.type && <span className="payload-type">({payload.type})</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tripulação */}
                    <div className="crew-section">
                        <h3>Tripulação</h3>
                        {launch.crew && launch.crew.length > 0 ? (
                            <div className="crew-list">
                                {launch.crew.map((crewMember, index) => (
                                    <div key={index} className="crew-member">
                                        <div className="crew-info">
                                            <span className="crew-name">{crewMember.name || `Tripulante ${index + 1}`}</span>
                                            {crewMember.role && <span className="crew-role">{crewMember.role}</span>}
                                            {crewMember.agency && <span className="crew-agency">({crewMember.agency})</span>}
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
                    {launch.ships && launch.ships.length > 0 && (
                        <div className="ships-section">
                            <h3>Navios de Apoio</h3>
                            <div className="ships-list">
                                {launch.ships.map((ship, index) => (
                                    <span key={index} className="ship-item">
                                        {ship.name || `Navio ${index + 1}`}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links externos */}
                    {launch.links && (launch.links.webcast || launch.links.article || launch.links.wikipedia || launch.links.reddit?.campaign) && (
                        <div className="links-section">
                            <h3>Links Externos</h3>
                            <div className="external-links">
                                {launch.links.webcast && (
                                    <a
                                        href={launch.links.webcast}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        🎥 Transmissão ao Vivo
                                    </a>
                                )}
                                {launch.links.article && (
                                    <a
                                        href={launch.links.article}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        📰 Artigo
                                    </a>
                                )}
                                {launch.links.wikipedia && (
                                    <a
                                        href={launch.links.wikipedia}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="external-link"
                                    >
                                        📖 Wikipedia
                                    </a>
                                )}
                                {launch.links.reddit?.campaign && (
                                    <a
                                        href={launch.links.reddit.campaign}
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