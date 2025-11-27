export type RecordStatus = 'ACTIVE' | 'COMPLETED' | 'PENDING' | 'CANCELLED';

export interface ClinicalRecordRequest {
  patientId: string;
  veterinarianId: string;
  diagnosis: string;
  procedures?: string;
  attachments?: string;
  medicalOrders?: string;
  prescription?: string;
  followUpDate?: string;
  status?: RecordStatus;
}

export interface ClinicalRecordResponse {
  id: string;
  patientId: string;
  veterinarianId: string;
  diagnosis: string;
  procedures?: string;
  attachments?: string;
  medicalOrders?: string;
  prescription?: string;
  followUpDate?: string;
  status: RecordStatus;
  createdAt: string;
}

export interface GetRecordsParams {
  patientId?: string;
  status?: string;
}
