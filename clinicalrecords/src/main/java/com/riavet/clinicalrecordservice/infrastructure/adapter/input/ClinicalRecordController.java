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
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Clinical Records", description = "Clinical Records Management API")
public class ClinicalRecordController {

    private final ClinicalRecordService clinicalRecordService;

    @PostMapping
    @Operation(summary = "Create a new clinical record", description = "Creates a new clinical record for a patient")
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
            @RequestParam(required = false) UUID patientId) {
        log.info("Received request to get clinical records. Patient ID filter: {}", patientId);
        
        List<ClinicalRecordResponse> response;
        if (patientId != null) {
            response = clinicalRecordService.getClinicalRecordsByPatientId(patientId);
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
            @PathVariable UUID id) {
        log.info("Received request to get clinical record with ID: {}", id);
        
        ClinicalRecordResponse response = clinicalRecordService.getClinicalRecordById(id);
        
        return ResponseEntity.ok(response);
    }
}
