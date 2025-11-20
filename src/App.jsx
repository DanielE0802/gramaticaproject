/**
 * App.jsx
 * Componente principal de la aplicación
 * 
 * Responsabilidades:
 * - Mantener el estado global de la aplicación
 * - Orquestar la comunicación entre componentes
 * - Manejar la lógica de análisis de problemas
 * - Proporcionar el layout general
 */

import { useState } from 'react';
import './App.css';

// Importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import ProblemInput from './components/ProblemInput';
import ResultView from './components/ResultView';

// Importar utilidades (TODO: implementar lógica más adelante)
import { detectProblemType } from './utils/detectProblemType';
import { solvePumpingLemma } from './utils/pumpingLemma';
import { solvePCP } from './utils/pcpSolver';

function App() {
  // Estados principales de la aplicación
  const [inputText, setInputText] = useState('');
  const [problemType, setProblemType] = useState(null);
  const [solution, setSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Función principal para analizar el problema ingresado
   * @param {string} text - Texto del problema a analizar
   */
  const handleAnalyze = async (text) => {
    // Limpiar estado previo
    setError(null);
    setSolution(null);
    setProblemType(null);
    
    // Actualizar texto de entrada
    setInputText(text);
    
    // Iniciar loading
    setIsLoading(true);

    try {
      // Simular delay para visualizar el estado de loading
      await new Promise(resolve => setTimeout(resolve, 500));

      // Paso 1: Detectar tipo de problema
      const detection = detectProblemType(text);
      
      console.log('🔍 Detección:', detection); // Debug
      
      if (detection.type === 'unknown') {
        setError(
          `No se pudo identificar el tipo de problema con suficiente confianza.\n\n` +
          `Sugerencias:\n` +
          `- Para Teorema de Bombeo: incluya palabras como "bombeo", "regular", o notación L = { a^n b^n }\n` +
          `- Para PCP: incluya "PCP", "correspondencia" o pares como (a,ab), (ba,a)`
        );
        setIsLoading(false);
        return;
      }

      setProblemType(detection.type);

      // Paso 2: Resolver según el tipo
      let result = null;

      if (detection.type === 'pumping') {
        // Resolver usando el módulo de Pumping Lemma
        result = solvePumpingLemma(detection.extractedData);

      } else if (detection.type === 'pcp') {
        // Resolver usando el módulo de PCP
        result = solvePCP(detection.extractedData);
      }

      // Actualizar solución
      setSolution(result);

    } catch (err) {
      console.error('Error al analizar el problema:', err);
      setError('Ocurrió un error al procesar el problema. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="app-main">
        {/* Sección de entrada */}
        <div className="section-spacing fade-in">
          <ProblemInput 
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {/* Sección de resultados */}
        <div className="fade-in">
          <ResultView 
            solution={solution}
            problemType={problemType}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
