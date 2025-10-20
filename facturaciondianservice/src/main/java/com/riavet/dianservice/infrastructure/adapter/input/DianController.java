package com.riavet.dianservice.infrastructure.adapter.input;

import com.riavet.dianservice.application.dto.DianInvoiceRequest;
import com.riavet.dianservice.application.dto.DianResponse;
import com.riavet.dianservice.application.service.DianService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dian")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "DIAN Service", description = "APIs para gestión de facturas electrónicas con la DIAN")
public class DianController {

    private final DianService dianService;

    @PostMapping("/invoices")
    @Operation(summary = "Enviar factura a la DIAN", description = "Envía una factura electrónica a la DIAN para su validación")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Factura enviada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
            @ApiResponse(responseCode = "409", description = "La factura ya existe"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<DianResponse> enviarFactura(@Valid @RequestBody DianInvoiceRequest request) {
        log.info("Recibida solicitud para enviar factura: {}", request.getInvoiceId());
        
        DianResponse response = dianService.enviarFactura(request);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{invoiceId}")
    @Operation(summary = "Consultar estado de factura", description = "Consulta el estado actual de una factura en la DIAN")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Estado consultado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Factura no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<DianResponse> consultarEstado(@PathVariable UUID invoiceId) {
        log.info("Consultando estado de factura: {}", invoiceId);
        
        DianResponse response = dianService.consultarEstado(invoiceId);
        
        return ResponseEntity.ok(response);
    }
}
