import { RecordStatus } from '../types/clinicalRecord';

/**
 * Formatea el estado para mostrar
 */
export const formatStatus = (status: RecordStatus): string => {
  const statusMap: Record<RecordStatus, string> = {
    ACTIVE: 'Activo',
    COMPLETED: 'Completado',
    PENDING: 'Pendiente',
    CANCELLED: 'Cancelado',
  };
  return statusMap[status] || status;
};

/**
 * Obtiene la clase CSS para el estado
 */
export const getStatusClass = (status: RecordStatus): string => {
  const classMap: Record<RecordStatus, string> = {
    ACTIVE: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    CANCELLED: 'bg-red-100 text-red-800',
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Trunca un texto largo
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra
 */
export const capitalize = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formatea un ID para mostrar (primeros y últimos caracteres)
 */
export const formatId = (id: string, length: number = 8): string => {
  if (id.length <= length) return id;
  const half = Math.floor(length / 2);
  return `${id.substring(0, half)}...${id.substring(id.length - half)}`;
};
