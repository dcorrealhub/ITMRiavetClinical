#!/bin/bash

echo "🏥 Patient Service Setup"
echo "======================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Start PostgreSQL container
echo "🐘 Starting PostgreSQL container..."
docker-compose up postgres -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Check if PostgreSQL is ready
until docker-compose exec postgres pg_isready -U postgres; do
    echo "⏳ Waiting for PostgreSQL..."
    sleep 2
done

echo "✅ PostgreSQL is ready"

# Build the application
echo "🔨 Building application..."
./gradlew clean build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Run the application: ./run.sh"
    echo "2. Or run with Docker: docker-compose up"
    echo "3. API documentation: http://localhost:8081/swagger-ui.html"
    echo "4. Health check: http://localhost:8081/actuator/health"
else
    echo "❌ Build failed"
    exit 1
fi
