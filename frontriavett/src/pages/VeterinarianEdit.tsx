/**
 * Página para editar un veterinario existente
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVeterinarians } from '../hooks/useVeterinarians';
import { VeterinarianRequest, VeterinarianResponse } from '../types/veterinarian';
import VeterinarianForm from '../components/forms/VeterinarianForm';

const VeterinarianEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateVeterinarian, fetchVeterinarianById, isLoading } = useVeterinarians();
  const [veterinarian, setVeterinarian] = useState<VeterinarianResponse | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadVeterinarian = async () => {
      if (id) {
        try {
          const data = await fetchVeterinarianById(id);
          setVeterinarian(data);
        } catch (error) {
          console.error('Error loading veterinarian:', error);
          navigate('/veterinarians');
        } finally {
          setLoadingData(false);
        }
      }
    };

    loadVeterinarian();
  }, [id]);

  const handleSubmit = async (data: VeterinarianRequest) => {
    if (id) {
      const success = await updateVeterinarian(id, data);
      if (success) {
        navigate('/veterinarians');
      }
    }
  };

  const handleCancel = () => {
    navigate('/veterinarians');
  };

  if (loadingData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando datos del veterinario...</p>
        </div>
      </div>
    );
  }

  if (!veterinarian) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Veterinario no encontrado
          </h3>
          <button
            onClick={() => navigate('/veterinarians')}
            className="text-medical-blue hover:text-medical-blue-700"
          >
            Volver a Veterinarios
          </button>
        </div>
      </div>
    );
  }

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
          ✏️ Editar Veterinario
        </h1>
        <p className="text-gray-600">
          Actualiza la información de {veterinarian.firstName} {veterinarian.lastName}
        </p>
      </div>

      <VeterinarianForm
        initialData={veterinarian}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default VeterinarianEdit;
