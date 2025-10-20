package com.riavet.telemedicinaservice.infrastructure.adapter.input;

import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionRequest;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionResponse;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionUpdateRequest;
import com.riavet.telemedicinaservice.application.service.TelemedicineService;
import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/sessions")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Telemedicine Sessions", description = "API para gestión de sesiones de telemedicina")
public class TelemedicineController {

    private final TelemedicineService telemedicineService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Crear nueva sesión de telemedicina", 
               description = "Agenda una nueva sesión de telemedicina entre un paciente y un veterinario")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", 
                        description = "Sesión creada exitosamente",
                        content = @Content(mediaType = "application/json", 
                                         schema = @Schema(implementation = TelemedicineSessionResponse.class))),
            @ApiResponse(responseCode = "400", 
                        description = "Datos de entrada inválidos",
                        content = @Content),
            @ApiResponse(responseCode = "500", 
                        description = "Error interno del servidor",
                        content = @Content)
    })
    public ResponseEntity<TelemedicineSessionResponse> createSession(
            @Valid @RequestBody TelemedicineSessionRequest request) {
        
        log.info("Request received to create telemedicine session for patient: {} and veterinarian: {}", 
                request.getPatientId(), request.getVeterinarianId());
        
        TelemedicineSessionResponse response = telemedicineService.createSession(request);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping(value = "/{id}/start", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Iniciar sesión de telemedicina", 
               description = "Marca una sesión programada como iniciada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", 
                        description = "Sesión iniciada exitosamente",
                        content = @Content(mediaType = "application/json", 
                                         schema = @Schema(implementation = TelemedicineSessionResponse.class))),
            @ApiResponse(responseCode = "404", 
                        description = "Sesión no encontrada",
                        content = @Content),
            @ApiResponse(responseCode = "400", 
                        description = "Estado de sesión inválido para iniciar",
                        content = @Content),
            @ApiResponse(responseCode = "500", 
                        description = "Error interno del servidor",
                        content = @Content)
    })
    public ResponseEntity<TelemedicineSessionResponse> startSession(
            @Parameter(description = "ID de la sesión a iniciar", required = true)
            @PathVariable UUID id) {
        
        log.info("Request received to start telemedicine session: {}", id);
        
        TelemedicineSessionResponse response = telemedicineService.startSession(id);
        
        return ResponseEntity.ok(response);
    }

    @PatchMapping(value = "/{id}/end", 
                  consumes = MediaType.APPLICATION_JSON_VALUE, 
                  produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Finalizar sesión de telemedicina", 
               description = "Marca una sesión en progreso como completada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", 
                        description = "Sesión finalizada exitosamente",
                        content = @Content(mediaType = "application/json", 
                                         schema = @Schema(implementation = TelemedicineSessionResponse.class))),
            @ApiResponse(responseCode = "404", 
                        description = "Sesión no encontrada",
                        content = @Content),
            @ApiResponse(responseCode = "400", 
                        description = "Estado de sesión inválido para finalizar",
                        content = @Content),
            @ApiResponse(responseCode = "500", 
                        description = "Error interno del servidor",
                        content = @Content)
    })
    public ResponseEntity<TelemedicineSessionResponse> endSession(
            @Parameter(description = "ID de la sesión a finalizar", required = true)
            @PathVariable UUID id,
            @RequestBody(required = false) TelemedicineSessionUpdateRequest updateRequest) {
        
        log.info("Request received to end telemedicine session: {}", id);
        
        TelemedicineSessionResponse response = telemedicineService.endSession(id, updateRequest);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Listar sesiones de telemedicina", 
               description = "Obtiene una lista de sesiones de telemedicina con filtros opcionales")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", 
                        description = "Lista de sesiones obtenida exitosamente",
                        content = @Content(mediaType = "application/json", 
                                         schema = @Schema(implementation = TelemedicineSessionResponse.class))),
            @ApiResponse(responseCode = "500", 
                        description = "Error interno del servidor",
                        content = @Content)
    })
    public ResponseEntity<List<TelemedicineSessionResponse>> getAllSessions(
            @Parameter(description = "Filtrar por estado de la sesión")
            @RequestParam(required = false) TelemedicineSession.SessionStatus status,
            @Parameter(description = "Filtrar por ID del veterinario")
            @RequestParam(required = false) UUID veterinarianId) {
        
        log.info("Request received to get all telemedicine sessions with filters - status: {}, veterinarianId: {}", 
                status, veterinarianId);
        
        List<TelemedicineSessionResponse> sessions = telemedicineService.getAllSessions(status, veterinarianId);
        
        return ResponseEntity.ok(sessions);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Obtener sesión por ID", 
               description = "Obtiene los detalles de una sesión específica")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", 
                        description = "Sesión encontrada",
                        content = @Content(mediaType = "application/json", 
                                         schema = @Schema(implementation = TelemedicineSessionResponse.class))),
            @ApiResponse(responseCode = "404", 
                        description = "Sesión no encontrada",
                        content = @Content),
            @ApiResponse(responseCode = "500", 
                        description = "Error interno del servidor",
                        content = @Content)
    })
    public ResponseEntity<TelemedicineSessionResponse> getSessionById(
            @Parameter(description = "ID de la sesión", required = true)
            @PathVariable UUID id) {
        
        log.info("Request received to get telemedicine session by ID: {}", id);
        
        TelemedicineSessionResponse response = telemedicineService.getSessionById(id);
        
        return ResponseEntity.ok(response);
    }
}
