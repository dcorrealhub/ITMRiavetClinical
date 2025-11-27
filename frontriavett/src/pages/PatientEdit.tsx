import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { useToast } from '../hooks/useToast';
import PatientForm from '../components/forms/PatientForm';
import { ToastContainer } from '../components/common/Toast';
import Loading from '../components/common/Loading';
import { PatientRequest, PatientResponse } from '../types/patient';

const PatientEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { updatePatient, fetchPatientById, loading } = usePatients();
  const { toasts, removeToast, success, error: showError } = useToast();

  const [patient, setPatient] = useState<PatientResponse | null>(
    location.state?.patient || null
  );
  const [loadingPatient, setLoadingPatient] = useState(!patient);

  useEffect(() => {
    if (!patient && id) {
      loadPatient();
    }
  }, [id]);

  const loadPatient = async () => {
    if (!id) return;
    
    setLoadingPatient(true);
    const data = await fetchPatientById(id);
    if (data) {
      setPatient(data);
    } else {
      showError('No se pudo cargar el paciente');
      navigate('/patients');
    }
    setLoadingPatient(false);
  };

  const handleSubmit = async (data: PatientRequest) => {
    if (!id) return;

    const result = await updatePatient(id, data);

    if (result.success) {
      success('Paciente actualizado exitosamente');
      setTimeout(() => {
        navigate('/patients');
      }, 1500);
    } else {
      showError(result.error || 'Error al actualizar el paciente');
    }
  };

  if (loadingPatient) {
    return <Loading />;
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Paciente no encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Editar Paciente</h1>
        <p className="mt-1 text-gray-600">
          Actualiza la información del paciente: <strong>{patient.name}</strong>
        </p>
      </div>

      <PatientForm
        initialData={patient}
        onSubmit={handleSubmit}
        isLoading={loading}
        mode="edit"
      />
    </div>
  );
};

export default PatientEdit;
