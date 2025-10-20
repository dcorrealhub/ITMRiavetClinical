package com.riavet.patientservice.application.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO for updating patient information.
 * 
 * All fields are optional for partial updates.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientUpdateRequest {

    @Size(min = 1, max = 100, message = "Patient name must be between 1 and 100 characters")
    private String name;

    @Size(max = 100, message = "Breed must be less than 100 characters")
    private String breed;

    private UUID ownerId;
}
