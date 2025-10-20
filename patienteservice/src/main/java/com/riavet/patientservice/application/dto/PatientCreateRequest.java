package com.riavet.patientservice.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for creating a new patient.
 * 
 * Contains validation rules according to business requirements.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientCreateRequest {

    @NotBlank(message = "Patient name is required")
    @Size(min = 1, max = 100, message = "Patient name must be between 1 and 100 characters")
    private String name;

    @NotBlank(message = "Species is required")
    @Size(min = 1, max = 50, message = "Species must be between 1 and 50 characters")
    private String species;

    @Size(max = 100, message = "Breed must be less than 100 characters")
    private String breed;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotNull(message = "Owner ID is required")
    private UUID ownerId;
}
