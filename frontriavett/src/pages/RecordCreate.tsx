import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useClinicalRecords } from '../hooks/useClinicalRecords';
import { useToast } from '../hooks/useToast';
import ClinicalRecordForm from '../components/forms/ClinicalRecordForm';
import { ToastContainer } from '../components/common/Toast';
import { ClinicalRecordRequest } from '../types/clinicalRecord';

const RecordCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createRecord, loading } = useClinicalRecords();
  const { toasts, removeToast, success, error: showError } = useToast();

  const handleSubmit = async (data: ClinicalRecordRequest) => {
    const result = await createRecord(data);

    if (result.success) {
      success('Registro clínico creado exitosamente');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      showError(result.error || 'Error al crear el registro');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Registro Clínico</h1>
        <p className="mt-1 text-gray-600">
          Complete el formulario para crear un nuevo registro médico veterinario
        </p>
      </div>

      <ClinicalRecordForm
        onSubmit={handleSubmit}
        isLoading={loading}
        mode="create"
      />
    </div>
  );
};

export default RecordCreate;
