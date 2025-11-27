package com.riavet.clinicalrecordservice.application.service;

import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordRequest;
import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordResponse;

import java.util.List;

public interface ClinicalRecordService {

    ClinicalRecordResponse createClinicalRecord(ClinicalRecordRequest request);

    ClinicalRecordResponse getClinicalRecordById(String id);

    List<ClinicalRecordResponse> getAllClinicalRecords();

    List<ClinicalRecordResponse> getClinicalRecordsByPatientId(String patientId);

    List<ClinicalRecordResponse> getClinicalRecordsByVeterinarianId(String veterinarianId);

    List<ClinicalRecordResponse> getClinicalRecordsByStatus(String status);

    List<ClinicalRecordResponse> getClinicalRecordsByPatientIdAndStatus(String patientId, String status);

    ClinicalRecordResponse updateClinicalRecord(String id, ClinicalRecordRequest request);

    void deleteClinicalRecord(String id);
}
