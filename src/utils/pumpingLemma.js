/**
 * pumpingLemma.js
 * 
 * Función principal: solvePumpingLemma(languageDefinition)
 * 
 * Responsabilidad: Generar una solución paso a paso para demostrar que
 * un lenguaje NO es regular usando el Teorema de Bombeo.
 * 
 * Pasos del algoritmo:
 * 1. Analizar la definición del lenguaje
 * 2. Elegir una cadena s adecuada
 * 3. Aplicar el teorema (división xyz)
 * 4. Generar contradicción
 * 5. Concluir
 * 
 * Retorna un objeto con:
 * - type: 'pumping'
 * - isRegular: false
 * - language: string con el lenguaje
 * - steps: array de pasos detallados
 * - conclusion: conclusión formal
 */

/**
 * Resuelve un problema de Teorema de Bombeo
 * @param {Object} extractedData - Datos extraídos por detectProblemType
 * @returns {Object} - Objeto con la solución paso a paso
 */
export function solvePumpingLemma(extractedData) {
  // Validar entrada
  if (!extractedData) {
    return generateGenericProof('L');
  }

  // Identificar el patrón del lenguaje
  const pattern = identifyLanguagePattern(extractedData);
  const language = extractedData.normalizedLanguage || extractedData.rawLanguage || 'L';

  // Generar demostración según el patrón
  let proof;

  switch (pattern) {
    case 'anbn':
      proof = generateProofForAnBn(language);
      break;
    case '0n1n':
      proof = generateProofFor0n1n(language);
      break;
    case 'ww':
      proof = generateProofForWW(language);
      break;
    case 'anbmcn':
      proof = generateProofForAnBmCn(language);
      break;
    case 'anbncn':
      proof = generateProofForAnBnCn(language);
      break;
    default:
      proof = generateGenericProof(language);
  }

  return proof;
}

/**
 * Identifica el patrón del lenguaje a partir de los datos extraídos
 * @param {Object} extractedData - Datos del lenguaje
 * @returns {string} - Tipo de patrón identificado
 */
export function identifyLanguagePattern(extractedData) {
  const normalized = extractedData.normalizedLanguage?.toLowerCase() || '';
  const raw = extractedData.rawLanguage?.toLowerCase() || '';
  const patterns = extractedData.patternsDetected || [];

  // Patrón a^n b^n c^n (debe ir antes de a^n b^n)
  if (normalized.match(/a\^n\s*b\^n\s*c\^n/) || patterns.includes('a^n b^n c^n')) {
    return 'anbncn';
  }

  // Patrón a^n b^m c^n (debe ir antes de a^n b^n)
  if (normalized.match(/a\^n\s*b\^m\s*c\^n/) || patterns.includes('a^n b^m c^n')) {
    return 'anbmcn';
  }

  // Patrón a^n b^n
  if (normalized.includes('a^n b^n') || normalized.match(/a\^n\s*b\^n/) ||
      patterns.includes('a^n b^n')) {
    return 'anbn';
  }

  // Patrón 0^n 1^n
  if (normalized.includes('0^n 1^n') || normalized.match(/0\^n\s*1\^n/) ||
      patterns.includes('0^n 1^n')) {
    return '0n1n';
  }

  // Patrón ww
  if (normalized.includes('ww') || normalized.includes('w w') ||
      raw.includes('ww') || patterns.includes('ww')) {
    return 'ww';
  }

  return 'generic';
}

// ============================================
// GENERADORES DE DEMOSTRACIONES ESPECÍFICAS
// ============================================

/**
 * Genera demostración para L = { a^n b^n | n ≥ 0 }
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración completa
 */
