/**
 * Date Utilities
 * Funções utilitárias para manipulação de datas
 */

/**
 * Formata uma data para o padrão brasileiro
 * @param date - Data a ser formatada
 * @returns Data formatada
 */
export const formatDateToBrazilian = (date: string | Date | null | undefined): string => {
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
 * @param date - Data a ser formatada
 * @returns Data e hora formatadas
 */
export const formatDateTimeToBrazilian = (date: string | Date | null | undefined): string => {
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
 * @param date1 - Primeira data
 * @param date2 - Segunda data (padrão: hoje)
 * @returns Diferença em dias
 */
export const getDaysDifference = (date1: string | Date, date2: string | Date = new Date()): number => {
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Error calculating days difference:', error);
    return 0;
  }
};

/**
 * Verifica se uma data é no futuro
 * @param date - Data a ser verificada
 * @returns True se a data é no futuro
 */
export const isFutureDate = (date: string | Date): boolean => {
  try {
    return new Date(date) > new Date();
  } catch (error) {
    console.error('Error checking if date is in future:', error);
    return false;
  }
};