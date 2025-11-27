package com.riavet.patientservice.application.mapper;

import com.riavet.patientservice.application.dto.OwnerCreateRequest;
import com.riavet.patientservice.application.dto.OwnerResponse;
import com.riavet.patientservice.application.dto.OwnerUpdateRequest;
import com.riavet.patientservice.domain.model.Owner;
import org.mapstruct.*;

import java.util.List;

/**
 * MapStruct mapper for Owner entity and DTOs.
 * 
 * Handles mapping between domain entities and application DTOs.
 */
@Mapper(componentModel = "spring")
public interface OwnerMapper {

    /**
     * Maps OwnerCreateRequest to Owner entity.
     * 
     * @param request The creation request
     * @return Owner entity
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Owner toEntity(OwnerCreateRequest request);

    /**
     * Maps Owner entity to OwnerResponse DTO.
     * 
     * @param owner The owner entity
     * @return OwnerResponse DTO
     */
    OwnerResponse toResponse(Owner owner);

    /**
     * Maps list of Owner entities to list of OwnerResponse DTOs.
     * 
     * @param owners List of owner entities
     * @return List of OwnerResponse DTOs
     */
    List<OwnerResponse> toResponseList(List<Owner> owners);

    /**
     * Updates Owner entity with data from OwnerUpdateRequest.
     * Only updates non-null fields.
     * 
     * @param request The update request
     * @param owner The owner entity to update
     */
    default void updateEntity(OwnerUpdateRequest request, Owner owner) {
        if (request == null || owner == null) {
            return;
        }
        
        if (request.getFullName() != null && !request.getFullName().isEmpty()) {
            owner.setFullName(request.getFullName());
        }
        
        if (request.getPhone() != null) {
            owner.setPhone(request.getPhone());
        }
        
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            owner.setEmail(request.getEmail());
        }
    }
}
