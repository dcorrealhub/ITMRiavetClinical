import { useState, useEffect, useCallback } from 'react';
import clinicalRecordService from '../services/clinicalRecords';
import {
  ClinicalRecordResponse,
  ClinicalRecordRequest,
  GetRecordsParams,
} from '../types/clinicalRecord';

export const useClinicalRecords = () => {
  const [records, setRecords] = useState<ClinicalRecordResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async (params?: GetRecordsParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await clinicalRecordService.getAllRecords(params);
      setRecords(data);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los registros');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecordById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await clinicalRecordService.getRecordById(id);
      return data;
    } catch (err: any) {
      setError(err.message || 'Error al cargar el registro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRecord = useCallback(async (data: ClinicalRecordRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newRecord = await clinicalRecordService.createRecord(data);
      setRecords((prev) => [newRecord, ...prev]);
      return { success: true, data: newRecord };
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRecord = useCallback(
    async (id: string, data: Partial<ClinicalRecordRequest>) => {
      setLoading(true);
      setError(null);
      try {
        const updatedRecord = await clinicalRecordService.updateRecord(id, data);
        setRecords((prev) =>
          prev.map((record) => (record.id === id ? updatedRecord : record))
        );
        return { success: true, data: updatedRecord };
      } catch (err: any) {
        const errorMessage = err.message || 'Error al actualizar el registro';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteRecord = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await clinicalRecordService.deleteRecord(id);
      setRecords((prev) => prev.filter((record) => record.id !== id));
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar el registro';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    records,
    loading,
    error,
    fetchRecords,
    fetchRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
  };
};
