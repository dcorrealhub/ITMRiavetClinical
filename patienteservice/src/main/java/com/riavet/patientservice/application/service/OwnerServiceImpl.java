package com.riavet.patientservice.application.service;

import com.riavet.patientservice.application.dto.OwnerCreateRequest;
import com.riavet.patientservice.application.dto.OwnerResponse;
import com.riavet.patientservice.application.dto.OwnerUpdateRequest;
import com.riavet.patientservice.application.mapper.OwnerMapper;
import com.riavet.patientservice.domain.model.Owner;
import com.riavet.patientservice.domain.repository.OwnerRepository;
import com.riavet.patientservice.infrastructure.exception.OwnerNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Implementation of OwnerService interface.
 * 
 * Contains the business logic for owner management operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;
    private final OwnerMapper ownerMapper;

    @Override
    @Transactional(readOnly = true)
    public List<OwnerResponse> getAllOwners(String search) {
        log.debug("Retrieving all owners with search term: {}", search);
        
        List<Owner> owners;
        if (search != null && !search.isEmpty()) {
            owners = ownerRepository.searchOwners(search);
        } else {
            owners = ownerRepository.findAll();
        }
        
        log.info("Found {} owners", owners.size());
        return ownerMapper.toResponseList(owners);
    }

    @Override
    public OwnerResponse createOwner(OwnerCreateRequest request) {
        log.debug("Creating new owner with name: {}", request.getFullName());
        
        // Check if email already exists
        if (request.getEmail() != null && !request.getEmail().isEmpty() && 
            ownerRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Owner with email " + request.getEmail() + " already exists");
        }
        
        Owner owner = ownerMapper.toEntity(request);
        Owner savedOwner = ownerRepository.save(owner);
        
        log.info("Created owner with ID: {}", savedOwner.getId());
        return ownerMapper.toResponse(savedOwner);
    }

    @Override
    @Transactional(readOnly = true)
    public OwnerResponse getOwnerById(UUID id) {
        log.debug("Retrieving owner with ID: {}", id);
        
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found with ID: " + id));
        
        return ownerMapper.toResponse(owner);
    }

    @Override
    public OwnerResponse updateOwner(UUID id, OwnerUpdateRequest request) {
        log.debug("Updating owner with ID: {}", id);
        
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found with ID: " + id));
        
        // Check if new email already exists (if email is being updated)
        if (request.getEmail() != null && !request.getEmail().isEmpty() && 
            !request.getEmail().equals(owner.getEmail())) {
            if (ownerRepository.existsByEmail(request.getEmail())) {
                throw new IllegalArgumentException("Owner with email " + request.getEmail() + " already exists");
            }
        }
        
        ownerMapper.updateEntity(request, owner);
        Owner updatedOwner = ownerRepository.save(owner);
        
        log.info("Updated owner with ID: {}", updatedOwner.getId());
        return ownerMapper.toResponse(updatedOwner);
    }

    @Override
    public void deleteOwner(UUID id) {
        log.debug("Deleting owner with ID: {}", id);
        
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found with ID: " + id));
        
        ownerRepository.delete(owner);
        
        log.info("Deleted owner with ID: {}", id);
    }
}
