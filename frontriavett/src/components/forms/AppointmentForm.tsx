/**
 * Formulario para crear/editar citas
 */

import React, { useState, useEffect } from 'react';
import { AppointmentRequest, AppointmentResponse } from '../../types/appointment';
import Input from '../common/Input';
import Button from '../common/Button';
import { usePatients } from '../../hooks/usePatients';
import { useVeterinarians } from '../../hooks/useVeterinarians';

interface AppointmentFormProps {
  initialData?: AppointmentResponse;
  onSubmit: (data: AppointmentRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  const { patients, fetchPatients } = usePatients();
  const { veterinarians, fetchVeterinarians } = useVeterinarians();
  const [veterinariansError, setVeterinariansError] = useState(false);
  const [formData, setFormData] = useState<AppointmentRequest>({
    patientId: initialData?.patientId || '',
    veterinarianId: initialData?.veterinarianId || '',
    scheduledAt: initialData?.scheduledAt
      ? new Date(initialData.scheduledAt).toISOString().slice(0, 16)
      : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPatients();
    // Intentar cargar veterinarios, pero no fallar si el backend no está listo
    fetchVeterinarians({ onlyActive: true }).catch(() => {
      setVeterinariansError(true);
      console.warn('No se pudieron cargar los veterinarios. Usando entrada manual.');
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validar campo en tiempo real
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof AppointmentRequest]);
  };

  const validateField = (field: string, value: any): string => {
    let error = '';

    if (field === 'patientId' && !value) {
      error = 'El paciente es requerido';
    } else if (field === 'veterinarianId' && !value) {
      error = 'El veterinario es requerido';
    } else if (field === 'scheduledAt') {
      if (!value) {
        error = 'La fecha y hora son requeridas';
      } else {
        const selectedDate = new Date(value);
        const now = new Date();
        if (selectedDate < now) {
          error = 'La fecha debe ser futura';
        }
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) {
      newErrors.patientId = 'El paciente es requerido';
    }

    if (!formData.veterinarianId) {
      newErrors.veterinarianId = 'El veterinario es requerido';
    }

    if (!formData.scheduledAt) {
      newErrors.scheduledAt = 'La fecha y hora son requeridas';
    } else {
      const selectedDate = new Date(formData.scheduledAt);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.scheduledAt = 'La fecha debe ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = Object.keys(formData);
    const touchedFields = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    const submitData: AppointmentRequest = {
      patientId: formData.patientId,
      veterinarianId: formData.veterinarianId,
      scheduledAt: new Date(formData.scheduledAt).toISOString(),
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información de la Cita
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Seleccionar Paciente */}
          <div className="md:col-span-2">
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
              Paciente <span className="text-red-500">*</span>
            </label>
            <select
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              onBlur={() => handleBlur('patientId')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                touched.patientId && errors.patientId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar paciente...</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} - {patient.species} ({patient.breed})
                </option>
              ))}
            </select>
            {touched.patientId && errors.patientId && (
              <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>
            )}
          </div>

          {/* Veterinario - Selector o Input manual según disponibilidad */}
          <div className="md:col-span-2">
            <label htmlFor="veterinarianId" className="block text-sm font-medium text-gray-700 mb-1">
              Veterinario <span className="text-red-500">*</span>
            </label>
            
            {!veterinariansError && veterinarians.length > 0 ? (
              // Selector si hay veterinarios disponibles
              <>
                <select
                  id="veterinarianId"
                  name="veterinarianId"
                  value={formData.veterinarianId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('veterinarianId')}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                    touched.veterinarianId && errors.veterinarianId ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar veterinario...</option>
                  {veterinarians
                    .filter((vet) => vet.active)
                    .map((vet) => (
                      <option key={vet.id} value={vet.id}>
                        {vet.firstName} {vet.lastName} - {vet.specialization || 'General'} ({vet.licenseNumber})
                      </option>
                    ))}
                </select>
                {touched.veterinarianId && errors.veterinarianId && (
                  <p className="mt-1 text-sm text-red-600">{errors.veterinarianId}</p>
                )}
              </>
            ) : (
              // Input manual si no hay veterinarios disponibles
              <>
                <Input
                  label="ID del Veterinario"
                  name="veterinarianId"
                  value={formData.veterinarianId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('veterinarianId')}
                  error={touched.veterinarianId ? errors.veterinarianId : undefined}
                  placeholder="123e4567-e89b-12d3-a456-426614174000"
                  required
                />
                {veterinariansError && (
                  <p className="mt-1 text-sm text-yellow-600">
                    ⚠️ No se pudieron cargar los veterinarios. Ingresa el UUID manualmente.
                  </p>
                )}
                {touched.veterinarianId && errors.veterinarianId && (
                  <p className="mt-1 text-sm text-red-600">{errors.veterinarianId}</p>
                )}
              </>
            )}
          </div>

          {/* Fecha y Hora */}
          <div className="md:col-span-2">
            <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y Hora <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              name="scheduledAt"
              value={formData.scheduledAt}
              onChange={handleChange}
              onBlur={() => handleBlur('scheduledAt')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                touched.scheduledAt && errors.scheduledAt ? 'border-red-500' : 'border-gray-300'
              }`}
              min={new Date().toISOString().slice(0, 16)}
            />
            {touched.scheduledAt && errors.scheduledAt && (
              <p className="mt-1 text-sm text-red-600">{errors.scheduledAt}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {mode === 'create' ? 'Crear Cita' : 'Actualizar Cita'}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
