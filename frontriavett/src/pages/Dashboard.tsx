import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicalRecords } from '../hooks/useClinicalRecords';
import { useToast } from '../hooks/useToast';
import { ClinicalRecordResponse, RecordStatus } from '../types/clinicalRecord';
import RecordTable from '../components/RecordTable';
import Modal from '../components/common/Modal';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import { ToastContainer } from '../components/common/Toast';
import { formatDate, formatDateTime } from '../utils/dateHelpers';
import { formatStatus } from '../utils/formatters';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { records, loading, fetchRecords, deleteRecord } = useClinicalRecords();
  const { toasts, removeToast, success, error: showError } = useToast();

  const [selectedRecord, setSelectedRecord] = useState<ClinicalRecordResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    patientId: '',
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    await fetchRecords(filters.status || filters.patientId ? filters : undefined);
  };

  const handleView = (record: ClinicalRecordResponse) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteRecord(id);
    if (result.success) {
      success('Registro eliminado exitosamente');
    } else {
      showError(result.error || 'Error al eliminar el registro');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    loadRecords();
  };

  const handleClearFilters = () => {
    setFilters({ status: '', patientId: '' });
    fetchRecords();
  };

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'ACTIVE', label: 'Activo' },
    { value: 'COMPLETED', label: 'Completado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Registros Clínicos</h1>
          <p className="mt-1 text-gray-600">
            Gestiona y consulta los registros médicos veterinarios
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/records/new')}
        >
          <svg
            className="h-5 w-5 mr-2 inline"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Registro
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Estado"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={statusOptions}
          />
          <Input
            label="ID Paciente"
            name="patientId"
            value={filters.patientId}
            onChange={handleFilterChange}
            placeholder="Buscar por ID de paciente"
          />
          <div className="flex items-end space-x-2">
            <Button variant="primary" onClick={handleApplyFilters}>
              Aplicar
            </Button>
            <Button variant="secondary" onClick={handleClearFilters}>
              Limpiar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-medical-blue-100 rounded-md p-3">
              <svg
                className="h-6 w-6 text-medical-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{records.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <svg
                className="h-6 w-6 text-yellow-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {records.filter((r) => r.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-semibold text-gray-900">
                {records.filter((r) => r.status === 'ACTIVE').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-2xl font-semibold text-gray-900">
                {records.filter((r) => r.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Records Table */}
      {loading ? (
        <Loading message="Cargando registros..." />
      ) : (
        <RecordTable
          records={records}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Detalle del Registro Clínico"
        size="xl"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Registro</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRecord.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <p className="mt-1">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {formatStatus(selectedRecord.status)}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Paciente</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRecord.patientId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Veterinario</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRecord.veterinarianId}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnóstico</label>
              <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {selectedRecord.diagnosis}
              </p>
            </div>

            {selectedRecord.procedures && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Procedimientos</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedRecord.procedures}
                </p>
              </div>
            )}

            {selectedRecord.medicalOrders && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Órdenes Médicas</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedRecord.medicalOrders}
                </p>
              </div>
            )}

            {selectedRecord.prescription && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Prescripción</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedRecord.prescription}
                </p>
              </div>
            )}

            {selectedRecord.attachments && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Archivos Adjuntos</label>
                <p className="mt-1 text-sm text-gray-900">{selectedRecord.attachments}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDateTime(selectedRecord.createdAt)}
                </p>
              </div>
              {selectedRecord.followUpDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Fecha de Seguimiento
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedRecord.followUpDate)}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
