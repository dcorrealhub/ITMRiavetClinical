export interface PatientRequest {
  name: string;
  species: string;
  breed: string;
  birthDate: string; // ISO date string
  ownerId: string;
}

export interface PatientResponse {
  id: string;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  ownerId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetPatientsParams {
  search?: string;
}

export interface MergePatientRequest {
  targetPatientId: string;
}
