# Patient Service

A microservice for managing veterinary patients as part of the RIAVET platform.

## Overview

The Patient Service is built using **Clean Architecture (Hexagonal Architecture)** principles with:
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **MapStruct** for mapping
- **OpenAPI/Swagger** for API documentation

## Architecture

The project follows Clean Architecture with these layers:

```
com.riavet.patientservice/
├── application/           # Application layer
│   ├── dto/              # Data Transfer Objects
│   ├── mapper/           # MapStruct mappers
│   └── service/          # Business logic services
├── domain/               # Domain layer
│   ├── model/            # Domain entities
│   ├── repository/       # Repository interfaces
│   └── event/            # Domain events (future)
├── infrastructure/       # Infrastructure layer
│   ├── adapter/
│   │   ├── input/        # REST controllers
│   │   └── output/       # Persistence adapters
│   ├── configuration/    # Spring configurations
│   └── exception/        # Exception handling
└── PatientServiceApplication.java
```

## Features

### Endpoints

- `GET /api/v1/patients` - List all active patients (with optional search)
- `POST /api/v1/patients` - Create a new patient
- `GET /api/v1/patients/{id}` - Get patient by ID
- `PUT /api/v1/patients/{id}` - Update patient information
- `POST /api/v1/patients/{id}/merge` - Merge duplicate patients

### Business Logic

- **Patient Management**: Full CRUD operations for patients
- **Search**: Filter patients by name or species
- **Deduplication**: Merge duplicate patients while preserving data
- **Soft Delete**: Patients are deactivated instead of deleted
- **Validation**: Input validation using Bean Validation

## Getting Started

### Prerequisites

- Java 17+
- PostgreSQL 12+
- Gradle 7+

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE patientdb;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE patientdb TO postgres;
```

2. Update `src/main/resources/application.yml` with your database configuration if needed.

### Running the Application

1. Clone the repository
2. Run the application:
```bash
./gradlew bootRun
```

The service will start on port 8081.

### Testing

Run all tests:
```bash
./gradlew test
```

Run only unit tests:
```bash
./gradlew test --tests "*Test"
```

Run only integration tests:
```bash
./gradlew test --tests "*IntegrationTest"
```

## API Documentation

Once the application is running, you can access:

- **Swagger UI**: http://localhost:8081/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8081/api-docs

## Sample Usage

### Create a Patient
```bash
curl -X POST http://localhost:8081/api/v1/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "birthDate": "2020-05-15",
    "ownerId": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

### Get All Patients
```bash
curl http://localhost:8081/api/v1/patients
```

### Search Patients
```bash
curl "http://localhost:8081/api/v1/patients?search=dog"
```

### Get Patient by ID
```bash
curl http://localhost:8081/api/v1/patients/{patient-id}
```

### Update Patient
```bash
curl -X PUT http://localhost:8081/api/v1/patients/{patient-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy Updated",
    "breed": "Golden Retriever Mix"
  }'
```

### Merge Patients
```bash
curl -X POST http://localhost:8081/api/v1/patients/{main-patient-id}/merge \
  -H "Content-Type: application/json" \
  -d '{
    "duplicateId": "duplicate-patient-id"
  }'
```

## Configuration

### Application Properties

Key configuration options in `application.yml`:

- `server.port`: Server port (default: 8081)
- `spring.datasource.*`: Database connection settings
- `spring.jpa.*`: JPA/Hibernate settings
- `springdoc.*`: OpenAPI documentation settings

### Profiles

- `default`: Development profile with PostgreSQL
- `test`: Test profile with H2 in-memory database

## Error Handling

The service provides standardized error responses:

```json
{
  "timestamp": "2024-01-15T10:30:00",
  "status": 404,
  "error": "Not Found", 
  "message": "Patient not found with ID: 123e4567-e89b-12d3-a456-426614174000",
  "path": "/api/v1/patients/123e4567-e89b-12d3-a456-426614174000"
}
```

For validation errors, additional `validationErrors` field is included with field-specific errors.

## Development

### Code Style

The project follows standard Java conventions with:
- Lombok for boilerplate reduction
- MapStruct for type-safe mapping
- SLF4J for logging
- Bean Validation for input validation

### Testing Strategy

- **Unit Tests**: Test business logic in isolation using Mockito
- **Integration Tests**: Test web layer with MockMvc
- **Full Integration Tests**: Test complete flow with real database (H2)

### Adding New Features

1. Create domain entities in `domain.model`
2. Define repository interfaces in `domain.repository`
3. Create DTOs in `application.dto`
4. Implement mappers in `application.mapper`
5. Add business logic in `application.service`
6. Create REST endpoints in `infrastructure.adapter.input`
7. Write comprehensive tests

## Docker

### Running with Docker Compose

A `docker-compose.yml` file is recommended for development:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: patientdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  patient-service:
    build: .
    ports:
      - "8081:8081"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/patientdb

volumes:
  postgres_data:
```

## Contributing

1. Follow the existing code structure and patterns
2. Write tests for all new functionality
3. Update documentation as needed
4. Ensure all tests pass before submitting changes

