# Agenda Service API Documentation

## Información General

**Servicio:** Agenda Service  
**URL Base:** `http://localhost:8084`  
**Versión:** v1  
**Tipo de contenido:** `application/json`  
**Swagger UI:** `http://localhost:8084/swagger-ui.html`  
**OpenAPI Spec:** `http://localhost:8084/api-docs`

---

## Endpoints Disponibles

### 🩺 Gestión de Citas Veterinarias

#### 1. Crear Nueva Cita
**POST** `/api/v1/appointments`

Crea una nueva cita veterinaria. Ahora valida que el veterinario exista y esté activo.

**Request Body:**
```json
{
  "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
  "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477", 
  "scheduledAt": "2025-11-25T10:00:00"
}
```

**Response (201 Created):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
  "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
  "veterinarian": {
    "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "firstName": "Dr. Ana",
    "lastName": "García",
    "email": "ana.garcia@clinic.com",
    "phoneNumber": "+1234567890",
    "licenseNumber": "VET-2024-001",
    "specialization": "Small Animals",
    "active": true
  },
  "scheduledAt": "2025-11-25T10:00:00",
  "status": "PENDING",
  "createdAt": "2025-11-25T09:30:00",
  "updatedAt": "2025-11-25T09:30:00"
}
```

**Códigos de Respuesta:**
- `201` - Cita creada exitosamente
- `400` - Datos de la solicitud inválidos
- `404` - Veterinario no encontrado
- `409` - Veterinario inactivo
- `500` - Error interno del servidor

---

#### 2. Obtener Todas las Citas
**GET** `/api/v1/appointments`

Obtiene todas las citas o filtradas por veterinario. Ahora incluye información completa del veterinario.

**Query Parameters (Opcionales):**
- `veterinarianId`: UUID del veterinario para filtrar las citas

**Ejemplos:**
```bash
# Obtener todas las citas
GET /api/v1/appointments

# Obtener citas de un veterinario específico
GET /api/v1/appointments?veterinarianId=d47ac10b-58cc-4372-a567-0e02b2c3d477
```

**Response (200 OK):**
```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
    "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "veterinarian": {
      "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
      "firstName": "Dr. Ana",
      "lastName": "García",
      "email": "ana.garcia@clinic.com",
      "licenseNumber": "VET-2024-001",
      "specialization": "Small Animals",
      "active": true
    },
    "scheduledAt": "2025-11-25T10:00:00",
    "status": "PENDING",
    "createdAt": "2025-11-25T09:30:00",
    "updatedAt": "2025-11-25T09:30:00"
  }
]
```

**Códigos de Respuesta:**
- `200` - Citas obtenidas exitosamente
- `500` - Error interno del servidor

---

#### 3. Obtener Cita por ID
**GET** `/api/v1/appointments/{id}`

Obtiene una cita específica por su ID con información completa del veterinario.

**Path Parameters:**
- `id`: UUID de la cita

**Ejemplo:**
```bash
GET /api/v1/appointments/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

**Response (200 OK):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
  "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
  "veterinarian": {
    "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "firstName": "Dr. Ana",
    "lastName": "García",
    "email": "ana.garcia@clinic.com",
    "licenseNumber": "VET-2024-001",
    "specialization": "Small Animals",
    "active": true
  },
  "scheduledAt": "2025-11-25T10:00:00",
  "status": "PENDING",
  "createdAt": "2025-11-25T09:30:00",
  "updatedAt": "2025-11-25T09:30:00"
}
```

**Códigos de Respuesta:**
- `200` - Cita encontrada
- `404` - Cita no encontrada
- `500` - Error interno del servidor

---

#### 4. Actualizar Estado de Cita
**PUT** `/api/v1/appointments/{id}/status`

Actualiza el estado de una cita existente con validaciones de transiciones válidas.

**Path Parameters:**
- `id`: UUID de la cita

**Request Body:**
```json
{
  "status": "CONFIRMED",
  "reason": "Patient confirmed attendance"
}
```

**Response (200 OK):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
  "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
  "veterinarian": {
    "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "firstName": "Dr. Ana",
    "lastName": "García",
    "email": "ana.garcia@clinic.com",
    "licenseNumber": "VET-2024-001",
    "specialization": "Small Animals",
    "active": true
  },
  "scheduledAt": "2025-11-25T10:00:00",
  "status": "CONFIRMED",
  "createdAt": "2025-11-25T09:30:00",
  "updatedAt": "2025-11-25T11:00:00"
}
```

