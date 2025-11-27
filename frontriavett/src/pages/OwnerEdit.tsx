import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOwners } from '../hooks/useOwners';
import OwnerForm from '../components/forms/OwnerForm';
import { OwnerResponse } from '../types/owner';

const OwnerEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchOwnerById, updateOwner, isLoading } = useOwners();
  const [owner, setOwner] = useState<OwnerResponse | null>(null);
  const [loadingOwner, setLoadingOwner] = useState(true);

  useEffect(() => {
    const loadOwner = async () => {
      if (id) {
        try {
          const data = await fetchOwnerById(id);
          setOwner(data);
        } catch (error) {
          console.error('Error loading owner:', error);
          navigate('/owners');
        } finally {
          setLoadingOwner(false);
        }
      }
    };

    loadOwner();
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateOwner(id, data);
      navigate('/owners');
    }
  };

  if (loadingOwner) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Cargando propietario...</p>
        </div>
      </div>
    );
  }

  if (!owner) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-red-600">Propietario no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ✏️ Editar Propietario
        </h1>
        <p className="text-gray-600">
          Actualiza la información del propietario
        </p>
      </div>

      <OwnerForm
        initialData={owner}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="edit"
      />
    </div>
  );
};

export default OwnerEdit;
