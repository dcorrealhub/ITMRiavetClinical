import { useState, useCallback } from 'react';
import patientService from '../services/patients';
import {
  PatientResponse,
  PatientRequest,
  GetPatientsParams,
} from '../types/patient';

export const usePatients = () => {
  const [patients, setPatients] = useState<PatientResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async (params?: GetPatientsParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getAllPatients(params);
      setPatients(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los pacientes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPatientById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientService.getPatientById(id);
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cargar el paciente');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPatient = useCallback(async (data: PatientRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newPatient = await patientService.createPatient(data);
      setPatients((prev) => [newPatient, ...prev]);
      return { success: true, data: newPatient };
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear el paciente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePatient = useCallback(
    async (id: string, data: Partial<PatientRequest>) => {
      setLoading(true);
      setError(null);
      try {
        const updatedPatient = await patientService.updatePatient(id, data);
        setPatients((prev) =>
          prev.map((patient) => (patient.id === id ? updatedPatient : patient))
        );
        return { success: true, data: updatedPatient };
      } catch (err: any) {
        const errorMessage = err.message || 'Error al actualizar el paciente';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const mergePatients = useCallback(
    async (sourcePatientId: string, targetPatientId: string) => {
      setLoading(true);
      setError(null);
      try {
        await patientService.mergePatients(sourcePatientId, targetPatientId);
        // Remover el paciente origen después de fusionar
        setPatients((prev) => prev.filter((p) => p.id !== sourcePatientId));
        return { success: true };
      } catch (err: any) {
        const errorMessage = err.message || 'Error al fusionar pacientes';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    patients,
    loading,
    error,
    fetchPatients,
    fetchPatientById,
    createPatient,
    updatePatient,
    mergePatients,
  };
};
