/**
 * Test simple y rápido para el módulo pcpSolver.js
 */

import { solvePCP } from './src/utils/pcpSolver.js';

console.log('🧪 Test Rápido del Módulo PCP\n');

// Test 1: Solución inmediata
console.log('TEST 1: Par idéntico (ab, ab)');
const result1 = solvePCP([{ top: 'ab', bottom: 'ab' }]);
console.log('✅ Solución:', result1.hasSolution);
console.log('   Secuencia:', result1.sequence);
console.log('   Resultado:', result1.topResult);
console.log('   Tiempo:', result1.stats.timeMs + 'ms\n');

// Test 2: Validación de error
console.log('TEST 2: Sin pares (null)');
const result2 = solvePCP(null);
console.log('✅ Error detectado:', result2.error);
console.log('   Mensaje:', result2.message, '\n');

// Test 3: Formato extractedData
console.log('TEST 3: Input como extractedData');
const result3 = solvePCP({
  pairs: [
    { top: 'a', bottom: 'a' },
    { top: 'b', bottom: 'b' }
  ]
});
console.log('✅ Solución:', result3.hasSolution);
console.log('   Secuencia:', result3.sequence);
console.log('   Tiempo:', result3.stats.timeMs + 'ms\n');

// Test 4: Búsqueda limitada
console.log('TEST 4: Búsqueda sin solución inmediata');
const result4 = solvePCP([
  { top: 'a', bottom: 'ab' },
  { top: 'ba', bottom: 'a' }
]);
console.log('✅ Solución:', result4.hasSolution);
console.log('   Nodos explorados:', result4.stats.nodesExplored);
console.log('   Ramas podadas:', result4.stats.branchesPruned);
console.log('   Profundidad máxima:', result4.stats.maxDepthReached);
console.log('   Tiempo:', result4.stats.timeMs + 'ms\n');

console.log('✅ Tests básicos completados');
