package com.riavet.patientservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.riavet.patientservice.application.dto.PatientCreateRequest;
import com.riavet.patientservice.application.dto.PatientResponse;
import com.riavet.patientservice.domain.model.Patient;
import com.riavet.patientservice.domain.repository.PatientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Full integration tests for Patient Service.
 * 
 * Tests the complete flow from HTTP request to database.
 */
@SpringBootTest
@AutoConfigureWebMvc
@ActiveProfiles("test")
@Transactional
class PatientServiceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private UUID ownerId;

    @BeforeEach
    void setUp() {
        ownerId = UUID.randomUUID();
        patientRepository.deleteAll();
    }

    @Test
    void createPatient_ShouldPersistToDatabase() throws Exception {
        // Given
        PatientCreateRequest request = new PatientCreateRequest(
                "Buddy",
                "Dog",
                "Golden Retriever",
                LocalDate.of(2019, 5, 10),
                ownerId
        );

        // When & Then
        String response = mockMvc.perform(post("/api/v1/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Buddy"))
                .andExpect(jsonPath("$.species").value("Dog"))
                .andExpect(jsonPath("$.breed").value("Golden Retriever"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        PatientResponse createdPatient = objectMapper.readValue(response, PatientResponse.class);
        
        // Verify database persistence
        assertThat(patientRepository.findById(createdPatient.getId())).isPresent();
    }

    @Test
    void getPatients_ShouldReturnPersistedPatients() throws Exception {
        // Given
        Patient patient1 = Patient.builder()
                .name("Max")
                .species("Dog")
                .breed("Labrador")
                .birthDate(LocalDate.of(2020, 3, 15))
                .ownerId(ownerId)
                .active(true)
                .build();

        Patient patient2 = Patient.builder()
                .name("Whiskers")
                .species("Cat")
                .breed("Siamese")
                .birthDate(LocalDate.of(2021, 7, 20))
                .ownerId(ownerId)
                .active(true)
                .build();

        patientRepository.save(patient1);
        patientRepository.save(patient2);

        // When & Then
        mockMvc.perform(get("/api/v1/patients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void searchPatients_ShouldFilterByNameAndSpecies() throws Exception {
        // Given
        Patient dog = Patient.builder()
                .name("Buddy")
                .species("Dog")
                .ownerId(ownerId)
                .active(true)
                .build();

        Patient cat = Patient.builder()
                .name("Fluffy")
                .species("Cat")
                .ownerId(ownerId)
                .active(true)
                .build();

        patientRepository.save(dog);
        patientRepository.save(cat);

        // When & Then - Search by species
        mockMvc.perform(get("/api/v1/patients")
                        .param("search", "dog"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void getPatientById_WhenNotExists_ShouldReturn404() throws Exception {
        // Given
        UUID nonExistentId = UUID.randomUUID();

        // When & Then
        mockMvc.perform(get("/api/v1/patients/{id}", nonExistentId))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error").value("Not Found"));
    }
}
