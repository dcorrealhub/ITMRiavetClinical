/**
 * API Service para Veterinarios
 */

import axios from 'axios';
import {
  VeterinarianRequest,
  VeterinarianResponse,
  GetVeterinariansParams,
  VeterinarianUpdateRequest,
} from '../types/veterinarian';

const VETERINARIANS_API_BASE_URL =
  process.env.REACT_APP_APPOINTMENTS_API_BASE_URL || 'http://localhost:8084/api/v1';

const veterinariansApi = axios.create({
  baseURL: VETERINARIANS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene todos los veterinarios con filtros opcionales
 */
export const getVeterinarians = async (
  params?: GetVeterinariansParams
): Promise<VeterinarianResponse[]> => {
  const response = await veterinariansApi.get<VeterinarianResponse[]>('/veterinarians', { params });
  return response.data;
};

/**
 * Obtiene un veterinario por ID
 */
export const getVeterinarianById = async (id: string): Promise<VeterinarianResponse> => {
  const response = await veterinariansApi.get<VeterinarianResponse>(`/veterinarians/${id}`);
  return response.data;
};

/**
 * Obtiene un veterinario por email
 */
export const getVeterinarianByEmail = async (email: string): Promise<VeterinarianResponse> => {
  const response = await veterinariansApi.get<VeterinarianResponse>(`/veterinarians/email/${email}`);
  return response.data;
};

/**
 * Crea un nuevo veterinario
 */
export const createVeterinarian = async (
  data: VeterinarianRequest
): Promise<VeterinarianResponse> => {
  const response = await veterinariansApi.post<VeterinarianResponse>('/veterinarians', data);
  return response.data;
};

/**
 * Actualiza un veterinario existente
 */
export const updateVeterinarian = async (
  id: string,
  data: VeterinarianUpdateRequest
): Promise<VeterinarianResponse> => {
  const response = await veterinariansApi.put<VeterinarianResponse>(`/veterinarians/${id}`, data);
  return response.data;
};

/**
 * Desactiva un veterinario (soft delete)
 */
export const deactivateVeterinarian = async (id: string): Promise<VeterinarianResponse> => {
  const response = await veterinariansApi.patch<VeterinarianResponse>(`/veterinarians/${id}/deactivate`);
  return response.data;
};

/**
 * Elimina un veterinario permanentemente
 */
export const deleteVeterinarian = async (id: string): Promise<void> => {
  await veterinariansApi.delete(`/veterinarians/${id}`);
};

export default {
  getVeterinarians,
  getVeterinarianById,
  getVeterinarianByEmail,
  createVeterinarian,
  updateVeterinarian,
  deactivateVeterinarian,
  deleteVeterinarian,
};
