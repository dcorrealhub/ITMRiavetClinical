package com.riavet.clinicalrecordservice.infrastructure.adapter.output;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import com.riavet.clinicalrecordservice.domain.repository.ClinicalRecordRepository;
import com.riavet.clinicalrecordservice.infrastructure.persistence.MongoClinicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ClinicalRecordRepositoryImpl implements ClinicalRecordRepository {

    private final MongoClinicalRecordRepository mongoClinicalRecordRepository;

    @Override
    public ClinicalRecord save(ClinicalRecord clinicalRecord) {
        return mongoClinicalRecordRepository.save(clinicalRecord);
    }

    @Override
    public Optional<ClinicalRecord> findById(String id) {
        return mongoClinicalRecordRepository.findById(id);
    }

    @Override
    public List<ClinicalRecord> findAll() {
        return mongoClinicalRecordRepository.findAllOrderByCreatedAtDesc();
    }

    @Override
    public List<ClinicalRecord> findByPatientId(String patientId) {
        return mongoClinicalRecordRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    @Override
    public List<ClinicalRecord> findByVeterinarianId(String veterinarianId) {
        return mongoClinicalRecordRepository.findByVeterinarianIdOrderByCreatedAtDesc(veterinarianId);
    }

    @Override
    public List<ClinicalRecord> findByStatus(String status) {
        return mongoClinicalRecordRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    @Override
    public List<ClinicalRecord> findByPatientIdAndStatus(String patientId, String status) {
        return mongoClinicalRecordRepository.findByPatientIdAndStatusOrderByCreatedAtDesc(patientId, status);
    }

    @Override
    public void deleteById(String id) {
        mongoClinicalRecordRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return mongoClinicalRecordRepository.existsById(id);
    }
}
