package com.riavet.clinicalrecordservice.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecordRequest {

    @NotNull(message = "Patient ID is required")
    private UUID patientId;

    @NotNull(message = "Veterinarian ID is required")
    private UUID veterinarianId;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    private String procedures;

    private String attachments;
}
