package com.riavet.dianservice.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DianInvoiceRequest {

    @NotNull(message = "Invoice ID is required")
    private UUID invoiceId;

    @NotBlank(message = "XML payload is required")
    private String xmlPayload;
}
