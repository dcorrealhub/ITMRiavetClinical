-- Script para crear las tablas patients y owners e insertar datos de prueba
-- Base de datos: postgres
-- Ejecutar este script después de conectarse a PostgreSQL

-- Habilitar la extensión para generar UUIDs (si no está habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla owners
CREATE TABLE IF NOT EXISTS owners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    address VARCHAR(200),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para owners
CREATE INDEX IF NOT EXISTS idx_owners_active ON owners(active);
CREATE INDEX IF NOT EXISTS idx_owners_email ON owners(email);
CREATE INDEX IF NOT EXISTS idx_owners_name ON owners(full_name);

-- Crear la tabla patients
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100),
    birth_date DATE,
    owner_id UUID NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_patients_active ON patients(active);
CREATE INDEX IF NOT EXISTS idx_patients_owner_id ON patients(owner_id);
CREATE INDEX IF NOT EXISTS idx_patients_species ON patients(species);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);

-- Crear un trigger para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patients_updated_at 
    BEFORE UPDATE ON patients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Crear trigger para owners
CREATE TRIGGER update_owners_updated_at 
    BEFORE UPDATE ON owners 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de prueba para owners
INSERT INTO owners (full_name, phone, email, address, active) VALUES
    ('Juan Pérez', '+57 300 1234567', 'juan.perez@email.com', 'Calle 123 #45-67', true),
    ('María García', '+57 301 2345678', 'maria.garcia@email.com', 'Carrera 45 #12-34', true),
    ('Carlos Rodríguez', '+57 302 3456789', 'carlos.rodriguez@email.com', 'Avenida 67 #89-12', true),
    ('Ana Martínez', '+57 303 4567890', 'ana.martinez@email.com', 'Calle 89 #34-56', true),
    ('Luis Fernández', '+57 304 5678901', 'luis.fernandez@email.com', 'Carrera 12 #78-90', true);

-- Insertar datos de prueba para patients (usando IDs de owners)
DO $$
DECLARE
    owner1_id UUID;
    owner2_id UUID;
    owner3_id UUID;
    owner4_id UUID;
    owner5_id UUID;
BEGIN
    -- Obtener los IDs de los owners
    SELECT id INTO owner1_id FROM owners WHERE email = 'juan.perez@email.com';
    SELECT id INTO owner2_id FROM owners WHERE email = 'maria.garcia@email.com';
    SELECT id INTO owner3_id FROM owners WHERE email = 'carlos.rodriguez@email.com';
    SELECT id INTO owner4_id FROM owners WHERE email = 'ana.martinez@email.com';
    SELECT id INTO owner5_id FROM owners WHERE email = 'luis.fernandez@email.com';

    -- Insertar patients
    INSERT INTO patients (name, species, breed, birth_date, owner_id, active) VALUES
        ('Buddy', 'Dog', 'Golden Retriever', '2020-05-15', owner1_id, true),
        ('Whiskers', 'Cat', 'Siamese', '2021-03-10', owner1_id, true),
        ('Charlie', 'Dog', 'Labrador', '2019-08-22', owner2_id, true),
        ('Mittens', 'Cat', 'Persian', '2022-01-05', owner2_id, true),
        ('Max', 'Dog', 'German Shepherd', '2018-12-03', owner3_id, true),
        ('Luna', 'Cat', 'Maine Coon', '2021-07-20', owner3_id, true),
        ('Rocky', 'Dog', 'Bulldog', '2020-11-30', owner4_id, true),
        ('Bella', 'Cat', 'British Shorthair', '2022-04-12', owner4_id, true),
        ('Duke', 'Dog', 'Husky', '2019-06-18', owner5_id, true),
        ('Shadow', 'Cat', 'Russian Blue', '2021-09-25', owner5_id, true),
        ('Rex', 'Dog', 'Rottweiler', '2020-02-14', owner1_id, false),
        ('Fluffy', 'Cat', 'Ragdoll', '2022-08-07', owner2_id, true);
END $$;

