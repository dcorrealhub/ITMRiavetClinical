package com.riavet.telemedicinaservice.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;
import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Response de una sesión de telemedicina")
public class TelemedicineSessionResponse {

    @JsonProperty("id")
    @Schema(description = "ID único de la sesión", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID id;

    @JsonProperty("patientId")
    @Schema(description = "ID del paciente", example = "123e4567-e89b-12d3-a456-426614174001")
    private UUID patientId;

    @JsonProperty("veterinarianId")
    @Schema(description = "ID del veterinario", example = "123e4567-e89b-12d3-a456-426614174002")
    private UUID veterinarianId;

    @JsonProperty("scheduledAt")
    @Schema(description = "Fecha y hora programada", example = "2024-12-25T10:00:00")
    private LocalDateTime scheduledAt;

    @JsonProperty("startedAt")
    @Schema(description = "Fecha y hora de inicio", example = "2024-12-25T10:05:00")
    private LocalDateTime startedAt;

    @JsonProperty("endedAt")
    @Schema(description = "Fecha y hora de finalización", example = "2024-12-25T10:35:00")
    private LocalDateTime endedAt;

    @JsonProperty("status")
    @Schema(description = "Estado de la sesión", example = "SCHEDULED")
    private TelemedicineSession.SessionStatus status;

    @JsonProperty("meetingUrl")
    @Schema(description = "URL de la reunión virtual", example = "https://meet.google.com/abc-defg-hij")
    private String meetingUrl;

    @JsonProperty("notes")
    @Schema(description = "Notas de la sesión")
    private String notes;

    @JsonProperty("createdAt")
    @Schema(description = "Fecha de creación", example = "2024-12-20T08:00:00")
    private LocalDateTime createdAt;

    @JsonProperty("updatedAt")
    @Schema(description = "Fecha de última actualización", example = "2024-12-20T08:00:00")
    private LocalDateTime updatedAt;
}
