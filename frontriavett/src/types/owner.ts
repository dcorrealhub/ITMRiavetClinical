/**
 * Tipos y interfaces para la gestión de propietarios
 */

export interface OwnerRequest {
  fullName: string;
  phone?: string;
  email?: string;
}

export interface OwnerResponse {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetOwnersParams {
  search?: string;
}

export interface OwnerUpdateRequest {
  fullName?: string;
  phone?: string;
  email?: string;
}
