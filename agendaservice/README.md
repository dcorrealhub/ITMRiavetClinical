# Agenda Service 🏥

Microservicio para la gestión de citas veterinarias del sistema RIAVET, implementado con **Arquitectura Limpia (Clean Architecture / Hexagonal)**.

## 📋 Descripción

Este microservicio maneja todas l## 🚨 Manejo de Errores

El servicio incluye un **manejo global de excepciones** (`@ControllerAdvice`) que retorna respuestas estructuradas:

### 📋 Tipos de Errores

| Código | Tipo | Descripción |
|--------|------|-------------|
| **400** | Bad Request | Errores de validación, datos inválidos |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Errores internos del servidor |

### 📄 Formato de Respuesta de Error

```json
{
  "timestamp": "2025-10-19T20:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Invalid request data",
  "path": "/api/v1/appointments",
  "validationErrors": {
    "patientId": "Patient ID is required",
    "scheduledAt": "Scheduled date and time is required"
  }
}
```

## 📚 Documentación

### 🎯 Swagger/OpenAPI

- ✅ **Documentación automática** generada con SpringDoc
- ✅ **Interfaz interactiva** Swagger UI
- ✅ **Especificación completa** OpenAPI 3.0.1
- ✅ **Ejemplos de uso** incluidos

### 📖 URLs de Documentación

| Recurso | URL | Descripción |
|---------|-----|-------------|
| **Swagger UI** | `http://localhost:8084/swagger-ui.html` | Interfaz interactiva para probar APIs |
| **OpenAPI JSON** | `http://localhost:8084/api-docs` | Especificación en formato JSON |

## 🧪 Testing y Verificación

### ✅ Pruebas Realizadas

Todos los endpoints han sido **probados exitosamente**:

- ✅ **Creación de citas** - POST con datos válidos
- ✅ **Listado completo** - GET sin parámetros
- ✅ **Filtrado por veterinario** - GET con query parameter
- ✅ **Consulta por ID** - GET con ID válido
- ✅ **Manejo de errores** - 404 para IDs inexistentes
- ✅ **Validación de entrada** - Error 400 para datos inválidos

### 🔄 Estado de la Aplicación

```bash
# Status: ✅ FUNCIONANDO
# Puerto: 8084
# Perfil activo: dev (H2 en memoria)
# Base de datos: Conectada y operativa
# Endpoints: Todos operativos
```

## 🎯 Cumplimiento de Requisitos

### ✅ Arquitectura y Estructura

- ✅ **Java 17** + **Spring Boot 3.2.0**
- ✅ **Gradle** como build tool
- ✅ **Arquitectura Hexagonal/Clean Architecture**
- ✅ **Separación de capas** (Domain, Application, Infrastructure)
- ✅ **DTOs** para entrada y salida
- ✅ **Mappers** para conversión

### ✅ Persistencia y Base de Datos

- ✅ **JPA/Hibernate** configurado
- ✅ **PostgreSQL** para producción
- ✅ **H2** para desarrollo y testing
- ✅ **Generación automática** de esquema
- ✅ **Transacciones** manejadas correctamente

### ✅ API REST y Documentación

- ✅ **Endpoints REST** según contrato
- ✅ **JSON** como formato de intercambio
- ✅ **Códigos de estado** HTTP correctos
- ✅ **OpenAPI/Swagger** documentación automática
- ✅ **Validaciones** con Bean Validation

## 🚀 Próximos Pasos

Para poner en producción:

1. **Configurar PostgreSQL** en el servidor
2. **Cambiar perfil** a `prod` en `application.yml`
3. **Configurar variables** de entorno para credenciales
4. **Implementar Docker** (opcional)
5. **Configurar CI/CD** (opcional)nes relacionadas con la agenda de citas veterinarias, incluyendo la creación, consulta y filtrado de citas por veterinario. Está completamente funcional y probado.

## 🚀 Estado del Proyecto

✅ **COMPLETADO Y FUNCIONAL**
- ✅ Compilación exitosa
- ✅ Aplicación ejecutándose correctamente
- ✅ Todos los endpoints REST implementados y probados
- ✅ Base de datos configurada (H2 para desarrollo, PostgreSQL para producción)
- ✅ Documentación Swagger generada automáticamente
- ✅ Manejo de errores implementado

## 🛠️ Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.2.0**
- **Gradle 8.5**
- **PostgreSQL** (producción)
- **H2 Database** (desarrollo)
- **JPA/Hibernate**
- **SpringDoc OpenAPI**
- **Lombok**

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia (Clean Architecture / Hexagonal)** con la siguiente estructura:

```
com.riavet.agendaservice/
├── AgendaServiceApplication.java
├── application/
│   ├── dto/
│   │   ├── AppointmentRequest.java
│   │   └── AppointmentResponse.java
│   ├── mapper/
│   │   └── AppointmentMapper.java
│   └── service/
│       ├── AppointmentService.java
│       └── AppointmentServiceImpl.java
├── domain/
│   ├── model/
│   │   └── Appointment.java
│   └── repository/
│       └── AppointmentRepository.java
└── infrastructure/
    ├── adapter/
    │   └── input/
    │       └── AppointmentController.java
    └── configuration/
        ├── ErrorResponse.java
        ├── GlobalExceptionHandler.java
        └── OpenApiConfiguration.java
```

### 📦 Capas Implementadas

- **Domain Layer**: Entidades y repositorios de dominio
- **Application Layer**: Casos de uso, DTOs y mappers
- **Infrastructure Layer**: Controladores REST, configuración y adaptadores

## ⚙️ Configuración

### 🗄️ Base de Datos

