package com.riavet.agendaservice.application.service;

import com.riavet.agendaservice.application.dto.AppointmentRequest;
import com.riavet.agendaservice.application.dto.AppointmentResponse;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppointmentService {

    AppointmentResponse createAppointment(AppointmentRequest request);

    List<AppointmentResponse> getAllAppointments();

    List<AppointmentResponse> getAppointmentsByVeterinarian(UUID veterinarianId);

    Optional<AppointmentResponse> getAppointmentById(UUID id);
}
