#!/bin/bash

echo "🔄 Reiniciando servidor frontend..."
echo ""

# Encontrar y matar el proceso de react-scripts
echo "🛑 Deteniendo servidor actual..."
pkill -f "react-scripts start" 2>/dev/null

# Esperar a que el proceso termine
sleep 2

# Verificar que el puerto 3001 esté libre
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Puerto 3001 todavía ocupado, liberándolo..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null
    sleep 1
fi

# Verificar puerto 3000 también
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Puerto 3000 también ocupado, liberándolo..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 1
fi

echo "✅ Servidor detenido"
echo ""
echo "🚀 Iniciando servidor con proxy configurado..."
echo ""

# Iniciar el servidor
npm start
