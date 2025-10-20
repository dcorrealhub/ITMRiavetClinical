package com.riavet.patientservice.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Patient domain entity representing a veterinary patient.
 * 
 * This entity follows Domain-Driven Design principles and contains
 * the core business logic for patient management.
 */
@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "species", nullable = false, length = 50)
    private String species;

    @Column(name = "breed", length = 100)
    private String breed;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "owner_id", nullable = false)
    private UUID ownerId;

    @Column(name = "active", nullable = false)
    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    /**
     * Deactivates the patient (soft delete).
     * Used when merging duplicate patients.
     */
    public void deactivate() {
        this.active = false;
    }

    /**
     * Updates patient information from another patient.
     * Used in merge operations.
     * 
     * @param sourcePatient The patient to copy information from
     */
    public void updateFrom(Patient sourcePatient) {
        if (sourcePatient.getName() != null && !sourcePatient.getName().isEmpty()) {
            this.name = sourcePatient.getName();
        }
        if (sourcePatient.getSpecies() != null && !sourcePatient.getSpecies().isEmpty()) {
            this.species = sourcePatient.getSpecies();
        }
        if (sourcePatient.getBreed() != null && !sourcePatient.getBreed().isEmpty()) {
            this.breed = sourcePatient.getBreed();
        }
        if (sourcePatient.getBirthDate() != null) {
            this.birthDate = sourcePatient.getBirthDate();
        }
        if (sourcePatient.getOwnerId() != null) {
            this.ownerId = sourcePatient.getOwnerId();
        }
    }
}
