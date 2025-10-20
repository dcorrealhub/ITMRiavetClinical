package com.riavet.patientservice.infrastructure.adapter.input;

import com.riavet.patientservice.application.dto.*;
import com.riavet.patientservice.application.service.PatientService;
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

/**
 * REST Controller for Patient operations.
 * 
 * Implements the Patient Service API according to the OpenAPI specification.
 */
@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Patient Service", description = "Gestiona pacientes, propietarios y deduplicación")
public class PatientController {

    private final PatientService patientService;

    @GetMapping
    @Operation(summary = "Listar pacientes", description = "Obtiene una lista de pacientes activos, opcionalmente filtrada por término de búsqueda")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de pacientes obtenida exitosamente")
    })
    public ResponseEntity<List<PatientResponse>> getAllPatients(
            @Parameter(description = "Término de búsqueda para filtrar por nombre o especie")
            @RequestParam(required = false) String search) {
        
        log.info("GET /api/v1/patients - search: {}", search);
        List<PatientResponse> patients = patientService.getAllPatients(search);
        return ResponseEntity.ok(patients);
    }

    @PostMapping
    @Operation(summary = "Crear paciente", description = "Crea un nuevo paciente en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Paciente creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<PatientResponse> createPatient(
            @Valid @RequestBody PatientCreateRequest request) {
        
        log.info("POST /api/v1/patients - name: {}, species: {}", request.getName(), request.getSpecies());
        PatientResponse createdPatient = patientService.createPatient(request);
        return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener paciente", description = "Obtiene un paciente específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente encontrado"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado")
    })
    public ResponseEntity<PatientResponse> getPatientById(
            @Parameter(description = "ID del paciente")
            @PathVariable UUID id) {
        
        log.info("GET /api/v1/patients/{}", id);
        PatientResponse patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar paciente", description = "Actualiza la información de un paciente existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Paciente actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<PatientResponse> updatePatient(
            @Parameter(description = "ID del paciente")
            @PathVariable UUID id,
            @Valid @RequestBody PatientUpdateRequest request) {
        
        log.info("PUT /api/v1/patients/{}", id);
        PatientResponse updatedPatient = patientService.updatePatient(id, request);
        return ResponseEntity.ok(updatedPatient);
    }

    @PostMapping("/{id}/merge")
    @Operation(summary = "Fusionar duplicados", description = "Fusiona un paciente duplicado con el paciente principal")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pacientes fusionados exitosamente"),
            @ApiResponse(responseCode = "404", description = "Uno o ambos pacientes no encontrados"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<PatientResponse> mergePatients(
            @Parameter(description = "ID del paciente principal")
            @PathVariable UUID id,
            @Valid @RequestBody PatientMergeRequest request) {
        
        log.info("POST /api/v1/patients/{}/merge - duplicateId: {}", id, request.getDuplicateId());
        PatientResponse mergedPatient = patientService.mergePatients(id, request);
        return ResponseEntity.ok(mergedPatient);
    }
}