-- Insertar datos de prueba (método alternativo si el anterior falla)
-- Descomenta estas líneas si necesitas usar IDs aleatorios
/*
INSERT INTO patients (name, species, breed, birth_date, owner_id, active) VALUES
    ('Buddy', 'Dog', 'Golden Retriever', '2020-05-15', uuid_generate_v4(), true),
    ('Whiskers', 'Cat', 'Siamese', '2021-03-10', uuid_generate_v4(), true),
    ('Charlie', 'Dog', 'Labrador', '2019-08-22', uuid_generate_v4(), true),
    ('Mittens', 'Cat', 'Persian', '2022-01-05', uuid_generate_v4(), true),
    ('Max', 'Dog', 'German Shepherd', '2018-12-03', uuid_generate_v4(), true),
    ('Luna', 'Cat', 'Maine Coon', '2021-07-20', uuid_generate_v4(), true),
    ('Rocky', 'Dog', 'Bulldog', '2020-11-30', uuid_generate_v4(), true),
    ('Bella', 'Cat', 'British Shorthair', '2022-04-12', uuid_generate_v4(), true),
    ('Duke', 'Dog', 'Husky', '2019-06-18', uuid_generate_v4(), true),
    ('Shadow', 'Cat', 'Russian Blue', '2021-09-25', uuid_generate_v4(), true),
    ('Rex', 'Dog', 'Rottweiler', '2020-02-14', uuid_generate_v4(), false),
    ('Fluffy', 'Cat', 'Ragdoll', '2022-08-07', uuid_generate_v4(), true);
*/

-- Verificar owners insertados
SELECT 
    id,
    full_name,
    email,
    phone,
    address,
    active,
    created_at,
    updated_at
FROM owners
ORDER BY full_name;

-- Verificar que los datos de patients se insertaron correctamente
SELECT 
    id,
    name,
    species,
    breed,
    birth_date,
    owner_id,
    active,
    created_at,
    updated_at
FROM patients
ORDER BY name;

-- Mostrar estadísticas de la tabla
SELECT 
    COUNT(*) as total_patients,
    COUNT(*) FILTER (WHERE active = true) as active_patients,
    COUNT(*) FILTER (WHERE active = false) as inactive_patients,
    COUNT(*) FILTER (WHERE species = 'Dog') as dogs,
    COUNT(*) FILTER (WHERE species = 'Cat') as cats
FROM patients;

-- Mostrar estadísticas de owners
SELECT 
    COUNT(*) as total_owners,
    COUNT(*) FILTER (WHERE active = true) as active_owners,
    COUNT(*) FILTER (WHERE active = false) as inactive_owners
FROM owners;

-- Mostrar relación owners-patients
SELECT 
    o.full_name as owner_name,
    o.email as owner_email,
    COUNT(p.id) as number_of_pets,
    STRING_AGG(p.name, ', ') as pet_names
FROM owners o
LEFT JOIN patients p ON o.id = p.owner_id AND p.active = true
WHERE o.active = true
GROUP BY o.id, o.full_name, o.email
ORDER BY number_of_pets DESC, o.full_name;

-- Comentarios sobre la estructura:
-- 
-- Tabla Owners:
-- - id: UUID (Primary Key, auto-generado)
-- - full_name: Nombre completo del propietario (obligatorio, máximo 100 caracteres)
-- - phone: Teléfono (opcional, máximo 20 caracteres)
-- - email: Email (opcional, único, máximo 100 caracteres)
-- - address: Dirección (opcional, máximo 200 caracteres)
-- - active: Estado activo del propietario (por defecto true)
-- - created_at: Fecha de creación (auto-generado)
-- - updated_at: Fecha de última actualización (auto-actualizado)
--
-- Tabla Patients:
-- - id: UUID (Primary Key, auto-generado)
-- - name: Nombre del paciente (obligatorio, máximo 100 caracteres)
-- - species: Especie del animal (obligatorio, máximo 50 caracteres)
-- - breed: Raza del animal (opcional, máximo 100 caracteres)
-- - birth_date: Fecha de nacimiento (opcional)
-- - owner_id: ID del propietario (obligatorio, UUID)
-- - active: Estado activo del paciente (por defecto true)
-- - created_at: Fecha de creación (auto-generado)
-- - updated_at: Fecha de última actualización (auto-actualizado)
--
-- Índices creados:
-- - idx_patients_active: Para búsquedas por estado activo
-- - idx_patients_owner_id: Para búsquedas por propietario
-- - idx_patients_species: Para búsquedas por especie
-- - idx_patients_name: Para búsquedas por nombre
--
-- Trigger:
-- - update_patients_updated_at: Actualiza automáticamente el campo updated_at
