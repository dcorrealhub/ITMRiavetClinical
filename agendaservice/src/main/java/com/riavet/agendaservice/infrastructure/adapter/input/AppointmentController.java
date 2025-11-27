package com.riavet.agendaservice.infrastructure.adapter.input;

import com.riavet.agendaservice.application.dto.AppointmentRequest;
import com.riavet.agendaservice.application.dto.AppointmentResponse;
import com.riavet.agendaservice.application.dto.AppointmentUpdateRequest;
import com.riavet.agendaservice.application.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Appointments", description = "Appointment management API")
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @Operation(summary = "Create a new appointment", description = "Creates a new veterinary appointment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Appointment created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    public ResponseEntity<AppointmentResponse> createAppointment(
            @Valid @RequestBody AppointmentRequest request) {
        log.info("Received request to create appointment: {}", request);
        AppointmentResponse response = appointmentService.createAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get appointments", description = "Retrieves all appointments or filtered by veterinarian")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    public ResponseEntity<List<AppointmentResponse>> getAppointments(
            @Parameter(description = "Veterinarian ID to filter appointments")
            @RequestParam(required = false) UUID veterinarianId) {
        log.info("Received request to get appointments. VeterinarianId: {}", veterinarianId);
        
        List<AppointmentResponse> appointments;
        if (veterinarianId != null) {
            appointments = appointmentService.getAppointmentsByVeterinarian(veterinarianId);
        } else {
            appointments = appointmentService.getAllAppointments();
        }
        
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get appointment by ID", description = "Retrieves a specific appointment by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment found"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    public ResponseEntity<AppointmentResponse> getAppointmentById(
            @Parameter(description = "Appointment ID", required = true)
            @PathVariable UUID id) {
        log.info("Received request to get appointment with ID: {}", id);
        
        return appointmentService.getAppointmentById(id)
                .map(appointment -> ResponseEntity.ok(appointment))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update appointment status", description = "Updates the status of an existing appointment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment status updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid status or invalid status transition"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    public ResponseEntity<AppointmentResponse> updateAppointmentStatus(
            @Parameter(description = "Appointment ID", required = true)
            @PathVariable UUID id,
            @Valid @RequestBody AppointmentUpdateRequest request) {
        log.info("Received request to update status of appointment ID: {} to status: {}", id, request.getStatus());
        
        try {
            AppointmentResponse response = appointmentService.updateAppointmentStatus(id, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error updating appointment status: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{id}/cancel")
    @Operation(summary = "Cancel appointment", description = "Cancels an existing appointment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment canceled successfully"),
            @ApiResponse(responseCode = "400", description = "Cannot cancel this appointment"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    public ResponseEntity<AppointmentResponse> cancelAppointment(
            @Parameter(description = "Appointment ID", required = true)
            @PathVariable UUID id,
            @Parameter(description = "Reason for cancellation")
            @RequestParam(required = false) String reason) {
        log.info("Received request to cancel appointment with ID: {}", id);
        
        try {
            AppointmentResponse response = appointmentService.cancelAppointment(id, reason);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            log.error("Error canceling appointment: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
