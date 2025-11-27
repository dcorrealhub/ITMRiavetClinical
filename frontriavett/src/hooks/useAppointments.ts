/**
 * Custom Hook para gestión de Citas
 */

import { useState, useCallback } from 'react';
import {
  AppointmentRequest,
  AppointmentResponse,
  GetAppointmentsParams,
  AppointmentUpdateRequest,
} from '../types/appointment';
import * as appointmentsService from '../services/appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las citas con filtros opcionales
   */
  const fetchAppointments = useCallback(async (params?: GetAppointmentsParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await appointmentsService.getAppointments(params);
      setAppointments(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar las citas';
      setError(errorMessage);
      console.error('Error fetching appointments:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtiene una cita por ID
   */
  const fetchAppointmentById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await appointmentsService.getAppointmentById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar la cita';
      setError(errorMessage);
      console.error('Error fetching appointment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crea una nueva cita
   */
  const createAppointment = useCallback(
    async (data: AppointmentRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const newAppointment = await appointmentsService.createAppointment(data);
        setAppointments((prev) => [...prev, newAppointment]);
        return newAppointment;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al crear la cita';
        setError(errorMessage);
        console.error('Error creating appointment:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Actualiza una cita existente
   */
  const updateAppointment = useCallback(
    async (id: string, data: AppointmentUpdateRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedAppointment = await appointmentsService.updateAppointment(id, data);
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
        );
        return updatedAppointment;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Error al actualizar la cita';
        setError(errorMessage);
        console.error('Error updating appointment:', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Cancela una cita (cambia su estado a CANCELED)
   */
  const cancelAppointment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedAppointment = await appointmentsService.cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
      );
      return updatedAppointment;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cancelar la cita';
      setError(errorMessage);
      console.error('Error canceling appointment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Elimina (cancela) una cita
   */
  const deleteAppointment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await appointmentsService.deleteAppointment(id);
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cancelar la cita';
      setError(errorMessage);
      console.error('Error deleting appointment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    appointments,
    isLoading,
    error,
    fetchAppointments,
    fetchAppointmentById,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    deleteAppointment,
  };
};
