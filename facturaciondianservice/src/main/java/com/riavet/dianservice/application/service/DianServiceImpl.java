package com.riavet.dianservice.application.service;

import com.riavet.dianservice.application.dto.DianInvoiceRequest;
import com.riavet.dianservice.application.dto.DianResponse;
import com.riavet.dianservice.application.mapper.DianInvoiceMapper;
import com.riavet.dianservice.domain.model.DianInvoice;
import com.riavet.dianservice.domain.repository.DianInvoiceRepository;
import com.riavet.dianservice.infrastructure.adapter.output.DianClientAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class DianServiceImpl implements DianService {

    private final DianInvoiceRepository repository;
    private final DianInvoiceMapper mapper;
    private final DianClientAdapter dianClientAdapter;

    @Override
    public DianResponse enviarFactura(DianInvoiceRequest request) {
        log.info("Enviando factura a DIAN para invoiceId: {}", request.getInvoiceId());

        // Verificar si ya existe
        if (repository.existsByInvoiceId(request.getInvoiceId())) {
            throw new IllegalArgumentException("Invoice with ID " + request.getInvoiceId() + " already exists");
        }

        // Crear entidad inicial
        DianInvoice invoice = mapper.toEntity(request);
        invoice = repository.save(invoice);

        // Simular envío a DIAN
        try {
            var dianResponse = dianClientAdapter.enviarFactura(request);
            
            // Actualizar estado basado en respuesta simulada
            invoice.setStatus(dianResponse.isSuccess() ? DianInvoice.DianStatus.ACCEPTED : DianInvoice.DianStatus.REJECTED);
            invoice.setDianCode(dianResponse.getDianCode());
            invoice.setMessage(dianResponse.getMessage());
            
            invoice = repository.save(invoice);
            
            log.info("Factura procesada exitosamente: {}", invoice.getInvoiceId());
            
        } catch (Exception e) {
            log.error("Error enviando factura a DIAN: {}", e.getMessage());
            invoice.setStatus(DianInvoice.DianStatus.REJECTED);
            invoice.setMessage("Error interno: " + e.getMessage());
            invoice = repository.save(invoice);
        }

        return mapper.toResponse(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public DianResponse consultarEstado(UUID invoiceId) {
        log.info("Consultando estado de factura: {}", invoiceId);

        DianInvoice invoice = repository.findByInvoiceId(invoiceId)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found with ID: " + invoiceId));

        return mapper.toResponse(invoice);
    }
}
