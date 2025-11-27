# Clinical Record Service

## Descripción
Microservicio REST para la gestión de registros clínicos veterinarios desarrollado con Java 17 y Spring Boot 3.2.0, implementando arquitectura hexagonal (Clean Architecture). **Actualizado para usar MongoDB y consultas de órdenes médicas.**

## Tecnologías Utilizadas
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data MongoDB**
- **MongoDB**
- **SpringDoc OpenAPI (Swagger)**
- **Lombok**
- **Gradle**

## Arquitectura
El proyecto sigue los principios de **Clean Architecture (Arquitectura Hexagonal)** con las siguientes capas:

```
com.riavet.clinicalrecordservice/
├── application/          # Capa de aplicación
│   ├── dto/             # Data Transfer Objects
│   ├── mapper/          # Mappers para conversión entre DTOs y entidades
│   └── service/         # Servicios de aplicación
├── domain/              # Capa de dominio
│   ├── model/           # Entidades de dominio
│   └── repository/      # Interfaces de repositorio
├── infrastructure/      # Capa de infraestructura
│   ├── adapter/
│   │   ├── input/       # Controladores REST
│   │   └── output/      # Implementación de repositorios
│   ├── configuration/   # Configuraciones
│   └── persistence/     # Repositorios MongoDB
└── ClinicalRecordServiceApplication.java
```

## Nuevas Características - Órdenes Médicas
- **Órdenes médicas**: Campo para almacenar prescripciones y órdenes
- **Prescripciones**: Medicamentos y tratamientos recetados
- **Fechas de seguimiento**: Control de citas de seguimiento
- **Estados**: Gestión de estados (ACTIVE, COMPLETED, etc.)
- **Consultas avanzadas**: Filtrado por veterinario, paciente y estado

## Endpoints Disponibles

### 1. Crear Registro Clínico
- **POST** `/api/v1/records`
- **Content-Type**: `application/json`
- **Body**:
```json
{
  "patientId": "string",
  "veterinarianId": "string",
  "diagnosis": "string",
  "procedures": "string",
  "attachments": "string",
  "medicalOrders": "string",
  "prescription": "string",
  "followUpDate": "2024-01-15T10:30:00",
  "status": "ACTIVE"
}
```
- **Response**: `201 Created`

### 2. Listar Registros Clínicos
- **GET** `/api/v1/records`
- **Query Parameters**:
  - `patientId` (opcional): Filtrar por ID del paciente
  - `status` (opcional): Filtrar por estado
- **Response**: `200 OK`

### 3. Consultar Registro por ID
- **GET** `/api/v1/records/{id}`
- **Path Parameters**:
  - `id`: ID del registro clínico
- **Response**: `200 OK` o `404 Not Found`

### 4. Consultar Registros por Veterinario
- **GET** `/api/v1/records/veterinarian/{veterinarianId}`
- **Path Parameters**:
  - `veterinarianId`: ID del veterinario
- **Response**: `200 OK`

## Configuración de Base de Datos MongoDB
El servicio requiere MongoDB. Configuración por defecto:
- **Host**: localhost
- **Puerto**: 27017
- **Base de datos**: clinicaldb
- **URI**: mongodb://localhost:27017/clinicaldb

### Configuraciones Adicionales
Ver el archivo `MONGODB_CONFIG.md` para ejemplos de:
- Conexión con autenticación
- MongoDB Atlas (Cloud)
- Docker Compose setup

## Ejecución

### Prerequisitos
1. Java 17
2. MongoDB 6.0+
3. Gradle 7.x+

### Pasos para ejecutar
1. Clonar el repositorio
2. Instalar y ejecutar MongoDB
3. Ejecutar el comando:
```bash
./gradlew bootRun
```

El servicio estará disponible en: `http://localhost:8082`

## Documentación API
Una vez que el servicio esté ejecutándose, la documentación interactiva de la API estará disponible en:
- **Swagger UI**: http://localhost:8082/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8082/api-docs

## Modelo de Datos

### ClinicalRecord
```json
{
  "id": "string (MongoDB ObjectId)",
  "patientId": "string",
  "veterinarianId": "string", 
  "diagnosis": "string",
  "procedures": "string",
  "attachments": "string",
  "medicalOrders": "string",
  "prescription": "string",
  "followUpDate": "LocalDateTime",
  "status": "string",
  "createdAt": "LocalDateTime"
}
```