**Transiciones de Estado Válidas:**
- `PENDING` → `CONFIRMED` ✅
- `PENDING` → `CANCELED` ✅  
- `CONFIRMED` → `COMPLETED` ✅
- `CONFIRMED` → `CANCELED` ✅
- `COMPLETED` → *No se permiten cambios* ❌
- `CANCELED` → *No se permiten cambios* ❌

**Códigos de Respuesta:**
- `200` - Estado actualizado exitosamente
- `400` - Transición de estado inválida o datos inválidos
- `404` - Cita no encontrada
- `500` - Error interno del servidor

---

#### 5. Cancelar Cita
**PATCH** `/api/v1/appointments/{id}/cancel`

Cancela una cita existente (método rápido para cambiar estado a CANCELED).

**Path Parameters:**
- `id`: UUID de la cita

**Query Parameters (Opcionales):**
- `reason`: Razón de la cancelación

**Ejemplo:**
```bash
PATCH /api/v1/appointments/f47ac10b-58cc-4372-a567-0e02b2c3d479/cancel?reason=Patient%20requested%20cancellation
```

**Response (200 OK):**
```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
  "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
  "veterinarian": {
    "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "firstName": "Dr. Ana",
    "lastName": "García",
    "email": "ana.garcia@clinic.com",
    "licenseNumber": "VET-2024-001",
    "specialization": "Small Animals",
    "active": true
  },
  "scheduledAt": "2025-11-25T10:00:00",
  "status": "CANCELED",
  "createdAt": "2025-11-25T09:30:00",
  "updatedAt": "2025-11-25T11:15:00"
}
```

**Códigos de Respuesta:**
- `200` - Cita cancelada exitosamente
- `400` - No se puede cancelar (ya está cancelada o completada)
- `404` - Cita no encontrada
- `500` - Error interno del servidor

---

### 👨‍⚕️ Gestión de Veterinarios

#### 1. Crear Nuevo Veterinario
**POST** `/api/v1/veterinarians`

Crea un nuevo veterinario en el sistema.

**Request Body:**
```json
{
  "firstName": "Dr. Ana",
  "lastName": "García",
  "email": "ana.garcia@clinic.com",
  "phoneNumber": "+1234567890",
  "licenseNumber": "VET-2024-001",
  "specialization": "Small Animals",
  "active": true
}
```

**Response (201 Created):**
```json
{
  "id": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
  "firstName": "Dr. Ana",
  "lastName": "García",
  "email": "ana.garcia@clinic.com",
  "phoneNumber": "+1234567890",
  "licenseNumber": "VET-2024-001",
  "specialization": "Small Animals",
  "active": true,
  "createdAt": "2025-11-25T09:00:00",
  "updatedAt": "2025-11-25T09:00:00"
}
```

---

#### 2. Obtener Todos los Veterinarios
**GET** `/api/v1/veterinarians`

Obtiene todos los veterinarios o solo los activos.

**Query Parameters (Opcionales):**
- `onlyActive`: boolean (default: false) - Filtrar solo veterinarios activos

**Ejemplos:**
```bash
# Obtener todos los veterinarios
GET /api/v1/veterinarians

# Obtener solo veterinarios activos
GET /api/v1/veterinarians?onlyActive=true
```

---

#### 3. Obtener Veterinario por ID
**GET** `/api/v1/veterinarians/{id}`

**Ejemplo:**
```bash
GET /api/v1/veterinarians/d47ac10b-58cc-4372-a567-0e02b2c3d477
```

---

#### 4. Obtener Veterinario por Email
**GET** `/api/v1/veterinarians/email/{email}`

**Ejemplo:**
```bash
GET /api/v1/veterinarians/email/ana.garcia@clinic.com
```

