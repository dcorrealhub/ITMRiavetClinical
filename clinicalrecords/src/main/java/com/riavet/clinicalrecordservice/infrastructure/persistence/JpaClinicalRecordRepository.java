package com.riavet.clinicalrecordservice.infrastructure.persistence;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JpaClinicalRecordRepository extends JpaRepository<ClinicalRecord, UUID> {

    @Query("SELECT cr FROM ClinicalRecord cr WHERE cr.patientId = :patientId ORDER BY cr.createdAt DESC")
    List<ClinicalRecord> findByPatientIdOrderByCreatedAtDesc(@Param("patientId") UUID patientId);

    @Query("SELECT cr FROM ClinicalRecord cr ORDER BY cr.createdAt DESC")
    List<ClinicalRecord> findAllOrderByCreatedAtDesc();
}
