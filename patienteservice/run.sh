#!/bin/bash

echo "🏥 Patient Service - RIAVET Platform"
echo "===================================="

# Check if PostgreSQL is running
if ! nc -z localhost 5432; then
    echo "❌ PostgreSQL is not running on localhost:5432"
    echo "Please start PostgreSQL or run: docker-compose up postgres -d"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Build the application
echo "🔨 Building application..."
./gradlew clean build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
    echo "🚀 Starting Patient Service..."
    ./gradlew bootRun
else
    echo "❌ Build failed"
    exit 1
fi
