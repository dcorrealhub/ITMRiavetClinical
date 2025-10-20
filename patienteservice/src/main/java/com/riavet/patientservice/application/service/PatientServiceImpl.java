package com.riavet.patientservice.application.service;

import com.riavet.patientservice.application.dto.*;
import com.riavet.patientservice.application.mapper.PatientMapper;
import com.riavet.patientservice.domain.model.Patient;
import com.riavet.patientservice.domain.repository.PatientRepository;
import com.riavet.patientservice.infrastructure.exception.PatientNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

/**
 * Implementation of PatientService interface.
 * 
 * Contains the business logic for patient management operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    @Override
    @Transactional(readOnly = true)
    public List<PatientResponse> getAllPatients(String search) {
        log.debug("Retrieving all patients with search term: {}", search);
        
        List<Patient> patients;
        
        if (StringUtils.hasText(search)) {
            patients = patientRepository.findByNameOrSpeciesContainingIgnoreCaseAndActiveTrue(search);
        } else {
            patients = patientRepository.findByActiveTrue();
        }
        
        log.debug("Found {} patients", patients.size());
        return patientMapper.toResponseList(patients);
    }

    @Override
    public PatientResponse createPatient(PatientCreateRequest request) {
        log.debug("Creating new patient with name: {}", request.getName());
        
        Patient patient = patientMapper.toEntity(request);
        Patient savedPatient = patientRepository.save(patient);
        
        log.info("Created patient with ID: {}", savedPatient.getId());
        return patientMapper.toResponse(savedPatient);
    }

    @Override
    @Transactional(readOnly = true)
    public PatientResponse getPatientById(UUID id) {
        log.debug("Retrieving patient with ID: {}", id);
        
        Patient patient = patientRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found with ID: " + id));
        
        return patientMapper.toResponse(patient);
    }

    @Override
    public PatientResponse updatePatient(UUID id, PatientUpdateRequest request) {
        log.debug("Updating patient with ID: {}", id);
        
        Patient patient = patientRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found with ID: " + id));
        
        patientMapper.updateEntity(request, patient);
        Patient updatedPatient = patientRepository.save(patient);
        
        log.info("Updated patient with ID: {}", updatedPatient.getId());
        return patientMapper.toResponse(updatedPatient);
    }

    @Override
    public PatientResponse mergePatients(UUID mainPatientId, PatientMergeRequest mergeRequest) {
        log.debug("Merging patient {} into patient {}", mergeRequest.getDuplicateId(), mainPatientId);
        
        // Validate that we're not trying to merge a patient with itself
        if (mainPatientId.equals(mergeRequest.getDuplicateId())) {
            throw new IllegalArgumentException("Cannot merge a patient with itself");
        }
        
        // Get both patients
        Patient mainPatient = patientRepository.findByIdAndActiveTrue(mainPatientId)
                .orElseThrow(() -> new PatientNotFoundException("Main patient not found with ID: " + mainPatientId));
        
        Patient duplicatePatient = patientRepository.findByIdAndActiveTrue(mergeRequest.getDuplicateId())
                .orElseThrow(() -> new PatientNotFoundException("Duplicate patient not found with ID: " + mergeRequest.getDuplicateId()));
        
        // Update main patient with information from duplicate
        mainPatient.updateFrom(duplicatePatient);
        
        // Deactivate duplicate patient
        duplicatePatient.deactivate();
        
        // Save both patients
        patientRepository.save(duplicatePatient);
        Patient updatedMainPatient = patientRepository.save(mainPatient);
        
        log.info("Merged patient {} into patient {}", mergeRequest.getDuplicateId(), mainPatientId);
        return patientMapper.toResponse(updatedMainPatient);
    }
}
