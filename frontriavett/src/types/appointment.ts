/**
 * Tipos para el módulo de Citas/Agenda
 */

import { VeterinarianResponse } from './veterinarian';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';

export interface AppointmentRequest {
  patientId: string;
  veterinarianId: string;
  scheduledAt: string; // ISO 8601 format: 2025-11-25T10:00:00
}

export interface AppointmentResponse {
  id: string;
  patientId: string;
  veterinarianId: string;
  veterinarian?: VeterinarianResponse; // Información completa del veterinario
  scheduledAt: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GetAppointmentsParams {
  veterinarianId?: string;
}

export interface AppointmentUpdateRequest {
  patientId?: string;
  veterinarianId?: string;
  scheduledAt?: string;
  status?: AppointmentStatus;
}
