import React from 'react';
import { PatientResponse } from '../types/patient';
import Button from './common/Button';
import { formatDate } from '../utils/dateHelpers';

interface PatientTableProps {
  patients: PatientResponse[];
  onView: (patient: PatientResponse) => void;
  onEdit: (patient: PatientResponse) => void;
  onMerge?: (patient: PatientResponse) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onView,
  onEdit,
  onMerge,
}) => {
  const calculateAge = (birthDate: string): string => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  };

  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 text-5xl mb-4">🐾</div>
        <p className="text-gray-600">No hay pacientes registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Especie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Raza
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Dueño
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registrado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-medical-blue-light rounded-full flex items-center justify-center">
                      <span className="text-medical-blue font-medium">
                        {patient.name?.charAt(0).toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name || 'Sin nombre'}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {patient.id ? patient.id.substring(0, 8) : 'N/A'}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {patient.species || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.breed || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.birthDate ? calculateAge(patient.birthDate) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                  {patient.ownerId ? patient.ownerId.substring(0, 8) : 'N/A'}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.createdAt ? formatDate(patient.createdAt) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => onView(patient)}
                      className="text-xs"
                    >
                      Ver
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(patient)}
                      className="text-xs"
                    >
                      Editar
                    </Button>
                    {onMerge && (
                      <Button
                        variant="secondary"
                        onClick={() => onMerge(patient)}
                        className="text-xs"
                      >
                        Fusionar
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientTable;
