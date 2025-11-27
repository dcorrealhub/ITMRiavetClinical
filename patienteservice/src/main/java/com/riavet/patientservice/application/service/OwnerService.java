package com.riavet.patientservice.application.service;

import com.riavet.patientservice.application.dto.OwnerCreateRequest;
import com.riavet.patientservice.application.dto.OwnerResponse;
import com.riavet.patientservice.application.dto.OwnerUpdateRequest;

import java.util.List;
import java.util.UUID;

/**
 * Service interface for Owner operations.
 * 
 * Defines the business operations available for owner management.
 */
public interface OwnerService {

    /**
     * Retrieves all active owners, optionally filtered by search term.
     * 
     * @param search Optional search term to filter by name or email
     * @return List of owner responses
     */
    List<OwnerResponse> getAllOwners(String search);

    /**
     * Creates a new owner.
     * 
     * @param request Owner creation request
     * @return Created owner response
     */
    OwnerResponse createOwner(OwnerCreateRequest request);

    /**
     * Retrieves an owner by ID.
     * 
     * @param id Owner ID
     * @return Owner response
     * @throws com.riavet.patientservice.infrastructure.exception.OwnerNotFoundException if owner not found
     */
    OwnerResponse getOwnerById(UUID id);

    /**
     * Updates an existing owner.
     * 
     * @param id Owner ID
     * @param request Update request
     * @return Updated owner response
     * @throws com.riavet.patientservice.infrastructure.exception.OwnerNotFoundException if owner not found
     */
    OwnerResponse updateOwner(UUID id, OwnerUpdateRequest request);

    /**
     * Deletes an owner (soft delete).
     * 
     * @param id Owner ID
     * @throws com.riavet.patientservice.infrastructure.exception.OwnerNotFoundException if owner not found
     */
    void deleteOwner(UUID id);
}
