package com.riavet.dianservice.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "dian_invoices")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DianInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "invoice_id", nullable = false, unique = true)
    private UUID invoiceId;

    @Column(name = "xml_payload", columnDefinition = "TEXT", nullable = false)
    private String xmlPayload;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DianStatus status;

    @Column(name = "dian_code")
    private String dianCode;

    @Column(name = "message")
    private String message;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum DianStatus {
        PENDING,
        SENT,
        ACCEPTED,
        REJECTED
    }
}
