package com.riavet.patientservice.domain.model;

import lombok.*;

import java.util.UUID;

/**
 * Owner value object representing basic owner information.
 * 
 * This is a simplified representation used for API responses.
 * The full Owner entity would be managed by a separate Owner Service.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Owner {

    private UUID id;
    private String fullName;
    private String phone;
    private String email;
}
