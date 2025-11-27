import React from 'react';
import { OwnerResponse } from '../types/owner';
import Button from './common/Button';
import { formatDate } from '../utils/dateHelpers';

interface OwnerTableProps {
  owners: OwnerResponse[];
  onView: (owner: OwnerResponse) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const OwnerTable: React.FC<OwnerTableProps> = ({
  owners,
  onView,
  onEdit,
  onDelete,
}) => {
  if (owners.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No hay propietarios registrados</p>
        <p className="text-gray-400 mt-2">Crea el primer propietario para comenzar</p>
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
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre Completo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fecha Registro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {owners.map((owner) => (
              <tr key={owner.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-medical-blue text-white rounded-full flex items-center justify-center font-semibold">
                      {owner.fullName?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="ml-3">
                      <span className="text-xs font-mono text-gray-500">
                        {owner.id ? owner.id.substring(0, 8) : 'N/A'}...
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {owner.fullName || 'Sin nombre'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {owner.email || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {owner.phone || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {owner.createdAt ? formatDate(owner.createdAt) : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onView(owner)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onEdit(owner.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(owner.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerTable;
