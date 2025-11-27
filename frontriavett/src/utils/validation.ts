/**
 * Valida que un campo no esté vacío
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Valida longitud mínima
 */
export const minLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

/**
 * Valida longitud máxima
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.trim().length <= max;
};

/**
 * Valida formato de ID (alfanumérico y guiones)
 */
export const isValidId = (value: string): boolean => {
  const idRegex = /^[a-zA-Z0-9-_]+$/;
  return idRegex.test(value);
};

/**
 * Valida que el diagnóstico tenga al menos 10 caracteres
 */
export const isValidDiagnosis = (value: string): boolean => {
  return isRequired(value) && minLength(value, 10);
};

/**
 * Obtiene el mensaje de error para un campo
 */
export const getErrorMessage = (
  fieldName: string,
  value: string,
  rules: ValidationRule[]
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string;
}

/**
 * Reglas de validación predefinidas
 */
export const validationRules = {
  patientId: [
    {
      validate: isRequired,
      message: 'El ID del paciente es requerido',
    },
    {
      validate: isValidId,
      message: 'El ID del paciente debe ser alfanumérico',
    },
  ],
  veterinarianId: [
    {
      validate: isRequired,
      message: 'El ID del veterinario es requerido',
    },
    {
      validate: isValidId,
      message: 'El ID del veterinario debe ser alfanumérico',
    },
  ],
  diagnosis: [
    {
      validate: isRequired,
      message: 'El diagnóstico es requerido',
    },
    {
      validate: isValidDiagnosis,
      message: 'El diagnóstico debe tener al menos 10 caracteres',
    },
  ],
};
