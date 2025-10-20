-- Initial database setup for Patient Service
-- This script will be executed when PostgreSQL container starts

-- Create additional indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_patients_active ON patients(active);
CREATE INDEX IF NOT EXISTS idx_patients_owner_id ON patients(owner_id);
CREATE INDEX IF NOT EXISTS idx_patients_species ON patients(species);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);

-- Sample data for testing (optional)
-- Uncomment the following lines if you want sample data

/*
INSERT INTO patients (id, name, species, breed, birth_date, owner_id, active, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'Buddy', 'Dog', 'Golden Retriever', '2020-05-15', gen_random_uuid(), true, NOW(), NOW()),
  (gen_random_uuid(), 'Whiskers', 'Cat', 'Siamese', '2021-03-10', gen_random_uuid(), true, NOW(), NOW()),
  (gen_random_uuid(), 'Charlie', 'Dog', 'Labrador', '2019-08-22', gen_random_uuid(), true, NOW(), NOW()),
  (gen_random_uuid(), 'Mittens', 'Cat', 'Persian', '2022-01-05', gen_random_uuid(), true, NOW(), NOW());
*/
