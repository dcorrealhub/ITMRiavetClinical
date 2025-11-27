package com.riavet.agendaservice.domain.repository;

import com.riavet.agendaservice.domain.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    
    @Query("SELECT a FROM Appointment a WHERE a.veterinarian.id = :veterinarianId")
    List<Appointment> findByVeterinarianId(@Param("veterinarianId") UUID veterinarianId);

    @Query("SELECT a FROM Appointment a JOIN FETCH a.veterinarian")
    List<Appointment> findAllWithVeterinarian();

    @Query("SELECT a FROM Appointment a JOIN FETCH a.veterinarian WHERE a.id = :id")
    java.util.Optional<Appointment> findByIdWithVeterinarian(@Param("id") UUID id);
}
