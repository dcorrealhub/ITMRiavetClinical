/**
 * Página principal de listado de facturas
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '../hooks/useInvoices';
import { InvoiceResponse, InvoiceStatus } from '../types/invoice';
import InvoiceTable from '../components/InvoiceTable';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const InvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { invoices, isLoading, fetchInvoices, updateInvoice, deleteInvoice } = useInvoices();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | 'ALL'>('ALL');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleView = (invoice: InvoiceResponse) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/invoices/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setInvoiceToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (invoiceToDelete) {
      await deleteInvoice(invoiceToDelete);
      setInvoiceToDelete(null);
      fetchInvoices();
    }
  };

  const handleChangeStatus = async (id: string, status: InvoiceStatus) => {
    const invoice = invoices.find(inv => inv.id === id);
    
    if (!invoice) {
      alert('No se encontró la factura');
      return;
    }
    
    const updateData = {
      patientId: invoice.patientId,
      total: invoice.total,
      items: invoice.items,
      status: status
    };
    
    try {
      const result = await updateInvoice(id, updateData);
      
      if (result) {
        await fetchInvoices();
      } else {
        alert('Error al actualizar la factura. Por favor intenta nuevamente.');
      }
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      alert('Error al actualizar la factura. Por favor verifica tu conexión.');
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.items.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || inv.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: invoices.length,
    draft: invoices.filter((i) => i.status === 'DRAFT').length,
    sent: invoices.filter((i) => i.status === 'SENT').length,
    paid: invoices.filter((i) => i.status === 'PAID').length,
    totalAmount: invoices
      .filter((i) => i.status === 'PAID')
      .reduce((sum, i) => sum + i.total, 0),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💰 Gestión de Facturas</h1>
        <p className="text-gray-600">Administra las facturas y pagos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-medical-blue rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gray-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Borradores</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enviadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.sent}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pagadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recaudado</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto flex gap-4">
            <input
              type="text"
              placeholder="Buscar por ID, paciente o items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as InvoiceStatus | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="ALL">Todos los estados</option>
              <option value="DRAFT">Borradores</option>
              <option value="SENT">Enviadas</option>
              <option value="PAID">Pagadas</option>
              <option value="CANCELED">Canceladas</option>
            </select>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/invoices/create')}
            className="w-full md:w-auto"
          >
            ➕ Nueva Factura
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando facturas...</p>
        </div>
      ) : (
        <InvoiceTable
          invoices={filteredInvoices}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onChangeStatus={handleChangeStatus}
        />
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles de la Factura"
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{selectedInvoice.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Paciente</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{selectedInvoice.patientId}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedInvoice.date).toLocaleString('es-CO')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total</label>
              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatCurrency(selectedInvoice.total)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <p className="mt-1 text-sm text-gray-900">{selectedInvoice.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Items / Servicios</label>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {selectedInvoice.items}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Creada el</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedInvoice.createdAt).toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!invoiceToDelete}
        onClose={() => setInvoiceToDelete(null)}
        title="Eliminar Factura"
      >
        <div className="space-y-4">
          <p className="text-gray-700">¿Estás seguro de que deseas eliminar esta factura?</p>
          <p className="text-sm text-red-600">⚠️ Esta acción no se puede deshacer.</p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setInvoiceToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InvoicesPage;
