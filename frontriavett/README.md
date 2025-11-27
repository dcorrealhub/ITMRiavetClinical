# 🏥 Sistema de Registros Clínicos Veterinarios

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

Sistema web profesional para gestionar registros clínicos veterinarios. Interfaz moderna y responsive que consume una API REST de microservicios.

## ✨ Características Principales

- 📊 **Dashboard Interactivo** - Visualización completa de registros con estadísticas en tiempo real
- 📝 **Gestión CRUD** - Crear, leer, actualizar y eliminar registros clínicos
- 🔍 **Filtros Avanzados** - Por estado, paciente y veterinario
- ✅ **Validación en Tiempo Real** - Formularios con validación instantánea
- 🎨 **UI Profesional** - Diseño médico con paleta de colores apropiada
- 📱 **Responsive** - Funciona perfectamente en desktop, tablet y móvil
- 🔄 **Manejo de CORS** - Proxy configurado para desarrollo sin problemas

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js v16 o superior
- Backend corriendo en `http://localhost:8082`

### Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm start

# La aplicación se abrirá automáticamente en http://localhost:3000
```

### Inicio Automatizado

```bash
# Usar el script que verifica todo automáticamente
./start.sh
```

## 📚 Documentación

- **[📖 RESUMEN_COMPLETO.md](./RESUMEN_COMPLETO.md)** - Guía completa del proyecto
- **[🔧 TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solución de problemas CORS y API
- **[📦 INSTALL.md](./INSTALL.md)** - Guía de instalación detallada
- **[⚡ COMANDOS_UTILES.md](./COMANDOS_UTILES.md)** - Comandos para desarrollo

## 🏗️ Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.x | Framework UI |
| TypeScript | 4.9.x | Tipado estático |
| Tailwind CSS | 3.4.x | Estilos |
| Axios | 1.x | Cliente HTTP |
| React Router | 7.x | Navegación |
| date-fns | 4.x | Manejo de fechas |

## 📁 Estructura

```
src/
├── components/     # Componentes React
│   ├── common/     # Botones, inputs, modales, etc.
│   ├── forms/      # Formularios
│   └── layout/     # Layout y header
├── pages/          # Páginas de la aplicación
├── services/       # Servicios de API
├── hooks/          # Custom React hooks
├── types/          # Definiciones TypeScript
└── utils/          # Funciones auxiliares
```

## 🎯 Funcionalidades

### Dashboard
✅ Tabla de registros completa  
✅ Filtros por estado y paciente  
✅ Estadísticas (Total, Pendientes, Activos, Completados)  
✅ Vista detallada en modal  
✅ Eliminación con confirmación  

### Crear/Editar Registros
✅ Formulario validado en tiempo real  
✅ Campos: Paciente, Veterinario, Diagnóstico  
✅ Procedimientos y órdenes médicas  
✅ Prescripciones detalladas  
✅ Fecha de seguimiento  
✅ Selector de estado  

## 🐛 Solución de Problemas

### ❌ No se conecta al backend

**Solución:**
1. Verifica que el backend esté corriendo:
   ```bash
   curl http://localhost:8082/api/v1/records
   ```
2. Reinicia el servidor de desarrollo (Ctrl+C y `npm start`)
3. Revisa la consola del navegador (F12)
4. Visita `/api-test` para diagnosticar

Ver [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) para más detalles.

## 📞 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/records` | Obtener todos los registros |
| GET | `/api/v1/records/{id}` | Obtener por ID |
| POST | `/api/v1/records` | Crear registro |
| PUT | `/api/v1/records/{id}` | Actualizar registro |
| DELETE | `/api/v1/records/{id}` | Eliminar registro |

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Página de prueba de API
http://localhost:3000/api-test
```

## 🏭 Build para Producción

```bash
npm run build
```

Genera archivos optimizados en la carpeta `build/`.

## 📄 Licencia

Este proyecto es parte de un sistema de gestión veterinaria profesional.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios propuestos.

---

**Desarrollado con ❤️ para la gestión veterinaria profesional**

*Última actualización: Noviembre 25, 2025*
