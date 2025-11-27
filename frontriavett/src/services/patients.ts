import axios from 'axios';
import {
  PatientRequest,
  PatientResponse,
  GetPatientsParams,
  MergePatientRequest,
} from '../types/patient';

// Cliente específico para la API de pacientes (puerto 8081)
const PATIENTS_API_BASE_URL = process.env.REACT_APP_PATIENTS_API_BASE_URL || 'http://localhost:8081';

const patientsApiClient = axios.create({
  baseURL: PATIENTS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejo de errores
patientsApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Patients API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response from patients server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const PATIENTS_ENDPOINT = '/api/v1/patients';

class PatientService {
  /**
   * Crear un nuevo paciente
   */
  async createPatient(data: PatientRequest): Promise<PatientResponse> {
    const response = await patientsApiClient.post<PatientResponse>(PATIENTS_ENDPOINT, data);
    return response.data;
  }

  /**
   * Obtener todos los pacientes con búsqueda opcional
   */
  async getAllPatients(params?: GetPatientsParams): Promise<PatientResponse[]> {
    const response = await patientsApiClient.get<PatientResponse[]>(PATIENTS_ENDPOINT, {
      params,
    });
    return response.data;
  }

  /**
   * Obtener un paciente específico por ID
   */
  async getPatientById(id: string): Promise<PatientResponse> {
    const response = await patientsApiClient.get<PatientResponse>(
      `${PATIENTS_ENDPOINT}/${id}`
    );
    return response.data;
  }

  /**
   * Actualizar un paciente existente
   */
  async updatePatient(
    id: string,
    data: Partial<PatientRequest>
  ): Promise<PatientResponse> {
    const response = await patientsApiClient.put<PatientResponse>(
      `${PATIENTS_ENDPOINT}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Fusionar pacientes duplicados
   */
  async mergePatients(
    sourcePatientId: string,
    targetPatientId: string
  ): Promise<PatientResponse> {
    const response = await patientsApiClient.post<PatientResponse>(
      `${PATIENTS_ENDPOINT}/${sourcePatientId}/merge`,
      { targetPatientId }
    );
    return response.data;
  }
}

export default new PatientService();
