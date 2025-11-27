/**
 * Página para crear un nuevo veterinario
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVeterinarians } from '../hooks/useVeterinarians';
import { VeterinarianRequest } from '../types/veterinarian';
import VeterinarianForm from '../components/forms/VeterinarianForm';

const VeterinarianCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createVeterinarian, isLoading } = useVeterinarians();

  const handleSubmit = async (data: VeterinarianRequest) => {
    const success = await createVeterinarian(data);
    if (success) {
      navigate('/veterinarians');
    }
  };

  const handleCancel = () => {
    navigate('/veterinarians');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/veterinarians')}
          className="text-medical-blue hover:text-medical-blue-700 flex items-center mb-4"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Veterinarios
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ➕ Nuevo Veterinario
        </h1>
        <p className="text-gray-600">
          Agrega un nuevo veterinario al equipo de la clínica
        </p>
      </div>

      <VeterinarianForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default VeterinarianCreate;
