import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';
import { useToast } from '../hooks/useToast';
import { PatientResponse } from '../types/patient';
import PatientTable from '../components/PatientTable';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { ToastContainer } from '../components/common/Toast';
import Loading from '../components/common/Loading';

const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    patients,
    loading,
    error,
    fetchPatients,
  } = usePatients();
  const { toasts, removeToast, success, error: showError } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientResponse | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async (search?: string) => {
    await fetchPatients(search ? { search } : undefined);
  };

  const handleSearch = () => {
    loadPatients(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    loadPatients();
  };

  const handleView = (patient: PatientResponse) => {
    setSelectedPatient(patient);
    setShowDetailModal(true);
  };

  const handleEdit = (patient: PatientResponse) => {
    navigate(`/patients/edit/${patient.id}`, { state: { patient } });
  };

  const handleMerge = (patient: PatientResponse) => {
    navigate(`/patients/merge/${patient.id}`, { state: { patient } });
  };

  const calculateAge = (birthDate: string): string => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (years === 0) {
      return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    }
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  };

  // Estadísticas
  const stats = {
    total: patients.length,
    dogs: patients.filter((p) => p.species === 'Dog').length,
    cats: patients.filter((p) => p.species === 'Cat').length,
    others: patients.filter((p) => !['Dog', 'Cat'].includes(p.species)).length,
  };

  if (loading && patients.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="mt-1 text-gray-600">
            Gestiona la información de los pacientes de la clínica
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/patients/new')}
        >
          ➕ Nuevo Paciente
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pacientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="text-4xl">🐾</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perros</p>
              <p className="text-2xl font-bold text-gray-900">{stats.dogs}</p>
            </div>
            <div className="text-4xl">🐕</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Gatos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.cats}</p>
            </div>
            <div className="text-4xl">🐈</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Otros</p>
              <p className="text-2xl font-bold text-gray-900">{stats.others}</p>
            </div>
            <div className="text-4xl">🦜</div>
          </div>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              label=""
              placeholder="Buscar por nombre, especie o raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button variant="primary" onClick={handleSearch}>
            🔍 Buscar
          </Button>
          {searchTerm && (
            <Button variant="secondary" onClick={handleClearSearch}>
              Limpiar
            </Button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Tabla */}
      <PatientTable
        patients={patients}
        onView={handleView}
        onEdit={handleEdit}
        onMerge={handleMerge}
      />

      {/* Modal de Detalles */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Detalles del Paciente"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16 bg-medical-blue-light rounded-full flex items-center justify-center">
                <span className="text-medical-blue font-bold text-2xl">
                  {selectedPatient.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedPatient.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedPatient.species} - {selectedPatient.breed}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">ID</p>
                <p className="font-medium text-gray-900 break-all">
                  {selectedPatient.id}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Edad</p>
                <p className="font-medium text-gray-900">
                  {calculateAge(selectedPatient.birthDate)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Nacimiento</p>
                <p className="font-medium text-gray-900">
                  {new Date(selectedPatient.birthDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ID del Dueño</p>
                <p className="font-medium text-gray-900 break-all">
                  {selectedPatient.ownerId}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Fecha de Registro</p>
                <p className="font-medium text-gray-900">
                  {new Date(selectedPatient.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button
                variant="secondary"
                onClick={() => setShowDetailModal(false)}
              >
                Cerrar
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedPatient);
                }}
              >
                Editar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientsPage;