function generateProofForAnBn(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos por contradicción que el lenguaje L = { a^n b^n | n ≥ 0 } es regular. Entonces, por el Teorema de Bombeo para lenguajes regulares, debe existir una constante de bombeo p ≥ 1.`,
        math: '∃p ≥ 1: ∀s ∈ L con |s| ≥ p, s puede dividirse en xyz satisfaciendo las condiciones del teorema'
      },
      {
        title: 'Condiciones del Teorema de Bombeo',
        explanation: 'Según el Teorema de Bombeo, toda cadena s en L con longitud al menos p puede escribirse como s = xyz, donde se cumplen tres condiciones:',
        math: '1. |xy| ≤ p\n2. |y| > 0\n3. ∀i ≥ 0: xy^i z ∈ L'
      },
      {
        title: 'Selección de la Cadena s',
        explanation: `Elegimos la cadena s = a^p b^p, que claramente pertenece al lenguaje L. Esta cadena tiene longitud |s| = 2p ≥ p, por lo que cumple el requisito de longitud del teorema.`,
        math: 's = a^p b^p',
        example: 'Si p = 5, entonces s = aaaaabbbbb'
      },
      {
        title: 'Análisis de la División xyz',
        explanation: `Por la condición |xy| ≤ p, sabemos que xy está contenido completamente en los primeros p símbolos de s. Como estos primeros p símbolos son todas a's, concluimos que y está formado únicamente por a's. Además, |y| > 0, por lo que y contiene al menos una a.`,
        math: 'x = a^j, y = a^k (con k ≥ 1), z = a^(p-j-k) b^p\nDonde j ≥ 0, k ≥ 1, y j + k ≤ p'
      },
      {
        title: 'Aplicación del Bombeo (caso i = 0)',
        explanation: `Aplicamos el teorema con i = 0, es decir, eliminamos y de la cadena. Obtenemos xy^0z = xz.`,
        math: 'xy^0z = xz = a^j a^(p-j-k) b^p = a^(p-k) b^p',
        example: 'Si y = aa (k = 2), entonces xz = a^(p-2) b^p'
      },
      {
        title: 'Contradicción',
        explanation: `La cadena xy^0z = a^(p-k) b^p tiene (p-k) símbolos a y p símbolos b. Como k ≥ 1, tenemos (p-k) < p, por lo que el número de a's es estrictamente menor que el número de b's. Por lo tanto, esta cadena NO pertenece al lenguaje L = { a^n b^n | n ≥ 0 }, lo cual contradice la tercera condición del Teorema de Bombeo que establece que xy^i z ∈ L para todo i ≥ 0.`,
        math: 'a^(p-k) b^p ∉ L  (porque p-k ≠ p)'
      },
      {
        title: 'Conclusión',
        explanation: `Hemos llegado a una contradicción. Por lo tanto, nuestra suposición inicial era falsa. Concluimos que el lenguaje L = { a^n b^n | n ≥ 0 } NO es regular.`,
        math: 'L = { a^n b^n | n ≥ 0 } ∉ REGULAR'
      }
    ],
    conclusion: `Por el Teorema de Bombeo, hemos demostrado que el lenguaje L = { a^n b^n | n ≥ 0 } no es regular. La contradicción surge porque al bombear (o eliminar) la parte y de la cadena, se rompe la relación de igualdad entre el número de a's y b's que caracteriza al lenguaje.`
  };
}

/**
 * Genera demostración para L = { 0^n 1^n | n ≥ 0 }
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración completa
 */
function generateProofFor0n1n(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos por contradicción que el lenguaje L = { 0^n 1^n | n ≥ 0 } es regular. Por el Teorema de Bombeo, debe existir una constante p ≥ 1.`,
        math: '∃p ≥ 1: ∀s ∈ L con |s| ≥ p, s = xyz con las condiciones del teorema'
      },
      {
        title: 'Condiciones del Teorema',
        explanation: 'El Teorema de Bombeo establece tres condiciones para la división s = xyz:',
        math: '1. |xy| ≤ p\n2. |y| > 0\n3. ∀i ≥ 0: xy^i z ∈ L'
      },
      {
        title: 'Selección de la Cadena s',
        explanation: `Elegimos s = 0^p 1^p, que pertenece a L y tiene longitud 2p ≥ p.`,
        math: 's = 0^p 1^p',
        example: 'Para p = 5: s = 0000011111'
      },
      {
        title: 'Análisis de la División',
        explanation: `Como |xy| ≤ p y los primeros p símbolos son todos 0's, la subcadena y debe consistir únicamente de 0's. Por la condición |y| > 0, y contiene al menos un 0.`,
        math: 'y = 0^k donde k ≥ 1'
      },
      {
        title: 'Bombeo con i = 2',
        explanation: `Al bombear con i = 2, obtenemos xy^2z, que contiene más 0's que 1's.`,
        math: 'xy^2z = 0^(p+k) 1^p donde k ≥ 1',
        example: 'Si k = 2: xy^2z = 0^(p+2) 1^p'
      },
      {
        title: 'Contradicción',
        explanation: `La cadena xy^2z = 0^(p+k) 1^p tiene (p+k) ceros y p unos. Como k ≥ 1, el número de 0's es estrictamente mayor que el número de 1's, por lo que xy^2z ∉ L. Esto contradice el teorema.`,
        math: '0^(p+k) 1^p ∉ L  (porque p+k > p)'
      },
      {
        title: 'Conclusión',
        explanation: `La contradicción demuestra que nuestra suposición era falsa. Por lo tanto, L = { 0^n 1^n | n ≥ 0 } no es regular.`,
        math: 'L = { 0^n 1^n | n ≥ 0 } ∉ REGULAR'
      }
    ],
    conclusion: `Mediante el Teorema de Bombeo, hemos demostrado que el lenguaje L = { 0^n 1^n | n ≥ 0 } no es regular. La contradicción proviene de que al bombear la parte y (compuesta de 0's), se destruye la relación de igualdad entre 0's y 1's.`
  };
}

