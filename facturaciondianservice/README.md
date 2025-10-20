# Facturación DIAN Service

Microservicio REST para la gestión de facturas electrónicas con la DIAN (Dirección de Impuestos y Aduanas Nacionales de Colombia).

## 🚀 Tecnologías

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Gradle**
- **SpringDoc OpenAPI 3**
- **Lombok**

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Hexagonal (Clean Architecture)** con la siguiente estructura:

```
com.riavet.dianservice/
├── application/           # Capa de aplicación
│   ├── dto/              # DTOs de entrada y salida
│   ├── mapper/           # Mappers entre DTOs y entidades
│   └── service/          # Servicios de aplicación
├── domain/               # Capa de dominio
│   ├── model/            # Entidades de dominio
│   └── repository/       # Interfaces de repositorio
└── infrastructure/       # Capa de infraestructura
    ├── adapter/
    │   ├── input/        # Controladores REST
    │   └── output/       # Adaptadores de persistencia y servicios externos
    └── configuration/    # Configuraciones de Spring
```

## 📋 Requisitos previos

- Java 17+
- PostgreSQL 12+
- Gradle 8.5+

## ⚙️ Configuración

### Base de datos PostgreSQL

1. Crear la base de datos:
```sql
CREATE DATABASE diandb;
```

2. Configurar las credenciales en `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/diandb
    username: postgres
    password: postgres
```

## 🚀 Ejecución

### Compilar el proyecto
```bash
./gradlew build
```

### Ejecutar la aplicación
```bash
./gradlew bootRun
```

La aplicación estará disponible en: `http://localhost:8085`

## 📖 Documentación API

La documentación interactiva de la API estará disponible en:
- Swagger UI: `http://localhost:8085/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8085/api-docs`

## 🔗 Endpoints principales

### Enviar factura a la DIAN
```http
POST /api/v1/dian/invoices
Content-Type: application/json

{
  "invoiceId": "123e4567-e89b-12d3-a456-426614174000",
  "xmlPayload": "<xml>...</xml>"
}
```

### Consultar estado de factura
```http
GET /api/v1/dian/status/{invoiceId}
```

## 🗃️ Modelo de datos

### Tabla: dian_invoices

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Identificador único del registro |
| invoice_id | UUID | Identificador de la factura |
| xml_payload | TEXT | Contenido XML de la factura |
| status | VARCHAR | Estado (PENDING, SENT, ACCEPTED, REJECTED) |
| dian_code | VARCHAR | Código retornado por la DIAN |
| message | VARCHAR | Mensaje de respuesta |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Fecha de actualización |

## 🧪 Simulación DIAN

El microservicio incluye un simulador de la DIAN que:
- Genera códigos de respuesta aleatorios
- Simula latencia de red (500-1500ms)
- Retorna éxito en el 90% de los casos
- Proporciona mensajes de error realistas

## 🛠️ Desarrollo

### Estructura del proyecto
- `domain/`: Lógica de negocio pura, sin dependencias externas
- `application/`: Casos de uso y servicios de aplicación
- `infrastructure/`: Implementaciones técnicas (REST, JPA, etc.)

### Principios aplicados
- **Inversión de dependencias**: Las capas externas dependen de las internas
- **Separación de responsabilidades**: Cada capa tiene un propósito específico
- **Testabilidad**: Arquitectura que facilita las pruebas unitarias

## 📝 Logs

La aplicación genera logs detallados para:
- Recepción de solicitudes
- Procesamiento de facturas
- Respuestas de la DIAN simulada
- Errores y excepciones

## 🔧 Configuraciones adicionales

### Perfiles de Spring
- `application.yml`: Configuración base
- Posibilidad de añadir `application-dev.yml`, `application-prod.yml`

### Propiedades personalizables
- Puerto del servidor: `server.port`
- Configuración de base de datos: `spring.datasource.*`
- Configuración JPA: `spring.jpa.*`
