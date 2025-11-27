/**
 * Tabla para mostrar lista de citas
 */

import React from 'react';
import { AppointmentResponse, AppointmentStatus } from '../types/appointment';
import { PatientResponse } from '../types/patient';
import Button from './common/Button';

interface AppointmentTableProps {
  appointments: AppointmentResponse[];
  patients: PatientResponse[];
  onView: (appointment: AppointmentResponse) => void;
  onEdit: (id: string) => void;
  onCancel: (id: string) => void;
}

const getStatusBadge = (status: AppointmentStatus) => {
  const styles = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELED: 'bg-red-100 text-red-800',
  };

  const labels = {
    PENDING: 'Pendiente',
    CONFIRMED: 'Confirmada',
    COMPLETED: 'Completada',
    CANCELED: 'Cancelada',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  patients,
  onView,
  onEdit,
  onCancel,
}) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      return {
        name: patient.name,
        species: patient.species,
        breed: patient.breed,
      };
    }
    return null;
  };

  if (appointments.length === 0) {
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas</h3>
        <p className="text-gray-500">Comienza creando una nueva cita para un paciente.</p>
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
                Fecha y Hora
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Veterinario
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
            {appointments.map((appointment) => {
              const { date, time } = formatDateTime(appointment.scheduledAt);
              const patientInfo = getPatientName(appointment.patientId);
              return (
                <tr key={appointment.id} className="hover:bg-gray-50">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patientInfo ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          🐾 {patientInfo.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patientInfo.species} • {patientInfo.breed}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 font-mono">
                        {appointment.patientId.substring(0, 8)}...
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {appointment.veterinarian ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          👨‍⚕️ {appointment.veterinarian.firstName} {appointment.veterinarian.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.veterinarian.specialization || 'General'} • {appointment.veterinarian.licenseNumber}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 font-mono">
                        {appointment.veterinarianId.substring(0, 8)}...
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onView(appointment)}
                    >
                      Ver
                    </Button>
                    {appointment.status === 'PENDING' && (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onEdit(appointment.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onCancel(appointment.id)}
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
