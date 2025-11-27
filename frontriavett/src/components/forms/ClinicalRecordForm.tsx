import React, { useState } from 'react';
import { ClinicalRecordRequest, RecordStatus } from '../../types/clinicalRecord';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import { validationRules, getErrorMessage } from '../../utils/validation';
import { dateInputToISO, isoToDateInput } from '../../utils/dateHelpers';

interface ClinicalRecordFormProps {
  initialData?: Partial<ClinicalRecordRequest>;
  onSubmit: (data: ClinicalRecordRequest) => Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const ClinicalRecordForm: React.FC<ClinicalRecordFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<ClinicalRecordRequest>({
    patientId: initialData?.patientId || '',
    veterinarianId: initialData?.veterinarianId || '',
    diagnosis: initialData?.diagnosis || '',
    procedures: initialData?.procedures || '',
    attachments: initialData?.attachments || '',
    medicalOrders: initialData?.medicalOrders || '',
    prescription: initialData?.prescription || '',
    followUpDate: initialData?.followUpDate || '',
    status: initialData?.status || 'PENDING',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const value = formData[field as keyof ClinicalRecordRequest] as string;
    const rules = validationRules[field as keyof typeof validationRules];

    if (rules) {
      const error = getErrorMessage(field, value, rules);
      if (error) {
        setErrors((prev) => ({ ...prev, [field]: error }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validar campos requeridos
    Object.keys(validationRules).forEach((field) => {
      const value = formData[field as keyof ClinicalRecordRequest] as string;
      const rules = validationRules[field as keyof typeof validationRules];
      const error = getErrorMessage(field, value, rules);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Validar fecha de seguimiento si existe
    if (formData.followUpDate) {
      const followUpDate = new Date(formData.followUpDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (followUpDate < today) {
        newErrors.followUpDate = 'La fecha de seguimiento debe ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Marcar todos los campos como tocados
    const allFields = Object.keys(formData);
    const touchedFields = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    // Preparar datos para envío - remover campos vacíos
    const submitData: ClinicalRecordRequest = {
      patientId: formData.patientId,
      veterinarianId: formData.veterinarianId,
      diagnosis: formData.diagnosis,
      status: formData.status,
    };

    // Agregar campos opcionales solo si tienen valor
    if (formData.procedures && formData.procedures.trim()) {
      submitData.procedures = formData.procedures.trim();
    }
    if (formData.medicalOrders && formData.medicalOrders.trim()) {
      submitData.medicalOrders = formData.medicalOrders.trim();
    }
    if (formData.prescription && formData.prescription.trim()) {
      submitData.prescription = formData.prescription.trim();
    }
    if (formData.attachments && formData.attachments.trim()) {
      submitData.attachments = formData.attachments.trim();
    }
    if (formData.followUpDate && formData.followUpDate.trim()) {
      submitData.followUpDate = dateInputToISO(formData.followUpDate);
    }

    await onSubmit(submitData);
  };

  const statusOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'ACTIVE', label: 'Activo' },
    { value: 'COMPLETED', label: 'Completado' },
    { value: 'CANCELLED', label: 'Cancelado' },
  ];

  // Lista de veterinarios de ejemplo (en producción esto vendría de una API)
  const veterinarianOptions = [
    { value: 'VET001', label: 'Dr. Juan Pérez' },
    { value: 'VET002', label: 'Dra. María González' },
    { value: 'VET003', label: 'Dr. Carlos Rodríguez' },
    { value: 'VET004', label: 'Dra. Ana Martínez' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="ID del Paciente"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            onBlur={() => handleBlur('patientId')}
            error={touched.patientId ? errors.patientId : undefined}
            required
            placeholder="Ej: PAT001"
          />

          <Select
            label="Veterinario"
            name="veterinarianId"
            value={formData.veterinarianId}
            onChange={handleChange}
            onBlur={() => handleBlur('veterinarianId')}
            error={touched.veterinarianId ? errors.veterinarianId : undefined}
            options={veterinarianOptions}
            required
          />
        </div>

        <Textarea
          label="Diagnóstico"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          onBlur={() => handleBlur('diagnosis')}
          error={touched.diagnosis ? errors.diagnosis : undefined}
          required
          placeholder="Describa el diagnóstico del paciente (mínimo 10 caracteres)"
          rows={4}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles Clínicos</h3>

        <Textarea
          label="Procedimientos"
          name="procedures"
          value={formData.procedures}
          onChange={handleChange}
          placeholder="Describa los procedimientos realizados"
          rows={3}
        />

        <Textarea
          label="Órdenes Médicas"
          name="medicalOrders"
          value={formData.medicalOrders}
          onChange={handleChange}
          placeholder="Especifique las órdenes médicas detalladas"
          rows={4}
        />

        <Textarea
          label="Prescripción"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          placeholder="Medicamentos, dosis, frecuencia y duración del tratamiento"
          rows={4}
        />

        <Input
          label="Archivos Adjuntos"
          name="attachments"
          value={formData.attachments}
          onChange={handleChange}
          placeholder="URLs o nombres de archivos adjuntos"
          helperText="Separe múltiples archivos con comas"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguimiento y Estado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fecha de Seguimiento"
            name="followUpDate"
            type="date"
            value={formData.followUpDate ? isoToDateInput(formData.followUpDate) : ''}
            onChange={handleChange}
            error={errors.followUpDate}
            min={new Date().toISOString().split('T')[0]}
            helperText="Fecha futura para el próximo seguimiento"
          />

          <Select
            label="Estado"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {mode === 'create' ? 'Crear Registro' : 'Actualizar Registro'}
        </Button>
      </div>
    </form>
  );
};

export default ClinicalRecordForm;
