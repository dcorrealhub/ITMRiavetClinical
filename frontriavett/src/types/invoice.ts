/**
 * Tipos para el módulo de Facturación
 */

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'CANCELED';

export interface InvoiceRequest {
  patientId: string;
  total: number;
  items: string;
}

export interface InvoiceResponse {
  id: string;
  patientId: string;
  date: string;
  total: number;
  status: InvoiceStatus;
  items: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceUpdateRequest {
  patientId?: string;
  total?: number;
  items?: string;
  status?: InvoiceStatus;
}

export interface GetInvoicesParams {
  status?: InvoiceStatus;
  patientId?: string;
}
