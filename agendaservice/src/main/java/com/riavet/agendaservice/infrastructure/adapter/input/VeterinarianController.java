package com.riavet.agendaservice.infrastructure.adapter.input;

import com.riavet.agendaservice.application.dto.VeterinarianRequest;
import com.riavet.agendaservice.application.dto.VeterinarianResponse;
import com.riavet.agendaservice.application.service.VeterinarianService;
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
@RequestMapping("/api/v1/veterinarians")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Veterinarians", description = "Veterinarian management API")
public class VeterinarianController {

    private final VeterinarianService veterinarianService;

    @PostMapping
    @Operation(summary = "Create a new veterinarian", description = "Creates a new veterinarian in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Veterinarian created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "409", description = "Veterinarian with email or license already exists")
    })
    public ResponseEntity<VeterinarianResponse> createVeterinarian(
            @Valid @RequestBody VeterinarianRequest request) {
        log.info("Received request to create veterinarian: {}", request.getEmail());
        VeterinarianResponse response = veterinarianService.createVeterinarian(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get veterinarians", description = "Retrieves all veterinarians or only active ones")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Veterinarians retrieved successfully")
    })
    public ResponseEntity<List<VeterinarianResponse>> getVeterinarians(
            @Parameter(description = "Filter only active veterinarians")
            @RequestParam(required = false, defaultValue = "false") boolean onlyActive) {
        log.info("Received request to get veterinarians. OnlyActive: {}", onlyActive);
        
        List<VeterinarianResponse> veterinarians = onlyActive 
                ? veterinarianService.getActiveVeterinarians()
                : veterinarianService.getAllVeterinarians();
        
        return ResponseEntity.ok(veterinarians);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get veterinarian by ID", description = "Retrieves a specific veterinarian by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Veterinarian found"),
            @ApiResponse(responseCode = "404", description = "Veterinarian not found")
    })
    public ResponseEntity<VeterinarianResponse> getVeterinarianById(
            @Parameter(description = "Veterinarian ID", required = true)
            @PathVariable UUID id) {
        log.info("Received request to get veterinarian with ID: {}", id);
        
        return veterinarianService.getVeterinarianById(id)
                .map(veterinarian -> ResponseEntity.ok(veterinarian))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get veterinarian by email", description = "Retrieves a veterinarian by email address")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Veterinarian found"),
            @ApiResponse(responseCode = "404", description = "Veterinarian not found")
    })
    public ResponseEntity<VeterinarianResponse> getVeterinarianByEmail(
            @Parameter(description = "Veterinarian email", required = true)
            @PathVariable String email) {
        log.info("Received request to get veterinarian with email: {}", email);
        
        return veterinarianService.getVeterinarianByEmail(email)
                .map(veterinarian -> ResponseEntity.ok(veterinarian))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update veterinarian", description = "Updates an existing veterinarian")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Veterinarian updated successfully"),
            @ApiResponse(responseCode = "404", description = "Veterinarian not found"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "409", description = "Email or license already exists")
    })
    public ResponseEntity<VeterinarianResponse> updateVeterinarian(
            @Parameter(description = "Veterinarian ID", required = true)
            @PathVariable UUID id,
            @Valid @RequestBody VeterinarianRequest request) {
        log.info("Received request to update veterinarian with ID: {}", id);
        VeterinarianResponse response = veterinarianService.updateVeterinarian(id, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/deactivate")
    @Operation(summary = "Deactivate veterinarian", description = "Deactivates a veterinarian (soft delete)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Veterinarian deactivated successfully"),
            @ApiResponse(responseCode = "404", description = "Veterinarian not found")
    })
    public ResponseEntity<Void> deactivateVeterinarian(
            @Parameter(description = "Veterinarian ID", required = true)
            @PathVariable UUID id) {
        log.info("Received request to deactivate veterinarian with ID: {}", id);
        veterinarianService.deactivateVeterinarian(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete veterinarian", description = "Permanently deletes a veterinarian")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Veterinarian deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Veterinarian not found")
    })
    public ResponseEntity<Void> deleteVeterinarian(
            @Parameter(description = "Veterinarian ID", required = true)
            @PathVariable UUID id) {
        log.info("Received request to delete veterinarian with ID: {}", id);
        veterinarianService.deleteVeterinarian(id);
        return ResponseEntity.noContent().build();
    }
}
