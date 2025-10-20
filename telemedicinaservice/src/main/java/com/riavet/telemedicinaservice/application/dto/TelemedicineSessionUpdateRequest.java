package com.riavet.telemedicinaservice.application.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request para actualizar una sesión de telemedicina")
public class TelemedicineSessionUpdateRequest {

    @JsonProperty("notes")
    @Schema(description = "Notas adicionales para la sesión", example = "Paciente mostró mejoría significativa")
    private String notes;
}
