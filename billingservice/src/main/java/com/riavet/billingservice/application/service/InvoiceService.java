package com.riavet.billingservice.application.service;

import com.riavet.billingservice.application.dto.InvoiceRequest;
import com.riavet.billingservice.application.dto.InvoiceResponse;

import java.util.List;
import java.util.UUID;

public interface InvoiceService {
    
    InvoiceResponse createInvoice(InvoiceRequest request);
    
    List<InvoiceResponse> getAllInvoices();
    
    InvoiceResponse getInvoiceById(UUID id);
}
