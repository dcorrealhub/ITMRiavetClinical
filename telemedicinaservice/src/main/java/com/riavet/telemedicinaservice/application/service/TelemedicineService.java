package com.riavet.telemedicinaservice.application.service;

import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionRequest;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionResponse;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionUpdateRequest;
import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;

import java.util.List;
import java.util.UUID;

public interface TelemedicineService {

    TelemedicineSessionResponse createSession(TelemedicineSessionRequest request);

    TelemedicineSessionResponse startSession(UUID sessionId);

    TelemedicineSessionResponse endSession(UUID sessionId, TelemedicineSessionUpdateRequest updateRequest);

    List<TelemedicineSessionResponse> getAllSessions(TelemedicineSession.SessionStatus status, UUID veterinarianId);

    TelemedicineSessionResponse getSessionById(UUID sessionId);
}
