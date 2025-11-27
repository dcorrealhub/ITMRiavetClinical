package com.riavet.agendaservice.application.service;

import com.riavet.agendaservice.application.dto.VeterinarianRequest;
import com.riavet.agendaservice.application.dto.VeterinarianResponse;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VeterinarianService {

    VeterinarianResponse createVeterinarian(VeterinarianRequest request);

    List<VeterinarianResponse> getAllVeterinarians();

    List<VeterinarianResponse> getActiveVeterinarians();

    Optional<VeterinarianResponse> getVeterinarianById(UUID id);

    Optional<VeterinarianResponse> getVeterinarianByEmail(String email);

    Optional<VeterinarianResponse> getVeterinarianByLicenseNumber(String licenseNumber);

    VeterinarianResponse updateVeterinarian(UUID id, VeterinarianRequest request);

    void deactivateVeterinarian(UUID id);

    void deleteVeterinarian(UUID id);
}
