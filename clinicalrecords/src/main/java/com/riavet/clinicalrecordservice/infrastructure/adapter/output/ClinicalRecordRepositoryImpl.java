package com.riavet.clinicalrecordservice.infrastructure.adapter.output;

import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import com.riavet.clinicalrecordservice.domain.repository.ClinicalRecordRepository;
import com.riavet.clinicalrecordservice.infrastructure.persistence.JpaClinicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ClinicalRecordRepositoryImpl implements ClinicalRecordRepository {

    private final JpaClinicalRecordRepository jpaClinicalRecordRepository;

    @Override
    public ClinicalRecord save(ClinicalRecord clinicalRecord) {
        return jpaClinicalRecordRepository.save(clinicalRecord);
    }

    @Override
    public Optional<ClinicalRecord> findById(UUID id) {
        return jpaClinicalRecordRepository.findById(id);
    }

    @Override
    public List<ClinicalRecord> findAll() {
        return jpaClinicalRecordRepository.findAllOrderByCreatedAtDesc();
    }

    @Override
    public List<ClinicalRecord> findByPatientId(UUID patientId) {
        return jpaClinicalRecordRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    @Override
    public void deleteById(UUID id) {
        jpaClinicalRecordRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaClinicalRecordRepository.existsById(id);
    }
}
