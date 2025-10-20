#!/bin/bash

echo "🚀 Starting Billing Service..."
echo "📋 Prerequisites:"
echo "   - Java 17+ installed"
echo "   - PostgreSQL running on localhost:5432"
echo "   - Database 'billingdb' created"
echo ""

# Check if PostgreSQL is running
if ! nc -z localhost 5432; then
    echo "❌ PostgreSQL is not running on localhost:5432"
    echo "   Please start PostgreSQL and create the 'billingdb' database"
    exit 1
fi

echo "✅ PostgreSQL is running"
echo ""

# Build and run the application
echo "🔨 Building application..."
./gradlew build --quiet

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    echo ""
    echo "🚀 Starting Billing Service on port 8083..."
    echo "📖 API Documentation will be available at: http://localhost:8083/swagger-ui.html"
    echo "🔗 API Endpoints: http://localhost:8083/api/v1/invoices"
    echo ""
    echo "Press Ctrl+C to stop the service"
    echo ""
    
    ./gradlew bootRun
else
    echo "❌ Build failed"
    exit 1
fi
