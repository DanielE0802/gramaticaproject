/**
 * ProblemInput Component
 * 
 * Responsabilidad: Capturar la entrada del usuario
 * - Textarea grande para ingresar el problema
 * - Botón para analizar
 * - Dropdown con ejemplos predefinidos (opcional)
 * - Validación básica de entrada
 * 
 * Props:
 * - onAnalyze: función callback que se ejecuta al hacer click en analizar
 * - isLoading: booleano que indica si está procesando
 */

import { useState } from 'react';
import { EXAMPLES } from '../constants/examples';
import HelpSection from './HelpSection';

function ProblemInput({ onAnalyze, isLoading }) {
  const [text, setText] = useState('');
  const [selectedExample, setSelectedExample] = useState('');

  // Manejar cambio en el textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Manejar selección de ejemplo
  const handleExampleChange = (e) => {
    const exampleId = e.target.value;
    setSelectedExample(exampleId);
    
    if (exampleId) {
      const example = EXAMPLES.find(ex => ex.id === parseInt(exampleId));
      if (example) {
        setText(example.text);
      }
    }
  };

  // Manejar click en botón analizar
  const handleAnalyzeClick = () => {
    // Validación básica
    if (!text.trim()) {
      alert('Por favor, ingrese un problema para analizar');
      return;
    }

    if (text.trim().length < 10) {
      alert('El texto es muy corto. Por favor, ingrese un problema válido');
      return;
    }

    // Llamar al callback del padre
    onAnalyze(text);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-text mb-4">
        Ingrese el Problema
      </h2>

      {/* Sección de ayuda */}
      <HelpSection />

      {/* Selector de ejemplos */}
      <div className="mb-4">
        <label htmlFor="examples" className="block text-sm font-medium text-text-muted mb-2">
          O seleccione un ejemplo:
        </label>
        <select
          id="examples"
          value={selectedExample}
          onChange={handleExampleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          disabled={isLoading}
        >
          <option value="">-- Seleccione un ejemplo --</option>
          {EXAMPLES.map((example) => (
            <option key={example.id} value={example.id}>
              {example.name}
            </option>
          ))}
        </select>
      </div>

      {/* Textarea principal */}
      <div className="mb-4">
        <label htmlFor="problemText" className="block text-sm font-medium text-text-muted mb-2">
          Escriba o pegue el problema aquí:
        </label>
        <textarea
          id="problemText"
          value={text}
          onChange={handleTextChange}
          placeholder="Ejemplo: Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular."
          className="w-full min-h-[200px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-y"
          disabled={isLoading}
        />
      </div>

      {/* Botón de analizar */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading || !text.trim()}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            isLoading || !text.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Analizando...' : 'Analizar Problema →'}
        </button>
      </div>
    </div>
  );
}

export default ProblemInput;
