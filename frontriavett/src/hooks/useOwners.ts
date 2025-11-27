/**
 * Hook personalizado para gestión de propietarios
 */

import { useState } from 'react';
import { OwnerRequest, OwnerResponse, GetOwnersParams, OwnerUpdateRequest } from '../types/owner';
import * as ownersService from '../services/owners';
import { useToast } from './useToast';

export const useOwners = () => {
  const [owners, setOwners] = useState<OwnerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { success, error: errorToast } = useToast();

  /**
   * Obtiene todos los propietarios
   */
  const fetchOwners = async (params?: GetOwnersParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ownersService.getOwners(params);
      setOwners(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar propietarios';
      setError(errorMessage);
      errorToast(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Obtiene un propietario por ID
   */
  const fetchOwnerById = async (id: string): Promise<OwnerResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ownersService.getOwnerById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar propietario';
      setError(errorMessage);
      errorToast(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Crea un nuevo propietario
   */
  const createOwner = async (owner: OwnerRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newOwner = await ownersService.createOwner(owner);
      setOwners((prev) => [newOwner, ...prev]);
      success('Propietario creado exitosamente');
      return newOwner;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear propietario';
      setError(errorMessage);
      errorToast(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Actualiza un propietario
   */
  const updateOwner = async (id: string, owner: OwnerUpdateRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOwner = await ownersService.updateOwner(id, owner);
      setOwners((prev) =>
        prev.map((o) => (o.id === id ? updatedOwner : o))
      );
      success('Propietario actualizado exitosamente');
      return updatedOwner;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar propietario';
      setError(errorMessage);
      errorToast(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Elimina un propietario
   */
  const deleteOwner = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await ownersService.deleteOwner(id);
      setOwners((prev) => prev.filter((o) => o.id !== id));
      success('Propietario eliminado exitosamente');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar propietario';
      setError(errorMessage);
      errorToast(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    owners,
    isLoading,
    error,
    fetchOwners,
    fetchOwnerById,
    createOwner,
    updateOwner,
    deleteOwner,
  };
};
