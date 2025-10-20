package com.riavet.patientservice.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.riavet.patientservice.domain.model.Owner;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for patient responses.
 * 
 * Contains all patient information including owner details.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponse {

    private UUID id;
    private String name;
    private String species;
    private String breed;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    
    private Owner owner;
}
