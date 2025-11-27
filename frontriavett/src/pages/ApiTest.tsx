import React, { useState } from 'react';
import Button from '../components/common/Button';
import clinicalRecordService from '../services/clinicalRecords';

const ApiTest: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : '🔵';
    const timestamp = new Date().toLocaleTimeString();
    setResults((prev) => [...prev, `[${timestamp}] ${emoji} ${message}`]);
  };

  const testGetRecords = async () => {
    addResult('Probando GET records...', 'info');
    try {
      const records = await clinicalRecordService.getAllRecords();
      addResult(`GET exitoso. Registros: ${records.length}`, 'success');
    } catch (error: any) {
      addResult(`Error GET: ${error.message}`, 'error');
    }
  };

  const testCreateRecord = async () => {
    addResult('Intentando crear registro...', 'info');
    const testData = {
      patientId: `TEST${Date.now()}`,
      veterinarianId: 'VET001',
      diagnosis: 'Test de creación desde página de diagnóstico',
      status: 'PENDING' as const,
    };
    
    try {
      const record = await clinicalRecordService.createRecord(testData);
      addResult(`¡Registro creado exitosamente!`, 'success');
      addResult(`ID: ${record.id}`, 'success');
    } catch (error: any) {
      addResult(`Error al crear: ${error.message}`, 'error');
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setResults([]);
    
    addResult('=== INICIANDO PRUEBAS ===', 'info');
    await testGetRecords();
    await new Promise(resolve => setTimeout(resolve, 500));
    await testCreateRecord();
    addResult('=== PRUEBAS COMPLETADAS ===', 'info');
    
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Prueba de API</h1>
        <p className="mt-1 text-gray-600">
          Prueba la conexión directa al backend
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Pruebas</h2>
          <div className="space-x-2">
            <Button onClick={() => setResults([])} variant="secondary" disabled={loading}>
              Limpiar
            </Button>
            <Button onClick={runAllTests} variant="primary" isLoading={loading}>
              Ejecutar Pruebas
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 text-gray-100 rounded p-4 font-mono text-sm max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-gray-400">
              Haz click en "Ejecutar Pruebas" para iniciar...
            </div>
          ) : (
            results.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Información</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Backend:</strong> http://localhost:8082</li>
          <li><strong>Sin proxy</strong> - Conexión directa</li>
          <li><strong>CORS:</strong> Manejado desde navegador/extensión</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;
