package com.riavet.telemedicinaservice.application.service;

import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionRequest;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionResponse;
import com.riavet.telemedicinaservice.application.dto.TelemedicineSessionUpdateRequest;
import com.riavet.telemedicinaservice.application.mapper.TelemedicineSessionMapper;
import com.riavet.telemedicinaservice.domain.model.TelemedicineSession;
import com.riavet.telemedicinaservice.domain.repository.TelemedicineSessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TelemedicineServiceImpl implements TelemedicineService {

    private final TelemedicineSessionRepository repository;
    private final TelemedicineSessionMapper mapper;

    @Override
    public TelemedicineSessionResponse createSession(TelemedicineSessionRequest request) {
        log.info("Creating new telemedicine session for patient: {} and veterinarian: {}", 
                request.getPatientId(), request.getVeterinarianId());
        
        TelemedicineSession session = mapper.toEntity(request);
        TelemedicineSession savedSession = repository.save(session);
        
        log.info("Telemedicine session created with ID: {}", savedSession.getId());
        return mapper.toResponse(savedSession);
    }

    @Override
    public TelemedicineSessionResponse startSession(UUID sessionId) {
        log.info("Starting telemedicine session with ID: {}", sessionId);
        
        TelemedicineSession session = findSessionById(sessionId);
        
        if (session.getStatus() != TelemedicineSession.SessionStatus.SCHEDULED) {
            throw new IllegalStateException("Only scheduled sessions can be started. Current status: " + session.getStatus());
        }
        
        session.setStatus(TelemedicineSession.SessionStatus.IN_PROGRESS);
        session.setStartedAt(LocalDateTime.now());
        session.setUpdatedAt(LocalDateTime.now());
        
        TelemedicineSession updatedSession = repository.save(session);
        
        log.info("Telemedicine session started successfully: {}", sessionId);
        return mapper.toResponse(updatedSession);
    }

    @Override
    public TelemedicineSessionResponse endSession(UUID sessionId, TelemedicineSessionUpdateRequest updateRequest) {
        log.info("Ending telemedicine session with ID: {}", sessionId);
        
        TelemedicineSession session = findSessionById(sessionId);
        
        if (session.getStatus() != TelemedicineSession.SessionStatus.IN_PROGRESS) {
            throw new IllegalStateException("Only in-progress sessions can be ended. Current status: " + session.getStatus());
        }
        
        session.setStatus(TelemedicineSession.SessionStatus.COMPLETED);
        session.setEndedAt(LocalDateTime.now());
        session.setUpdatedAt(LocalDateTime.now());
        
        if (updateRequest != null && updateRequest.getNotes() != null) {
            session.setNotes(updateRequest.getNotes());
        }
        
        TelemedicineSession updatedSession = repository.save(session);
        
        log.info("Telemedicine session ended successfully: {}", sessionId);
        return mapper.toResponse(updatedSession);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TelemedicineSessionResponse> getAllSessions(TelemedicineSession.SessionStatus status, UUID veterinarianId) {
        log.info("Retrieving telemedicine sessions with filters - status: {}, veterinarianId: {}", status, veterinarianId);
        
        List<TelemedicineSession> sessions = repository.findSessionsWithFilters(status, veterinarianId);
        
        log.info("Found {} telemedicine sessions", sessions.size());
        return mapper.toResponseList(sessions);
    }

    @Override
    @Transactional(readOnly = true)
    public TelemedicineSessionResponse getSessionById(UUID sessionId) {
        log.info("Retrieving telemedicine session by ID: {}", sessionId);
        
        TelemedicineSession session = findSessionById(sessionId);
        return mapper.toResponse(session);
    }

    private TelemedicineSession findSessionById(UUID sessionId) {
        return repository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Telemedicine session not found with ID: " + sessionId));
    }
}
