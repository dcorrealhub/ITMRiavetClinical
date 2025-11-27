import React, { useState } from 'react';
import { OwnerRequest, OwnerUpdateRequest } from '../../types/owner';
import Input from '../common/Input';
import Button from '../common/Button';

interface OwnerFormProps {
  initialData?: Partial<OwnerRequest>;
  onSubmit: (data: OwnerRequest | OwnerUpdateRequest) => Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const OwnerForm: React.FC<OwnerFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<OwnerRequest>({
    fullName: initialData?.fullName || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const value = formData[field as keyof OwnerRequest] as string;

    if (field === 'fullName' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'El nombre completo es requerido' }));
    } else if (field === 'fullName' && value.length > 100) {
      setErrors((prev) => ({ ...prev, [field]: 'Máximo 100 caracteres' }));
    } else if (field === 'phone' && value && value.length > 20) {
      setErrors((prev) => ({ ...prev, [field]: 'Máximo 20 caracteres' }));
    } else if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, [field]: 'Email inválido' }));
      } else if (value.length > 100) {
        setErrors((prev) => ({ ...prev, [field]: 'Máximo 100 caracteres' }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.length > 100) {
      newErrors.fullName = 'Máximo 100 caracteres';
    }

    if (formData.phone && formData.phone.length > 20) {
      newErrors.phone = 'Máximo 20 caracteres';
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email inválido';
      } else if (formData.email.length > 100) {
        newErrors.email = 'Máximo 100 caracteres';
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

    const submitData: OwnerRequest = {
      fullName: formData.fullName.trim(),
      phone: formData.phone?.trim() || undefined,
      email: formData.email?.trim() || undefined,
    };

    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información del Propietario
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nombre Completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={() => handleBlur('fullName')}
              error={touched.fullName ? errors.fullName : undefined}
              required
              placeholder="Juan Pérez García"
              maxLength={100}
            />
          </div>

          <Input
            label="Teléfono"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            error={touched.phone ? errors.phone : undefined}
            placeholder="+57 300 1234567"
            maxLength={20}
            helperText="Opcional"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : undefined}
            placeholder="juan.perez@email.com"
            maxLength={100}
            helperText="Opcional"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {mode === 'create' ? 'Crear Propietario' : 'Actualizar Propietario'}
        </Button>
      </div>
    </form>
  );
};

export default OwnerForm;
