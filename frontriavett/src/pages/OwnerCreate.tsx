import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOwners } from '../hooks/useOwners';
import OwnerForm from '../components/forms/OwnerForm';

const OwnerCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createOwner, isLoading } = useOwners();

  const handleSubmit = async (data: any) => {
    await createOwner(data);
    navigate('/owners');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ➕ Nuevo Propietario
        </h1>
        <p className="text-gray-600">
          Registra un nuevo propietario en el sistema
        </p>
      </div>

      <OwnerForm onSubmit={handleSubmit} isLoading={isLoading} mode="create" />
    </div>
  );
};

export default OwnerCreate;
