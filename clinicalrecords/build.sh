#!/bin/bash

echo "🚀 Building Clinical Record Service with MongoDB..."
echo "=================================================="

# Verificar que Java 17 esté disponible
echo "☕ Checking Java version..."
java -version

echo ""
echo "🔧 Building with Gradle..."
./gradlew clean build -x test

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "🗄️  Database setup required:"
    echo "   - MongoDB database: clinicaldb"
    echo "   - Default connection: mongodb://localhost:27017/clinicaldb"
    echo "   - For authentication, see MONGODB_CONFIG.md"
    echo ""
    echo "🎯 To run the application:"
    echo "   ./gradlew bootRun"
    echo ""
    echo "📚 API Documentation will be available at:"
    echo "   http://localhost:8082/swagger-ui.html"
    echo ""
    echo "🏥 Clinical Records API endpoints:"
    echo "   POST   /api/v1/records                    - Create clinical record"
    echo "   GET    /api/v1/records                    - List all clinical records"
    echo "   GET    /api/v1/records?patientId=ID       - Filter by patient"
    echo "   GET    /api/v1/records?status=STATUS      - Filter by status"
    echo "   GET    /api/v1/records/{id}               - Get clinical record by ID"
    echo "   GET    /api/v1/records/veterinarian/{id}  - Get records by veterinarian"
    echo ""
    echo "🩺 New Medical Orders features:"
    echo "   - Support for medical orders in records"
    echo "   - Prescription management"
    echo "   - Follow-up date tracking"
    echo "   - Status-based filtering (ACTIVE, COMPLETED, etc.)"
    echo ""
    echo "📁 Project structure follows Clean Architecture:"
    echo "   ├── application/          # Application layer (DTOs, Services)"
    echo "   ├── domain/              # Domain layer (Entities, Repositories)"
    echo "   └── infrastructure/      # Infrastructure layer (Controllers, Persistence)"
else
    echo ""
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
