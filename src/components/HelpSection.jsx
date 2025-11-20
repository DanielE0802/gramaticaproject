/**
 * HelpSection Component
 * Sección de ayuda colapsable con información sobre problemas
 */

import { useState } from 'react';

function HelpSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[var(--background-secondary)] border-2 border-[var(--border)] rounded-2xl overflow-hidden theme-transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[var(--card-hover)] transition-colors"
      >
        <div className="flex items-center space-x-3">
          <svg className="w-5 h-5 text-[var(--primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-lg font-bold text-[var(--text)]">¿Cómo usar esta herramienta?</span>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--primary)] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 py-6 space-y-6 border-t-2 border-[var(--border)]">
          {/* Sección: Teorema de Bombeo */}
          <div className="bg-[var(--card)] rounded-xl p-6 border-2 border-blue-500/20 theme-transition">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-4 text-base flex items-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Teorema de Bombeo para Lenguajes Regulares</span>
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Escriba el lenguaje en notación matemática: L = {'{ a^n b^n | n ≥ 0 }'}</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Incluya palabras clave como "bombeo", "regular", "demostrar"</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>La herramienta detectará automáticamente el tipo de problema</span>
              </li>
            </ul>
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <strong className="text-blue-700 dark:text-blue-300 text-sm">Ejemplo:</strong>
                  <p className="text-blue-600 dark:text-blue-200 text-sm mt-1">
                    "Demostrar que L = {'{ a^n b^n | n ≥ 0 }'} no es regular usando el teorema de bombeo"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección: PCP */}
          <div className="bg-[var(--card)] rounded-xl p-6 border-2 border-purple-500/20 theme-transition">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-4 text-base flex items-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span>Post Correspondence Problem (PCP)</span>
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Escriba los pares en formato: (a, ab), (b, ba), (ab, b)</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Use paréntesis y comas para separar superior e inferior</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Incluya palabras como "PCP" o "correspondencia"</span>
              </li>
            </ul>
            <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <strong className="text-purple-700 dark:text-purple-300 text-sm">Ejemplo:</strong>
                  <p className="text-purple-600 dark:text-purple-200 text-sm mt-1">
                    "Resolver el PCP con los pares: (b, bbb), (babbb, ba), (ba, a)"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consejos generales */}
          <div className="bg-[var(--card)] rounded-xl p-6 border-2 border-cyan-500/20 theme-transition">
            <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-4 text-base flex items-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Consejos</span>
            </h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Use los ejemplos predefinidos para ver el formato correcto</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Sea específico con la notación matemática</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Revise los pasos de la solución generada para entender el proceso</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpSection;
