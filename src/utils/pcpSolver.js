/**
 * pcpSolver.js
 * 
 * Función principal: solvePCP(pairs)
 * 
 * Responsabilidad: Resolver el Post Correspondence Problem (PCP) usando
 * backtracking con poda de ramas.
 * 
 * Algoritmo:
 * 1. Validar entrada
 * 2. Implementar backtracking recursivo
 * 3. Probar diferentes secuencias de pares
 * 4. Podar ramas no prometedoras
 * 5. Retornar solución o indicar no encontrada
 * 
 * Constantes:
 * - MAX_DEPTH: Profundidad máxima de búsqueda
 * - MAX_DIFF: Diferencia máxima entre cadenas
 * - TIMEOUT_MS: Tiempo máximo de ejecución
 */

// Constantes de configuración
const MAX_DEPTH = 8;          // Profundidad máxima de búsqueda
const MAX_DIFF = 50;          // Diferencia máxima entre longitudes
const TIMEOUT_MS = 3000;      // Timeout en milisegundos (3 segundos)

/**
 * Resuelve el Post Correspondence Problem usando backtracking con poda
 * @param {Array|Object} input - Array de pares o objeto extractedData de detectProblemType
 * @returns {Object} - Objeto con la solución o indicación de no solución
 */
export function solvePCP(input) {
  // Normalizar entrada: puede venir como array directo o como extractedData
  let pairs = [];
  
  if (!input) {
    return buildErrorResponse('No se proporcionaron pares para resolver el PCP');
  }

  // Si viene de detectProblemType, extraer el array de pares
  if (input.pairs && Array.isArray(input.pairs)) {
    pairs = input.pairs;
  } else if (Array.isArray(input)) {
    pairs = input;
  } else {
    return buildErrorResponse('Formato de entrada inválido. Se esperaba un array de pares.');
  }

  // Validar pares
  const validation = validatePairs(pairs);
  if (!validation.valid) {
    return buildErrorResponse(validation.error);
  }

  // Advertir si hay muchos pares (complejidad exponencial)
  let warning = '';
  if (pairs.length > 10) {
    warning = 'Advertencia: El número de pares es alto. La búsqueda puede ser lenta. ';
  }

  // Inicializar tracking de tiempo
  const startTime = Date.now();
  const stats = {
    nodesExplored: 0,
    branchesPruned: 0,
    maxDepthReached: 0,
    timeExceeded: false
  };

  // Set para evitar estados repetidos (memoization)
  const visitedStates = new Set();

  /**
   * Función recursiva de backtracking
   * @param {string} topAccumulated - Cadena superior acumulada
   * @param {string} bottomAccumulated - Cadena inferior acumulada
   * @param {number} depth - Profundidad actual
   * @param {Array} sequence - Secuencia de índices de pares usados
   * @returns {Object|null} - Solución encontrada o null
   */
  function backtrack(topAccumulated, bottomAccumulated, depth, sequence) {
    // Verificar timeout
    if (Date.now() - startTime > TIMEOUT_MS) {
      stats.timeExceeded = true;
      return null;
    }

    // Incrementar contador de nodos explorados
    stats.nodesExplored++;

    // Actualizar profundidad máxima alcanzada
    if (depth > stats.maxDepthReached) {
      stats.maxDepthReached = depth;
    }

    // CASO BASE: Solución encontrada
    // Las cadenas deben ser iguales Y no vacías
    if (topAccumulated === bottomAccumulated && topAccumulated !== '') {
      return {
        found: true,
        sequence: sequence,
        topResult: topAccumulated,
        bottomResult: bottomAccumulated
      };
    }

    // CONDICIÓN DE PODA 1: Profundidad máxima alcanzada
    if (depth >= MAX_DEPTH) {
      stats.branchesPruned++;
      return null;
    }

    // CONDICIÓN DE PODA 2: Diferencia de longitud excesiva
    const lengthDiff = Math.abs(topAccumulated.length - bottomAccumulated.length);
    if (lengthDiff > MAX_DIFF) {
      stats.branchesPruned++;
      return null;
    }

    // CONDICIÓN DE PODA 3: Estado ya visitado (evitar ciclos)
    const stateKey = `${topAccumulated}|${bottomAccumulated}|${depth}`;
    if (visitedStates.has(stateKey)) {
      stats.branchesPruned++;
      return null;
    }
    visitedStates.add(stateKey);

    // BACKTRACKING: Probar cada par disponible
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      const newTop = topAccumulated + pair.top;
      const newBottom = bottomAccumulated + pair.bottom;

      // CONDICIÓN DE PODA 4: Prefijos no compatibles
      // Si una cadena es más larga que la otra, verificar que la más corta sea prefijo
      if (!isPrefixCompatible(newTop, newBottom)) {
        stats.branchesPruned++;
        continue; // Saltar esta rama
      }

      // RECURSIÓN: Explorar esta rama
      const result = backtrack(newTop, newBottom, depth + 1, [...sequence, i]);

      // Si encontramos solución, propagarla hacia arriba
      if (result && result.found) {
        return result;
      }
    }

    // No se encontró solución en ninguna rama
    return null;
  }

  // Iniciar búsqueda desde estado vacío
  const solution = backtrack('', '', 0, []);

  // Construir respuesta según resultado
  if (solution && solution.found) {
    // SOLUCIÓN ENCONTRADA
    // Construir pasos de la solución
    const solutionSteps = buildSolutionSteps(solution.sequence, pairs);

    return {
      type: 'pcp',
      hasSolution: true,
      sequence: solution.sequence,
      topResult: solution.topResult,
      bottomResult: solution.bottomResult,
      steps: solutionSteps,
      message: warning + 
        `Se encontró una solución válida para el PCP usando la secuencia [${solution.sequence.join(', ')}]. ` +
        `Las cadenas superiores e inferiores coinciden exactamente: "${solution.topResult}".`,
      stats: {
        nodesExplored: stats.nodesExplored,
        branchesPruned: stats.branchesPruned,
        maxDepthReached: stats.maxDepthReached,
        timeMs: Date.now() - startTime
      }
    };
  } else {
    // NO SE ENCONTRÓ SOLUCIÓN
    const reason = stats.timeExceeded 
      ? `Se excedió el tiempo límite de ${TIMEOUT_MS / 1000} segundos.`
      : `Se alcanzó la profundidad máxima de ${MAX_DEPTH}.`;

    return {
      type: 'pcp',
      hasSolution: false,
      sequence: [],
      topResult: '',
      bottomResult: '',
      steps: [],
      message: warning +
        `No se encontró solución hasta profundidad ${stats.maxDepthReached}. ${reason} ` +
        `Esto no implica que no exista una solución, ya que el PCP es un problema indecidible. ` +
        `Se exploraron ${stats.nodesExplored} nodos y se podaron ${stats.branchesPruned} ramas.`,
      stats: {
        nodesExplored: stats.nodesExplored,
        branchesPruned: stats.branchesPruned,
        maxDepthReached: stats.maxDepthReached,
        timeMs: Date.now() - startTime
      }
    };
  }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Verifica si dos cadenas son compatibles como prefijos
 * Una cadena debe ser prefijo de la otra para que puedan eventualmente coincidir
 * @param {string} a - Primera cadena
 * @param {string} b - Segunda cadena
 * @returns {boolean} - true si son compatibles
 */
