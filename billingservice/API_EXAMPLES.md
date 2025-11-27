# API Examples - Billing Service

Ejemplos de uso de la API del Billing Service.

## Base URL
```
http://localhost:8083/api/v1/invoices
```

## 1. Crear una nueva factura

### Solicitud
```bash
curl -X POST http://localhost:8083/api/v1/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "total": 150.50,
    "items": "Consulta veterinaria + Vacuna antirrábica"
  }'
```

### Respuesta (201 Created)
```json
{
  "id": "987fcdeb-51a2-4567-8901-234567890abc",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2024-10-19T20:15:30",
  "total": 150.50,
  "status": "DRAFT",
  "items": "Consulta veterinaria + Vacuna antirrábica",
  "createdAt": "2024-10-19T20:15:30",
  "updatedAt": "2024-10-19T20:15:30"
}
```

## 2. Listar todas las facturas

### Solicitud
```bash
curl -X GET http://localhost:8083/api/v1/invoices
```

### Respuesta (200 OK)
```json
[
  {
    "id": "987fcdeb-51a2-4567-8901-234567890abc",
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "date": "2024-10-19T20:15:30",
    "total": 150.50,
    "status": "DRAFT",
    "items": "Consulta veterinaria + Vacuna antirrábica",
    "createdAt": "2024-10-19T20:15:30",
    "updatedAt": "2024-10-19T20:15:30"
  }
]
```

## 3. Obtener factura por ID

### Solicitud
```bash
curl -X GET http://localhost:8083/api/v1/invoices/987fcdeb-51a2-4567-8901-234567890abc
```

### Respuesta (200 OK)
```json
{
  "id": "987fcdeb-51a2-4567-8901-234567890abc",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2024-10-19T20:15:30",
  "total": 150.50,
  "status": "DRAFT",
  "items": "Consulta veterinaria + Vacuna antirrábica",
  "createdAt": "2024-10-19T20:15:30",
  "updatedAt": "2024-10-19T20:15:30"
}
```

## 4. Actualizar factura existente

### Solicitud
```bash
curl -X PUT http://localhost:8083/api/v1/invoices/987fcdeb-51a2-4567-8901-234567890abc \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "total": 200.75,
    "items": "Consulta veterinaria + Vacuna antirrábica + Desparasitación"
  }'
```

### Respuesta (200 OK)
```json
{
  "id": "987fcdeb-51a2-4567-8901-234567890abc",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "date": "2024-10-19T20:15:30",
  "total": 200.75,
  "status": "DRAFT",
  "items": "Consulta veterinaria + Vacuna antirrábica + Desparasitación",
  "createdAt": "2024-10-19T20:15:30",
  "updatedAt": "2024-10-19T20:25:45"
}
```

## 5. Respuestas de error

### Factura no encontrada (404 Not Found)
```json
{
  "timestamp": "2024-10-19T20:15:30",
  "status": 404,
  "error": "Not Found",
  "message": "Invoice not found with id: 123e4567-e89b-12d3-a456-426614174000",
  "path": "/api/v1/invoices"
}
```

### Error de validación (400 Bad Request)
```json
{
  "timestamp": "2024-10-19T20:15:30",
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid input data",
  "path": "/api/v1/invoices",
  "validationErrors": {
    "patientId": "Patient ID is required",
    "total": "Total must be positive"
  }
}
```

## 6. Estados de factura disponibles

- `DRAFT` - Borrador (estado inicial)
- `SENT` - Enviada
- `PAID` - Pagada
- `CANCELED` - Cancelada

## 7. Usando HTTPie (alternativa a curl)

### Crear factura
```bash
http POST localhost:8083/api/v1/invoices \
  patientId="123e4567-e89b-12d3-a456-426614174000" \
  total:=150.50 \
  items="Consulta veterinaria + Vacuna antirrábica"
```

### Listar facturas
```bash
http GET localhost:8083/api/v1/invoices
```

### Obtener factura por ID
```bash
http GET localhost:8083/api/v1/invoices/987fcdeb-51a2-4567-8901-234567890abc
```

### Actualizar factura
```bash
http PUT localhost:8083/api/v1/invoices/987fcdeb-51a2-4567-8901-234567890abc \
  patientId="123e4567-e89b-12d3-a456-426614174000" \
  total:=200.75 \
  items="Consulta veterinaria + Vacuna antirrábica + Desparasitación"
```

## 8. Documentación interactiva

Una vez que el servicio esté ejecutándose, puedes explorar la API interactivamente en:
- **Swagger UI**: http://localhost:8083/swagger-ui.html
