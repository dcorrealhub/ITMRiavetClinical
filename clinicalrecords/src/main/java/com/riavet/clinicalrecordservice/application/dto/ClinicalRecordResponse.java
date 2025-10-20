package com.riavet.clinicalrecordservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecordResponse {

    private UUID id;
    private UUID patientId;
    private UUID veterinarianId;
    private String diagnosis;
    private String procedures;
    private String attachments;
    private LocalDateTime createdAt;
}
