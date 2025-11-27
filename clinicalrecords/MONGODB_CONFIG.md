# MongoDB Configuration Examples

## Basic connection (no authentication)
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/clinicaldb
      auto-index-creation: true
```

## Connection with authentication
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://username:password@localhost:27017/clinicaldb?authSource=admin
      auto-index-creation: true
```

## Connection to MongoDB Atlas (Cloud)
```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://username:password@cluster0.mongodb.net/clinicaldb?retryWrites=true&w=majority
      auto-index-creation: true
```

## Alternative configuration format
```yaml
spring:
  data:
    mongodb:
      host: localhost
      port: 27017
      database: clinicaldb
      username: username
      password: password
      authentication-database: admin
      auto-index-creation: true
```

## MongoDB Docker Compose Example
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    container_name: clinical-mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: clinicaldb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - clinical-network

volumes:
  mongodb_data:

networks:
  clinical-network:
    driver: bridge
```

## Para conectar con autenticación usando Docker:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://admin:password123@localhost:27017/clinicaldb?authSource=admin
      auto-index-creation: true
```
