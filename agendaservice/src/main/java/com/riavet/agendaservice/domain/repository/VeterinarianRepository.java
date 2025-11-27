package com.riavet.agendaservice.domain.repository;

import com.riavet.agendaservice.domain.model.Veterinarian;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, UUID> {

    Optional<Veterinarian> findByEmail(String email);

    Optional<Veterinarian> findByLicenseNumber(String licenseNumber);

    @Query("SELECT v FROM Veterinarian v WHERE v.active = true")
    List<Veterinarian> findAllActive();

    boolean existsByEmailAndIdNot(String email, UUID id);

    boolean existsByLicenseNumberAndIdNot(String licenseNumber, UUID id);
}
