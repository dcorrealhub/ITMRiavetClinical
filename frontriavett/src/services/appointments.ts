/**
 * API Service para Citas/Agenda
 */

import axios from 'axios';
import {
  AppointmentRequest,
  AppointmentResponse,
  GetAppointmentsParams,
  AppointmentUpdateRequest,
} from '../types/appointment';

const APPOINTMENTS_API_BASE_URL =
  process.env.REACT_APP_APPOINTMENTS_API_BASE_URL || 'http://localhost:8084/api/v1';

const appointmentsApi = axios.create({
  baseURL: APPOINTMENTS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene todas las citas con filtros opcionales
 */
export const getAppointments = async (
  params?: GetAppointmentsParams
): Promise<AppointmentResponse[]> => {
  const response = await appointmentsApi.get<AppointmentResponse[]>('/appointments', { params });
  return response.data;
};

/**
 * Obtiene una cita por ID
 */
export const getAppointmentById = async (id: string): Promise<AppointmentResponse> => {
  const response = await appointmentsApi.get<AppointmentResponse>(`/appointments/${id}`);
  return response.data;
};

/**
 * Crea una nueva cita
 */
export const createAppointment = async (
  data: AppointmentRequest
): Promise<AppointmentResponse> => {
  const response = await appointmentsApi.post<AppointmentResponse>('/appointments', data);
  return response.data;
};

/**
 * Actualiza una cita existente
 */
export const updateAppointment = async (
  id: string,
  data: AppointmentUpdateRequest
): Promise<AppointmentResponse> => {
  const response = await appointmentsApi.put<AppointmentResponse>(`/appointments/${id}`, data);
  return response.data;
};

/**
 * Cancela una cita (usando el endpoint específico del backend)
 */
export const cancelAppointment = async (id: string): Promise<AppointmentResponse> => {
  const response = await appointmentsApi.patch<AppointmentResponse>(`/appointments/${id}/cancel`);
  return response.data;
};

/**
 * Elimina (cancela) una cita
 */
export const deleteAppointment = async (id: string): Promise<void> => {
  await appointmentsApi.delete(`/appointments/${id}`);
};

export default {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  deleteAppointment,
};
