/**
 * Página principal de listado de citas
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { usePatients } from '../hooks/usePatients';
import { AppointmentResponse, AppointmentStatus } from '../types/appointment';
import AppointmentTable from '../components/AppointmentTable';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, isLoading, fetchAppointments, updateAppointment, cancelAppointment, deleteAppointment } =
    useAppointments();
  const { patients, fetchPatients } = usePatients();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentResponse | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'ALL'>('ALL');

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const handleView = (appointment: AppointmentResponse) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/appointments/edit/${id}`);
  };

  const handleCancelClick = (id: string) => {
    setAppointmentToCancel(id);
  };

  const handleConfirmCancel = async () => {
    if (appointmentToCancel) {
      try {
        await cancelAppointment(appointmentToCancel);
        setAppointmentToCancel(null);
        fetchAppointments();
      } catch (error) {
        console.error('Error al cancelar la cita:', error);
      }
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.veterinarianId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || apt.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'PENDING').length,
    confirmed: appointments.filter((a) => a.status === 'CONFIRMED').length,
    today: appointments.filter((a) => {
      const today = new Date().toDateString();
      const aptDate = new Date(a.scheduledAt).toDateString();
      return today === aptDate;
    }).length,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Gestión de Citas</h1>
        <p className="text-gray-600">Administra las citas veterinarias</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-medical-blue rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Citas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-full p-3">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
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
              placeholder="Buscar por ID de paciente o veterinario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="ALL">Todos los estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="CONFIRMED">Confirmadas</option>
              <option value="COMPLETED">Completadas</option>
              <option value="CANCELED">Canceladas</option>
            </select>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/appointments/create')}
            className="w-full md:w-auto"
          >
            ➕ Nueva Cita
          </Button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando citas...</p>
        </div>
      ) : (
        <AppointmentTable
          appointments={filteredAppointments}
          patients={patients}
          onView={handleView}
          onEdit={handleEdit}
          onCancel={handleCancelClick}
        />
      )}

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalles de la Cita"
      >
        {selectedAppointment && (() => {
          const patient = patients.find(p => p.id === selectedAppointment.patientId);
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{selectedAppointment.id}</p>
              </div>
              
              {/* Información del Paciente */}
              {patient ? (
                <div className="bg-green-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">🐾 Paciente</label>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Nombre: </span>
                      <span className="text-sm text-gray-900 font-semibold">{patient.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Especie: </span>
                      <span className="text-sm text-gray-900">{patient.species}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Raza: </span>
                      <span className="text-sm text-gray-900">{patient.breed}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Fecha de Nacimiento: </span>
                      <span className="text-sm text-gray-900">
                        {new Date(patient.birthDate).toLocaleDateString('es-CO')}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">ID: </span>
                      <span className="text-sm text-gray-500 font-mono">{patient.id}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Paciente</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">
                    {selectedAppointment.patientId}
                  </p>
                </div>
              )}
            
            {/* Información del Veterinario */}
            {selectedAppointment.veterinarian ? (
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">👨‍⚕️ Veterinario</label>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Nombre: </span>
                    <span className="text-sm text-gray-900">
                      {selectedAppointment.veterinarian.firstName} {selectedAppointment.veterinarian.lastName}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Email: </span>
                    <span className="text-sm text-gray-900">{selectedAppointment.veterinarian.email}</span>
                  </div>
                  {selectedAppointment.veterinarian.phoneNumber && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Teléfono: </span>
                      <span className="text-sm text-gray-900">{selectedAppointment.veterinarian.phoneNumber}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-600">Licencia: </span>
                    <span className="text-sm text-gray-900">{selectedAppointment.veterinarian.licenseNumber}</span>
                  </div>
                  {selectedAppointment.veterinarian.specialization && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Especialización: </span>
                      <span className="text-sm text-gray-900">{selectedAppointment.veterinarian.specialization}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-600">Estado: </span>
                    <span className={`text-sm font-semibold ${selectedAppointment.veterinarian.active ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedAppointment.veterinarian.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Veterinario</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">
                  {selectedAppointment.veterinarianId}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedAppointment.scheduledAt).toLocaleString('es-CO')}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAppointment.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Creada el</label>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(selectedAppointment.createdAt).toLocaleString('es-CO')}
              </p>
            </div>
          </div>
        );
        })()}
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!appointmentToCancel}
        onClose={() => setAppointmentToCancel(null)}
        title="Cancelar Cita"
      >
        <div className="space-y-4">
          <p className="text-gray-700">¿Estás seguro de que deseas cancelar esta cita?</p>
          <p className="text-sm text-red-600">⚠️ Esta acción no se puede deshacer.</p>
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" onClick={() => setAppointmentToCancel(null)}>
              No, mantener
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Sí, cancelar cita
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentsPage;
