package com.riavet.clinicalrecordservice.domain.repository;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClinicalRecordRepository {
    
    ClinicalRecord save(ClinicalRecord clinicalRecord);
    
    Optional<ClinicalRecord> findById(UUID id);
    
    List<ClinicalRecord> findAll();
    
    List<ClinicalRecord> findByPatientId(UUID patientId);
    
    void deleteById(UUID id);
    
    boolean existsById(UUID id);
}
