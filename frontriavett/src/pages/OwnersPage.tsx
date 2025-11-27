import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOwners } from '../hooks/useOwners';
import { OwnerResponse } from '../types/owner';
import OwnerTable from '../components/OwnerTable';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const OwnersPage: React.FC = () => {
  const navigate = useNavigate();
  const { owners, isLoading, fetchOwners, deleteOwner } = useOwners();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwner, setSelectedOwner] = useState<OwnerResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [ownerToDelete, setOwnerToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSearch = async () => {
    await fetchOwners({ search: searchTerm });
  };

  const handleClearSearch = async () => {
    setSearchTerm('');
    await fetchOwners();
  };

  const handleView = (owner: OwnerResponse) => {
    setSelectedOwner(owner);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/owners/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setOwnerToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (ownerToDelete) {
      await deleteOwner(ownerToDelete);
      setOwnerToDelete(null);
    }
  };

  // Filtrar propietarios por búsqueda local
  const filteredOwners = searchTerm
    ? owners.filter(
        (owner) =>
          owner.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.phone?.includes(searchTerm)
      )
    : owners;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          👤 Gestión de Propietarios
        </h1>
        <p className="text-gray-600">
          Administra la información de los dueños de las mascotas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-medical-blue rounded-full p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Propietarios</p>
              <p className="text-2xl font-bold text-gray-900">{owners.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-full p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Con Email</p>
              <p className="text-2xl font-bold text-gray-900">
                {owners.filter((o) => o.email).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-full p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Con Teléfono</p>
              <p className="text-2xl font-bold text-gray-900">
                {owners.filter((o) => o.phone).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/owners/create')}
            className="w-full md:w-auto"
          >
            ➕ Nuevo Propietario
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando propietarios...</p>
        </div>
      ) : (
        <OwnerTable
          owners={filteredOwners}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles del Propietario"
      >
        {selectedOwner && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{selectedOwner.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <p className="mt-1 text-sm text-gray-900">{selectedOwner.fullName}</p>
            </div>
            {selectedOwner.email && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOwner.email}</p>
              </div>
            )}
            {selectedOwner.phone && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOwner.phone}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Registro</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedOwner.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!ownerToDelete}
        onClose={() => setOwnerToDelete(null)}
        title="Confirmar Eliminación"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar este propietario?
          </p>
          <p className="text-sm text-red-600">
            ⚠️ Esta acción no se puede deshacer. Los pacientes asociados quedarán huérfanos.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setOwnerToDelete(null)}>
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

export default OwnersPage;
