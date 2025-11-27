/**
 * Tabla para mostrar lista de veterinarios
 */

import React from 'react';
import { VeterinarianResponse } from '../types/veterinarian';
import Button from './common/Button';

interface VeterinarianTableProps {
  veterinarians: VeterinarianResponse[];
  onView: (veterinarian: VeterinarianResponse) => void;
  onEdit: (id: string) => void;
  onDeactivate: (id: string) => void;
  onDelete: (id: string) => void;
}

const VeterinarianTable: React.FC<VeterinarianTableProps> = ({
  veterinarians,
  onView,
  onEdit,
  onDeactivate,
  onDelete,
}) => {
  if (veterinarians.length === 0) {
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay veterinarios
        </h3>
        <p className="text-gray-500">
          Comienza agregando un nuevo veterinario al equipo.
        </p>
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
                Veterinario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Licencia
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Especialización
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
            {veterinarians.map((veterinarian) => (
              <tr key={veterinarian.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-medical-blue text-white rounded-full flex items-center justify-center font-bold">
                      {veterinarian.firstName[0]}{veterinarian.lastName[0]}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        👨‍⚕️ {veterinarian.firstName} {veterinarian.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {veterinarian.fullName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">📧 {veterinarian.email}</div>
                  {veterinarian.phoneNumber && (
                    <div className="text-sm text-gray-500">
                      📱 {veterinarian.phoneNumber}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900">
                    {veterinarian.licenseNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {veterinarian.specialization || (
                      <span className="text-gray-400 italic">General</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      veterinarian.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {veterinarian.active ? '✓ Activo' : '✗ Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="secondary" size="sm" onClick={() => onView(veterinarian)}>
                    Ver
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => onEdit(veterinarian.id)}>
                    Editar
                  </Button>
                  {veterinarian.active ? (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => onDeactivate(veterinarian.id)}
                    >
                      Desactivar
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(veterinarian.id)}
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

export default VeterinarianTable;
