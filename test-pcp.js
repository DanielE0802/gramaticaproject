/**
 * Script de prueba manual para el módulo pcpSolver.js
 * 
 * Ejecutar con: node test-pcp.js
 */

import { solvePCP } from './src/utils/pcpSolver.js';

console.log('🧪 Pruebas del Módulo PCP Solver\n');
console.log('='.repeat(60));

// Caso 1: Ejemplo clásico con solución conocida
console.log('\n📝 CASO 1: PCP con solución conocida');
console.log('-'.repeat(60));
console.log('Pares: (1, 101), (10, 00), (011, 11)');

const test1 = [
  { top: '1', bottom: '101' },
  { top: '10', bottom: '00' },
  { top: '011', bottom: '11' }
];

console.log('\n🔍 Ejecutando solver...');
const solution1 = solvePCP(test1);

console.log('\n✅ Resultado:');
console.log('Tipo:', solution1.type);
console.log('Tiene solución:', solution1.hasSolution);
if (solution1.hasSolution) {
  console.log('Secuencia:', solution1.sequence);
  console.log('Superior:', solution1.topResult);
  console.log('Inferior:', solution1.bottomResult);
  console.log('Pasos:', solution1.steps.length);
}
console.log('Mensaje:', solution1.message);
console.log('Stats:', solution1.stats);

// Caso 2: Ejemplo del enunciado
console.log('\n\n📝 CASO 2: (a,ab), (ba,a), (aba,b)');
console.log('-'.repeat(60));

const test2 = [
  { top: 'a', bottom: 'ab' },
  { top: 'ba', bottom: 'a' },
  { top: 'aba', bottom: 'b' }
];

console.log('🔍 Ejecutando solver...');
const solution2 = solvePCP(test2);

console.log('\n✅ Resultado:');
console.log('Tiene solución:', solution2.hasSolution);
if (solution2.hasSolution) {
  console.log('Secuencia:', solution2.sequence);
  console.log('Superior:', solution2.topResult);
  console.log('Inferior:', solution2.bottomResult);
  console.log('\nPasos de la solución:');
  solution2.steps.forEach(step => {
    console.log(`  ${step.step}. ${step.pair} → Top: "${step.topAccumulated}", Bottom: "${step.bottomAccumulated}", Match: ${step.match}`);
  });
}
console.log('\nMensaje:', solution2.message);
console.log('Nodos explorados:', solution2.stats.nodesExplored);
console.log('Ramas podadas:', solution2.stats.branchesPruned);
console.log('Tiempo:', solution2.stats.timeMs + 'ms');

// Caso 3: (0,01), (01,1)
console.log('\n\n📝 CASO 3: (0,01), (01,1)');
console.log('-'.repeat(60));

const test3 = [
  { top: '0', bottom: '01' },
  { top: '01', bottom: '1' }
];

console.log('🔍 Ejecutando solver...');
const solution3 = solvePCP(test3);

console.log('\n✅ Resultado:');
console.log('Tiene solución:', solution3.hasSolution);
console.log('Mensaje:', solution3.message);
console.log('Stats:', solution3.stats);

// Caso 4: Instancia imposible simple
console.log('\n\n📝 CASO 4: (a,aa), (aa,a) - Sin solución esperada');
console.log('-'.repeat(60));

const test4 = [
  { top: 'a', bottom: 'aa' },
  { top: 'aa', bottom: 'a' }
];

console.log('🔍 Ejecutando solver...');
const solution4 = solvePCP(test4);

console.log('\n✅ Resultado:');
console.log('Tiene solución:', solution4.hasSolution);
console.log('Mensaje:', solution4.message);
console.log('Nodos explorados:', solution4.stats.nodesExplored);
console.log('Profundidad máxima:', solution4.stats.maxDepthReached);

// Caso 5: Input desde detectProblemType
console.log('\n\n📝 CASO 5: Input como extractedData de detectProblemType');
console.log('-'.repeat(60));

const test5 = {
  pairs: [
    { top: 'a', bottom: 'ab' },
    { top: 'ba', bottom: 'a' }
  ],
  pairCount: 2
};

console.log('🔍 Ejecutando solver con extractedData...');
const solution5 = solvePCP(test5);

console.log('\n✅ Resultado:');
console.log('Tipo:', solution5.type);
console.log('Tiene solución:', solution5.hasSolution);
console.log('Stats:', solution5.stats);

// Caso 6: Validación de errores - Sin pares
console.log('\n\n📝 CASO 6: Sin pares (validación de errores)');
console.log('-'.repeat(60));

const solution6 = solvePCP(null);

console.log('\n✅ Resultado:');
console.log('Error:', solution6.error);
console.log('Mensaje:', solution6.message);

// Caso 7: Validación de errores - Pares mal formados
console.log('\n\n📝 CASO 7: Pares mal formados');
console.log('-'.repeat(60));

const test7 = [
  { top: 'a', bottom: 'ab' },
  { top: 'ba' }, // Falta bottom
  { top: 'aba', bottom: 'b' }
];

const solution7 = solvePCP(test7);

console.log('\n✅ Resultado:');
console.log('Error:', solution7.error);
console.log('Mensaje:', solution7.message);

// Caso 8: Ejemplo con solución corta
console.log('\n\n📝 CASO 8: Solución corta esperada');
console.log('-'.repeat(60));
console.log('Pares: (ab, ab) - Solución inmediata');

const test8 = [
  { top: 'ab', bottom: 'ab' },
  { top: 'ba', bottom: 'ba' }
];

console.log('🔍 Ejecutando solver...');
const solution8 = solvePCP(test8);

console.log('\n✅ Resultado:');
console.log('Tiene solución:', solution8.hasSolution);
if (solution8.hasSolution) {
  console.log('Secuencia:', solution8.sequence);
  console.log('Resultado:', solution8.topResult);
  console.log('Pasos:', solution8.steps.length);
}
console.log('Tiempo:', solution8.stats.timeMs + 'ms');

console.log('\n\n' + '='.repeat(60));
console.log('✅ TODAS LAS PRUEBAS COMPLETADAS\n');
console.log('Resumen:');
console.log('- CASO 1: Busca solución en instancia clásica');
console.log('- CASO 2: Ejemplo del enunciado (a,ab), (ba,a), (aba,b)');
console.log('- CASO 3: Instancia (0,01), (01,1)');
console.log('- CASO 4: Instancia sin solución esperada');
console.log('- CASO 5: Input como extractedData');
console.log('- CASO 6: Validación de null');
console.log('- CASO 7: Validación de formato inválido');
console.log('- CASO 8: Solución inmediata');
