/**
 * API Service para Facturas
 */

import axios from 'axios';
import {
  InvoiceRequest,
  InvoiceResponse,
  InvoiceUpdateRequest,
  GetInvoicesParams,
} from '../types/invoice';

const INVOICES_API_BASE_URL =
  process.env.REACT_APP_INVOICES_API_BASE_URL || 'http://localhost:8083/api/v1';

const invoicesApi = axios.create({
  baseURL: INVOICES_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Obtiene todas las facturas con filtros opcionales
 */
export const getInvoices = async (params?: GetInvoicesParams): Promise<InvoiceResponse[]> => {
  const response = await invoicesApi.get<InvoiceResponse[]>('/invoices', { params });
  return response.data;
};

/**
 * Obtiene una factura por ID
 */
export const getInvoiceById = async (id: string): Promise<InvoiceResponse> => {
  const response = await invoicesApi.get<InvoiceResponse>(`/invoices/${id}`);
  return response.data;
};

/**
 * Crea una nueva factura
 */
export const createInvoice = async (data: InvoiceRequest): Promise<InvoiceResponse> => {
  const response = await invoicesApi.post<InvoiceResponse>('/invoices', data);
  return response.data;
};

/**
 * Actualiza una factura existente
 */
export const updateInvoice = async (
  id: string,
  data: InvoiceUpdateRequest
): Promise<InvoiceResponse> => {
  const response = await invoicesApi.put<InvoiceResponse>(`/invoices/${id}`, data);
  return response.data;
};

/**
 * Elimina una factura
 */
export const deleteInvoice = async (id: string): Promise<void> => {
  await invoicesApi.delete(`/invoices/${id}`);
};

export default {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
