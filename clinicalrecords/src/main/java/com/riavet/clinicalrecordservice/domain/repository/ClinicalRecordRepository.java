package com.riavet.clinicalrecordservice.domain.repository;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;

import java.util.List;
import java.util.Optional;

public interface ClinicalRecordRepository {
    
    ClinicalRecord save(ClinicalRecord clinicalRecord);
    
    Optional<ClinicalRecord> findById(String id);
    
    List<ClinicalRecord> findAll();
    
    List<ClinicalRecord> findByPatientId(String patientId);
    
    List<ClinicalRecord> findByVeterinarianId(String veterinarianId);
    
    List<ClinicalRecord> findByStatus(String status);
    
    List<ClinicalRecord> findByPatientIdAndStatus(String patientId, String status);
    
    void deleteById(String id);
    
    boolean existsById(String id);
}
