import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { useToast } from '../hooks/useToast';
import PatientForm from '../components/forms/PatientForm';
import { ToastContainer } from '../components/common/Toast';
import { PatientRequest } from '../types/patient';

const PatientCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createPatient, loading } = usePatients();
  const { toasts, removeToast, success, error: showError } = useToast();

  const handleSubmit = async (data: PatientRequest) => {
    const result = await createPatient(data);

    if (result.success) {
      success('Paciente creado exitosamente');
      setTimeout(() => {
        navigate('/patients');
      }, 1500);
    } else {
      showError(result.error || 'Error al crear el paciente');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Paciente</h1>
        <p className="mt-1 text-gray-600">
          Complete el formulario para registrar un nuevo paciente
        </p>
      </div>

      <PatientForm
        onSubmit={handleSubmit}
        isLoading={loading}
        mode="create"
      />
    </div>
  );
};

export default PatientCreate;
