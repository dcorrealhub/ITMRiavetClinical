/**
 * Tipos para el módulo de Veterinarios
 */

export interface VeterinarianRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  licenseNumber: string;
  specialization?: string;
  active?: boolean;
}

export interface VeterinarianResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  licenseNumber: string;
  specialization?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  fullName?: string; // Calculado por el backend
}

export interface GetVeterinariansParams {
  onlyActive?: boolean;
}

export interface VeterinarianUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  licenseNumber?: string;
  specialization?: string;
  active?: boolean;
}
