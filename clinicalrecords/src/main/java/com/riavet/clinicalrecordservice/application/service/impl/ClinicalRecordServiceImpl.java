package com.riavet.clinicalrecordservice.application.service.impl;

import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordRequest;
import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordResponse;
import com.riavet.clinicalrecordservice.application.mapper.ClinicalRecordMapper;
import com.riavet.clinicalrecordservice.application.service.ClinicalRecordService;
import com.riavet.clinicalrecordservice.domain.model.ClinicalRecord;
import com.riavet.clinicalrecordservice.domain.repository.ClinicalRecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClinicalRecordServiceImpl implements ClinicalRecordService {

    private final ClinicalRecordRepository clinicalRecordRepository;
    private final ClinicalRecordMapper clinicalRecordMapper;

    @Override
    @Transactional
    public ClinicalRecordResponse createClinicalRecord(ClinicalRecordRequest request) {
        log.info("Creating clinical record for patient: {}", request.getPatientId());
        
        ClinicalRecord clinicalRecord = clinicalRecordMapper.toEntity(request);
        ClinicalRecord savedRecord = clinicalRecordRepository.save(clinicalRecord);
        
        log.info("Clinical record created with ID: {}", savedRecord.getId());
        return clinicalRecordMapper.toResponse(savedRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public ClinicalRecordResponse getClinicalRecordById(UUID id) {
        log.info("Fetching clinical record with ID: {}", id);
        
        ClinicalRecord clinicalRecord = clinicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clinical record not found with ID: " + id));
        
        return clinicalRecordMapper.toResponse(clinicalRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClinicalRecordResponse> getAllClinicalRecords() {
        log.info("Fetching all clinical records");
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findAll();
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClinicalRecordResponse> getClinicalRecordsByPatientId(UUID patientId) {
        log.info("Fetching clinical records for patient: {}", patientId);
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findByPatientId(patientId);
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }
}
