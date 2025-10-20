#!/bin/bash

echo "🏥 Patient Service Quick Start Guide"
echo "===================================="
echo ""

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17+ first."
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | awk -F '.' '{print $1}')
if [ "$JAVA_VERSION" -lt 17 ]; then
    echo "❌ Java 17+ is required. Current version: $JAVA_VERSION"
    exit 1
fi

echo "✅ Java version is compatible"

# Check if we can build the project
echo "🔨 Building the project..."
if ./gradlew clean build -x test --no-daemon; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🎉 Patient Service is ready!"
echo ""
echo "📋 Next Steps:"
echo "1. Start PostgreSQL: docker-compose up postgres -d"
echo "2. Run the service: ./gradlew bootRun"
echo "3. Or use Docker: docker-compose up"
echo ""
echo "📊 Endpoints:"
echo "• API: http://localhost:8081/api/v1/patients"
echo "• Swagger: http://localhost:8081/swagger-ui.html"
echo "• Health: http://localhost:8081/actuator/health"
echo ""
echo "📚 Documentation:"
echo "• See README.md for detailed instructions"
echo "• API documentation available in Swagger UI"
