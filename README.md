# 🩺 RIAVET Clinical — Caso de Estudio de Arquitectura Basada en Microservicios

## 🌐 Descripción general

**RIAVET Clinical** es un caso de estudio académico diseñado para implementar una **arquitectura basada en microservicios** que permita la gestión integral de una clínica veterinaria moderna.  
El sistema aborda procesos clave como la atención médica de pacientes, la gestión de citas, la facturación y el soporte de servicios digitales como telemedicina y recordatorios automáticos.

El proyecto está orientado a prácticas de **arquitectura limpia (Clean Architecture)** y **Hexagonal Architecture**, implementado en **Java 17 con Spring Boot 3.2.0**, utilizando **Gradle** como sistema de construcción y **PostgreSQL** como base de datos relacional.

Cada microservicio cuenta con:
- Su propio **contrato OpenAPI**.
- Documentación técnica sobre **cómo ejecutarlo**.
- Ejemplos de uso de sus endpoints.
- Estructura independiente de ejecución y despliegue.

---

## 🧩 Arquitectura general

La solución está compuesta por varios microservicios que interactúan entre sí para cubrir todo el ciclo de atención veterinaria:

| Microservicio | Descripción | Puerto base | Contrato OpenAPI |
|----------------|-------------|--------------|------------------|
| **Patient Service** | Gestiona la información de pacientes (mascotas) y sus propietarios. Permite crear, consultar y actualizar datos de identificación, especie, raza y dueño. | `8081` | `patient-service.yaml` |
| **Clinical Record Service** | Administra los historiales clínicos de los pacientes. Registra diagnósticos, tratamientos, alergias, medicamentos y visitas médicas. | `8082` | `clinical-record-service.yaml` |
| **Billing Service** | Gestiona las facturas internas de los servicios veterinarios prestados. Permite registrar, listar y consultar facturas. | `8083` | `billing-service.yaml` |
| **Agenda / Turnos Service** | Controla la programación de citas entre veterinarios y pacientes. Permite crear, listar y actualizar el estado de las citas. | `8084` | `agenda-service.yaml` |
| **Facturación DIAN Service** | Gestiona la emisión y envío de facturas electrónicas a la DIAN (Colombia). Registra el estado de envío y validación. | `8085` | `facturacion-dian-service.yaml` |
| **Telemedicina Service** | Permite la gestión de sesiones de telemedicina (consultas virtuales). Controla el agendamiento, inicio y cierre de sesiones. | `8086` | `telemedicina-service.yaml` |
| **Notificaciones y Recordatorios Service** | Administra el envío de notificaciones y recordatorios automáticos a clientes, como recordatorios de citas o seguimientos de tratamiento. | `8087` | `notificaciones-service.yaml` |

---

## ⚙️ Stack Tecnológico

- **Lenguaje:** Java 17  
- **Framework:** Spring Boot 3.2.0  
- **Arquitectura:** Clean Architecture / Hexagonal  
- **Base de datos:** PostgreSQL  
- **Gestor de dependencias:** Gradle  
- **Documentación de APIs:** OpenAPI 3.1 (Swagger UI)  
- **Comunicación entre servicios:** REST con JSON  
- **ORM:** JPA / Hibernate  

---

## 🧭 Estructura del repositorio

riavet-clinical/
│
├── patient-service/
│ ├── src/
│ ├── build.gradle
│ ├── patient-service.yaml
│ └── README.md
│
├── clinical-record-service/
│ ├── src/
│ ├── build.gradle
│ ├── clinical-record-service.yaml
│ └── README.md
│
├── billing-service/
│ ├── src/
│ ├── build.gradle
│ ├── billing-service.yaml
│ └── README.md
│
├── agenda-service/
│ ├── src/
│ ├── build.gradle
│ ├── agenda-service.yaml
│ └── README.md
│
├── facturacion-dian-service/
│ ├── src/
│ ├── build.gradle
│ ├── facturacion-dian-service.yaml
│ └── README.md
│
├── telemedicina-service/
│ ├── src/
│ ├── build.gradle
│ ├── telemedicina-service.yaml
│ └── README.md
│
├── notificaciones-service/
│ ├── src/
│ ├── build.gradle
│ ├── notificaciones-service.yaml
│ └── README.md
│
└── README.md ← (este archivo)


---

## 🚀 Ejecución general

Cada microservicio puede ejecutarse de forma **independiente** con el siguiente comando desde su carpeta raíz:

```bash

O, si prefieres compilar antes:

./gradlew bootRun

./gradlew clean build
java -jar build/libs/<nombre-del-micro>.jar

Cada microservicio expone su documentación interactiva en Swagger:

http://localhost:<puerto>/swagger-ui.html

Ejemplo:

http://localhost:8083/swagger-ui.html  → Billing Service

Contratos OpenAPI

Todos los contratos OpenAPI (.yaml) se encuentran en la raíz de cada microservicio.
Estos describen la estructura de los endpoints, los modelos de datos y los ejemplos de respuesta para facilitar la integración y pruebas entre equipos.

Documentación individual

Cada microservicio incluye en su propio README.md:
Descripción funcional del servicio.
Instrucciones para correrlo localmente.
Variables de entorno necesarias.
Ejemplos de llamadas a la API.
Enlaces a su documentación Swagger.