function isPrefixCompatible(a, b) {
  // Si alguna está vacía, son compatibles
  if (a === '' || b === '') return true;

  // Si tienen la misma longitud, deben ser iguales
  if (a.length === b.length) {
    return a === b;
  }

  // La más corta debe ser prefijo de la más larga
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;

  return longer.startsWith(shorter);
}

/**
 * Valida que los pares sean correctos
 * @param {Array} pairs - Array de pares a validar
 * @returns {Object} - { valid: boolean, error: string }
 */
function validatePairs(pairs) {
  if (!Array.isArray(pairs)) {
    return { valid: false, error: 'Los pares deben ser un array' };
  }

  if (pairs.length === 0) {
    return { valid: false, error: 'Debe haber al menos un par para resolver el PCP' };
  }

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    
    if (!pair || typeof pair !== 'object') {
      return { valid: false, error: `El par ${i + 1} no es un objeto válido` };
    }

    if (typeof pair.top !== 'string') {
      return { valid: false, error: `El par ${i + 1} no tiene una propiedad 'top' válida` };
    }

    if (typeof pair.bottom !== 'string') {
      return { valid: false, error: `El par ${i + 1} no tiene una propiedad 'bottom' válida` };
    }

    if (pair.top === '' && pair.bottom === '') {
      return { valid: false, error: `El par ${i + 1} no puede tener ambas cadenas vacías` };
    }
  }

  return { valid: true };
}

/**
 * Construye los pasos de la solución encontrada
 * @param {Array} sequence - Secuencia de índices de pares
 * @param {Array} pairs - Array de pares originales
 * @returns {Array} - Array de objetos de paso
 */
function buildSolutionSteps(sequence, pairs) {
  const steps = [];
  let topAcc = '';
  let bottomAcc = '';

  for (let i = 0; i < sequence.length; i++) {
    const pairIndex = sequence[i];
    const pair = pairs[pairIndex];

    topAcc += pair.top;
    bottomAcc += pair.bottom;

    steps.push({
      step: i + 1,
      pairIndex: pairIndex,
      pair: `(${pair.top}, ${pair.bottom})`,
      topAccumulated: topAcc,
      bottomAccumulated: bottomAcc,
      match: topAcc === bottomAcc && topAcc !== ''
    });
  }

  return steps;
}

/**
 * Construye una respuesta de error
 * @param {string} errorMessage - Mensaje de error
 * @returns {Object} - Objeto de respuesta con error
 */
function buildErrorResponse(errorMessage) {
  return {
    type: 'pcp',
    hasSolution: false,
    sequence: [],
    topResult: '',
    bottomResult: '',
    steps: [],
    message: `Error: ${errorMessage}`,
    error: true
  };
}
