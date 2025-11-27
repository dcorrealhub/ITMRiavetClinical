package com.riavet.clinicalrecordservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecordResponse {

    private String id;
    private String patientId;
    private String veterinarianId;
    private String diagnosis;
    private String procedures;
    private String attachments;
    private LocalDateTime createdAt;
    
    // Nuevos campos para órdenes médicas
    private String medicalOrders;
    private String prescription;
    private LocalDateTime followUpDate;
    private String status;
}
