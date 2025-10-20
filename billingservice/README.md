# Billing Service

Microservicio de facturación para el sistema RIAVET desarrollado con Java 17 y Spring Boot 3.2.0.

## 🏗️ Arquitectura

El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia) con separación hexagonal:

```
com.riavet.billingservice/
├── domain/                     # Núcleo del negocio
│   ├── model/                 # Entidades de dominio
│   └── repository/            # Interfaces de repositorio
├── application/               # Casos de uso y lógica de aplicación
│   ├── dto/                   # DTOs de entrada y salida
│   ├── mapper/                # Mapeo entre entidades y DTOs
│   └── service/               # Servicios de aplicación
└── infrastructure/            # Detalles de implementación
    ├── adapter/
    │   ├── input/            # Controladores REST
    │   └── output/           # Adaptadores de persistencia
    └── configuration/        # Configuraciones de Spring
```

## 🚀 Tecnologías

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Gradle**
- **SpringDoc OpenAPI** (Swagger)
- **Lombok**

## 📋 Requisitos previos

- Java 17+
- PostgreSQL 12+
- Base de datos `billingdb` creada

## 🛠️ Configuración

### Base de datos PostgreSQL

```sql
CREATE DATABASE billingdb;
```

### Variables de entorno (opcional)

El servicio está configurado para conectarse a PostgreSQL en localhost:5432 con:
- Usuario: `postgres`
- Contraseña: `postgres`
- Base de datos: `billingdb`

Puedes modificar estas configuraciones en `src/main/resources/application.yml`.

## 🚀 Ejecución

### Opción 1: Gradle Wrapper
```bash
./gradlew bootRun
```

### Opción 2: Compilar y ejecutar JAR
```bash
./gradlew build
java -jar build/libs/billingservice-1.0.0.jar
```

El servicio estará disponible en: `http://localhost:8083`

## 📖 API Documentation

Una vez que el servicio esté ejecutándose, puedes acceder a:

- **Swagger UI**: http://localhost:8083/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8083/api-docs

## 🔗 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/invoices` | Crear nueva factura |
| GET | `/api/v1/invoices` | Listar todas las facturas |
| GET | `/api/v1/invoices/{id}` | Obtener factura por ID |

### Ejemplo de uso

#### Crear factura
```bash
curl -X POST http://localhost:8083/api/v1/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "123e4567-e89b-12d3-a456-426614174000",
    "total": 150.50,
    "items": "Consulta veterinaria + Vacuna"
  }'
```

#### Listar facturas
```bash
curl http://localhost:8083/api/v1/invoices
```

#### Obtener factura por ID
```bash
curl http://localhost:8083/api/v1/invoices/123e4567-e89b-12d3-a456-426614174000
```

## 🗂️ Estructura del modelo

### Invoice (Factura)
```json
{
  "id": "uuid",
  "patientId": "uuid",
  "date": "2024-01-15T10:30:00",
  "total": 150.50,
  "status": "DRAFT|SENT|PAID|CANCELED",
  "items": "Descripción de servicios",
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

## 🔧 Desarrollo

### Compilar
```bash
./gradlew build
```

### Ejecutar en modo desarrollo
```bash
./gradlew bootRun
```

### Limpiar build
```bash
./gradlew clean
```

## 📝 Notas

- Las facturas se crean por defecto con estado `DRAFT`
- Los IDs son UUIDs generados automáticamente
- La fecha se establece automáticamente al momento de creación
- Todas las respuestas están en formato JSON
- Se incluye validación de campos requeridos
- Manejo centralizado de excepciones con `@ControllerAdvice`
