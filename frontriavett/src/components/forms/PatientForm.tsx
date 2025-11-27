import React, { useState } from 'react';
import { PatientRequest } from '../../types/patient';
import Input from '../common/Input';
import Button from '../common/Button';
import OwnerSelector from '../common/OwnerSelector';
import { validationRules, getErrorMessage } from '../../utils/validation';
import { dateInputToISO, isoToDateInput } from '../../utils/dateHelpers';
import { generateUUID } from '../../utils/uuid';

interface PatientFormProps {
  initialData?: Partial<PatientRequest>;
  onSubmit: (data: PatientRequest) => Promise<void>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const PatientForm: React.FC<PatientFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<PatientRequest>({
    name: initialData?.name || '',
    species: initialData?.species || '',
    breed: initialData?.breed || '',
    birthDate: initialData?.birthDate || '',
    ownerId: initialData?.ownerId || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    const value = formData[field as keyof PatientRequest] as string;
    
    // Validaciones específicas
    if (field === 'name' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'El nombre es requerido' }));
    } else if (field === 'species' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'La especie es requerida' }));
    } else if (field === 'breed' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'La raza es requerida' }));
    } else if (field === 'birthDate' && !value) {
      setErrors((prev) => ({ ...prev, [field]: 'La fecha de nacimiento es requerida' }));
    } else if (field === 'birthDate' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      if (birthDate > today) {
        setErrors((prev) => ({ ...prev, [field]: 'La fecha de nacimiento no puede ser futura' }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } else if (field === 'ownerId' && !value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: 'El ID del dueño es requerido' }));
    } else if (field === 'ownerId' && value.trim()) {
      // Validar formato UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(value.trim())) {
        setErrors((prev) => ({ 
          ...prev, 
          [field]: 'Formato UUID inválido. Debe ser: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' 
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.species.trim()) {
      newErrors.species = 'La especie es requerida';
    }
    if (!formData.breed.trim()) {
      newErrors.breed = 'La raza es requerida';
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthDate = 'La fecha de nacimiento no puede ser futura';
      }
    }
    if (!formData.ownerId.trim()) {
      newErrors.ownerId = 'El ID del dueño es requerido';
    } else {
      // Validar formato UUID
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(formData.ownerId.trim())) {
        newErrors.ownerId = 'Formato UUID inválido. Debe ser: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
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

    const submitData: PatientRequest = {
      name: formData.name.trim(),
      species: formData.species.trim(),
      breed: formData.breed.trim(),
      birthDate: dateInputToISO(formData.birthDate),
      ownerId: formData.ownerId.trim(),
    };

    await onSubmit(submitData);
  };

  const handleGenerateUUID = () => {
    const newUUID = generateUUID();
    setFormData((prev) => ({ ...prev, ownerId: newUUID }));
    setErrors((prev) => ({ ...prev, ownerId: '' }));
  };

  // Especies comunes
  const speciesOptions = [
    { value: '', label: 'Seleccionar especie...' },
    { value: 'Dog', label: 'Perro' },
    { value: 'Cat', label: 'Gato' },
    { value: 'Bird', label: 'Ave' },
    { value: 'Rabbit', label: 'Conejo' },
    { value: 'Hamster', label: 'Hámster' },
    { value: 'Guinea Pig', label: 'Cobayo' },
    { value: 'Reptile', label: 'Reptil' },
    { value: 'Other', label: 'Otro' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Información del Paciente
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre del Paciente"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            error={touched.name ? errors.name : undefined}
            required
            placeholder="Ej: Buddy, Max, Luna"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especie <span className="text-red-500">*</span>
            </label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              onBlur={() => handleBlur('species')}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent ${
                touched.species && errors.species
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              required
            >
              {speciesOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {touched.species && errors.species && (
              <p className="mt-1 text-sm text-red-600">{errors.species}</p>
            )}
          </div>

          <Input
            label="Raza"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            onBlur={() => handleBlur('breed')}
            error={touched.breed ? errors.breed : undefined}
            required
            placeholder="Ej: Golden Retriever, Siamés"
          />

          <Input
            label="Fecha de Nacimiento"
            name="birthDate"
            type="date"
            value={formData.birthDate ? isoToDateInput(formData.birthDate) : ''}
            onChange={handleChange}
            onBlur={() => handleBlur('birthDate')}
            error={touched.birthDate ? errors.birthDate : undefined}
            required
            max={new Date().toISOString().split('T')[0]}
          />

          <OwnerSelector
            value={formData.ownerId}
            onChange={(ownerId) => {
              setFormData((prev) => ({ ...prev, ownerId }));
              if (errors.ownerId) {
                setErrors((prev) => ({ ...prev, ownerId: '' }));
              }
            }}
            error={errors.ownerId}
            touched={touched.ownerId}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {mode === 'create' ? 'Crear Paciente' : 'Actualizar Paciente'}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
