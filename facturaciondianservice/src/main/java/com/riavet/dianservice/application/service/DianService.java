package com.riavet.dianservice.application.service;

import com.riavet.dianservice.application.dto.DianInvoiceRequest;
import com.riavet.dianservice.application.dto.DianResponse;

import java.util.UUID;

public interface DianService {

    DianResponse enviarFactura(DianInvoiceRequest request);

    DianResponse consultarEstado(UUID invoiceId);
}
