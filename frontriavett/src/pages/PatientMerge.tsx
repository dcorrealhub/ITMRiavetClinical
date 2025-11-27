import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/common/Toast';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { PatientResponse } from '../types/patient';
import ConfirmDialog from '../components/common/ConfirmDialog';

const PatientMerge: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { patients, fetchPatients, mergePatients, loading } = usePatients();
  const { toasts, removeToast, success, error: showError } = useToast();

  const [sourcePatient, setSourcePatient] = useState<PatientResponse | null>(
    location.state?.patient || null
  );
  const [targetPatientId, setTargetPatientId] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchPatients();
    
    if (!sourcePatient && id) {
      const allPatients = patients;
      const found = allPatients.find((p) => p.id === id);
      if (found) {
        setSourcePatient(found);
      } else {
        showError('Paciente no encontrado');
        navigate('/patients');
      }
    }
    
    setLoadingPage(false);
  };

  const handleMerge = async () => {
    if (!sourcePatient || !targetPatientId) return;

    const result = await mergePatients(sourcePatient.id, targetPatientId);

    if (result.success) {
      success('Pacientes fusionados exitosamente');
      setTimeout(() => {
        navigate('/patients');
      }, 1500);
    } else {
      showError(result.error || 'Error al fusionar pacientes');
    }
    
    setShowConfirm(false);
  };

  const targetPatient = patients.find((p) => p.id === targetPatientId);
  const availablePatients = patients.filter((p) => p.id !== sourcePatient?.id);

  if (loadingPage) {
    return <Loading />;
  }

  if (!sourcePatient) {
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
        <h1 className="text-3xl font-bold text-gray-900">Fusionar Pacientes</h1>
        <p className="mt-1 text-gray-600">
          Fusiona registros duplicados de pacientes
        </p>
      </div>

      {/* Información de Advertencia */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Esta acción es irreversible
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Al fusionar, el paciente origen será eliminado y todos sus
                registros asociados serán transferidos al paciente destino.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Paciente Origen */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Paciente Origen (se eliminará)
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-2xl">
                  {sourcePatient.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  {sourcePatient.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {sourcePatient.species} - {sourcePatient.breed}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t space-y-2">
              <p className="text-sm">
                <span className="text-gray-600">ID:</span>{' '}
                <span className="font-mono text-xs">{sourcePatient.id}</span>
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Nacimiento:</span>{' '}
                {new Date(sourcePatient.birthDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-gray-600">Dueño:</span>{' '}
                <span className="font-mono text-xs">{sourcePatient.ownerId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Paciente Destino */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Paciente Destino (conservará)
          </h3>
          
          {!targetPatientId ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Selecciona el paciente que conservará todos los registros:
              </p>
              <select
                value={targetPatientId}
                onChange={(e) => setTargetPatientId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              >
                <option value="">Seleccionar paciente...</option>
                {availablePatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.species} ({patient.breed})
                  </option>
                ))}
              </select>
            </div>
          ) : targetPatient ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-2xl">
                    {targetPatient.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {targetPatient.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {targetPatient.species} - {targetPatient.breed}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">ID:</span>{' '}
                  <span className="font-mono text-xs">{targetPatient.id}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Nacimiento:</span>{' '}
                  {new Date(targetPatient.birthDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Dueño:</span>{' '}
                  <span className="font-mono text-xs">{targetPatient.ownerId}</span>
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => setTargetPatientId('')}
                className="w-full mt-4"
              >
                Cambiar Selección
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          variant="secondary"
          onClick={() => navigate('/patients')}
        >
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={() => setShowConfirm(true)}
          disabled={!targetPatientId}
          isLoading={loading}
        >
          Fusionar Pacientes
        </Button>
      </div>

      {/* Diálogo de Confirmación */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleMerge}
        title="Confirmar Fusión"
        message={`¿Estás seguro de que deseas fusionar "${sourcePatient.name}" con "${targetPatient?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Sí, Fusionar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default PatientMerge;
