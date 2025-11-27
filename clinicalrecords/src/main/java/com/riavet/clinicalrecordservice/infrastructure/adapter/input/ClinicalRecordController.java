package com.riavet.clinicalrecordservice.infrastructure.adapter.input;

import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordRequest;
import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordResponse;
import com.riavet.clinicalrecordservice.application.service.ClinicalRecordService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Clinical Records", description = "Clinical Records Management API with Medical Orders Support")
public class ClinicalRecordController {

    private final ClinicalRecordService clinicalRecordService;

    @PostMapping
    @Operation(summary = "Create a new clinical record", description = "Creates a new clinical record for a patient with medical orders support")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Clinical record created successfully",
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ClinicalRecordResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<ClinicalRecordResponse> createClinicalRecord(
            @Valid @RequestBody ClinicalRecordRequest request) {
        log.info("Received request to create clinical record for patient: {}", request.getPatientId());
        
        ClinicalRecordResponse response = clinicalRecordService.createClinicalRecord(request);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Get clinical records", description = "Retrieves all clinical records or filters by patient ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clinical records retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ClinicalRecordResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<List<ClinicalRecordResponse>> getClinicalRecords(
            @Parameter(description = "Patient ID to filter records")
            @RequestParam(required = false) String patientId,
            @Parameter(description = "Status to filter records")
            @RequestParam(required = false) String status) {
        log.info("Received request to get clinical records. Patient ID filter: {}, Status filter: {}", patientId, status);
        
        List<ClinicalRecordResponse> response;
        if (patientId != null && status != null) {
            response = clinicalRecordService.getClinicalRecordsByPatientIdAndStatus(patientId, status);
        } else if (patientId != null) {
            response = clinicalRecordService.getClinicalRecordsByPatientId(patientId);
        } else if (status != null) {
            response = clinicalRecordService.getClinicalRecordsByStatus(status);
        } else {
            response = clinicalRecordService.getAllClinicalRecords();
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get clinical record by ID", description = "Retrieves a specific clinical record by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clinical record found",
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ClinicalRecordResponse.class))),
            @ApiResponse(responseCode = "404", description = "Clinical record not found",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<ClinicalRecordResponse> getClinicalRecordById(
            @Parameter(description = "Clinical record ID", required = true)
            @PathVariable String id) {
        log.info("Received request to get clinical record with ID: {}", id);
        
        ClinicalRecordResponse response = clinicalRecordService.getClinicalRecordById(id);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/veterinarian/{veterinarianId}")
    @Operation(summary = "Get clinical records by veterinarian", description = "Retrieves all clinical records for a specific veterinarian")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clinical records retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ClinicalRecordResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<List<ClinicalRecordResponse>> getClinicalRecordsByVeterinarian(
            @Parameter(description = "Veterinarian ID", required = true)
            @PathVariable String veterinarianId) {
        log.info("Received request to get clinical records for veterinarian: {}", veterinarianId);
        
        List<ClinicalRecordResponse> response = clinicalRecordService.getClinicalRecordsByVeterinarianId(veterinarianId);
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete clinical record", description = "Deletes a clinical record by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Clinical record deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Clinical record not found",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<Void> deleteClinicalRecord(
            @Parameter(description = "Clinical record ID", required = true)
            @PathVariable String id) {
        log.info("Received request to delete clinical record with ID: {}", id);
        
        clinicalRecordService.deleteClinicalRecord(id);
        
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update clinical record", description = "Updates an existing clinical record")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Clinical record updated successfully",
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ClinicalRecordResponse.class))),
            @ApiResponse(responseCode = "404", description = "Clinical record not found",
                    content = @Content),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content)
    })
    public ResponseEntity<ClinicalRecordResponse> updateClinicalRecord(
            @Parameter(description = "Clinical record ID", required = true)
            @PathVariable String id,
            @Valid @RequestBody ClinicalRecordRequest request) {
        log.info("Received request to update clinical record with ID: {}", id);
        
        ClinicalRecordResponse response = clinicalRecordService.updateClinicalRecord(id, request);
        
        return ResponseEntity.ok(response);
    }
}
