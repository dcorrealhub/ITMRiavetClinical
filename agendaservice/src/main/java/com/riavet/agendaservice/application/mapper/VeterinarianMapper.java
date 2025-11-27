package com.riavet.agendaservice.application.mapper;

import com.riavet.agendaservice.application.dto.VeterinarianRequest;
import com.riavet.agendaservice.application.dto.VeterinarianResponse;
import com.riavet.agendaservice.domain.model.Veterinarian;
import org.springframework.stereotype.Component;

@Component
public class VeterinarianMapper {

    public Veterinarian toEntity(VeterinarianRequest request) {
        return Veterinarian.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .licenseNumber(request.getLicenseNumber())
                .specialization(request.getSpecialization())
                .active(request.getActive() != null ? request.getActive() : true)
                .build();
    }

    public VeterinarianResponse toResponse(Veterinarian veterinarian) {
        if (veterinarian == null) {
            return null;
        }
        
        return VeterinarianResponse.builder()
                .id(veterinarian.getId())
                .firstName(veterinarian.getFirstName())
                .lastName(veterinarian.getLastName())
                .email(veterinarian.getEmail())
                .phoneNumber(veterinarian.getPhoneNumber())
                .licenseNumber(veterinarian.getLicenseNumber())
                .specialization(veterinarian.getSpecialization())
                .active(veterinarian.getActive())
                .createdAt(veterinarian.getCreatedAt())
                .updatedAt(veterinarian.getUpdatedAt())
                .build();
    }

    public void updateEntity(Veterinarian veterinarian, VeterinarianRequest request) {
        veterinarian.setFirstName(request.getFirstName());
        veterinarian.setLastName(request.getLastName());
        veterinarian.setEmail(request.getEmail());
        veterinarian.setPhoneNumber(request.getPhoneNumber());
        veterinarian.setLicenseNumber(request.getLicenseNumber());
        veterinarian.setSpecialization(request.getSpecialization());
        if (request.getActive() != null) {
            veterinarian.setActive(request.getActive());
        }
    }
}
