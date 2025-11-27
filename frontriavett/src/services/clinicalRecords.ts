import apiClient from './api';
import {
  ClinicalRecordRequest,
  ClinicalRecordResponse,
  GetRecordsParams,
} from '../types/clinicalRecord';

const RECORDS_ENDPOINT = '/api/v1/records';

class ClinicalRecordService {
  /**
   * Crear un nuevo registro clínico
   */
  async createRecord(data: ClinicalRecordRequest): Promise<ClinicalRecordResponse> {
    const response = await apiClient.post<ClinicalRecordResponse>(RECORDS_ENDPOINT, data);
    return response.data;
  }

  /**
   * Obtener todos los registros con filtros opcionales
   */
  async getAllRecords(params?: GetRecordsParams): Promise<ClinicalRecordResponse[]> {
    const response = await apiClient.get<ClinicalRecordResponse[]>(RECORDS_ENDPOINT, {
      params,
    });
    return response.data;
  }

  /**
   * Obtener un registro específico por ID
   */
  async getRecordById(id: string): Promise<ClinicalRecordResponse> {
    const response = await apiClient.get<ClinicalRecordResponse>(
      `${RECORDS_ENDPOINT}/${id}`
    );
    return response.data;
  }

  /**
   * Obtener todos los registros de un veterinario
   */
  async getRecordsByVeterinarian(vetId: string): Promise<ClinicalRecordResponse[]> {
    const response = await apiClient.get<ClinicalRecordResponse[]>(
      `${RECORDS_ENDPOINT}/veterinarian/${vetId}`
    );
    return response.data;
  }

  /**
   * Actualizar un registro clínico existente
   */
  async updateRecord(
    id: string,
    data: Partial<ClinicalRecordRequest>
  ): Promise<ClinicalRecordResponse> {
    const response = await apiClient.put<ClinicalRecordResponse>(
      `${RECORDS_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Eliminar un registro clínico
   */
  async deleteRecord(id: string): Promise<void> {
    await apiClient.delete(`${RECORDS_ENDPOINT}/${id}`);
  }
}

export default new ClinicalRecordService();
