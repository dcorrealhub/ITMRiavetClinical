# Telemedicina Service

Microservicio REST para gestión de sesiones de telemedicina del sistema RIAVET, implementado con Java 17, Spring Boot 3.2.0 y arquitectura hexagonal.

## 🚀 Características

- **Arquitectura**: Clean Architecture / Hexagonal
- **Framework**: Spring Boot 3.2.0
- **Java**: JDK 17
- **Base de datos**: PostgreSQL
- **ORM**: Spring Data JPA (Hibernate)
- **Documentación**: SpringDoc OpenAPI (Swagger)
- **Build**: Gradle

## 📋 Prerequisitos

- Java 17 o superior
- PostgreSQL 12 o superior
- Gradle 8.5 o usar el wrapper incluido

## 🗄️ Configuración de Base de Datos

Crear la base de datos PostgreSQL:

```sql
CREATE DATABASE telemedicinadb;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE telemedicinadb TO postgres;
```

## 🛠️ Instalación y Ejecución

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd telemedicinaservice
```

2. **Configurar la base de datos**
   - Editar `src/main/resources/application.yml` si es necesario
   - Asegurar que PostgreSQL esté ejecutándose en `localhost:5432`

3. **Ejecutar la aplicación**
```bash
./gradlew bootRun
```

La aplicación estará disponible en: `http://localhost:8086`

## 📚 Documentación API

Una vez que la aplicación esté ejecutándose, la documentación Swagger estará disponible en:

- **Swagger UI**: http://localhost:8086/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8086/api-docs

## 🔌 Endpoints

### Crear sesión de telemedicina
```http
POST /api/v1/sessions
Content-Type: application/json

{
  "patientId": "123e4567-e89b-12d3-a456-426614174000",
  "veterinarianId": "123e4567-e89b-12d3-a456-426614174001",
  "scheduledAt": "2024-12-25T10:00:00",
  "meetingUrl": "https://meet.google.com/abc-defg-hij",
  "notes": "Consulta de seguimiento"
}
```

### Iniciar sesión
```http
PATCH /api/v1/sessions/{id}/start
```

### Finalizar sesión
```http
PATCH /api/v1/sessions/{id}/end
Content-Type: application/json

{
  "notes": "Paciente mostró mejoría significativa"
}
```

### Listar sesiones
```http
GET /api/v1/sessions?status=SCHEDULED&veterinarianId=123e4567-e89b-12d3-a456-426614174001
```

### Obtener sesión por ID
```http
GET /api/v1/sessions/{id}
```

## 🏗️ Arquitectura

```
com.riavet.telemedicinaservice
├── application
│   ├── dto/                    # Data Transfer Objects
│   ├── mapper/                 # Mappers entre DTOs y entidades
│   └── service/                # Lógica de negocio
├── domain
│   ├── model/                  # Entidades de dominio
│   └── repository/             # Interfaces de repositorio
├── infrastructure
│   ├── adapter
│   │   ├── input/              # Controladores REST
│   │   └── output/             # Adaptadores de persistencia
│   ├── configuration/          # Configuración de Spring
│   └── persistence/            # Implementaciones JPA
└── TelemedicinaServiceApplication.java
```

## 🧪 Estados de Sesión

- **SCHEDULED**: Sesión programada
- **IN_PROGRESS**: Sesión en curso
- **COMPLETED**: Sesión completada
- **CANCELED**: Sesión cancelada

## 🔧 Configuración

La configuración principal se encuentra en `src/main/resources/application.yml`:

```yaml
server:
  port: 8086

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/telemedicinadb
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

## 🏃‍♂️ Compilación

```bash
# Compilar
./gradlew build

# Ejecutar tests
./gradlew test

# Generar JAR
./gradlew bootJar
```

## 📈 Monitoreo

- **Health Check**: http://localhost:8086/actuator/health (si Actuator está habilitado)
- **Logs**: Configurados para nivel DEBUG en el paquete principal

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
