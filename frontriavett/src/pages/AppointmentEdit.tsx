/**
 * Página para editar una cita existente
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentRequest, AppointmentResponse } from '../types/appointment';
import AppointmentForm from '../components/forms/AppointmentForm';

const AppointmentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateAppointment, fetchAppointmentById, isLoading } = useAppointments();
  const [appointment, setAppointment] = useState<AppointmentResponse | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadAppointment = async () => {
      if (id) {
        try {
          const data = await fetchAppointmentById(id);
          setAppointment(data);
        } catch (error) {
          console.error('Error loading appointment:', error);
          navigate('/appointments');
        } finally {
          setIsLoadingData(false);
        }
      }
    };

    loadAppointment();
  }, [id]);

  const handleSubmit = async (data: AppointmentRequest) => {
    if (id) {
      try {
        await updateAppointment(id, data);
        navigate('/appointments');
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  if (isLoadingData) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-medical-blue"></div>
        <p className="mt-4 text-gray-600">Cargando cita...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600">Cita no encontrada</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">✏️ Editar Cita</h1>
        <p className="text-gray-600">Modifica la información de la cita</p>
      </div>

      <AppointmentForm
        initialData={appointment}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        mode="edit"
      />
    </div>
  );
};

export default AppointmentEdit;