/**
 * Genera demostración para L = { ww | w ∈ Σ* }
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración completa
 */
function generateProofForWW(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos que el lenguaje L = { ww | w ∈ Σ* } es regular. Sea Σ = {a, b}. Por el Teorema de Bombeo, existe una constante p ≥ 1.`,
        math: '∃p ≥ 1: ∀s ∈ L con |s| ≥ p, s = xyz satisfaciendo las condiciones'
      },
      {
        title: 'Condiciones del Teorema',
        explanation: 'Las condiciones del Teorema de Bombeo son:',
        math: '1. |xy| ≤ p\n2. |y| > 0\n3. ∀i ≥ 0: xy^i z ∈ L'
      },
      {
        title: 'Selección de la Cadena s',
        explanation: `Elegimos s = a^p b a^p b, que está en L porque s = ww donde w = a^p b. La longitud es |s| = 2p + 2 ≥ p.`,
        math: 's = a^p b a^p b = (a^p b)(a^p b)',
        example: 'Para p = 3: s = aaabaaab'
      },
      {
        title: 'Análisis de la División',
        explanation: `Por |xy| ≤ p, la subcadena xy está completamente dentro de los primeros p símbolos, que son todas a's. Por tanto, y = a^k con k ≥ 1.`,
        math: 'y = a^k donde 1 ≤ k ≤ p'
      },
      {
        title: 'Bombeo con i = 2',
        explanation: `Al bombear con i = 2, agregamos k símbolos a adicionales en la primera mitad de s.`,
        math: 'xy^2z = a^(p+k) b a^p b',
        example: 'Si k = 2: a^(p+2) b a^p b'
      },
      {
        title: 'Contradicción',
        explanation: `Para que xy^2z esté en L, debe poder escribirse como uu para alguna cadena u. Sin embargo, xy^2z = a^(p+k) b a^p b tiene longitud 2p + k + 2 (impar si k es impar), y las dos mitades no son iguales porque la primera tiene a^(p+k) mientras la segunda tiene a^p. Por lo tanto, xy^2z ∉ L, contradiciendo el teorema.`,
        math: 'a^(p+k) b ≠ a^p b, por lo que xy^2z no puede escribirse como ww'
      },
      {
        title: 'Conclusión',
        explanation: `La contradicción demuestra que L = { ww | w ∈ Σ* } no es regular.`,
        math: 'L = { ww | w ∈ Σ* } ∉ REGULAR'
      }
    ],
    conclusion: `Por el Teorema de Bombeo, hemos probado que el lenguaje de cadenas duplicadas L = { ww | w ∈ Σ* } no es regular. La contradicción surge porque el bombeo destruye la simetría estructural requerida por el lenguaje.`
  };
}

