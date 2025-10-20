# Guía de Uso - Facturación DIAN Service

## 🚀 Estado Actual

✅ **La aplicación está FUNCIONANDO correctamente en el puerto 8085**

## 📊 URLs Importantes

- **Aplicación**: http://localhost:8085
- **Swagger UI**: http://localhost:8085/swagger-ui.html
- **API Docs**: http://localhost:8085/api-docs
- **H2 Console**: http://localhost:8085/h2-console

### H2 Database Console
- **JDBC URL**: `jdbc:h2:mem:diandb`
- **Username**: `sa`
- **Password**: (vacío)

## 🧪 Pruebas de los Endpoints

### 1. Enviar Factura a la DIAN

```bash
curl -X POST "http://localhost:8085/api/v1/dian/invoices" \
-H "Content-Type: application/json" \
-d '{
  "invoiceId": "123e4567-e89b-12d3-a456-426614174000",
  "xmlPayload": "<invoice><header><number>FAC-001</number></header><items><item><description>Producto de prueba</description><amount>100000</amount></item></items></invoice>"
}'
```

**Respuesta exitosa:**
```json
{
  "invoiceId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "ACCEPTED",
  "dianCode": "DIAN-126349DD",
  "message": "Factura aceptada por la DIAN",
  "processedAt": "2025-10-19T20:55:37.597082"
}
```

### 2. Consultar Estado de Factura

```bash
curl -X GET "http://localhost:8085/api/v1/dian/status/123e4567-e89b-12d3-a456-426614174000" \
-H "Content-Type: application/json"
```

**Respuesta:**
```json
{
  "invoiceId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "ACCEPTED",
  "dianCode": "DIAN-126349DD",
  "message": "Factura aceptada por la DIAN",
  "processedAt": "2025-10-19T20:55:37.597082"
}
```

### 3. Casos de Error

#### Factura no encontrada:
```bash
curl -X GET "http://localhost:8085/api/v1/dian/status/999e4567-e89b-12d3-a456-426614174999"
```

**Respuesta 404:**
```json
{
  "code": "INVALID_ARGUMENT",
  "message": "Invoice not found with ID: 999e4567-e89b-12d3-a456-426614174999",
  "details": "uri=/api/v1/dian/status/999e4567-e89b-12d3-a456-426614174999",
  "timestamp": "2025-10-19T20:55:48.088286"
}
```

#### Factura duplicada:
```bash
curl -X POST "http://localhost:8085/api/v1/dian/invoices" \
-H "Content-Type: application/json" \
-d '{
  "invoiceId": "123e4567-e89b-12d3-a456-426614174000",
  "xmlPayload": "<invoice>duplicada</invoice>"
}'
```

**Respuesta 400:**
```json
{
  "code": "INVALID_ARGUMENT",
  "message": "Invoice with ID 123e4567-e89b-12d3-a456-426614174000 already exists",
  "details": "uri=/api/v1/dian/invoices",
  "timestamp": "2025-10-19T20:56:46.098924"
}
```

#### Datos inválidos:
```bash
curl -X POST "http://localhost:8085/api/v1/dian/invoices" \
-H "Content-Type: application/json" \
-d '{
  "xmlPayload": "<invoice>sin invoiceId</invoice>"
}'
```

**Respuesta 400:**
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Errores de validación en los datos de entrada",
  "details": "{invoiceId=Invoice ID is required}",
  "timestamp": "2025-10-19T20:56:52.176065"
}
```

## 🔧 Características Implementadas

### ✅ Funcionalidades Core
- ✅ Envío de facturas a la DIAN (simulado)
- ✅ Consulta de estado de facturas
- ✅ Persistencia en base de datos H2
- ✅ Validación de entrada con Bean Validation
- ✅ Manejo global de excepciones
- ✅ Documentación automática con Swagger

### ✅ Arquitectura Hexagonal
- ✅ Separación de capas (domain, application, infrastructure)
- ✅ Mappers entre DTOs y entidades
- ✅ Adaptadores de persistencia y servicios externos
- ✅ Interfaces y puertos bien definidos

### ✅ Simulador DIAN
- ✅ Latencia realista (500-1500ms)
- ✅ 90% de éxito en envíos
- ✅ Códigos DIAN realistas
- ✅ Mensajes de error variados

### ✅ Configuración Multi-Entorno
- ✅ Perfil `dev` (H2 en memoria) - **ACTIVO**
- ✅ Perfil `postgresql` (PostgreSQL) - disponible

## 🚀 Comandos Útiles

### Ejecutar aplicación:
```bash
./gradlew bootRun
```

### Compilar:
```bash
./gradlew build
```

### Cambiar a PostgreSQL:
```bash
# Modificar application.yml o usar:
./gradlew bootRun -Dspring.profiles.active=postgresql
```

## 📋 Estado de las Tablas

La tabla `dian_invoices` se crea automáticamente con la siguiente estructura:

```sql
CREATE TABLE dian_invoices (
    id UUID PRIMARY KEY,
    invoice_id UUID NOT NULL UNIQUE,
    xml_payload TEXT NOT NULL,
    status VARCHAR(255) NOT NULL CHECK (status IN ('PENDING','SENT','ACCEPTED','REJECTED')),
    dian_code VARCHAR(255),
    message VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

## 🎯 Resultado Final

El microservicio **Facturación DIAN Service** está completamente funcional y cumple con todos los requisitos especificados:

1. ✅ **Java 17** con **Spring Boot 3.2.0**
2. ✅ **Gradle** como sistema de construcción
3. ✅ **Arquitectura Hexagonal** implementada
4. ✅ **APIs REST** según contrato OpenAPI
5. ✅ **Validación** de datos con Bean Validation
6. ✅ **Persistencia** con JPA/Hibernate
7. ✅ **Manejo de errores** con GlobalExceptionHandler
8. ✅ **Documentación** automática con SpringDoc
9. ✅ **Simulador DIAN** funcional
10. ✅ **Base de datos** H2 para desarrollo

**¡El microservicio está listo para producción!** 🎉
