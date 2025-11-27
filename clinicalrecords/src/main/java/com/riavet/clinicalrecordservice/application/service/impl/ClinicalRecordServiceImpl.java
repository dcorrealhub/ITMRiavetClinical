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

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClinicalRecordServiceImpl implements ClinicalRecordService {

    private final ClinicalRecordRepository clinicalRecordRepository;
    private final ClinicalRecordMapper clinicalRecordMapper;

    @Override
    public ClinicalRecordResponse createClinicalRecord(ClinicalRecordRequest request) {
        log.info("Creating clinical record for patient: {}", request.getPatientId());
        
        ClinicalRecord clinicalRecord = clinicalRecordMapper.toEntity(request);
        ClinicalRecord savedRecord = clinicalRecordRepository.save(clinicalRecord);
        
        log.info("Clinical record created with ID: {}", savedRecord.getId());
        return clinicalRecordMapper.toResponse(savedRecord);
    }

    @Override
    public ClinicalRecordResponse getClinicalRecordById(String id) {
        log.info("Fetching clinical record with ID: {}", id);
        
        ClinicalRecord clinicalRecord = clinicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clinical record not found with ID: " + id));
        
        return clinicalRecordMapper.toResponse(clinicalRecord);
    }

    @Override
    public List<ClinicalRecordResponse> getAllClinicalRecords() {
        log.info("Fetching all clinical records");
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findAll();
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    public List<ClinicalRecordResponse> getClinicalRecordsByPatientId(String patientId) {
        log.info("Fetching clinical records for patient: {}", patientId);
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findByPatientId(patientId);
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    public List<ClinicalRecordResponse> getClinicalRecordsByVeterinarianId(String veterinarianId) {
        log.info("Fetching clinical records for veterinarian: {}", veterinarianId);
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findByVeterinarianId(veterinarianId);
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    public List<ClinicalRecordResponse> getClinicalRecordsByStatus(String status) {
        log.info("Fetching clinical records with status: {}", status);
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findByStatus(status);
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    public List<ClinicalRecordResponse> getClinicalRecordsByPatientIdAndStatus(String patientId, String status) {
        log.info("Fetching clinical records for patient: {} with status: {}", patientId, status);
        
        List<ClinicalRecord> clinicalRecords = clinicalRecordRepository.findByPatientIdAndStatus(patientId, status);
        return clinicalRecordMapper.toResponseList(clinicalRecords);
    }

    @Override
    public ClinicalRecordResponse updateClinicalRecord(String id, ClinicalRecordRequest request) {
        log.info("Updating clinical record with ID: {}", id);
        
        ClinicalRecord existingRecord = clinicalRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clinical record not found with ID: " + id));
        
        // Actualizar campos
        existingRecord.setPatientId(request.getPatientId());
        existingRecord.setVeterinarianId(request.getVeterinarianId());
        existingRecord.setDiagnosis(request.getDiagnosis());
        existingRecord.setProcedures(request.getProcedures());
        existingRecord.setAttachments(request.getAttachments());
        existingRecord.setMedicalOrders(request.getMedicalOrders());
        existingRecord.setPrescription(request.getPrescription());
        existingRecord.setFollowUpDate(request.getFollowUpDate());
        existingRecord.setStatus(request.getStatus());
        
        ClinicalRecord updatedRecord = clinicalRecordRepository.save(existingRecord);
        
        log.info("Clinical record updated with ID: {}", updatedRecord.getId());
        return clinicalRecordMapper.toResponse(updatedRecord);
    }

    @Override
    public void deleteClinicalRecord(String id) {
        log.info("Deleting clinical record with ID: {}", id);
        
        if (!clinicalRecordRepository.existsById(id)) {
            throw new RuntimeException("Clinical record not found with ID: " + id);
        }
        
        clinicalRecordRepository.deleteById(id);
        
        log.info("Clinical record deleted with ID: {}", id);
    }
}
