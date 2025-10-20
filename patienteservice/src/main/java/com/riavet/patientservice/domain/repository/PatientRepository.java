package com.riavet.patientservice.domain.repository;

import com.riavet.patientservice.domain.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for Patient entity operations.
 * 
 * This interface follows the Repository pattern from DDD and
 * provides data access operations for Patient entities.
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, UUID> {

    /**
     * Finds all active patients.
     * 
     * @return List of active patients
     */
    List<Patient> findByActiveTrue();

    /**
     * Finds an active patient by ID.
     * 
     * @param id Patient ID
     * @return Optional containing the patient if found and active
     */
    Optional<Patient> findByIdAndActiveTrue(UUID id);

    /**
     * Searches patients by name or species (case-insensitive).
     * Only returns active patients.
     * 
     * @param searchTerm The search term to match against name or species
     * @return List of matching active patients
     */
    @Query("SELECT p FROM Patient p WHERE p.active = true AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.species) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Patient> findByNameOrSpeciesContainingIgnoreCaseAndActiveTrue(@Param("searchTerm") String searchTerm);

    /**
     * Finds all active patients by owner ID.
     * 
     * @param ownerId The owner ID
     * @return List of active patients for the owner
     */
    List<Patient> findByOwnerIdAndActiveTrue(UUID ownerId);
}
