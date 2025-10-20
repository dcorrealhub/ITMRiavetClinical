package com.riavet.billingservice.infrastructure.adapter.output;

import com.riavet.billingservice.domain.model.Invoice;
import com.riavet.billingservice.domain.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class InvoicePersistenceAdapter {

    private final InvoiceRepository invoiceRepository;

    public Invoice save(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Optional<Invoice> findById(UUID id) {
        return invoiceRepository.findById(id);
    }

    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    public void deleteById(UUID id) {
        invoiceRepository.deleteById(id);
    }

    public boolean existsById(UUID id) {
        return invoiceRepository.existsById(id);
    }
}