---

#### 5. Actualizar Veterinario
**PUT** `/api/v1/veterinarians/{id}`

**Request Body:**
```json
{
  "firstName": "Dr. Ana María",
  "lastName": "García López",
  "email": "ana.garcia@clinic.com",
  "phoneNumber": "+1234567890",
  "licenseNumber": "VET-2024-001",
  "specialization": "Small Animals & Exotic Pets",
  "active": true
}
```

---

#### 6. Desactivar Veterinario
**PATCH** `/api/v1/veterinarians/{id}/deactivate`

Desactiva un veterinario (soft delete). No podrá recibir nuevas citas.

---

#### 7. Eliminar Veterinario
**DELETE** `/api/v1/veterinarians/{id}`

Elimina permanentemente un veterinario del sistema.

---

## 📋 Modelos de Datos

### AppointmentRequest
Estructura para crear una nueva cita:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `patientId` | UUID | Sí | Identificador único del paciente |
| `veterinarianId` | UUID | Sí | Identificador único del veterinario (debe existir y estar activo) |
| `scheduledAt` | DateTime | Sí | Fecha y hora programada para la cita |

### AppointmentResponse  
Estructura de respuesta de una cita:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único de la cita |
| `patientId` | UUID | Identificador único del paciente |
| `veterinarianId` | UUID | Identificador único del veterinario |
| `veterinarian` | VeterinarianResponse | **NUEVO**: Información completa del veterinario |
| `scheduledAt` | DateTime | Fecha y hora programada |
| `status` | String | Estado de la cita |
| `createdAt` | DateTime | Fecha de creación |
| `updatedAt` | DateTime | Fecha de última actualización |

### VeterinarianRequest
Estructura para crear/actualizar un veterinario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `firstName` | String | Sí | Nombre del veterinario |
| `lastName` | String | Sí | Apellido del veterinario |
| `email` | String | Sí | Email único del veterinario |
| `phoneNumber` | String | No | Número de teléfono |
| `licenseNumber` | String | Sí | Número de licencia único |
| `specialization` | String | No | Especialización veterinaria |
| `active` | Boolean | No | Estado activo (default: true) |

### VeterinarianResponse
Estructura de respuesta de un veterinario:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único del veterinario |
| `firstName` | String | Nombre del veterinario |
| `lastName` | String | Apellido del veterinario |
| `email` | String | Email del veterinario |
| `phoneNumber` | String | Número de teléfono |
| `licenseNumber` | String | Número de licencia |
| `specialization` | String | Especialización veterinaria |
| `active` | Boolean | Estado activo del veterinario |
| `createdAt` | DateTime | Fecha de creación |
| `updatedAt` | DateTime | Fecha de última actualización |

### AppointmentUpdateRequest (NUEVO)
Estructura para actualizar el estado de una cita:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `status` | String | Sí | Nuevo estado de la cita (PENDING, CONFIRMED, COMPLETED, CANCELED) |
| `reason` | String | No | Razón opcional del cambio de estado |

### Estados de Cita (AppointmentStatus)
- `PENDING` - Pendiente de confirmación
- `CONFIRMED` - Confirmada
- `COMPLETED` - Completada
- `CANCELED` - Cancelada

---

## 🔧 Ejemplos de Uso

### Usando cURL

#### **Veterinarios:**

##### Crear un veterinario:
```bash
curl -X POST http://localhost:8084/api/v1/veterinarians \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Dr. Ana",
    "lastName": "García",
    "email": "ana.garcia@clinic.com",
    "phoneNumber": "+1234567890",
    "licenseNumber": "VET-2024-001",
    "specialization": "Small Animals"
  }'
```

##### Obtener todos los veterinarios activos:
```bash
curl -X GET "http://localhost:8084/api/v1/veterinarians?onlyActive=true"
```

##### Obtener veterinario por ID:
```bash
curl -X GET http://localhost:8084/api/v1/veterinarians/d47ac10b-58cc-4372-a567-0e02b2c3d477
```

