# Ejemplos de uso de la API Telemedicina Service

Este documento contiene ejemplos prácticos de cómo usar la API REST del microservicio Telemedicina Service.

## 🚀 URL Base
```
http://localhost:8086
```

## 📊 Swagger UI
```
http://localhost:8086/swagger-ui.html
```

## 🗄️ H2 Console (Desarrollo)
```
http://localhost:8086/h2-console
JDBC URL: jdbc:h2:mem:telemedicinadb
Username: sa
Password: (vacío)
```

## 📋 Endpoints disponibles

### 1. **Crear nueva sesión de telemedicina**
```http
POST /api/v1/sessions
Content-Type: application/json

{
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Consulta de seguimiento post-operatorio"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": "987e6543-e21b-12d3-a456-426614174999",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "startedAt": null,
  "endedAt": null,
  "status": "SCHEDULED",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Consulta de seguimiento post-operatorio",
  "createdAt": "2024-10-19T21:14:07.123456",
  "updatedAt": "2024-10-19T21:14:07.123456"
}
```

### 2. **Iniciar sesión de telemedicina**
```http
PATCH /api/v1/sessions/987e6543-e21b-12d3-a456-426614174999/start
```

**Respuesta exitosa (200):**
```json
{
  "id": "987e6543-e21b-12d3-a456-426614174999",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "startedAt": "2024-12-25T10:05:00",
  "endedAt": null,
  "status": "IN_PROGRESS",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Consulta de seguimiento post-operatorio",
  "createdAt": "2024-10-19T21:14:07.123456",
  "updatedAt": "2024-12-25T10:05:00.789123"
}
```

### 3. **Finalizar sesión de telemedicina**
```http
PATCH /api/v1/sessions/987e6543-e21b-12d3-a456-426614174999/end
Content-Type: application/json

{
  "notes": "Paciente mostró mejoría significativa. Se recomienda continuar con el tratamiento actual por 2 semanas más."
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "987e6543-e21b-12d3-a456-426614174999",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "startedAt": "2024-12-25T10:05:00",
  "endedAt": "2024-12-25T10:35:00",
  "status": "COMPLETED",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Paciente mostró mejoría significativa. Se recomienda continuar con el tratamiento actual por 2 semanas más.",
  "createdAt": "2024-10-19T21:14:07.123456",
  "updatedAt": "2024-12-25T10:35:00.456789"
}
```

### 4. **Listar todas las sesiones**
```http
GET /api/v1/sessions
```

**Con filtros:**
```http
GET /api/v1/sessions?status=SCHEDULED
GET /api/v1/sessions?veterinarianId=123e4567-e89b-12d3-a456-426614174001
GET /api/v1/sessions?status=IN_PROGRESS&veterinarianId=123e4567-e89b-12d3-a456-426614174001
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": "987e6543-e21b-12d3-a456-426614174999",
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
    "scheduledAt": "2024-12-25T10:00:00",
    "startedAt": "2024-12-25T10:05:00",
    "endedAt": "2024-12-25T10:35:00",
    "status": "COMPLETED",
    "meetingUrl": "https://meet.google.com/abc-defg-hij",
    "notes": "Paciente mostró mejoría significativa.",
    "createdAt": "2024-10-19T21:14:07.123456",
    "updatedAt": "2024-12-25T10:35:00.456789"
  }
]
```

### 5. **Obtener sesión por ID**
```http
GET /api/v1/sessions/987e6543-e21b-12d3-a456-426614174999
```

**Respuesta exitosa (200):**
```json
{
  "id": "987e6543-e21b-12d3-a456-426614174999",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "startedAt": "2024-12-25T10:05:00",
  "endedAt": "2024-12-25T10:35:00",
  "status": "COMPLETED",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Paciente mostró mejoría significativa.",
  "createdAt": "2024-10-19T21:14:07.123456",
  "updatedAt": "2024-12-25T10:35:00.456789"
}
```

## 🧪 Ejemplos con cURL

### Crear sesión
```bash
curl -X POST http://localhost:8086/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
    "scheduledAt": "2024-12-25T10:00:00",
    "meetingUrl": "https://meet.google.com/abc-defg-hij",
    "notes": "Consulta de seguimiento"
  }'
```

### Iniciar sesión
```bash
curl -X PATCH http://localhost:8086/api/v1/sessions/{sessionId}/start
```

### Finalizar sesión
```bash
curl -X PATCH http://localhost:8086/api/v1/sessions/{sessionId}/end \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Sesión completada exitosamente"
  }'
```

### Listar sesiones
```bash
curl -X GET http://localhost:8086/api/v1/sessions
curl -X GET "http://localhost:8086/api/v1/sessions?status=SCHEDULED"
curl -X GET "http://localhost:8086/api/v1/sessions?veterinarianId=123e4567-e89b-12d3-a456-426614174001"
```

## 🔄 Estados de sesión

- **SCHEDULED**: Sesión programada (estado inicial)
- **IN_PROGRESS**: Sesión en curso (se puede cambiar desde SCHEDULED)
- **COMPLETED**: Sesión completada (se puede cambiar desde IN_PROGRESS)
- **CANCELED**: Sesión cancelada

## ⚠️ Códigos de error

- **400 Bad Request**: Datos de entrada inválidos o estado de sesión incorrecto
- **404 Not Found**: Sesión no encontrada
- **500 Internal Server Error**: Error interno del servidor

## 🔧 Cambiar a PostgreSQL

Para usar PostgreSQL en lugar de H2, ejecutar con el perfil `postgres`:

```bash
./gradlew bootRun --args='--spring.profiles.active=postgres'
```

Asegúrate de tener PostgreSQL corriendo y la base de datos `telemedicinadb` creada.
