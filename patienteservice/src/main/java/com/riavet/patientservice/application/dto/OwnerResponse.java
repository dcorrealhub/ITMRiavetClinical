package com.riavet.patientservice.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * DTO for owner responses.
 * 
 * Contains all owner information.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerResponse {

    private UUID id;
    private String fullName;
    private String phone;
    private String email;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;
}
