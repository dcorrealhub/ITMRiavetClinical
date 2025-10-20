package com.riavet.agendaservice.application.dto;

import com.riavet.agendaservice.domain.model.Appointment;
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
public class AppointmentResponse {

    private UUID id;
    private UUID patientId;
    private UUID veterinarianId;
    private LocalDateTime scheduledAt;
    private Appointment.AppointmentStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
