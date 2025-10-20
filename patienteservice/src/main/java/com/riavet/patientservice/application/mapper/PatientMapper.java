package com.riavet.patientservice.application.mapper;

import com.riavet.patientservice.application.dto.PatientCreateRequest;
import com.riavet.patientservice.application.dto.PatientResponse;
import com.riavet.patientservice.application.dto.PatientUpdateRequest;
import com.riavet.patientservice.domain.model.Owner;
import com.riavet.patientservice.domain.model.Patient;
import org.mapstruct.*;

import java.util.List;
import java.util.UUID;

/**
 * MapStruct mapper for Patient entity and DTOs.
 * 
 * Handles mapping between domain entities and application DTOs.
 */
@Mapper(componentModel = "spring")
public interface PatientMapper {

    /**
     * Maps PatientCreateRequest to Patient entity.
     * 
     * @param request The creation request
     * @return Patient entity
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Patient toEntity(PatientCreateRequest request);

    /**
     * Maps Patient entity to PatientResponse DTO with owner.
     * 
     * @param patient The patient entity
     * @param owner The owner information
     * @return PatientResponse DTO
     */
    default PatientResponse toResponse(Patient patient, Owner owner) {
        if (patient == null) {
            return null;
        }
        
        PatientResponse response = new PatientResponse();
        response.setId(patient.getId());
        response.setName(patient.getName());
        response.setSpecies(patient.getSpecies());
        response.setBreed(patient.getBreed());
        response.setBirthDate(patient.getBirthDate());
        response.setOwner(owner);
        
        return response;
    }

    /**
     * Maps Patient entity to PatientResponse DTO with default owner.
     * 
     * @param patient The patient entity
     * @return PatientResponse DTO
     */
    default PatientResponse toResponse(Patient patient) {
        return toResponse(patient, createDefaultOwner(patient.getOwnerId()));
    }

    /**
     * Maps list of Patient entities to list of PatientResponse DTOs.
     * 
     * @param patients List of patient entities
     * @return List of PatientResponse DTOs
     */
    default List<PatientResponse> toResponseList(List<Patient> patients) {
        return patients.stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Updates Patient entity with data from PatientUpdateRequest.
     * Only updates non-null fields.
     * 
     * @param request The update request
     * @param patient The patient entity to update
     */
    default void updateEntity(PatientUpdateRequest request, Patient patient) {
        if (request == null || patient == null) {
            return;
        }
        
        if (request.getName() != null) {
            patient.setName(request.getName());
        }
        
        if (request.getBreed() != null) {
            patient.setBreed(request.getBreed());
        }
        
        if (request.getOwnerId() != null) {
            patient.setOwnerId(request.getOwnerId());
        }
    }

    /**
     * Creates a default owner object with just the ID.
     * Used when full owner information is not available.
     * 
     * @param ownerId The owner ID
     * @return Owner object with ID only
     */
    default Owner createDefaultOwner(UUID ownerId) {
        return Owner.builder()
                .id(ownerId)
                .fullName("Owner information not available")
                .build();
    }
}
