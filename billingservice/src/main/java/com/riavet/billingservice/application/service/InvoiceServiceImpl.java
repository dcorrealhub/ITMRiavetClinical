package com.riavet.billingservice.application.service;

import com.riavet.billingservice.application.dto.InvoiceRequest;
import com.riavet.billingservice.application.dto.InvoiceResponse;
import com.riavet.billingservice.application.mapper.InvoiceMapper;
import com.riavet.billingservice.domain.model.Invoice;
import com.riavet.billingservice.domain.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;

    @Override
    public InvoiceResponse createInvoice(InvoiceRequest request) {
        Invoice invoice = invoiceMapper.toEntity(request);
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return invoiceMapper.toResponse(savedInvoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoiceMapper.toResponseList(invoices);
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponse getInvoiceById(UUID id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new InvoiceNotFoundException("Invoice not found with id: " + id));
        return invoiceMapper.toResponse(invoice);
    }

    public static class InvoiceNotFoundException extends RuntimeException {
        public InvoiceNotFoundException(String message) {
            super(message);
        }
    }
}
