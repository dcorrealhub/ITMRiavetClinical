/**
 * Página para editar una factura existente
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import { InvoiceRequest, InvoiceResponse } from '../types/invoice';
import InvoiceForm from '../components/forms/InvoiceForm';

const InvoiceEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchInvoiceById, updateInvoice } = useInvoices();
  const [initialData, setInitialData] = useState<InvoiceResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      if (!id) {
        navigate('/invoices');
        return;
      }

      const invoice = await fetchInvoiceById(id);
      if (invoice) {
        setInitialData(invoice);
      } else {
        // Si no se encuentra la factura, redirigir
        navigate('/invoices');
      }
      setIsLoading(false);
    };

    loadInvoice();
  }, [id]);

  const handleSubmit = async (data: InvoiceRequest) => {
    if (!id) return;
    
    try {
      const success = await updateInvoice(id, data);
      if (success) {
        navigate('/invoices');
      }
    } catch (err) {
      console.error('Error al actualizar factura:', err);
      alert('Error al actualizar la factura. Por favor verifica los datos.');
    }
  };

  const handleCancel = () => {
    navigate('/invoices');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando factura...</p>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">✏️ Editar Factura</h1>
        <p className="text-gray-600">Modifica los datos de la factura</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <InvoiceForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default InvoiceEdit;
