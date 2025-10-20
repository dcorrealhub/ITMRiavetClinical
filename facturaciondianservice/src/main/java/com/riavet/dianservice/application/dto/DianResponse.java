package com.riavet.dianservice.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DianResponse {

    private UUID invoiceId;
    private String status;
    private String dianCode;
    private String message;
    private LocalDateTime processedAt;
}
