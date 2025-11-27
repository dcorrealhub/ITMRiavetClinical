/**
 * Cliente API para gestión de propietarios
 * API Base: http://localhost:8081/api/v1/owners
 */

import axios from 'axios';
import { OwnerRequest, OwnerResponse, GetOwnersParams, OwnerUpdateRequest } from '../types/owner';

const API_BASE_URL = process.env.REACT_APP_PATIENTS_API_BASE_URL || 'http://localhost:8081';

// Cliente axios específico para owners
const ownersClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/owners`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging
ownersClient.interceptors.request.use((config) => {
  console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

ownersClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.message}`, error.response?.data);
    return Promise.reject(error);
  }
);

/**
 * Obtiene todos los propietarios con opción de búsqueda
 */
export const getOwners = async (params?: GetOwnersParams): Promise<OwnerResponse[]> => {
  const response = await ownersClient.get<OwnerResponse[]>('', { params });
  return response.data;
};

/**
 * Obtiene un propietario por ID
 */
export const getOwnerById = async (id: string): Promise<OwnerResponse> => {
  const response = await ownersClient.get<OwnerResponse>(`/${id}`);
  return response.data;
};

/**
 * Crea un nuevo propietario
 */
export const createOwner = async (owner: OwnerRequest): Promise<OwnerResponse> => {
  const response = await ownersClient.post<OwnerResponse>('', owner);
  return response.data;
};

/**
 * Actualiza un propietario existente
 */
export const updateOwner = async (
  id: string,
  owner: OwnerUpdateRequest
): Promise<OwnerResponse> => {
  const response = await ownersClient.put<OwnerResponse>(`/${id}`, owner);
  return response.data;
};

/**
 * Elimina un propietario (soft delete)
 */
export const deleteOwner = async (id: string): Promise<void> => {
  await ownersClient.delete(`/${id}`);
};

export default {
  getOwners,
  getOwnerById,
  createOwner,
  updateOwner,
  deleteOwner,
};
