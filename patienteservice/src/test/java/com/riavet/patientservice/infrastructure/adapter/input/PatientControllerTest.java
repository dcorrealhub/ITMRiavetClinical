package com.riavet.patientservice.infrastructure.adapter.input;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.riavet.patientservice.application.dto.*;
import com.riavet.patientservice.application.service.PatientService;
import com.riavet.patientservice.infrastructure.exception.PatientNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for PatientController.
 */
@WebMvcTest(PatientController.class)
class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientService patientService;

    @Autowired
    private ObjectMapper objectMapper;

    private UUID patientId;
    private PatientResponse patientResponse;
    private PatientCreateRequest createRequest;
    private PatientUpdateRequest updateRequest;
    private PatientMergeRequest mergeRequest;

    @BeforeEach
    void setUp() {
        patientId = UUID.randomUUID();
        
        patientResponse = new PatientResponse();
        patientResponse.setId(patientId);
        patientResponse.setName("Fluffy");
        patientResponse.setSpecies("Cat");
        patientResponse.setBreed("Persian");
        patientResponse.setBirthDate(LocalDate.of(2020, 1, 15));

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

        mergeRequest = new PatientMergeRequest(UUID.randomUUID());
    }

    @Test
    void getAllPatients_ShouldReturnPatientList() throws Exception {
        // Given
        List<PatientResponse> patients = List.of(patientResponse);
        when(patientService.getAllPatients(null)).thenReturn(patients);

        // When & Then
        mockMvc.perform(get("/api/v1/patients"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(patientId.toString()))
                .andExpect(jsonPath("$[0].name").value("Fluffy"))
                .andExpect(jsonPath("$[0].species").value("Cat"));
    }

    @Test
    void getAllPatients_WithSearch_ShouldReturnFilteredPatients() throws Exception {
        // Given
        String searchTerm = "cat";
        List<PatientResponse> patients = List.of(patientResponse);
        when(patientService.getAllPatients(searchTerm)).thenReturn(patients);

        // When & Then
        mockMvc.perform(get("/api/v1/patients")
                        .param("search", searchTerm))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value("Fluffy"));
    }

    @Test
    void createPatient_WithValidData_ShouldReturnCreatedPatient() throws Exception {
        // Given
        when(patientService.createPatient(any(PatientCreateRequest.class))).thenReturn(patientResponse);

        // When & Then
        mockMvc.perform(post("/api/v1/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(patientId.toString()))
                .andExpect(jsonPath("$.name").value("Fluffy"))
                .andExpect(jsonPath("$.species").value("Cat"));
    }

    @Test
    void createPatient_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given
        PatientCreateRequest invalidRequest = new PatientCreateRequest();
        invalidRequest.setName(""); // Invalid: empty name
        invalidRequest.setSpecies(""); // Invalid: empty species
        // Missing ownerId

        // When & Then
        mockMvc.perform(post("/api/v1/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    void getPatientById_WhenExists_ShouldReturnPatient() throws Exception {
        // Given
        when(patientService.getPatientById(patientId)).thenReturn(patientResponse);

        // When & Then
        mockMvc.perform(get("/api/v1/patients/{id}", patientId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(patientId.toString()))
                .andExpect(jsonPath("$.name").value("Fluffy"));
    }

    @Test
    void getPatientById_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        when(patientService.getPatientById(patientId))
                .thenThrow(new PatientNotFoundException("Patient not found"));

        // When & Then
        mockMvc.perform(get("/api/v1/patients/{id}", patientId))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Not Found"));
    }

    @Test
    void updatePatient_WithValidData_ShouldReturnUpdatedPatient() throws Exception {
        // Given
        when(patientService.updatePatient(eq(patientId), any(PatientUpdateRequest.class)))
                .thenReturn(patientResponse);

        // When & Then
        mockMvc.perform(put("/api/v1/patients/{id}", patientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(patientId.toString()));
    }

    @Test
    void updatePatient_WhenNotExists_ShouldReturnNotFound() throws Exception {
        // Given
        when(patientService.updatePatient(eq(patientId), any(PatientUpdateRequest.class)))
                .thenThrow(new PatientNotFoundException("Patient not found"));

        // When & Then
        mockMvc.perform(put("/api/v1/patients/{id}", patientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isNotFound())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Not Found"));
    }

    @Test
    void mergePatients_WithValidData_ShouldReturnMergedPatient() throws Exception {
        // Given
        when(patientService.mergePatients(eq(patientId), any(PatientMergeRequest.class)))
                .thenReturn(patientResponse);

        // When & Then
        mockMvc.perform(post("/api/v1/patients/{id}/merge", patientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mergeRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(patientId.toString()));
    }

    @Test
    void mergePatients_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given
        PatientMergeRequest invalidRequest = new PatientMergeRequest(); // Missing duplicateId

        // When & Then
        mockMvc.perform(post("/api/v1/patients/{id}/merge", patientId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }
}