##### Desactivar veterinario:
```bash
curl -X PATCH http://localhost:8084/api/v1/veterinarians/d47ac10b-58cc-4372-a567-0e02b2c3d477/deactivate
```

#### **Citas (ahora con validación de veterinario):**

##### Crear una cita:
```bash
curl -X POST http://localhost:8084/api/v1/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
    "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "scheduledAt": "2025-11-25T10:00:00"
  }'
```

#### Obtener todas las citas:
```bash
curl -X GET http://localhost:8084/api/v1/appointments
```

#### Obtener citas por veterinario:
```bash
curl -X GET "http://localhost:8084/api/v1/appointments?veterinarianId=d47ac10b-58cc-4372-a567-0e02b2c3d477"
```

##### Actualizar estado de una cita:
```bash
curl -X PUT http://localhost:8084/api/v1/appointments/f47ac10b-58cc-4372-a567-0e02b2c3d479/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "CONFIRMED",
    "reason": "Patient confirmed attendance"
  }'
```

##### Cancelar una cita:
```bash
curl -X PATCH "http://localhost:8084/api/v1/appointments/f47ac10b-58cc-4372-a567-0e02b2c3d479/cancel?reason=Patient%20requested%20cancellation"
```

#### Obtener cita específica:
```bash
curl -X GET http://localhost:8084/api/v1/appointments/f47ac10b-58cc-4372-a567-0e02b2c3d479
```

### Usando JavaScript/Fetch

#### Crear una cita:
```javascript
const createAppointment = async () => {
  const response = await fetch('http://localhost:8084/api/v1/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patientId: 'e47ac10b-58cc-4372-a567-0e02b2c3d478',
      veterinarianId: 'd47ac10b-58cc-4372-a567-0e02b2c3d477',
      scheduledAt: '2025-11-25T10:00:00'
    })
  });
  
  const appointment = await response.json();
  return appointment;
};
```

#### Obtener citas:
```javascript
const getAppointments = async (veterinarianId = null) => {
  const url = veterinarianId 
    ? `http://localhost:8084/api/v1/appointments?veterinarianId=${veterinarianId}`
    : 'http://localhost:8084/api/v1/appointments';
    
  const response = await fetch(url);
  const appointments = await response.json();
  return appointments;
};
```

### Usando Python/requests

#### Crear una cita:
```python
import requests
import json

url = "http://localhost:8084/api/v1/appointments"
data = {
    "patientId": "e47ac10b-58cc-4372-a567-0e02b2c3d478",
    "veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    "scheduledAt": "2025-11-25T10:00:00"
}

response = requests.post(url, json=data)
appointment = response.json()
```

#### Obtener citas:
```python
import requests

# Todas las citas
response = requests.get("http://localhost:8084/api/v1/appointments")
appointments = response.json()

# Citas de un veterinario específico
params = {"veterinarianId": "d47ac10b-58cc-4372-a567-0e02b2c3d477"}
response = requests.get("http://localhost:8084/api/v1/appointments", params=params)
appointments = response.json()
```

### Generar UUIDs Válidos

#### En línea de comandos:
```bash
# Generar UUID en Linux/Mac
uuidgen

# Ejemplo de salida:
# 6ba7b810-9dad-11d1-80b4-00c04fd430c8
```

#### En JavaScript:
```javascript
// Generar UUID válido
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Usar UUID válido en la petición
const validUUID = generateUUID();
console.log(validUUID); // e.g., "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

#### En Python:
```python
import uuid

# Generar UUID válido
valid_uuid = str(uuid.uuid4())
print(valid_uuid)  # e.g., "6ba7b810-9dad-11d1-80b4-00c04fd430c8"

# Usar en la petición
data = {
    "patientId": str(uuid.uuid4()),
    "veterinarianId": str(uuid.uuid4()),
    "scheduledAt": "2025-11-25T10:00:00"
}
```

#### En Java:
```java
import java.util.UUID;

// Generar UUID válido
String validUUID = UUID.randomUUID().toString();
System.out.println(validUUID); // e.g., "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
```

---

## ⚡ Información Técnica

### Headers Requeridos
- `Content-Type: application/json` (para requests POST)

