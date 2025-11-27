import { format, parseISO, isValid, isFuture, isPast } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha ISO a un formato legible
 */
export const formatDate = (dateString: string, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Fecha inválida';
    return format(date, formatStr, { locale: es });
  } catch (error) {
    return 'Fecha inválida';
  }
};

/**
 * Formatea una fecha ISO a un formato con hora
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, "dd/MM/yyyy 'a las' HH:mm");
};

/**
 * Verifica si una fecha es futura
 */
export const isFutureDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    return isValid(date) && isFuture(date);
  } catch (error) {
    return false;
  }
};

/**
 * Verifica si una fecha es pasada
 */
export const isPastDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    return isValid(date) && isPast(date);
  } catch (error) {
    return false;
  }
};

/**
 * Obtiene la fecha actual en formato ISO
 */
export const getCurrentISODate = (): string => {
  return new Date().toISOString();
};

/**
 * Convierte una fecha de input type="date" a formato yyyy-MM-dd (LocalDate para backend)
 */
export const dateInputToISO = (dateInput: string): string => {
  try {
    // Si ya está en formato yyyy-MM-dd, retornarlo tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
      return dateInput;
    }
    // Convertir a formato yyyy-MM-dd
    const date = new Date(dateInput);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};

/**
 * Convierte una fecha ISO a formato de input type="date"
 */
export const isoToDateInput = (isoString: string): string => {
  try {
    const date = parseISO(isoString);
    if (!isValid(date)) return '';
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
};
