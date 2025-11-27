package com.riavet.agendaservice.application.service;

import com.riavet.agendaservice.application.dto.AppointmentRequest;
import com.riavet.agendaservice.application.dto.AppointmentResponse;
import com.riavet.agendaservice.application.dto.AppointmentUpdateRequest;
import com.riavet.agendaservice.application.mapper.AppointmentMapper;
import com.riavet.agendaservice.domain.model.Appointment;
import com.riavet.agendaservice.domain.model.Appointment.AppointmentStatus;
import com.riavet.agendaservice.domain.model.Veterinarian;
import com.riavet.agendaservice.domain.repository.AppointmentRepository;
import com.riavet.agendaservice.domain.repository.VeterinarianRepository;
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
    private final VeterinarianRepository veterinarianRepository;
    private final AppointmentMapper appointmentMapper;

    @Override
    public AppointmentResponse createAppointment(AppointmentRequest request) {
        log.info("Creating appointment for patient: {} with veterinarian: {}", 
                request.getPatientId(), request.getVeterinarianId());

        // Verificar que el veterinario existe y está activo
        Veterinarian veterinarian = veterinarianRepository.findById(request.getVeterinarianId())
                .orElseThrow(() -> new RuntimeException("Veterinarian not found with ID: " + request.getVeterinarianId()));

        if (!veterinarian.getActive()) {
            throw new RuntimeException("Cannot create appointment with inactive veterinarian: " + request.getVeterinarianId());
        }

        Appointment appointment = appointmentMapper.toEntity(request, veterinarian);
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

    @Override
    public AppointmentResponse updateAppointmentStatus(UUID appointmentId, AppointmentUpdateRequest request) {
        log.info("Updating appointment status for ID: {} to status: {}", appointmentId, request.getStatus());

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));

        // Validar transiciones de estado permitidas
        if (!isValidStatusTransition(appointment.getStatus(), request.getStatus())) {
            throw new RuntimeException("Invalid status transition from " + appointment.getStatus() + " to " + request.getStatus());
        }

        appointment.setStatus(request.getStatus());
        Appointment updatedAppointment = appointmentRepository.save(appointment);

        log.info("Appointment status updated successfully. ID: {}, New status: {}", 
                appointmentId, request.getStatus());
        
        return appointmentMapper.toResponse(updatedAppointment);
    }

    @Override
    public AppointmentResponse cancelAppointment(UUID appointmentId, String reason) {
        log.info("Canceling appointment with ID: {}. Reason: {}", appointmentId, reason);

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + appointmentId));

        if (appointment.getStatus() == AppointmentStatus.CANCELED) {
            throw new RuntimeException("Appointment is already canceled");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETED) {
            throw new RuntimeException("Cannot cancel a completed appointment");
        }

        appointment.setStatus(AppointmentStatus.CANCELED);
        Appointment canceledAppointment = appointmentRepository.save(appointment);

        log.info("Appointment canceled successfully with ID: {}", appointmentId);
        return appointmentMapper.toResponse(canceledAppointment);
    }

    private boolean isValidStatusTransition(AppointmentStatus currentStatus, AppointmentStatus newStatus) {
        // Definir las transiciones válidas
        switch (currentStatus) {
            case PENDING:
                return newStatus == AppointmentStatus.CONFIRMED || 
                       newStatus == AppointmentStatus.CANCELED;
            case CONFIRMED:
                return newStatus == AppointmentStatus.COMPLETED || 
                       newStatus == AppointmentStatus.CANCELED;
            case COMPLETED:
                return false; // No se puede cambiar el estado de una cita completada
            case CANCELED:
                return false; // No se puede cambiar el estado de una cita cancelada
            default:
                return false;
        }
    }
}
