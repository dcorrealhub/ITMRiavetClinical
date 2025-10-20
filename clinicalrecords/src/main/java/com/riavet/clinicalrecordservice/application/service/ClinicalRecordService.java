package com.riavet.clinicalrecordservice.application.service;

import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordRequest;
import com.riavet.clinicalrecordservice.application.dto.ClinicalRecordResponse;

import java.util.List;
import java.util.UUID;

public interface ClinicalRecordService {

    ClinicalRecordResponse createClinicalRecord(ClinicalRecordRequest request);

    ClinicalRecordResponse getClinicalRecordById(UUID id);

    List<ClinicalRecordResponse> getAllClinicalRecords();

    List<ClinicalRecordResponse> getClinicalRecordsByPatientId(UUID patientId);
}
