/**
 * Custom Hook para gestión de Facturas
 */

import { useState, useCallback } from 'react';
import {
  InvoiceRequest,
  InvoiceResponse,
  InvoiceUpdateRequest,
  GetInvoicesParams,
} from '../types/invoice';
import * as invoicesService from '../services/invoices';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Obtiene todas las facturas con filtros opcionales
   */
  const fetchInvoices = useCallback(async (params?: GetInvoicesParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await invoicesService.getInvoices(params);
      setInvoices(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar las facturas';
      setError(errorMessage);
      console.error('Error fetching invoices:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Obtiene una factura por ID
   */
  const fetchInvoiceById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await invoicesService.getInvoiceById(id);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al cargar la factura';
      setError(errorMessage);
      console.error('Error fetching invoice:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Crea una nueva factura
   */
  const createInvoice = useCallback(async (data: InvoiceRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newInvoice = await invoicesService.createInvoice(data);
      setInvoices((prev) => [...prev, newInvoice]);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al crear la factura';
      setError(errorMessage);
      console.error('Error creating invoice:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Actualiza una factura existente
   */
  const updateInvoice = useCallback(async (id: string, data: InvoiceUpdateRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedInvoice = await invoicesService.updateInvoice(id, data);
      setInvoices((prev) => prev.map((inv) => (inv.id === id ? updatedInvoice : inv)));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar la factura';
      setError(errorMessage);
      console.error('Error updating invoice:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Elimina una factura
   */
  const deleteInvoice = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await invoicesService.deleteInvoice(id);
      setInvoices((prev) => prev.filter((inv) => inv.id !== id));
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar la factura';
      setError(errorMessage);
      console.error('Error deleting invoice:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    invoices,
    isLoading,
    error,
    fetchInvoices,
    fetchInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
};
