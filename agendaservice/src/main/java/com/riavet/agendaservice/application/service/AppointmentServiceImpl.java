package com.riavet.agendaservice.application.service;

import com.riavet.agendaservice.application.dto.AppointmentRequest;
import com.riavet.agendaservice.application.dto.AppointmentResponse;
import com.riavet.agendaservice.application.mapper.AppointmentMapper;
import com.riavet.agendaservice.domain.model.Appointment;
import com.riavet.agendaservice.domain.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    @Override
    public AppointmentResponse createAppointment(AppointmentRequest request) {
        log.info("Creating appointment for patient: {} with veterinarian: {}", 
                request.getPatientId(), request.getVeterinarianId());

        Appointment appointment = appointmentMapper.toEntity(request);
        Appointment savedAppointment = appointmentRepository.save(appointment);

        log.info("Appointment created successfully with ID: {}", savedAppointment.getId());
        return appointmentMapper.toResponse(savedAppointment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAllAppointments() {
        log.info("Retrieving all appointments");
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointmentMapper.toResponseList(appointments);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AppointmentResponse> getAppointmentsByVeterinarian(UUID veterinarianId) {
        log.info("Retrieving appointments for veterinarian: {}", veterinarianId);
        List<Appointment> appointments = appointmentRepository.findByVeterinarianId(veterinarianId);
        return appointmentMapper.toResponseList(appointments);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AppointmentResponse> getAppointmentById(UUID id) {
        log.info("Retrieving appointment with ID: {}", id);
        return appointmentRepository.findById(id)
                .map(appointmentMapper::toResponse);
    }
}
