/**
 * Página para crear una nueva cita
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentRequest } from '../types/appointment';
import AppointmentForm from '../components/forms/AppointmentForm';

const AppointmentCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createAppointment, isLoading } = useAppointments();

  const handleSubmit = async (data: AppointmentRequest) => {
    try {
      await createAppointment(data);
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleCancel = () => {
    navigate('/appointments');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">➕ Nueva Cita</h1>
        <p className="text-gray-600">Crea una nueva cita para un paciente</p>
      </div>

      <AppointmentForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        mode="create"
      />
    </div>
  );
};

export default AppointmentCreate;
