package com.riavet.telemedicinaservice.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@Schema(description = "Request para crear una nueva sesión de telemedicina")
public class TelemedicineSessionRequest {

    @NotNull(message = "Patient ID es requerido")
    @JsonProperty("patientId")
    @Schema(description = "ID del paciente", example = "123e4567-e89b-12d3-a456-426614174000")
    private UUID patientId;

    @NotNull(message = "Veterinarian ID es requerido")
    @JsonProperty("veterinarianId")
    @Schema(description = "ID del veterinario", example = "123e4567-e89b-12d3-a456-426614174001")
    private UUID veterinarianId;

    @NotNull(message = "Scheduled At es requerido")
    @Future(message = "La fecha programada debe ser en el futuro")
    @JsonProperty("scheduledAt")
    @Schema(description = "Fecha y hora programada para la sesión", example = "2024-12-25T10:00:00")
    private LocalDateTime scheduledAt;

    @NotBlank(message = "Meeting URL es requerida")
    @JsonProperty("meetingUrl")
    @Schema(description = "URL de la reunión virtual", example = "https://meet.google.com/abc-defg-hij")
    private String meetingUrl;

    @JsonProperty("notes")
    @Schema(description = "Notas adicionales para la sesión", example = "Consulta de seguimiento")
    private String notes;
}
