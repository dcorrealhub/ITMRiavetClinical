package com.riavet.clinicalrecordservice.application.mapper;

import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordRequest;
import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordResponse;
import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ClinicalRecordMapper {

    public ClinicalRecord toEntity(ClinicalRecordRequest request) {
        if (request == null) {
            return null;
        }

        return ClinicalRecord.builder()
                .patientId(request.getPatientId())
                .veterinarianId(request.getVeterinarianId())
                .diagnosis(request.getDiagnosis())
                .procedures(request.getProcedures())
                .attachments(request.getAttachments())
                .medicalOrders(request.getMedicalOrders())
                .prescription(request.getPrescription())
                .followUpDate(request.getFollowUpDate())
                .status(request.getStatus())
                .build();
    }

    public ClinicalRecordResponse toResponse(ClinicalRecord entity) {
        if (entity == null) {
            return null;
        }

        return ClinicalRecordResponse.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .veterinarianId(entity.getVeterinarianId())
                .diagnosis(entity.getDiagnosis())
                .procedures(entity.getProcedures())
                .attachments(entity.getAttachments())
                .createdAt(entity.getCreatedAt())
                .medicalOrders(entity.getMedicalOrders())
                .prescription(entity.getPrescription())
                .followUpDate(entity.getFollowUpDate())
                .status(entity.getStatus())
                .build();
    }

    public List<ClinicalRecordResponse> toResponseList(List<ClinicalRecord> entities) {
        if (entities == null) {
            return List.of();
        }

        return entities.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