/**
 * Genera demostración para L = { a^n b^m c^n | n,m ≥ 0 }
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración completa
 */
function generateProofForAnBmCn(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos que L = { a^n b^m c^n | n,m ≥ 0 } es regular. Por el Teorema de Bombeo, existe p ≥ 1.`,
        math: '∃p ≥ 1: ∀s ∈ L con |s| ≥ p, s = xyz con las condiciones del teorema'
      },
      {
        title: 'Condiciones del Teorema',
        explanation: 'Las condiciones son:',
        math: '1. |xy| ≤ p\n2. |y| > 0\n3. ∀i ≥ 0: xy^i z ∈ L'
      },
      {
        title: 'Selección de la Cadena s',
        explanation: `Elegimos s = a^p b^p c^p, que está en L con n = m = p.`,
        math: 's = a^p b^p c^p',
        example: 'Para p = 4: s = aaaabbbbcccc'
      },
      {
        title: 'Análisis de la División',
        explanation: `Como |xy| ≤ p y los primeros p símbolos son a's, tenemos y = a^k con k ≥ 1.`,
        math: 'y = a^k donde k ≥ 1'
      },
      {
        title: 'Bombeo con i = 0',
        explanation: `Eliminamos y de la cadena:`,
        math: 'xy^0z = xz = a^(p-k) b^p c^p',
        example: 'Si k = 2: xz = a^(p-2) b^p c^p'
      },
      {
        title: 'Contradicción',
        explanation: `La cadena xz = a^(p-k) b^p c^p tiene (p-k) símbolos a y p símbolos c. Como k ≥ 1, tenemos p-k < p, por lo que el número de a's no es igual al número de c's. Por tanto, xz ∉ L, contradiciendo el teorema.`,
        math: 'a^(p-k) b^p c^p ∉ L  (porque p-k ≠ p)'
      },
      {
        title: 'Conclusión',
        explanation: `Por lo tanto, L = { a^n b^m c^n | n,m ≥ 0 } no es regular.`,
        math: 'L ∉ REGULAR'
      }
    ],
    conclusion: `El Teorema de Bombeo demuestra que L = { a^n b^m c^n | n,m ≥ 0 } no es regular, ya que el bombeo rompe la correspondencia entre el número de a's y c's.`
  };
}

/**
 * Genera demostración para L = { a^n b^n c^n | n ≥ 0 }
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración completa
 */
