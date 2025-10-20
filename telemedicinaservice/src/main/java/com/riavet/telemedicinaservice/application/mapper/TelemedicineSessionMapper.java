package com.riavet.telemedicinaservice.application.mapper;

import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionRequest;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionResponse;
import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class TelemedicineSessionMapper {

    public TelemedicineSession toEntity(TelemedicineSessionRequest request) {
        return TelemedicineSession.builder()
                .patientId(request.getPatientId())
                .veterinarianId(request.getVeterinarianId())
                .scheduledAt(request.getScheduledAt())
                .meetingUrl(request.getMeetingUrl())
                .notes(request.getNotes())
                .status(TelemedicineSession.SessionStatus.SCHEDULED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    public TelemedicineSessionResponse toResponse(TelemedicineSession entity) {
        return TelemedicineSessionResponse.builder()
                .id(entity.getId())
                .patientId(entity.getPatientId())
                .veterinarianId(entity.getVeterinarianId())
                .scheduledAt(entity.getScheduledAt())
                .startedAt(entity.getStartedAt())
                .endedAt(entity.getEndedAt())
                .status(entity.getStatus())
                .meetingUrl(entity.getMeetingUrl())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public List<TelemedicineSessionResponse> toResponseList(List<TelemedicineSession> entities) {
        return entities.stream()
                .map(this::toResponse)
                .toList();
    }
}