### Formato UUID ⚠️ **IMPORTANTE**
Los UUIDs deben seguir el formato estándar de **36 caracteres** con guiones:
- **Formato correcto:** `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Ejemplo válido:** `e47ac10b-58cc-4372-a567-0e02b2c3d478`
- **Ejemplo inválido:** `1235-7654-09876` ❌ (muy corto)
- **Ejemplo inválido:** `123456789012345678901234567890123456` ❌ (sin guiones)

**Estructura del UUID:**
- 8 caracteres + guión + 4 caracteres + guión + 4 caracteres + guión + 4 caracteres + guión + 12 caracteres
- Total: 36 caracteres (32 hexadecimales + 4 guiones)

**Ejemplos de UUIDs válidos:**
```json
{
  "patientId": "550e8400-e29b-41d4-a716-446655440000",
  "veterinarianId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "appointmentId": "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
}
```

### Formato de Fechas
- **Formato:** ISO 8601 (`yyyy-MM-ddTHH:mm:ss`)
- **Ejemplo:** `2025-11-25T10:00:00`

### Validaciones
- Todos los campos marcados como requeridos deben estar presentes
- **Los UUIDs deben tener formato válido de 36 caracteres** (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
- Las fechas deben estar en formato ISO 8601
- La fecha de la cita debe ser futura (validación de negocio)

### Errores Comunes
1. **UUID inválido**: `"1235-7654-09876"` ❌
   - Error: `UUID has to be represented by standard 36-char representation`
   - Solución: Usar formato completo como `"550e8400-e29b-41d4-a716-446655440000"` ✅

2. **Fecha inválida**: `"25-11-2025 10:00"`❌
   - Error: `Cannot deserialize value of type LocalDateTime`
   - Solución: Usar formato ISO 8601 como `"2025-11-25T10:00:00"` ✅

### Manejo de Errores
Todas las respuestas de error siguen el siguiente formato:
```json
{
  "timestamp": "2025-11-25T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Patient ID is required",
  "path": "/api/v1/appointments"
}
```

---

## 🗄️ Base de Datos

### Configuración
- **Motor:** PostgreSQL
- **Host:** localhost:5432
- **Database:** postgres
- **Schema:** Creado automáticamente con Hibernate

### Tabla: veterinarians (NUEVA)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID | Clave primaria |
| first_name | VARCHAR(255) | Nombre del veterinario |
| last_name | VARCHAR(255) | Apellido del veterinario |
| email | VARCHAR(255) | Email único |
| phone_number | VARCHAR(255) | Número de teléfono |
| license_number | VARCHAR(255) | Número de licencia único |
| specialization | VARCHAR(255) | Especialización |
| active | BOOLEAN | Estado activo (default: true) |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Tabla: appointments (MODIFICADA)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | UUID | Clave primaria |
| patient_id | UUID | ID del paciente |
| veterinarian_id | UUID | **CLAVE FORÁNEA** a veterinarians.id |
| scheduled_at | TIMESTAMP | Fecha/hora programada |
| status | VARCHAR(255) | Estado de la cita |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

### Relaciones
- **appointments.veterinarian_id** → **veterinarians.id** (Many-to-One)
- Las citas solo pueden crearse con veterinarios existentes y activos
- Al desactivar un veterinario, sus citas existentes se mantienen pero no puede recibir nuevas

### Índices y Restricciones
- `veterinarians.email`: UNIQUE
- `veterinarians.license_number`: UNIQUE
- `appointments.veterinarian_id`: FOREIGN KEY con referencia a veterinarians(id)

---

## 🚀 URLs de Acceso

- **Aplicación:** http://localhost:8084
- **Swagger UI:** http://localhost:8084/swagger-ui.html
- **OpenAPI Docs:** http://localhost:8084/api-docs
- **Health Check:** http://localhost:8084/actuator/health (si está habilitado)

---

## 📞 Soporte

Para preguntas técnicas o problemas con la integración, por favor contactar al equipo de desarrollo.

**Nota:** Este documento se mantiene actualizado con la versión más reciente del servicio.