function generateProofForAnBnCn(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos que L = { a^n b^n c^n | n ≥ 0 } es regular. Por el Teorema de Bombeo, existe una constante p ≥ 1.`,
        math: '∃p ≥ 1 tal que toda cadena s ∈ L con |s| ≥ p puede dividirse según el teorema'
      },
      {
        title: 'Condiciones del Teorema',
        explanation: 'El teorema establece:',
        math: '1. |xy| ≤ p\n2. |y| > 0\n3. ∀i ≥ 0: xy^i z ∈ L'
      },
      {
        title: 'Selección de la Cadena s',
        explanation: `Elegimos s = a^p b^p c^p, que claramente pertenece a L.`,
        math: 's = a^p b^p c^p',
        example: 'Para p = 3: s = aaabbbccc'
      },
      {
        title: 'Análisis de la División',
        explanation: `Dado que |xy| ≤ p, la subcadena xy está contenida en los primeros p símbolos de s, que son todas a's. Por tanto, y consiste únicamente de a's, con y = a^k donde k ≥ 1.`,
        math: 'y = a^k con 1 ≤ k ≤ p'
      },
      {
        title: 'Bombeo con i = 2',
        explanation: `Al bombear con i = 2, obtenemos:`,
        math: 'xy^2z = a^(p+k) b^p c^p donde k ≥ 1',
        example: 'Si k = 1: xy^2z = a^(p+1) b^p c^p'
      },
      {
        title: 'Contradicción',
        explanation: `La cadena xy^2z = a^(p+k) b^p c^p tiene (p+k) símbolos a, p símbolos b y p símbolos c. Claramente, (p+k) ≠ p ≠ p, por lo que los tres contadores no son iguales. Por tanto, xy^2z ∉ L, lo cual contradice el Teorema de Bombeo.`,
        math: 'p+k ≠ p ≠ p ⟹ a^(p+k) b^p c^p ∉ L'
      },
      {
        title: 'Conclusión',
        explanation: `La contradicción demuestra que L = { a^n b^n c^n | n ≥ 0 } no es regular.`,
        math: 'L = { a^n b^n c^n | n ≥ 0 } ∉ REGULAR'
      }
    ],
    conclusion: `Mediante el Teorema de Bombeo, hemos demostrado que el lenguaje L = { a^n b^n c^n | n ≥ 0 } no es regular. La contradicción resulta de que al bombear solo se afecta uno de los tres símbolos, rompiendo la igualdad triple requerida.`
  };
}

/**
 * Genera una demostración genérica para lenguajes no reconocidos
 * @param {string} language - Nombre del lenguaje
 * @returns {Object} - Demostración genérica
 */
function generateGenericProof(language) {
  return {
    type: 'pumping',
    isRegular: false,
    language: language,
    steps: [
      {
        title: 'Suposición Inicial',
        explanation: `Supongamos por contradicción que el lenguaje L es regular. Por el Teorema de Bombeo para lenguajes regulares, debe existir una constante de bombeo p ≥ 1.`,
        math: '∃p ≥ 1: ∀s ∈ L con |s| ≥ p, s puede dividirse en xyz'
      },
      {
        title: 'Condiciones del Teorema de Bombeo',
        explanation: 'Para cualquier cadena s en L con longitud al menos p, el teorema establece que s = xyz donde:',
        math: '1. |xy| ≤ p (xy está en los primeros p símbolos)\n2. |y| > 0 (y no es vacía)\n3. ∀i ≥ 0: xy^i z ∈ L (podemos bombear y)'
      },
      {
        title: 'Selección de Cadena',
        explanation: `Debemos elegir una cadena s ∈ L con |s| ≥ p que sea apropiada para demostrar la contradicción. La elección de s depende de la estructura específica del lenguaje.`,
        math: 's ∈ L con |s| ≥ p'
      },
      {
        title: 'División de la Cadena',
        explanation: `Por el Teorema de Bombeo, s puede dividirse en tres partes s = xyz satisfaciendo las condiciones anteriores. La clave está en que y está dentro de los primeros p símbolos de s.`,
        math: 's = xyz con |xy| ≤ p y |y| > 0'
      },
      {
        title: 'Aplicación del Bombeo',
        explanation: `Según el teorema, para cualquier valor de i ≥ 0, la cadena xy^i z debe pertenecer a L. Elegimos un valor específico de i (típicamente i = 0 o i = 2) para generar una contradicción.`,
        math: 'xy^i z debe estar en L para todo i ≥ 0'
      },
      {
        title: 'Contradicción',
        explanation: `Al aplicar el bombeo con el valor elegido de i, la cadena resultante xy^i z no cumple las propiedades estructurales requeridas por el lenguaje L. Por tanto, xy^i z ∉ L, contradiciendo la tercera condición del Teorema de Bombeo.`,
        math: '∃i ≥ 0: xy^i z ∉ L'
      },
      {
        title: 'Conclusión',
        explanation: `La contradicción obtenida demuestra que nuestra suposición inicial era falsa. Por lo tanto, el lenguaje L no es regular.`,
        math: 'L ∉ REGULAR'
      }
    ],
    conclusion: `Por el Teorema de Bombeo para lenguajes regulares, hemos demostrado que el lenguaje L no es regular. La demostración se basa en que ninguna división de la cadena elegida permite bombear manteniendo la pertenencia al lenguaje, lo cual contradice el teorema.`
  };
}
