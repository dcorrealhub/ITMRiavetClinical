package com.riavet.agendaservice.domain.repository;

import com.riavet.agendaservice.domain.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    
    List<Appointment> findByVeterinarianId(UUID veterinarianId);
}
