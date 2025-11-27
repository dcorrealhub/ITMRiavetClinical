/**
 * Custom Hook para gestión de Veterinarios
 */

import { useState, useCallback } from 'react';
import {
  VeterinarianRequest,
  VeterinarianResponse,
  GetVeterinariansParams,
  VeterinarianUpdateRequest,
} from '../types/veterinarian';
import * as veterinariansService from '../services/veterinarians';

export const useVeterinarians = () => {
  const [veterinarians, setVeterinarians] = useState<VeterinarianResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todos los veterinarios con filtros opcionales
   */
  const fetchVeterinarians = useCallback(async (params?: GetVeterinariansParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await veterinariansService.getVeterinarians(params);
      setVeterinarians(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar los veterinarios';
      setError(errorMessage);
      console.error('Error fetching veterinarians:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtiene un veterinario por ID
   */
  const fetchVeterinarianById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await veterinariansService.getVeterinarianById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar el veterinario';
      setError(errorMessage);
      console.error('Error fetching veterinarian:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo veterinario
   */
  const createVeterinarian = useCallback(async (data: VeterinarianRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newVeterinarian = await veterinariansService.createVeterinarian(data);
      setVeterinarians((prev) => [...prev, newVeterinarian]);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear el veterinario';
      setError(errorMessage);
      console.error('Error creating veterinarian:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Actualiza un veterinario existente
   */
  const updateVeterinarian = useCallback(async (id: string, data: VeterinarianUpdateRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedVeterinarian = await veterinariansService.updateVeterinarian(id, data);
      setVeterinarians((prev) => prev.map((vet) => (vet.id === id ? updatedVeterinarian : vet)));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el veterinario';
      setError(errorMessage);
      console.error('Error updating veterinarian:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Desactiva un veterinario
   */
  const deactivateVeterinarian = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedVeterinarian = await veterinariansService.deactivateVeterinarian(id);
      setVeterinarians((prev) => prev.map((vet) => (vet.id === id ? updatedVeterinarian : vet)));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al desactivar el veterinario';
      setError(errorMessage);
      console.error('Error deactivating veterinarian:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Elimina un veterinario permanentemente
   */
  const deleteVeterinarian = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await veterinariansService.deleteVeterinarian(id);
      setVeterinarians((prev) => prev.filter((vet) => vet.id !== id));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar el veterinario';
      setError(errorMessage);
      console.error('Error deleting veterinarian:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    veterinarians,
    isLoading,
    error,
    fetchVeterinarians,
    fetchVeterinarianById,
    createVeterinarian,
    updateVeterinarian,
    deactivateVeterinarian,
    deleteVeterinarian,
  };
};
