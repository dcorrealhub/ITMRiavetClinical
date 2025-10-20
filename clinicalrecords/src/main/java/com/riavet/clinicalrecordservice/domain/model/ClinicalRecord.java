package com.riavet.clinicalrecordservice.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "clinical_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "patient_id", nullable = false)
    private UUID patientId;

    @Column(name = "veterinarian_id", nullable = false)
    private UUID veterinarianId;

    @Column(name = "diagnosis", nullable = false, length = 1000)
    private String diagnosis;

    @Column(name = "procedures", length = 2000)
    private String procedures;

    @Column(name = "attachments", length = 1000)
    private String attachments;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
