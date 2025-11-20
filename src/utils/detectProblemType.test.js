/**
 * detectProblemType.test.js
 * 
 * Archivo de pruebas para verificar la detección de tipo de problema
 * 
 * Ejecutar en consola del navegador o con Node.js (si se configura)
 */

import { detectProblemType } from './detectProblemType.js';

// ============================================
// CASOS DE PRUEBA
// ============================================

export const testCases = [
  // TEOREMA DE BOMBEO - Casos válidos
  {
    name: 'Bombeo: a^n b^n',
    input: 'Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular.',
    expectedType: 'pumping',
    expectedMinConfidence: 0.5
  },
  {
    name: 'Bombeo: ww',
    input: 'Compruebe con el teorema de bombeo que L = ww no es regular.',
    expectedType: 'pumping',
    expectedMinConfidence: 0.5
  },
  {
    name: 'Bombeo: 0^n 1^n',
    input: 'Use el teorema de bombeo para demostrar que L = { 0^n 1^n | n ≥ 0 } no es regular.',
    expectedType: 'pumping',
    expectedMinConfidence: 0.5
  },
  {
    name: 'Bombeo: sin notación completa',
    input: 'Demostrar con pumping lemma que el lenguaje a^n b^n no es regular',
    expectedType: 'pumping',
    expectedMinConfidence: 0.4
  },

  // PCP - Casos válidos
  {
    name: 'PCP: Ejemplo 1',
    input: 'Resolver el PCP: (a,ab), (ba,a), (aba,b).',
    expectedType: 'pcp',
    expectedMinConfidence: 0.5
  },
  {
    name: 'PCP: Ejemplo 2',
    input: 'Encuentre si hay solución al PCP con pares (0,01) (01,1).',
    expectedType: 'pcp',
    expectedMinConfidence: 0.5
  },
  {
    name: 'PCP: Ejemplo 3',
    input: 'Resolver el problema de correspondencia de Post con los pares: (1,101), (10,00), (011,11).',
    expectedType: 'pcp',
    expectedMinConfidence: 0.5
  },
  {
    name: 'PCP: con palabra "correspondencia"',
    input: 'Problema de correspondencia: (abc,ab), (ca,a), (acc,ba).',
    expectedType: 'pcp',
    expectedMinConfidence: 0.4
  },

  // CASOS NEGATIVOS
  {
    name: 'Texto vacío',
    input: '',
    expectedType: 'unknown',
    expectedMinConfidence: 0
  },
  {
    name: 'Texto irrelevante',
    input: 'Este es un texto que no tiene nada que ver con teoría de la computación',
    expectedType: 'unknown',
    expectedMinConfidence: 0
  },
  {
    name: 'Texto ambiguo',
    input: 'Analizar el lenguaje',
    expectedType: 'unknown',
    expectedMinConfidence: 0
  }
];

// ============================================
// FUNCIÓN DE TEST
// ============================================

export function runTests() {
  console.log('🧪 INICIANDO TESTS DE DETECCIÓN\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  const results = [];

  testCases.forEach((testCase, index) => {
    console.log(`\n📝 Test ${index + 1}: ${testCase.name}`);
    console.log(`Input: "${testCase.input.substring(0, 60)}${testCase.input.length > 60 ? '...' : ''}"`);
    
    const result = detectProblemType(testCase.input);
    
    console.log(`Expected: ${testCase.expectedType} (confidence >= ${testCase.expectedMinConfidence})`);
    console.log(`Got: ${result.type} (confidence: ${result.confidence})`);
    
    const typeMatch = result.type === testCase.expectedType;
    const confidenceMatch = result.confidence >= testCase.expectedMinConfidence;
    const success = typeMatch && confidenceMatch;
    
    if (success) {
      console.log('✅ PASSED');
      passed++;
    } else {
      console.log('❌ FAILED');
      if (!typeMatch) console.log(`   - Type mismatch: expected ${testCase.expectedType}, got ${result.type}`);
      if (!confidenceMatch) console.log(`   - Low confidence: expected >= ${testCase.expectedMinConfidence}, got ${result.confidence}`);
      failed++;
    }
    
    // Mostrar datos extraídos
    if (result.extractedData) {
      console.log('📊 Extracted Data:', JSON.stringify(result.extractedData, null, 2));
    }
    
    results.push({
      name: testCase.name,
      success,
      result
    });
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\n📈 RESUMEN DE TESTS:`);
  console.log(`✅ Passed: ${passed}/${testCases.length}`);
  console.log(`❌ Failed: ${failed}/${testCases.length}`);
  console.log(`📊 Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%\n`);

  return results;
}

// ============================================
// FUNCIÓN DE TEST MANUAL
// ============================================

export function testManual(text) {
  console.log('\n🔍 TEST MANUAL\n');
  console.log('Input:', text);
  console.log('-'.repeat(60));
  
  const result = detectProblemType(text);
  
  console.log('Result:');
  console.log('  Type:', result.type);
  console.log('  Confidence:', result.confidence);
  console.log('  Extracted Data:', result.extractedData);
  
  return result;
}

// ============================================
// AUTO-EJECUCIÓN (comentar si no se desea)
// ============================================

// Descomentar para ejecutar automáticamente al cargar el archivo
// runTests();
