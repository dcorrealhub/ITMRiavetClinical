package com.riavet.billingservice.application.mapper;

import com.riavet.billingservice.application.dto.InvoiceRequest;
import com.riavet.billingservice.application.dto.InvoiceResponse;
import com.riavet.billingservice.domain.model.Invoice;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class InvoiceMapper {

    public Invoice toEntity(InvoiceRequest request) {
        return Invoice.builder()
                .patientId(request.getPatientId())
                .total(request.getTotal())
                .items(request.getItems())
                .date(LocalDateTime.now())
                .status(Invoice.InvoiceStatus.DRAFT)
                .build();
    }

    public InvoiceResponse toResponse(Invoice invoice) {
        return InvoiceResponse.builder()
                .id(invoice.getId())
                .patientId(invoice.getPatientId())
                .date(invoice.getDate())
                .total(invoice.getTotal())
                .status(invoice.getStatus().name())
                .items(invoice.getItems())
                .createdAt(invoice.getCreatedAt())
                .updatedAt(invoice.getUpdatedAt())
                .build();
    }

    public List<InvoiceResponse> toResponseList(List<Invoice> invoices) {
        return invoices.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
}
