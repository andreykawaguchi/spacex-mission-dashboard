import React from 'react';
import { useForm } from 'react-hook-form';
import './CreateMissionModal.css';
import { Launch } from '../../../domain/entities/Launch';

interface MissionFormData {
  name: string;
  dateUtc: string;
  rocket: string;
  details: string;
}

interface CreateMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMission: (launch: Launch) => void;
}

const CreateMissionModal: React.FC<CreateMissionModalProps> = ({ isOpen, onClose, onCreateMission }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<MissionFormData>({
        defaultValues: {
            name: '',
            dateUtc: '',
            rocket: '',
            details: ''
        }
    });

    // Reseta o formulário quando a modal é fechada
    React.useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    // Função para validar se a data é válida
    const validateDate = (value: string): string | boolean => {
        if (!value) return 'Data do lançamento é obrigatória';

        const selectedDate = new Date(value);

        if (isNaN(selectedDate.getTime())) {
            return 'Data inválida';
        }

        return true;
    };

    // Função de submit do formulário
    const onSubmit = (data: MissionFormData): void => {
        // Gera um ID único simples baseado no timestamp
        const id = `custom_${Date.now()}`;

        // Gera um número de voo único baseado no timestamp
        const flightNumber = Math.floor(Date.now() / 1000);

        // Determina se é uma missão futura baseado na data
        const selectedDate = new Date(data.dateUtc);
        const now = new Date();
        const upcoming = selectedDate > now;

        // Cria um novo objeto Launch
        const newLaunch: Launch = {
            id,
            name: data.name.trim(),
            flightNumber,
            dateUtc: data.dateUtc,
            dateLocal: data.dateUtc,
            success: null,
            upcoming,
            rocket: data.rocket.trim(),
            crew: [],
            ships: [],
            payloads: [],
            launchpad: 'Custom Launchpad',
            details: data.details.trim() || null,
            links: {},
            autoUpdate: false,
            tbd: false,
            net: false,
            window: null
        };

        onCreateMission(newLaunch);
        handleClose();
    };

    const handleClose = (): void => {
        reset();
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="create-mission-modal" onClick={handleModalClick}>
                <div className="modal-header">
                    <h2>Criar Nova Missão</h2>
                    <button className="close-button" onClick={handleClose}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mission-form">
                    <div className="form-group">
                        <label htmlFor="name">Nome da Missão *</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Nome da missão é obrigatório',
                                minLength: {
                                    value: 2,
                                    message: 'Nome deve ter pelo menos 2 caracteres'
                                },
                                maxLength: {
                                    value: 100,
                                    message: 'Nome não pode ter mais de 100 caracteres'
                                }
                            })}
                            className={errors.name ? 'error' : ''}
                            placeholder="Ex: Starlink-25"
                        />
                        {errors.name && <span className="error-message">{errors.name.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="dateUtc">Data do Lançamento *</label>
                        <input
                            type="datetime-local"
                            id="dateUtc"
                            {...register('dateUtc', {
                                required: 'Data do lançamento é obrigatória',
                                validate: validateDate
                            })}
                            className={errors.dateUtc ? 'error' : ''}
                        />
                        {errors.dateUtc && <span className="error-message">{errors.dateUtc.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="rocket">Foguete *</label>
                        <select
                            id="rocket"
                            {...register('rocket', {
                                required: 'Seleção de foguete é obrigatória'
                            })}
                            className={errors.rocket ? 'error' : ''}
                        >
                            <option value="">Selecione um foguete</option>
                            <option value="Falcon 9">Falcon 9</option>
                            <option value="Falcon Heavy">Falcon Heavy</option>
                            <option value="Starship">Starship</option>
                        </select>
                        {errors.rocket && <span className="error-message">{errors.rocket.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="details">Descrição *</label>
                        <textarea
                            id="details"
                            {...register('details', {
                                required: 'Descrição é obrigatória',
                                minLength: {
                                    value: 10,
                                    message: 'Descrição deve ter pelo menos 10 caracteres'
                                },
                                maxLength: {
                                    value: 500,
                                    message: 'Descrição não pode ter mais de 500 caracteres'
                                }
                            })}
                            className={errors.details ? 'error' : ''}
                            placeholder="Descreva os objetivos e detalhes da missão..."
                            rows={4}
                        />
                        {errors.details && <span className="error-message">{errors.details.message}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={handleClose} className="cancel-button">
                            Cancelar
                        </button>
                        <button type="submit" className="submit-button">
                            Criar Missão
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMissionModal;