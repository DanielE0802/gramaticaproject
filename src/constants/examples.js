/**
 * examples.js
 * 
 * Contiene ejemplos predefinidos de problemas para facilitar el testing
 * y demostración de la aplicación.
 * 
 * Cada ejemplo tiene:
 * - id: identificador único
 * - name: nombre corto para el selector
 * - text: texto completo del problema
 * - type: 'pumping' | 'pcp'
 */

export const EXAMPLES = [
  {
    id: 1,
    name: "Bombeo: a^n b^n",
    text: "Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular.",
    type: "pumping"
  },
  {
    id: 2,
    name: "Bombeo: ww",
    text: "Compruebe con el teorema de bombeo que L = ww no es regular.",
    type: "pumping"
  },
  {
    id: 3,
    name: "Bombeo: 0^n 1^n",
    text: "Use el teorema de bombeo para demostrar que L = { 0^n 1^n | n ≥ 0 } no es regular.",
    type: "pumping"
  },
  {
    id: 4,
    name: "PCP: Ejemplo 1",
    text: "Resolver el PCP: (a,ab), (ba,a), (aba,b).",
    type: "pcp"
  },
  {
    id: 5,
    name: "PCP: Ejemplo 2",
    text: "Encuentre si hay solución al PCP con pares (0,01) (01,1).",
    type: "pcp"
  },
  {
    id: 6,
    name: "PCP: Ejemplo 3",
    text: "Resolver el problema de correspondencia de Post con los pares: (1, 101), (10, 00), (011, 11).",
    type: "pcp"
  }
];

/**
 * Obtiene un ejemplo por su ID
 * @param {number} id - ID del ejemplo
 * @returns {Object|null} - Objeto ejemplo o null si no existe
 */
export function getExampleById(id) {
  return EXAMPLES.find(example => example.id === id) || null;
}

/**
 * Obtiene ejemplos filtrados por tipo
 * @param {string} type - Tipo de problema ('pumping' o 'pcp')
 * @returns {Array} - Array de ejemplos del tipo especificado
 */
export function getExamplesByType(type) {
  return EXAMPLES.filter(example => example.type === type);
}

/**
 * Obtiene un ejemplo aleatorio
 * @param {string} type - (Opcional) Tipo de problema para filtrar
 * @returns {Object} - Ejemplo aleatorio
 */
export function getRandomExample(type = null) {
  const filtered = type ? getExamplesByType(type) : EXAMPLES;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
