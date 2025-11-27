#!/bin/bash

# Script de verificación pre-inicio
echo "🔍 Verificando configuración del proyecto..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi
echo "✅ npm $(npm -v)"

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules no existe. Instalando dependencias..."
    npm install
fi
echo "✅ Dependencias instaladas"

# Verificar .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado. Creándolo..."
    cat > .env << EOF
REACT_APP_API_BASE_URL=http://localhost:8082
REACT_APP_ENVIRONMENT=development
REACT_APP_APP_NAME=Veterinary Clinical Records
EOF
    echo "✅ Archivo .env creado"
else
    echo "✅ Archivo .env existe"
fi

# Verificar backend
echo ""
echo "🔍 Verificando backend en http://localhost:8082..."
if curl -s -f -o /dev/null "http://localhost:8082/api/v1/records"; then
    echo "✅ Backend está corriendo y responde correctamente"
    
    # Mostrar cantidad de registros
    RECORD_COUNT=$(curl -s "http://localhost:8082/api/v1/records" | grep -o '"id"' | wc -l)
    echo "📊 Registros disponibles: $RECORD_COUNT"
else
    echo "❌ Backend NO está corriendo en http://localhost:8082"
    echo ""
    echo "Por favor, inicia el backend antes de continuar."
    echo "El frontend necesita el backend para funcionar correctamente."
    echo ""
    read -p "¿Deseas continuar de todas formas? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "✅ Todas las verificaciones completadas"
echo ""
echo "🚀 Iniciando servidor de desarrollo..."
echo "📝 La aplicación se abrirá en http://localhost:3000"
echo "📝 Si el puerto 3000 está ocupado, se usará el siguiente disponible"
echo ""
echo "💡 Consejos:"
echo "   - Abre DevTools (F12) para ver logs de la API"
echo "   - Visita /api-test para probar la conexión"
echo "   - Presiona Ctrl+C para detener el servidor"
echo ""

# Iniciar servidor
npm start
