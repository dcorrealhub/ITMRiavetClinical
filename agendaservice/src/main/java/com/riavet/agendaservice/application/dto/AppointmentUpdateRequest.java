package com.riavet.agendaservice.application.dto;

import com.riavet.agendaservice.domain.model.Appointment.AppointmentStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Request body for updating appointment status")
public class AppointmentUpdateRequest {

    @NotNull(message = "Status is required")
    @Schema(description = "New status for the appointment", 
            allowableValues = {"PENDING", "CONFIRMED", "COMPLETED", "CANCELED"},
            example = "CANCELED")
    private AppointmentStatus status;

    @Schema(description = "Optional reason for the status change", 
            example = "Patient requested cancellation")
    private String reason;
}
