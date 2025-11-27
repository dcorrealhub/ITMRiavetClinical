// Script de inicialización de MongoDB para Clinical Records Service
// Ejecutar este script en MongoDB shell: mongosh < init_mongodb.js

// Conectar a la base de datos
use clinicaldb

// Limpiar colección existente (opcional)
db.clinical_records.drop()

// Crear índices para optimizar consultas
db.clinical_records.createIndex({ "patient_id": 1 })
db.clinical_records.createIndex({ "veterinarian_id": 1 })
db.clinical_records.createIndex({ "status": 1 })
db.clinical_records.createIndex({ "created_at": -1 })
db.clinical_records.createIndex({ "patient_id": 1, "status": 1 })

// Insertar datos de ejemplo
db.clinical_records.insertMany([
  {
    "patient_id": "PAT001",
    "veterinarian_id": "VET001",
    "diagnosis": "Infección respiratoria aguda en canino",
    "procedures": "Examen físico completo, radiografía de tórax, análisis de sangre",
    "attachments": "radiografia_torax_001.jpg, resultados_laboratorio.pdf",
    "medical_orders": "Antibiótico amoxicilina 500mg cada 8 horas por 7 días, reposo absoluto, revisión en 7 días",
    "prescription": "Amoxicilina 500mg - Tomar 1 cápsula cada 8 horas por 7 días\nDexametasona 0.5mg - Aplicar 0.5ml intramuscular cada 24 horas por 3 días",
    "follow_up_date": new ISODate("2024-01-22T10:30:00Z"),
    "status": "ACTIVE",
    "created_at": new ISODate("2024-01-15T14:30:00Z")
  },
  {
    "patient_id": "PAT002", 
    "veterinarian_id": "VET002",
    "diagnosis": "Fractura de fémur en felino",
    "procedures": "Radiografía, cirugía de reducción y fijación con placa",
    "attachments": "radiografia_preop.jpg, radiografia_postop.jpg, video_cirugia.mp4",
    "medical_orders": "Cirugía programada para mañana, ayuno 12 horas, analgesia post-operatoria",
    "prescription": "Tramadol 50mg - 1/4 de tableta cada 12 horas por 5 días\nMeloxicam 0.5mg/ml - 0.1ml cada 24 horas por 7 días",
    "follow_up_date": new ISODate("2024-01-20T09:00:00Z"),
    "status": "ACTIVE",
    "created_at": new ISODate("2024-01-15T16:45:00Z")
  },
  {
    "patient_id": "PAT001",
    "veterinarian_id": "VET001", 
    "diagnosis": "Control post-tratamiento infección respiratoria",
    "procedures": "Examen físico de control, auscultación pulmonar",
    "attachments": null,
    "medical_orders": "Tratamiento completado exitosamente, alta médica",
    "prescription": null,
    "follow_up_date": null,
    "status": "COMPLETED",
    "created_at": new ISODate("2024-01-22T10:30:00Z")
  },
  {
    "patient_id": "PAT003",
    "veterinarian_id": "VET001",
    "diagnosis": "Vacunación anual múltiple en canino",
    "procedures": "Aplicación de vacuna múltiple, desparasitación interna",
    "attachments": "certificado_vacunacion.pdf",
    "medical_orders": "Próxima vacunación en 12 meses, desparasitación cada 3 meses",
    "prescription": "Albendazol 400mg - 1 tableta única dosis",
    "follow_up_date": new ISODate("2025-01-15T14:00:00Z"),
    "status": "COMPLETED",
    "created_at": new ISODate("2024-01-15T14:00:00Z")
  }
])

print("Base de datos inicializada con " + db.clinical_records.countDocuments() + " registros")

// Mostrar estadísticas
print("\n=== Estadísticas ===")
print("Total de registros: " + db.clinical_records.countDocuments())
print("Registros activos: " + db.clinical_records.countDocuments({"status": "ACTIVE"}))
print("Registros completados: " + db.clinical_records.countDocuments({"status": "COMPLETED"}))

// Mostrar índices creados
print("\n=== Índices creados ===")
db.clinical_records.getIndexes().forEach(function(index) {
  print("- " + index.name + ": " + JSON.stringify(index.key))
})

print("\n¡Inicialización completada!")
print("Puedes ejecutar el microservicio con: ./gradlew bootRun")
print("API disponible en: http://localhost:8082/swagger-ui.html")
