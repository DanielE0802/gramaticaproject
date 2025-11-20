/**
 * detectProblemType.js
 * 
 * Función principal: detectProblemType(text)
 * 
 * Responsabilidad: Analizar el texto ingresado y detectar si corresponde a:
 * - Teorema de Bombeo (pumping lemma)
 * - PCP (Post Correspondence Problem)
 * - Desconocido
 * 
 * Retorna un objeto con:
 * - type: 'pumping' | 'pcp' | 'unknown'
 * - confidence: número entre 0 y 1
 * - extractedData: datos parseados del problema
 */

/**
 * Detecta el tipo de problema basándose en palabras clave y patrones
 * @param {string} text - Texto del problema a analizar
 * @returns {Object} - Objeto con type, confidence y extractedData
 */
export function detectProblemType(text) {
  // ========================================
  // 1. VALIDACIÓN Y LIMPIEZA INICIAL
  // ========================================
  
  // Validar que el texto no esté vacío
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      type: 'unknown',
      confidence: 0,
      extractedData: null
    };
  }

  // Normalizar texto: quitar espacios dobles, trimear
  let cleanedText = text.trim().replace(/\s+/g, ' ');
  
  // Crear versión en minúsculas para matching (pero conservar original para parsing)
  const normalizedText = cleanedText.toLowerCase();

  // ========================================
  // 2. INICIALIZACIÓN DE PUNTAJES
  // ========================================
  
  let pumpingScore = 0;
  let pcpScore = 0;

  // ========================================
  // 3. DETECCIÓN POR PALABRAS CLAVE
  // ========================================
  
  // Palabras clave para Teorema de Bombeo
  const pumpingKeywords = [
    { keyword: 'bombeo', score: 0.3 },
    { keyword: 'pumping lemma', score: 0.4 },
    { keyword: 'pumping', score: 0.3 },
    { keyword: 'teorema de bombeo', score: 0.4 },
    { keyword: 'lema de bombeo', score: 0.4 },
    { keyword: 'regular', score: 0.2 },
    { keyword: 'no es regular', score: 0.3 },
    { keyword: 'not regular', score: 0.3 },
    { keyword: 'cadena xyz', score: 0.3 },
    { keyword: 'bombear', score: 0.3 },
    { keyword: 'demostrar que', score: 0.1 },
    { keyword: 'lenguaje', score: 0.1 }
  ];

  // Palabras clave para PCP
  const pcpKeywords = [
    { keyword: 'pcp', score: 0.5 },
    { keyword: 'post correspondence', score: 0.5 },
    { keyword: 'post', score: 0.4 },
    { keyword: 'correspondencia', score: 0.4 },
    { keyword: 'correspondence', score: 0.4 },
    { keyword: 'pares', score: 0.2 },
    { keyword: 'pairs', score: 0.2 },
    { keyword: 'dominio', score: 0.2 },
    { keyword: 'dominoes', score: 0.3 },
    { keyword: 'resolver el pcp', score: 0.5 },
    { keyword: 'problema de correspondencia', score: 0.4 }
  ];

  // Contar coincidencias de palabras clave para Bombeo
  pumpingKeywords.forEach(({ keyword, score }) => {
    if (normalizedText.includes(keyword)) {
      pumpingScore += score;
    }
  });

  // Contar coincidencias de palabras clave para PCP
  pcpKeywords.forEach(({ keyword, score }) => {
    if (normalizedText.includes(keyword)) {
      pcpScore += score;
    }
  });

  // ========================================
  // 4. DETECCIÓN POR PATRONES REGEX
  // ========================================
  
  // Patrones comunes de lenguajes formales (Bombeo)
  const languagePatterns = [
    { regex: /a\^n\s*b\^n/i, score: 0.7, name: 'a^n b^n' },
    { regex: /0\^n\s*1\^n/i, score: 0.7, name: '0^n 1^n' },
    { regex: /\bw\s*w\b/i, score: 0.7, name: 'ww' },
    { regex: /a\^n\s*b\^m\s*c\^n/i, score: 0.6, name: 'a^n b^m c^n' },
    { regex: /a\^n\s*b\^n\s*c\^n/i, score: 0.6, name: 'a^n b^n c^n' },
    { regex: /\{[^}]*a\^n[^}]*\}/i, score: 0.5, name: 'generic a^n' },
    { regex: /L\s*=\s*\{/i, score: 0.5, name: 'language definition' }
  ];

  const detectedPatterns = [];
  
  languagePatterns.forEach(({ regex, score, name }) => {
    if (regex.test(cleanedText)) {
      pumpingScore += score;
      detectedPatterns.push(name);
    }
  });

  // Detectar pares del formato (x,y) para PCP
  const pairRegex = /\(\s*([a-z0-9]+)\s*,\s*([a-z0-9]+)\s*\)/gi;
  const pairMatches = [...cleanedText.matchAll(pairRegex)];
  
  if (pairMatches.length > 0) {
    // Si hay pares encontrados, incrementar score de PCP
    pcpScore += 0.5 + (pairMatches.length * 0.1);
  }

  // ========================================
  // 5. EXTRACCIÓN DE DATOS SEGÚN TIPO
  // ========================================
  
  let extractedData = null;
  let detectedType = 'unknown';
  let confidence = 0;

  // Determinar el tipo basándose en los scores
  if (pumpingScore > pcpScore && pumpingScore >= 0.3) {
    detectedType = 'pumping';
    confidence = Math.min(pumpingScore, 1.0);
    
    // Extraer datos de lenguaje
    const languageData = parseLanguageDefinition(cleanedText);
    
    extractedData = {
      rawLanguage: languageData?.rawLanguage || cleanedText,
      patternsDetected: detectedPatterns,
      normalizedLanguage: languageData?.normalizedLanguage || null,
      constraint: languageData?.constraint || null
    };

  } else if (pcpScore > pumpingScore && pcpScore >= 0.3) {
    detectedType = 'pcp';
    confidence = Math.min(pcpScore, 1.0);
    
    // Extraer pares
    const pairs = parsePCPPairs(cleanedText);
    
    extractedData = {
      pairs: pairs,
      pairCount: pairs?.length || 0,
      rawText: cleanedText
    };

  } else {
    // No se pudo determinar el tipo con suficiente confianza
    detectedType = 'unknown';
    confidence = Math.max(pumpingScore, pcpScore);
    extractedData = {
      message: 'No se pudo identificar el tipo de problema con suficiente confianza',
      pumpingScore: pumpingScore.toFixed(2),
      pcpScore: pcpScore.toFixed(2),
      rawText: cleanedText
    };
  }

  // ========================================
  // 6. RETORNO FINAL
  // ========================================
  
  return {
    type: detectedType,
    confidence: parseFloat(confidence.toFixed(2)),
    extractedData: extractedData
  };
}

