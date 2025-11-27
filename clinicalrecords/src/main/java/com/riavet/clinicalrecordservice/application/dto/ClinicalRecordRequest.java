package com.riavet.clinicalrecordservice.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecordRequest {

    @NotNull(message = "Patient ID is required")
    private String patientId;

    @NotNull(message = "Veterinarian ID is required")
    private String veterinarianId;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    private String procedures;

    private String attachments;

    // Nuevos campos para órdenes médicas
    private String medicalOrders;

    private String prescription;

    private LocalDateTime followUpDate;

    @Builder.Default
    private String status = "ACTIVE";
}
