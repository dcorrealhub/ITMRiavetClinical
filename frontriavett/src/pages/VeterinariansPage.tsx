/**
 * Página principal de listado de veterinarios
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVeterinarians } from '../hooks/useVeterinarians';
import { VeterinarianResponse } from '../types/veterinarian';
import VeterinarianTable from '../components/VeterinarianTable';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const VeterinariansPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    veterinarians, 
    isLoading, 
    fetchVeterinarians, 
    deactivateVeterinarian, 
    deleteVeterinarian 
  } = useVeterinarians();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVeterinarian, setSelectedVeterinarian] = useState<VeterinarianResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [veterinarianToDeactivate, setVeterinarianToDeactivate] = useState<string | null>(null);
  const [veterinarianToDelete, setVeterinarianToDelete] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ACTIVE');

  useEffect(() => {
    const onlyActive = filterActive === 'ACTIVE' ? true : filterActive === 'INACTIVE' ? false : undefined;
    fetchVeterinarians({ onlyActive });
  }, [filterActive]);

  const handleView = (veterinarian: VeterinarianResponse) => {
    setSelectedVeterinarian(veterinarian);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/veterinarians/edit/${id}`);
  };

  const handleDeactivateClick = (id: string) => {
    setVeterinarianToDeactivate(id);
  };

  const handleConfirmDeactivate = async () => {
    if (veterinarianToDeactivate) {
      const success = await deactivateVeterinarian(veterinarianToDeactivate);
      if (success) {
        setVeterinarianToDeactivate(null);
        const onlyActive = filterActive === 'ACTIVE' ? true : filterActive === 'INACTIVE' ? false : undefined;
        fetchVeterinarians({ onlyActive });
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    setVeterinarianToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (veterinarianToDelete) {
      const success = await deleteVeterinarian(veterinarianToDelete);
      if (success) {
        setVeterinarianToDelete(null);
        const onlyActive = filterActive === 'ACTIVE' ? true : filterActive === 'INACTIVE' ? false : undefined;
        fetchVeterinarians({ onlyActive });
      }
    }
  };

  const filteredVeterinarians = veterinarians.filter((vet) => {
    const matchesSearch =
      vet.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vet.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vet.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    return matchesSearch;
  });

  const stats = {
    total: veterinarians.length,
    active: veterinarians.filter((v) => v.active).length,
    inactive: veterinarians.filter((v) => !v.active).length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">👨‍⚕️ Gestión de Veterinarios</h1>
        <p className="text-gray-600">Administra el equipo de veterinarios de la clínica</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-medical-blue rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Veterinarios</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
              <p className="text-sm font-medium text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactivos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
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
              placeholder="Buscar por nombre, email, licencia o especialización..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="ALL">Todos</option>
              <option value="ACTIVE">Solo Activos</option>
              <option value="INACTIVE">Solo Inactivos</option>
            </select>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/veterinarians/create')}
            className="w-full md:w-auto"
          >
            ➕ Nuevo Veterinario
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando veterinarios...</p>
        </div>
      ) : (
        <VeterinarianTable
          veterinarians={filteredVeterinarians}
          onView={handleView}
          onEdit={handleEdit}
          onDeactivate={handleDeactivateClick}
          onDelete={handleDeleteClick}
        />
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles del Veterinario"
      >
        {selectedVeterinarian && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="w-16 h-16 bg-medical-blue rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {selectedVeterinarian.firstName[0]}{selectedVeterinarian.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedVeterinarian.firstName} {selectedVeterinarian.lastName}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  selectedVeterinarian.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {selectedVeterinarian.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{selectedVeterinarian.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedVeterinarian.phoneNumber || 'No especificado'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Licencia</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {selectedVeterinarian.licenseNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Especialización</label>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedVeterinarian.specialization || 'General'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="mt-1 text-sm text-gray-900 font-mono">{selectedVeterinarian.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700">Creado</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedVeterinarian.createdAt).toLocaleString('es-CO')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Última Actualización</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedVeterinarian.updatedAt).toLocaleString('es-CO')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Deactivate Confirmation Modal */}
      <Modal
        isOpen={!!veterinarianToDeactivate}
        onClose={() => setVeterinarianToDeactivate(null)}
        title="Desactivar Veterinario"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas desactivar este veterinario?
          </p>
          <p className="text-sm text-yellow-600">
            ℹ️ El veterinario será marcado como inactivo pero no se eliminará del sistema.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setVeterinarianToDeactivate(null)}>
              Cancelar
            </Button>
            <Button variant="warning" onClick={handleConfirmDeactivate}>
              Sí, desactivar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!veterinarianToDelete}
        onClose={() => setVeterinarianToDelete(null)}
        title="Eliminar Veterinario"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar permanentemente este veterinario?
          </p>
          <p className="text-sm text-red-600">
            ⚠️ Esta acción no se puede deshacer. Se eliminarán todos los datos del veterinario.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setVeterinarianToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Sí, eliminar permanentemente
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VeterinariansPage;