## Consultas de Órdenes Médicas
El servicio ahora soporta consultas avanzadas para órdenes médicas:

1. **Por paciente y estado**: `GET /api/v1/records?patientId=123&status=ACTIVE`
2. **Por veterinario**: `GET /api/v1/records/veterinarian/456`
3. **Por estado específico**: `GET /api/v1/records?status=COMPLETED`
4. **Búsqueda en órdenes médicas**: Disponible en el repositorio MongoDB
5. **Búsqueda en diagnósticos**: Búsqueda de texto con expresiones regulares

## Manejo de Errores
El servicio incluye un manejo global de excepciones que retorna respuestas estructuradas para:
- Errores de validación (400 Bad Request)
- Recursos no encontrados (404 Not Found)
- Errores internos del servidor (500 Internal Server Error)

## Logs
El servicio incluye logging detallado para todas las operaciones principales, facilitando el debugging y monitoreo.

## Health Check
Spring Boot Actuator está disponible para health checks en:
- `/actuator/health`

Microservicio Clinical Record Service Completado
He creado exitosamente un microservicio completo para la gestión de registros clínicos veterinarios siguiendo todas las especificaciones solicitadas:

✅ Características Implementadas:
🏗️ Arquitectura Hexagonal (Clean Architecture):

Capa de Dominio: Entidades y contratos de repositorio
Capa de Aplicación: DTOs, mappers y servicios de negocio
Capa de Infraestructura: Controladores REST, persistencia JPA y configuraciones
🚀 Tecnologías Utilizadas:

✅ Java 17
✅ Spring Boot 3.2.0
✅ Spring Data JPA con PostgreSQL
✅ SpringDoc OpenAPI (Swagger)
✅ Lombok para reducir boilerplate
✅ Gradle como build tool

clinicalrecords/
├── src/main/java/com/riavet/clinicalrecordservice/
│   ├── application/
│   │   ├── dto/                    # DTOs de entrada y salida
│   │   ├── mapper/                 # Conversión entre DTOs y entidades
│   │   └── service/                # Servicios de aplicación
│   ├── domain/
│   │   ├── model/                  # Entidad ClinicalRecord
│   │   └── repository/             # Interfaz de repositorio
│   ├── infrastructure/
│   │   ├── adapter/
│   │   │   ├── input/              # Controlador REST
│   │   │   └── output/             # Implementación de repositorio
│   │   ├── configuration/          # Configuraciones y manejo de errores
│   │   └── persistence/            # Repositorio JPA
│   └── ClinicalRecordServiceApplication.java
├── src/main/resources/
│   └── application.yml             # Configuración de la aplicación
├── build.gradle                    # Dependencias y configuración de build
├── clinical-record-service.yaml    # Contrato OpenAPI de referencia
├── README.md                       # Documentación completa
└── build.sh                       # Script de construcción
🔗 Endpoints Implementados:

✅ POST /api/v1/records - Crear registro clínico
✅ GET /api/v1/records - Listar todos los registros
✅ GET /api/v1/records?patientId=UUID - Filtrar por paciente
✅ GET /api/v1/records/{id} - Consultar registro por ID
🛡️ Funcionalidades Adicionales:

✅ Validaciones con @Valid y anotaciones Jakarta
✅ Manejo global de excepciones con @ControllerAdvice
✅ Documentación automática de API con Swagger UI
✅ Logging estructurado para debugging
✅ Configuración lista para PostgreSQL
📁 Estructura del Proyecto:
🚀 Para Ejecutar el Proyecto:
Configurar PostgreSQL:

CREATE DATABASE clinicaldb;
-- Usuario: postgres, Password: postgres
Compilar y ejecutar:

Acceder a la documentación:

Swagger UI: http://localhost:8082/swagger-ui.html
OpenAPI JSON: http://localhost:8082/api-docs
🧪 Estado del Proyecto:
✅ Compila correctamente con Gradle 8.5 y Java 17
✅ Arquitectura hexagonal implementada correctamente
✅ Endpoints REST siguiendo el contrato OpenAPI
✅ Persistencia JPA configurada para PostgreSQL
✅ Documentación automática con SpringDoc
✅ Manejo de errores globalizado
✅ Logging implementado en todos los servicios