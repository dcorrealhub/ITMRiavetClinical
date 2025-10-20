package com.riavet.dianservice.infrastructure.adapter.output;

import com.riavet.dianservice.application.dto.DianInvoiceRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.UUID;

@Component
@Slf4j
public class DianClientAdapter {

    private final Random random = new Random();

    public DianClientResponse enviarFactura(DianInvoiceRequest request) {
        log.info("Simulando envío a DIAN para factura: {}", request.getInvoiceId());

        // Simular latencia de red
        try {
            Thread.sleep(random.nextInt(1000) + 500); // 500-1500ms
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Generar respuesta aleatoria (90% exitosa)
        boolean isSuccess = random.nextDouble() < 0.9;
        String dianCode = generateDianCode();
        String message = isSuccess ? 
            "Factura aceptada por la DIAN" : 
            "Factura rechazada: " + generateRandomError();

        log.info("Respuesta DIAN simulada - Código: {}, Éxito: {}", dianCode, isSuccess);

        return DianClientResponse.builder()
                .success(isSuccess)
                .dianCode(dianCode)
                .message(message)
                .build();
    }

    private String generateDianCode() {
        return "DIAN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private String generateRandomError() {
        String[] errors = {
            "Información del contribuyente inválida",
            "Formato XML incorrecto",
            "NIT no autorizado para facturación electrónica",
            "Numeración fuera de rango autorizado",
            "Datos fiscales inconsistentes"
        };
        return errors[random.nextInt(errors.length)];
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DianClientResponse {
        private boolean success;
        private String dianCode;
        private String message;
    }
}
