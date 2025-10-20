package com.riavet.billingservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponse {

    private UUID id;
    private UUID patientId;
    private LocalDateTime date;
    private BigDecimal total;
    private String status;
    private String items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
