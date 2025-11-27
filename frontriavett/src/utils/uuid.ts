/**
 * Valida si una cadena es un UUID válido
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Genera un UUID v4 aleatorio
 */
export const generateUUID = (): string => {
  // Implementación de UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Formatea un string a formato UUID (si es posible)
 */
export const formatUUID = (input: string): string => {
  // Remover caracteres no hexadecimales
  const cleaned = input.replace(/[^0-9a-f]/gi, '');
  
  // Si tiene la longitud correcta, formatear con guiones
  if (cleaned.length === 32) {
    return `${cleaned.slice(0, 8)}-${cleaned.slice(8, 12)}-${cleaned.slice(12, 16)}-${cleaned.slice(16, 20)}-${cleaned.slice(20, 32)}`;
  }
  
  return input;
};
