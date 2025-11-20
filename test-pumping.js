/**
 * Script de prueba manual para el módulo pumpingLemma.js
 * 
 * Ejecutar con: node test-pumping.js
 */

import { solvePumpingLemma, identifyLanguagePattern } from './src/utils/pumpingLemma.js';

console.log('🧪 Pruebas del Módulo de Teorema de Bombeo\n');
console.log('='.repeat(60));

// Caso 1: a^n b^n
console.log('\n📝 CASO 1: L = { a^n b^n | n ≥ 0 }');
console.log('-'.repeat(60));
const test1 = {
  normalizedLanguage: 'a^n b^n',
  rawLanguage: '{ a^n b^n | n ≥ 0 }',
  patternsDetected: ['a^n b^n']
};

const pattern1 = identifyLanguagePattern(test1);
console.log('🔍 Patrón identificado:', pattern1);

const solution1 = solvePumpingLemma(test1);
console.log('\n✅ Solución generada:');
console.log('Tipo:', solution1.type);
console.log('Es regular:', solution1.isRegular);
console.log('Lenguaje:', solution1.language);
console.log('\nPasos:');
solution1.steps.forEach((step, i) => {
  console.log(`\n${i + 1}. ${step.title}`);
  console.log(`   ${step.explanation}`);
  if (step.math) console.log(`   Math: ${step.math}`);
  if (step.example) console.log(`   Ejemplo: ${step.example}`);
});
console.log('\n📌 Conclusión:', solution1.conclusion);

// Caso 2: 0^n 1^n
console.log('\n\n📝 CASO 2: L = { 0^n 1^n | n ≥ 0 }');
console.log('-'.repeat(60));
const test2 = {
  normalizedLanguage: '0^n 1^n',
  rawLanguage: '{ 0^n 1^n | n ≥ 0 }',
  patternsDetected: ['0^n 1^n']
};

const pattern2 = identifyLanguagePattern(test2);
console.log('🔍 Patrón identificado:', pattern2);

const solution2 = solvePumpingLemma(test2);
console.log('\n✅ Solución generada:');
console.log('Pasos:', solution2.steps.length);
console.log('Título primer paso:', solution2.steps[0].title);
console.log('Título último paso:', solution2.steps[solution2.steps.length - 1].title);

// Caso 3: ww
console.log('\n\n📝 CASO 3: L = { ww | w ∈ Σ* }');
console.log('-'.repeat(60));
const test3 = {
  normalizedLanguage: 'ww',
  rawLanguage: '{ ww | w ∈ Σ* }',
  patternsDetected: ['ww']
};

const pattern3 = identifyLanguagePattern(test3);
console.log('🔍 Patrón identificado:', pattern3);

const solution3 = solvePumpingLemma(test3);
console.log('\n✅ Solución generada:');
console.log('Pasos:', solution3.steps.length);
console.log('Conclusión:', solution3.conclusion);

// Caso 4: a^n b^m c^n
console.log('\n\n📝 CASO 4: L = { a^n b^m c^n | n,m ≥ 0 }');
console.log('-'.repeat(60));
const test4 = {
  normalizedLanguage: 'a^n b^m c^n',
  rawLanguage: '{ a^n b^m c^n | n,m ≥ 0 }',
  patternsDetected: ['a^n b^m c^n']
};

const pattern4 = identifyLanguagePattern(test4);
console.log('🔍 Patrón identificado:', pattern4);

const solution4 = solvePumpingLemma(test4);
console.log('\n✅ Solución generada:');
console.log('Pasos:', solution4.steps.length);
console.log('Título del paso 3:', solution4.steps[2]?.title);

// Caso 5: a^n b^n c^n
console.log('\n\n📝 CASO 5: L = { a^n b^n c^n | n ≥ 0 }');
console.log('-'.repeat(60));
const test5 = {
  normalizedLanguage: 'a^n b^n c^n',
  rawLanguage: '{ a^n b^n c^n | n ≥ 0 }',
  patternsDetected: ['a^n b^n c^n']
};

const pattern5 = identifyLanguagePattern(test5);
console.log('🔍 Patrón identificado:', pattern5);

const solution5 = solvePumpingLemma(test5);
console.log('\n✅ Solución generada:');
console.log('Pasos:', solution5.steps.length);

// Caso 6: Lenguaje desconocido
console.log('\n\n📝 CASO 6: Lenguaje no reconocido');
console.log('-'.repeat(60));
const test6 = {
  normalizedLanguage: 'a^(2n) b^n',
  rawLanguage: '{ a^(2n) b^n | n ≥ 0 }',
  patternsDetected: []
};

const pattern6 = identifyLanguagePattern(test6);
console.log('🔍 Patrón identificado:', pattern6);

const solution6 = solvePumpingLemma(test6);
console.log('\n✅ Solución generada (genérica):');
console.log('Tipo:', solution6.type);
console.log('Pasos:', solution6.steps.length);
console.log('Título primer paso:', solution6.steps[0].title);

// Caso 7: Sin datos
console.log('\n\n📝 CASO 7: Sin datos de entrada');
console.log('-'.repeat(60));
const solution7 = solvePumpingLemma(null);
console.log('✅ Solución generada para null:');
console.log('Tipo:', solution7.type);
console.log('Pasos:', solution7.steps.length);

console.log('\n\n' + '='.repeat(60));
console.log('✅ TODAS LAS PRUEBAS COMPLETADAS\n');
