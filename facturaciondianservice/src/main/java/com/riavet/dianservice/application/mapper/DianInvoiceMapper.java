package com.riavet.dianservice.application.mapper;

import com.riavet.dianservice.application.dto.DianInvoiceRequest;
import com.riavet.dianservice.application.dto.DianResponse;
import com.riavet.dianservice.domain.model.DianInvoice;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DianInvoiceMapper {

    public DianInvoice toEntity(DianInvoiceRequest request) {
        return DianInvoice.builder()
                .invoiceId(request.getInvoiceId())
                .xmlPayload(request.getXmlPayload())
                .status(DianInvoice.DianStatus.PENDING)
                .build();
    }

    public DianResponse toResponse(DianInvoice entity) {
        return DianResponse.builder()
                .invoiceId(entity.getInvoiceId())
                .status(entity.getStatus().name())
                .dianCode(entity.getDianCode())
                .message(entity.getMessage())
                .processedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt() : entity.getCreatedAt())
                .build();
    }
}
