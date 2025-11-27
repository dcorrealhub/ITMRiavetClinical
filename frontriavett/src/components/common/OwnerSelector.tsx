import React, { useEffect, useState } from 'react';
import { useOwners } from '../../hooks/useOwners';
import { OwnerResponse } from '../../types/owner';

interface OwnerSelectorProps {
  value: string;
  onChange: (ownerId: string) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

const OwnerSelector: React.FC<OwnerSelectorProps> = ({
  value,
  onChange,
  error,
  touched,
  required = true,
}) => {
  const { owners, fetchOwners, isLoading } = useOwners();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchOwners();
  }, []);

  const filteredOwners = searchTerm
    ? owners.filter(
        (owner) =>
          owner.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          owner.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : owners;

  const selectedOwner = owners.find((o) => o.id === value);

  const handleSelect = (owner: OwnerResponse) => {
    onChange(owner.id);
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Propietario {required && <span className="text-red-500">*</span>}
      </label>

      {/* Selected Owner Display */}
      {selectedOwner ? (
        <div className="mb-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">
              {selectedOwner.fullName}
            </p>
            {selectedOwner.email && (
              <p className="text-sm text-gray-600">{selectedOwner.email}</p>
            )}
            <p className="text-xs text-gray-500 font-mono">{selectedOwner.id}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Buscar propietario por nombre o email..."
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
              touched && error ? 'border-red-500' : 'border-gray-300'
            }`}
          />

          {/* Dropdown List */}
          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  Cargando propietarios...
                </div>
              ) : filteredOwners.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-gray-500 mb-2">No hay propietarios disponibles</p>
                  <a
                    href="/owners/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-medical-blue hover:text-medical-blue-dark underline text-sm"
                  >
                    ➕ Crear nuevo propietario
                  </a>
                </div>
              ) : (
                <>
                  {filteredOwners.map((owner) => (
                    <button
                      key={owner.id}
                      type="button"
                      onClick={() => handleSelect(owner)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <p className="font-medium text-gray-900">
                        {owner.fullName}
                      </p>
                      {owner.email && (
                        <p className="text-sm text-gray-600">{owner.email}</p>
                      )}
                      {owner.phone && (
                        <p className="text-sm text-gray-500">{owner.phone}</p>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Manual UUID Input (Fallback) */}
      {!selectedOwner && (
        <details className="mt-2">
          <summary className="text-sm text-medical-blue cursor-pointer hover:text-medical-blue-dark">
            O ingresar UUID manualmente
          </summary>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="123e4567-e89b-12d3-a456-426614174000"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent text-sm font-mono"
          />
        </details>
      )}

      {touched && error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      <p className="mt-1 text-sm text-gray-500">
        Selecciona un propietario existente o{' '}
        <a
          href="/owners/create"
          target="_blank"
          rel="noopener noreferrer"
          className="text-medical-blue hover:text-medical-blue-dark underline"
        >
          crea uno nuevo
        </a>
      </p>

      {/* Click outside handler */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default OwnerSelector;