/**
 * Parsea la definición de un lenguaje formal desde el texto
 * @param {string} text - Texto que contiene la definición del lenguaje
 * @returns {Object|null} - Objeto con la definición parseada o null
 */
export function parseLanguageDefinition(text) {
  try {
    // Buscar patrón L = { ... }
    const languageMatch = text.match(/L\s*=\s*\{([^}]+)\}/i);
    
    if (!languageMatch) {
      // Intentar buscar patrones sin la notación completa
      const patterns = [
        { regex: /a\^n\s*b\^n/i, normalized: 'a^n b^n' },
        { regex: /0\^n\s*1\^n/i, normalized: '0^n 1^n' },
        { regex: /\bw\s*w\b/i, normalized: 'ww' },
        { regex: /a\^n\s*b\^m\s*c\^n/i, normalized: 'a^n b^m c^n' },
        { regex: /a\^n\s*b\^n\s*c\^n/i, normalized: 'a^n b^n c^n' }
      ];

      for (const { regex, normalized } of patterns) {
        if (regex.test(text)) {
          return {
            rawLanguage: text,
            normalizedLanguage: normalized,
            constraint: null
          };
        }
      }

      return null;
    }

    const languageContent = languageMatch[1].trim();
    
    // Separar la definición del lenguaje y la restricción
    // Ejemplo: "a^n b^n | n ≥ 0"
    const parts = languageContent.split('|');
    
    const languagePart = parts[0]?.trim() || languageContent;
    const constraintPart = parts[1]?.trim() || null;

    // Normalizar el lenguaje
    let normalizedLanguage = languagePart
      .replace(/\s+/g, ' ')
      .replace(/\^\s*/g, '^')
      .trim();

    return {
      rawLanguage: languageContent,
      normalizedLanguage: normalizedLanguage,
      constraint: constraintPart
    };

  } catch (error) {
    console.error('Error al parsear lenguaje:', error);
    return null;
  }
}

/**
 * Parsea los pares de un problema PCP desde el texto
 * @param {string} text - Texto que contiene los pares
 * @returns {Array|null} - Array de pares {top, bottom} o null
 */
export function parsePCPPairs(text) {
  try {
    // Regex para capturar pares del formato (x,y)
    // Acepta letras minúsculas, números, y símbolos comunes
    const pairRegex = /\(\s*([a-z0-9]+)\s*,\s*([a-z0-9]+)\s*\)/gi;
    
    const matches = [...text.matchAll(pairRegex)];
    
    if (matches.length === 0) {
      return null;
    }

    // Extraer los pares
    const pairs = matches.map(match => ({
      top: match[1].trim(),
      bottom: match[2].trim()
    }));

    // Validar que los pares no estén vacíos
    const validPairs = pairs.filter(pair => 
      pair.top.length > 0 && pair.bottom.length > 0
    );

    if (validPairs.length === 0) {
      return null;
    }

    return validPairs;

  } catch (error) {
    console.error('Error al parsear pares PCP:', error);
    return null;
  }
}

/**
 * Normaliza un patrón de lenguaje a su forma canónica
 * @param {string} pattern - Patrón a normalizar
 * @returns {string} - Patrón normalizado
 */
export function normalizeLanguagePattern(pattern) {
  if (!pattern) return '';
  
  return pattern
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\^\s*/g, '^')
    .trim();
}

/**
 * Valida si un texto contiene un problema válido
 * @param {string} text - Texto a validar
 * @returns {boolean} - True si es válido
 */
export function isValidProblemText(text) {
  if (!text || typeof text !== 'string') return false;
  
  const minLength = 10;
  return text.trim().length >= minLength;
}
