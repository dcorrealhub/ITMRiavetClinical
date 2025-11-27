package com.riavet.agendaservice.application.service;

import com.riavet.agendaservice.application.dto.VeterinarianRequest;
import com.riavet.agendaservice.application.dto.VeterinarianResponse;
import com.riavet.agendaservice.application.mapper.VeterinarianMapper;
import com.riavet.agendaservice.domain.model.Veterinarian;
import com.riavet.agendaservice.domain.repository.VeterinarianRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VeterinarianServiceImpl implements VeterinarianService {

    private final VeterinarianRepository veterinarianRepository;
    private final VeterinarianMapper veterinarianMapper;

    @Override
    public VeterinarianResponse createVeterinarian(VeterinarianRequest request) {
        log.info("Creating veterinarian with email: {}", request.getEmail());

        // Validar que el email no exista
        if (veterinarianRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Veterinarian with email " + request.getEmail() + " already exists");
        }

        // Validar que el license number no exista
        if (veterinarianRepository.findByLicenseNumber(request.getLicenseNumber()).isPresent()) {
            throw new RuntimeException("Veterinarian with license number " + request.getLicenseNumber() + " already exists");
        }

        Veterinarian veterinarian = veterinarianMapper.toEntity(request);
        Veterinarian savedVeterinarian = veterinarianRepository.save(veterinarian);

        log.info("Veterinarian created successfully with ID: {}", savedVeterinarian.getId());
        return veterinarianMapper.toResponse(savedVeterinarian);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VeterinarianResponse> getAllVeterinarians() {
        log.info("Retrieving all veterinarians");
        List<Veterinarian> veterinarians = veterinarianRepository.findAll();
        return veterinarians.stream()
                .map(veterinarianMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VeterinarianResponse> getActiveVeterinarians() {
        log.info("Retrieving active veterinarians");
        List<Veterinarian> veterinarians = veterinarianRepository.findAllActive();
        return veterinarians.stream()
                .map(veterinarianMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VeterinarianResponse> getVeterinarianById(UUID id) {
        log.info("Retrieving veterinarian by ID: {}", id);
        return veterinarianRepository.findById(id)
                .map(veterinarianMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VeterinarianResponse> getVeterinarianByEmail(String email) {
        log.info("Retrieving veterinarian by email: {}", email);
        return veterinarianRepository.findByEmail(email)
                .map(veterinarianMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VeterinarianResponse> getVeterinarianByLicenseNumber(String licenseNumber) {
        log.info("Retrieving veterinarian by license number: {}", licenseNumber);
        return veterinarianRepository.findByLicenseNumber(licenseNumber)
                .map(veterinarianMapper::toResponse);
    }

    @Override
    public VeterinarianResponse updateVeterinarian(UUID id, VeterinarianRequest request) {
        log.info("Updating veterinarian with ID: {}", id);

        Veterinarian veterinarian = veterinarianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veterinarian not found with ID: " + id));

        // Validar que el email no exista en otro veterinario
        if (veterinarianRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new RuntimeException("Email " + request.getEmail() + " is already used by another veterinarian");
        }

        // Validar que el license number no exista en otro veterinario
        if (veterinarianRepository.existsByLicenseNumberAndIdNot(request.getLicenseNumber(), id)) {
            throw new RuntimeException("License number " + request.getLicenseNumber() + " is already used by another veterinarian");
        }

        veterinarianMapper.updateEntity(veterinarian, request);
        Veterinarian updatedVeterinarian = veterinarianRepository.save(veterinarian);

        log.info("Veterinarian updated successfully with ID: {}", updatedVeterinarian.getId());
        return veterinarianMapper.toResponse(updatedVeterinarian);
    }

    @Override
    public void deactivateVeterinarian(UUID id) {
        log.info("Deactivating veterinarian with ID: {}", id);

        Veterinarian veterinarian = veterinarianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veterinarian not found with ID: " + id));

        veterinarian.setActive(false);
        veterinarianRepository.save(veterinarian);

        log.info("Veterinarian deactivated successfully with ID: {}", id);
    }

    @Override
    public void deleteVeterinarian(UUID id) {
        log.info("Deleting veterinarian with ID: {}", id);

        if (!veterinarianRepository.existsById(id)) {
            throw new RuntimeException("Veterinarian not found with ID: " + id);
        }

        veterinarianRepository.deleteById(id);
        log.info("Veterinarian deleted successfully with ID: {}", id);
    }
}
