package com.riavet.agendaservice.application.mapper;

import com.riavet.agendaservice.application.dto.AppointmentRequest;
import com.riavet.agendaservice.application.dto.AppointmentResponse;
import com.riavet.agendaservice.domain.model.Appointment;
import com.riavet.agendaservice.domain.model.Veterinarian;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AppointmentMapper {

    private final VeterinarianMapper veterinarianMapper;

    public Appointment toEntity(AppointmentRequest request, Veterinarian veterinarian) {
        return Appointment.builder()
                .patientId(request.getPatientId())
                .veterinarian(veterinarian)
                .scheduledAt(request.getScheduledAt())
                .status(Appointment.AppointmentStatus.PENDING)
                .build();
    }

    public AppointmentResponse toResponse(Appointment appointment) {
        return AppointmentResponse.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatientId())
                .veterinarianId(appointment.getVeterinarian().getId())
                .veterinarian(veterinarianMapper.toResponse(appointment.getVeterinarian()))
                .scheduledAt(appointment.getScheduledAt())
                .status(appointment.getStatus())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .build();
    }

    public List<AppointmentResponse> toResponseList(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
