package com.riavet.patientservice.infrastructure.adapter.input;

import com.riavet.patientservice.application.dto.OwnerCreateRequest;
import com.riavet.patientservice.application.dto.OwnerResponse;
import com.riavet.patientservice.application.dto.OwnerUpdateRequest;
import com.riavet.patientservice.application.service.OwnerService;
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
 * REST Controller for Owner operations.
 * 
 * Provides endpoints for managing pet owners.
 */
@RestController
@RequestMapping("/api/v1/owners")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Owner Service", description = "Gestiona propietarios de mascotas")
public class OwnerController {

    private final OwnerService ownerService;

    @GetMapping
    @Operation(summary = "Listar propietarios", description = "Obtiene una lista de propietarios activos, opcionalmente filtrada por término de búsqueda")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de propietarios obtenida exitosamente")
    })
    public ResponseEntity<List<OwnerResponse>> getAllOwners(
            @Parameter(description = "Término de búsqueda para filtrar por nombre o email")
            @RequestParam(required = false) String search) {
        
        log.info("GET /api/v1/owners - search: {}", search);
        List<OwnerResponse> owners = ownerService.getAllOwners(search);
        return ResponseEntity.ok(owners);
    }

    @PostMapping
    @Operation(summary = "Crear propietario", description = "Crea un nuevo propietario en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Propietario creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<OwnerResponse> createOwner(
            @Valid @RequestBody OwnerCreateRequest request) {
        
        log.info("POST /api/v1/owners - name: {}, email: {}", request.getFullName(), request.getEmail());
        OwnerResponse createdOwner = ownerService.createOwner(request);
        return new ResponseEntity<>(createdOwner, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener propietario", description = "Obtiene un propietario específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Propietario encontrado"),
            @ApiResponse(responseCode = "404", description = "Propietario no encontrado")
    })
    public ResponseEntity<OwnerResponse> getOwnerById(
            @Parameter(description = "ID del propietario")
            @PathVariable UUID id) {
        
        log.info("GET /api/v1/owners/{}", id);
        OwnerResponse owner = ownerService.getOwnerById(id);
        return ResponseEntity.ok(owner);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar propietario", description = "Actualiza la información de un propietario existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Propietario actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Propietario no encontrado"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos")
    })
    public ResponseEntity<OwnerResponse> updateOwner(
            @Parameter(description = "ID del propietario")
            @PathVariable UUID id,
            @Valid @RequestBody OwnerUpdateRequest request) {
        
        log.info("PUT /api/v1/owners/{}", id);
        OwnerResponse updatedOwner = ownerService.updateOwner(id, request);
        return ResponseEntity.ok(updatedOwner);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar propietario", description = "Elimina un propietario (soft delete)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Propietario eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Propietario no encontrado")
    })
    public ResponseEntity<Void> deleteOwner(
            @Parameter(description = "ID del propietario")
            @PathVariable UUID id) {
        
        log.info("DELETE /api/v1/owners/{}", id);
        ownerService.deleteOwner(id);
        return ResponseEntity.noContent().build();
    }
}
