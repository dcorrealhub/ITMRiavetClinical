package com.riavet.clinicalrecordservice.infrastructure.persistence;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MongoClinicalRecordRepository extends MongoRepository<ClinicalRecord, String> {

    @Query("{ 'patient_id': ?0 }")
    List<ClinicalRecord> findByPatientIdOrderByCreatedAtDesc(String patientId);

    @Query("{ 'veterinarian_id': ?0 }")
    List<ClinicalRecord> findByVeterinarianIdOrderByCreatedAtDesc(String veterinarianId);

    @Query("{ 'status': ?0 }")
    List<ClinicalRecord> findByStatusOrderByCreatedAtDesc(String status);

    @Query("{ 'patient_id': ?0, 'status': ?1 }")
    List<ClinicalRecord> findByPatientIdAndStatusOrderByCreatedAtDesc(String patientId, String status);

    @Query("{ 'medical_orders': { $regex: ?0, $options: 'i' } }")
    List<ClinicalRecord> findByMedicalOrdersContainingIgnoreCase(String medicalOrder);

    @Query("{ 'diagnosis': { $regex: ?0, $options: 'i' } }")
    List<ClinicalRecord> findByDiagnosisContainingIgnoreCase(String diagnosis);

    // Query para encontrar todos ordenados por fecha de creación descendente
    @Query(value = "{}", sort = "{ 'created_at': -1 }")
    List<ClinicalRecord> findAllOrderByCreatedAtDesc();
}
