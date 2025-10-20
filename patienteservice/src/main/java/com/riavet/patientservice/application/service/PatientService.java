package com.riavet.patientservice.application.service;

import com.riavet.patientservice.application.dto.*;
import com.riavet.patientservice.domain.model.Patient;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for Patient operations.
 * 
 * Defines the business operations available for patient management.
 */
public interface PatientService {

    /**
     * Retrieves all active patients, optionally filtered by search term.
     * 
     * @param search Optional search term to filter by name or species
     * @return List of patient responses
     */
    List<PatientResponse> getAllPatients(String search);

    /**
     * Creates a new patient.
     * 
     * @param request Patient creation request
     * @return Created patient response
     */
    PatientResponse createPatient(PatientCreateRequest request);

    /**
     * Retrieves a patient by ID.
     * 
     * @param id Patient ID
     * @return Patient response
     * @throws PatientNotFoundException if patient not found
     */
    PatientResponse getPatientById(UUID id);

    /**
     * Updates an existing patient.
     * 
     * @param id Patient ID
     * @param request Update request
     * @return Updated patient response
     * @throws PatientNotFoundException if patient not found
     */
    PatientResponse updatePatient(UUID id, PatientUpdateRequest request);

    /**
     * Merges two patients by copying information from duplicate to main patient
     * and deactivating the duplicate.
     * 
     * @param mainPatientId ID of the main patient to keep
     * @param mergeRequest Request containing duplicate patient ID
     * @return Updated main patient response
     * @throws PatientNotFoundException if either patient not found
     */
    PatientResponse mergePatients(UUID mainPatientId, PatientMergeRequest mergeRequest);
}
