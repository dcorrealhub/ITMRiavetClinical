package com.riavet.patientservice.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new owner.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerCreateRequest {

    @NotBlank(message = "Full name is required")
    @Size(min = 1, max = 150, message = "Full name must be between 1 and 150 characters")
    private String fullName;

    @Size(max = 30, message = "Phone must not exceed 30 characters")
    private String phone;

    @Email(message = "Email must be valid")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;
}
