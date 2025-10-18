/**
 * Date Utilities
 * Funções utilitárias para manipulação de datas
 */

/**
 * Formata uma data para o padrão brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDateToBrazilian = (date) => {
  if (!date) return 'Data não disponível';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data e hora para o padrão brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data e hora formatadas
 */
export const formatDateTimeToBrazilian = (date) => {
  if (!date) return 'Data não disponível';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date time:', error);
    return 'Data inválida';
  }
};

/**
 * Calcula a diferença em dias entre duas datas
 * @param {string|Date} date1 - Primeira data
 * @param {string|Date} date2 - Segunda data (padrão: hoje)
 * @returns {number} Diferença em dias
 */
export const getDaysDifference = (date1, date2 = new Date()) => {
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating days difference:', error);
    return 0;
  }
};

/**
 * Verifica se uma data é no futuro
 * @param {string|Date} date - Data a ser verificada
 * @returns {boolean} True se a data é no futuro
 */
export const isFutureDate = (date) => {
  try {
    return new Date(date) > new Date();
  } catch (error) {
    console.error('Error checking if date is in future:', error);
    return false;
  }
};