El servicio está configurado con **perfiles múltiples**:

#### Desarrollo (`dev` - activo por defecto)
- **Base de datos**: H2 en memoria
- **URL**: `jdbc:h2:mem:testdb`
- **Usuario**: `sa`
- **Contraseña**: `(vacía)`
- **Consola H2**: Disponible en `/h2-console`

#### Producción
- **Base de datos**: PostgreSQL
- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: agendadb
- **Usuario**: postgres
- **Contraseña**: postgres

### 🛠️ Creación de la Base de Datos PostgreSQL

```sql
CREATE DATABASE agendadb;
```

## 🚀 Ejecución

### 📋 Prerequisitos

- ✅ Java 17
- ✅ Gradle 7.6+
- ⚠️ PostgreSQL 12+ (solo para producción)

### 🔧 Comandos

1. **Compilar el proyecto:**
   ```bash
   ./gradlew clean build
   ```

2. **Ejecutar la aplicación (perfil desarrollo con H2):**
   ```bash
   ./gradlew bootRun
   ```

3. **Ejecutar con perfil de producción:**
   ```bash
   ./gradlew bootRun --args='--spring.profiles.active=prod'
   ```

### 🌐 URLs Disponibles

Una vez iniciada la aplicación:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **API REST** | `http://localhost:8084/api/v1/appointments` | Endpoints principales |
| **Swagger UI** | `http://localhost:8084/swagger-ui.html` | Documentación interactiva |
| **OpenAPI Docs** | `http://localhost:8084/api-docs` | Especificación OpenAPI |
| **H2 Console** | `http://localhost:8084/h2-console` | Consola de base de datos (dev) |

## 📡 API Endpoints

### ✅ Endpoints Implementados y Probados

| Método | Endpoint | Descripción | Estado |
|--------|----------|-------------|---------|
| `POST` | `/api/v1/appointments` | Crear nueva cita | ✅ **Funcional** |
| `GET` | `/api/v1/appointments` | Listar todas las citas | ✅ **Funcional** |
| `GET` | `/api/v1/appointments?veterinarianId={uuid}` | Filtrar por veterinario | ✅ **Funcional** |
| `GET` | `/api/v1/appointments/{id}` | Obtener cita por ID | ✅ **Funcional** |

### 📝 Ejemplos de Uso

#### 1. Crear una nueva cita
```bash
curl -X POST http://localhost:8084/api/v1/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "veterinarianId": "987e6543-e21c-43d3-b789-123456789000",
    "scheduledAt": "2024-01-15T10:30:00"
  }'
```

**Respuesta (201 Created):**
```json
{
  "id": "f37667f2-5ddc-4734-8d4c-3d44b8ff8142",
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "987e6543-e21c-43d3-b789-123456789000",
  "scheduledAt": "2024-01-15T10:30:00",
  "status": "PENDING",
  "createdAt": "2025-10-19T20:28:32.855965",
  "updatedAt": "2025-10-19T20:28:32.856127"
}
```

#### 2. Listar todas las citas
```bash
curl -X GET http://localhost:8084/api/v1/appointments
```

#### 3. Filtrar citas por veterinario
```bash
curl -X GET "http://localhost:8084/api/v1/appointments?veterinarianId=987e6543-e21c-43d3-b789-123456789000"
```

#### 4. Obtener cita específica
```bash
curl -X GET http://localhost:8084/api/v1/appointments/f37667f2-5ddc-4734-8d4c-3d44b8ff8142
```

## 📊 Modelo de Datos

### 🏥 Entidad Appointment

| Campo | Tipo | Descripción | Restricciones |
|-------|------|-------------|---------------|
| `id` | UUID | Identificador único | Primary Key, Auto-generado |
| `patientId` | UUID | ID del paciente | Not Null, Requerido |
| `veterinarianId` | UUID | ID del veterinario | Not Null, Requerido |
| `scheduledAt` | LocalDateTime | Fecha y hora de la cita | Not Null, Requerido |
| `status` | AppointmentStatus | Estado de la cita | Not Null, Enum |
| `createdAt` | LocalDateTime | Fecha de creación | Auto-generado |
| `updatedAt` | LocalDateTime | Última actualización | Auto-actualizado |

### 🔄 Estados de Cita (AppointmentStatus)

| Estado | Descripción |
|--------|-------------|
| `PENDING` | Cita pendiente de confirmación (estado inicial) |
| `CONFIRMED` | Cita confirmada |
| `COMPLETED` | Cita completada |
| `CANCELED` | Cita cancelada |

## ✅ Validaciones y Características

### 🛡️ Validaciones Implementadas

- ✅ **Campos requeridos**: `patientId`, `veterinarianId`, `scheduledAt`
- ✅ **Formato UUID**: Validación automática de UUIDs
- ✅ **Formato fecha**: Validación de LocalDateTime
- ✅ **Anotaciones**: `@Valid`, `@NotNull`

### 🔧 Características Técnicas

- ✅ **IDs únicos**: Generación automática de UUIDs
- ✅ **Timestamps**: Creación y actualización automática
- ✅ **Estado inicial**: Todas las citas inician en `PENDING`
- ✅ **Mapeo JPA**: Configuración completa para PostgreSQL y H2
- ✅ **Logs estructurados**: SLF4J con contexto de operaciones

## Manejo de Errores

El servicio incluye un manejador global de excepciones que retorna respuestas estructuradas para:
- Errores de validación (400)
- Recursos no encontrados (404)
- Errores internos del servidor (500)

## Documentación

La documentación completa de la API está disponible a través de Swagger UI en:
http://localhost:8084/swagger-ui.html
