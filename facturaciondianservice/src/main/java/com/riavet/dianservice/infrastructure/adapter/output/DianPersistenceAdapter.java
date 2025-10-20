package com.riavet.dianservice.infrastructure.adapter.output;

import com.riavet.dianservice.domain.model.DianInvoice;
import com.riavet.dianservice.domain.repository.DianInvoiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class DianPersistenceAdapter {

    private final DianInvoiceRepository repository;

    public DianInvoice save(DianInvoice invoice) {
        log.debug("Guardando factura en base de datos: {}", invoice.getInvoiceId());
        return repository.save(invoice);
    }

    public Optional<DianInvoice> findByInvoiceId(UUID invoiceId) {
        log.debug("Buscando factura por ID: {}", invoiceId);
        return repository.findByInvoiceId(invoiceId);
    }

    public boolean existsByInvoiceId(UUID invoiceId) {
        log.debug("Verificando existencia de factura: {}", invoiceId);
        return repository.existsByInvoiceId(invoiceId);
    }
}
