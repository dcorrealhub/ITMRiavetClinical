/**
 * Página para crear una nueva factura
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import { InvoiceRequest } from '../types/invoice';
import InvoiceForm from '../components/forms/InvoiceForm';

const InvoiceCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createInvoice } = useInvoices();

  const handleSubmit = async (data: InvoiceRequest) => {
    const success = await createInvoice(data);
    if (success) {
      navigate('/invoices');
    } else {
      alert('Error al crear la factura. Por favor verifica los datos.');
    }
  };

  const handleCancel = () => {
    navigate('/invoices');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Nueva Factura</h1>
        <p className="text-gray-600">Completa los datos para crear una nueva factura</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <InvoiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default InvoiceCreate;
