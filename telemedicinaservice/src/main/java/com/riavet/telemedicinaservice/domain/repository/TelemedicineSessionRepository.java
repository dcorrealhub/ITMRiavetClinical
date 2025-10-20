package com.riavet.telemedicinaservice.domain.repository;

import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TelemedicineSessionRepository extends JpaRepository<TelemedicineSession, UUID> {

    @Query("SELECT t FROM TelemedicineSession t WHERE " +
           "(:status IS NULL OR t.status = :status) AND " +
           "(:veterinarianId IS NULL OR t.veterinarianId = :veterinarianId) " +
           "ORDER BY t.scheduledAt DESC")
    List<TelemedicineSession> findSessionsWithFilters(
            @Param("status") TelemedicineSession.SessionStatus status,
            @Param("veterinarianId") UUID veterinarianId
    );

    List<TelemedicineSession> findByVeterinarianIdOrderByScheduledAtDesc(UUID veterinarianId);

    List<TelemedicineSession> findByPatientIdOrderByScheduledAtDesc(UUID patientId);

    List<TelemedicineSession> findByStatusOrderByScheduledAtDesc(TelemedicineSession.SessionStatus status);
}
