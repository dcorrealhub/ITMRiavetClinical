package com.riavet.patientservice.application.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * DTO for patient merge operations.
 * 
 * Contains the ID of the duplicate patient to be merged.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientMergeRequest {

    @NotNull(message = "Duplicate patient ID is required")
    private UUID duplicateId;
}
