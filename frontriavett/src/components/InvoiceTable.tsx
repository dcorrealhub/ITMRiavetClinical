/**
 * Tabla para mostrar lista de facturas
 */

import React from 'react';
import { InvoiceResponse, InvoiceStatus } from '../types/invoice';
import Button from './common/Button';

interface InvoiceTableProps {
  invoices: InvoiceResponse[];
  onView: (invoice: InvoiceResponse) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: InvoiceStatus) => void;
}

const getStatusBadge = (status: InvoiceStatus) => {
  const styles = {
    DRAFT: 'bg-gray-100 text-gray-800',
    SENT: 'bg-blue-100 text-blue-800',
    PAID: 'bg-green-100 text-green-800',
    CANCELED: 'bg-red-100 text-red-800',
  };

  const labels = {
    DRAFT: 'Borrador',
    SENT: 'Enviada',
    PAID: 'Pagada',
    CANCELED: 'Cancelada',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  }).format(amount);
};

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onView,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay facturas</h3>
        <p className="text-gray-500">Comienza creando una nueva factura para un paciente.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-medical-blue">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Factura #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-medical-blue text-white rounded-full flex items-center justify-center">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-mono text-gray-500">
                        {invoice.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(invoice.date)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-mono">
                    {invoice.patientId.substring(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(invoice.total)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(invoice.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => onView(invoice)}>
                    Ver
                  </Button>
                  {invoice.status === 'DRAFT' && (
                    <>
                      <Button variant="primary" size="sm" onClick={() => onEdit(invoice.id)}>
                        Editar
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onChangeStatus(invoice.id, 'SENT')}
                      >
                        Enviar
                      </Button>
                    </>
                  )}
                  {invoice.status === 'SENT' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onChangeStatus(invoice.id, 'PAID')}
                    >
                      Marcar Pagada
                    </Button>
                  )}
                  {(invoice.status === 'DRAFT' || invoice.status === 'SENT') && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(invoice.id)}
                    >
                      Eliminar
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
