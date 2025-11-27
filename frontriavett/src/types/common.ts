export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface FilterOptions {
  status?: string;
  patientId?: string;
  veterinarianId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}
