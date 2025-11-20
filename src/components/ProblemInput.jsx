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
    <div className="bg-[var(--card)] rounded-3xl shadow-xl p-10 border border-[var(--border)] theme-transition">
      {/* Título */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[var(--text)]">
            Ingrese el Problema
          </h2>
          <p className="text-[var(--text-muted)] text-sm mt-1">
            Escriba o seleccione un ejemplo para comenzar
          </p>
        </div>
      </div>

      {/* Sección de ayuda */}
      <div className="mb-8">
        <HelpSection />
      </div>

      {/* Selector de ejemplos */}
      <div className="mb-8">
        <label htmlFor="examples" className="flex items-center space-x-2 text-sm font-semibold text-[var(--text)] mb-3">
          <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Ejemplos predefinidos</span>
        </label>
        <div className="relative">
          <select
            id="examples"
            value={selectedExample}
            onChange={handleExampleChange}
            className="w-full px-5 py-4 bg-[var(--background-secondary)] border-2 border-[var(--border)] text-[var(--text)] rounded-2xl focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 focus:outline-none transition-all duration-300 appearance-none cursor-pointer hover:border-[var(--border-strong)] theme-transition shadow-sm"
            disabled={isLoading}
          >
            <option value="" className="bg-[var(--card)]">-- Seleccione un ejemplo --</option>
            {EXAMPLES.map((example) => (
              <option key={example.id} value={example.id} className="bg-[var(--card)] py-2">
                {example.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Textarea principal */}
      <div className="mb-8">
        <label htmlFor="problemText" className="flex items-center space-x-2 text-sm font-semibold text-[var(--text)] mb-3">
          <svg className="w-4 h-4 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Descripción del problema</span>
        </label>
        <textarea
          id="problemText"
          value={text}
          onChange={handleTextChange}
          placeholder="Ejemplo: Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular."
          className="w-full min-h-[240px] px-5 py-4 bg-[var(--background-secondary)] border-2 border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] rounded-2xl focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/10 focus:outline-none resize-y transition-all duration-300 font-mono text-sm leading-relaxed hover:border-[var(--border-strong)] theme-transition shadow-sm"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-2 text-xs text-[var(--text-muted)]">
          <span>Mínimo 10 caracteres</span>
          <span className={text.length >= 10 ? 'text-[var(--success)]' : ''}>
            {text.length} caracteres
          </span>
        </div>
      </div>

      {/* Botón de analizar */}
      <div className="flex justify-end">
        <button
          onClick={handleAnalyzeClick}
          disabled={isLoading || !text.trim()}
          className={`group relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
            isLoading || !text.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
              : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95'
          }`}
        >
          <span className="flex items-center space-x-3">
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <span>Analizar Problema</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProblemInput;
