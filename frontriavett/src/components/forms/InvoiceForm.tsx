/**
 * Formulario para crear/editar facturas
 */

import React, { useState, useEffect } from 'react';
import { InvoiceRequest, InvoiceResponse } from '../../types/invoice';
import Input from '../common/Input';
import Button from '../common/Button';
import { usePatients } from '../../hooks/usePatients';

interface InvoiceFormProps {
  initialData?: InvoiceResponse;
  onSubmit: (data: InvoiceRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'create',
}) => {
  const { patients, fetchPatients } = usePatients();
  const [formData, setFormData] = useState<InvoiceRequest>({
    patientId: initialData?.patientId || '',
    total: initialData?.total || 0,
    items: initialData?.items || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const processedValue = name === 'total' ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    // Validar campo en tiempo real
    if (touched[name]) {
      validateField(name, processedValue);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof InvoiceRequest]);
  };

  const validateField = (field: string, value: any): string => {
    let error = '';

    if (field === 'patientId' && !value) {
      error = 'El paciente es requerido';
    } else if (field === 'total') {
      if (!value || value <= 0) {
        error = 'El total debe ser mayor a 0';
      } else if (value > 999999.99) {
        error = 'El total no puede superar $999,999.99';
      }
    } else if (field === 'items') {
      if (!value || !value.trim()) {
        error = 'Los items son requeridos';
      } else if (value.length > 500) {
        error = 'Máximo 500 caracteres';
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

    if (!formData.total || formData.total <= 0) {
      newErrors.total = 'El total debe ser mayor a 0';
    } else if (formData.total > 999999.99) {
      newErrors.total = 'El total no puede superar $999,999.99';
    }

    if (!formData.items || !formData.items.trim()) {
      newErrors.items = 'Los items son requeridos';
    } else if (formData.items.length > 500) {
      newErrors.items = 'Máximo 500 caracteres';
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

    const submitData: InvoiceRequest = {
      patientId: formData.patientId,
      total: formData.total,
      items: formData.items.trim(),
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información de la Factura
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

          {/* Total */}
          <div>
            <Input
              label="Total"
              name="total"
              type="number"
              step="0.01"
              min="0"
              max="999999.99"
              value={formData.total}
              onChange={handleChange}
              onBlur={() => handleBlur('total')}
              error={touched.total ? errors.total : undefined}
              placeholder="150.50"
              required
              helperText="Monto en pesos colombianos"
            />
          </div>

          {/* Items/Servicios */}
          <div className="md:col-span-2">
            <label htmlFor="items" className="block text-sm font-medium text-gray-700 mb-1">
              Items / Servicios <span className="text-red-500">*</span>
            </label>
            <textarea
              id="items"
              name="items"
              value={formData.items}
              onChange={handleChange}
              onBlur={() => handleBlur('items')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                touched.items && errors.items ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              maxLength={500}
              placeholder="Consulta veterinaria + Vacuna antirrábica"
            />
            {touched.items && errors.items && (
              <p className="mt-1 text-sm text-red-600">{errors.items}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.items.length}/500 caracteres
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {mode === 'create' ? 'Crear Factura' : 'Actualizar Factura'}
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
