package com.riavet.patientservice.application.service;

import com.riavet.patientservice.application.dto.*;
import com.riavet.patientservice.application.mapper.PatientMapper;
import com.riavet.patientservice.domain.model.Patient;
import com.riavet.patientservice.domain.repository.PatientRepository;
import com.riavet.patientservice.infrastructure.exception.PatientNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

/**
 * Unit tests for PatientService implementation.
 */
@ExtendWith(MockitoExtension.class)
class PatientServiceImplTest {

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private PatientMapper patientMapper;

    @InjectMocks
    private PatientServiceImpl patientService;

    private Patient patient;
    private PatientCreateRequest createRequest;
    private PatientUpdateRequest updateRequest;
    private PatientResponse patientResponse;
    private UUID patientId;

    @BeforeEach
    void setUp() {
        patientId = UUID.randomUUID();
        
        patient = Patient.builder()
                .id(patientId)
                .name("Fluffy")
                .species("Cat")
                .breed("Persian")
                .birthDate(LocalDate.of(2020, 1, 15))
                .ownerId(UUID.randomUUID())
                .active(true)
                .build();

        createRequest = new PatientCreateRequest(
                "Fluffy",
                "Cat",
                "Persian",
                LocalDate.of(2020, 1, 15),
                UUID.randomUUID()
        );

        updateRequest = new PatientUpdateRequest(
                "Fluffy Updated",
                "Persian Long Hair",
                UUID.randomUUID()
        );

        patientResponse = new PatientResponse();
        patientResponse.setId(patientId);
        patientResponse.setName("Fluffy");
        patientResponse.setSpecies("Cat");
    }

    @Test
    void getAllPatients_WithoutSearch_ShouldReturnAllActivePatients() {
        // Given
        List<Patient> patients = List.of(patient);
        List<PatientResponse> expectedResponses = List.of(patientResponse);
        
        when(patientRepository.findByActiveTrue()).thenReturn(patients);
        when(patientMapper.toResponseList(patients)).thenReturn(expectedResponses);

        // When
        List<PatientResponse> result = patientService.getAllPatients(null);

        // Then
        assertThat(result).isEqualTo(expectedResponses);
        verify(patientRepository).findByActiveTrue();
        verify(patientMapper).toResponseList(patients);
    }

    @Test
    void getAllPatients_WithSearch_ShouldReturnFilteredPatients() {
        // Given
        String searchTerm = "cat";
        List<Patient> patients = List.of(patient);
        List<PatientResponse> expectedResponses = List.of(patientResponse);
        
        when(patientRepository.findByNameOrSpeciesContainingIgnoreCaseAndActiveTrue(searchTerm))
                .thenReturn(patients);
        when(patientMapper.toResponseList(patients)).thenReturn(expectedResponses);

        // When
        List<PatientResponse> result = patientService.getAllPatients(searchTerm);

        // Then
        assertThat(result).isEqualTo(expectedResponses);
        verify(patientRepository).findByNameOrSpeciesContainingIgnoreCaseAndActiveTrue(searchTerm);
    }

    @Test
    void createPatient_ShouldCreateAndReturnPatient() {
        // Given
        when(patientMapper.toEntity(createRequest)).thenReturn(patient);
        when(patientRepository.save(patient)).thenReturn(patient);
        when(patientMapper.toResponse(patient)).thenReturn(patientResponse);

        // When
        PatientResponse result = patientService.createPatient(createRequest);

        // Then
        assertThat(result).isEqualTo(patientResponse);
        verify(patientMapper).toEntity(createRequest);
        verify(patientRepository).save(patient);
        verify(patientMapper).toResponse(patient);
    }

    @Test
    void getPatientById_WhenExists_ShouldReturnPatient() {
        // Given
        when(patientRepository.findByIdAndActiveTrue(patientId)).thenReturn(Optional.of(patient));
        when(patientMapper.toResponse(patient)).thenReturn(patientResponse);

        // When
        PatientResponse result = patientService.getPatientById(patientId);

        // Then
        assertThat(result).isEqualTo(patientResponse);
        verify(patientRepository).findByIdAndActiveTrue(patientId);
        verify(patientMapper).toResponse(patient);
    }

    @Test
    void getPatientById_WhenNotExists_ShouldThrowException() {
        // Given
        when(patientRepository.findByIdAndActiveTrue(patientId)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> patientService.getPatientById(patientId))
                .isInstanceOf(PatientNotFoundException.class)
                .hasMessageContaining("Patient not found with ID: " + patientId);
    }

    @Test
    void updatePatient_WhenExists_ShouldUpdateAndReturnPatient() {
        // Given
        when(patientRepository.findByIdAndActiveTrue(patientId)).thenReturn(Optional.of(patient));
        when(patientRepository.save(patient)).thenReturn(patient);
        when(patientMapper.toResponse(patient)).thenReturn(patientResponse);

        // When
        PatientResponse result = patientService.updatePatient(patientId, updateRequest);

        // Then
        assertThat(result).isEqualTo(patientResponse);
        verify(patientRepository).findByIdAndActiveTrue(patientId);
        verify(patientMapper).updateEntity(updateRequest, patient);
        verify(patientRepository).save(patient);
        verify(patientMapper).toResponse(patient);
    }

    @Test
    void mergePatients_WhenBothExist_ShouldMergeAndDeactivateDuplicate() {
        // Given
        UUID duplicateId = UUID.randomUUID();
        PatientMergeRequest mergeRequest = new PatientMergeRequest(duplicateId);
        
        Patient duplicatePatient = Patient.builder()
                .id(duplicateId)
                .name("Duplicate Fluffy")
                .species("Cat")
                .active(true)
                .build();

        when(patientRepository.findByIdAndActiveTrue(patientId)).thenReturn(Optional.of(patient));
        when(patientRepository.findByIdAndActiveTrue(duplicateId)).thenReturn(Optional.of(duplicatePatient));
        when(patientRepository.save(any(Patient.class))).thenReturn(patient);
        when(patientMapper.toResponse(patient)).thenReturn(patientResponse);

        // When
        PatientResponse result = patientService.mergePatients(patientId, mergeRequest);

        // Then
        assertThat(result).isEqualTo(patientResponse);
        assertThat(duplicatePatient.isActive()).isFalse();
        verify(patientRepository, times(2)).save(any(Patient.class));
    }

    @Test
    void mergePatients_WithSameId_ShouldThrowException() {
        // Given
        PatientMergeRequest mergeRequest = new PatientMergeRequest(patientId);

        // When & Then
        assertThatThrownBy(() -> patientService.mergePatients(patientId, mergeRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Cannot merge a patient with itself");
    }
}
