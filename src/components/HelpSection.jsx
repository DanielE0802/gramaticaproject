/**
 * HelpSection Component
 * 
 * Muestra información de ayuda sobre formatos válidos
 * para problemas de Teorema de Bombeo y PCP
 */

import { useState } from 'react';

function HelpSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-medium text-blue-900 hover:text-blue-700"
      >
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          ¿Cómo escribir un problema válido?
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 text-sm text-blue-800">
          {/* Teorema de Bombeo */}
          <div>
            <h4 className="font-semibold mb-2">✓ Teorema de Bombeo:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Incluya palabras clave: <code className="bg-blue-100 px-1 rounded">bombeo</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">pumping</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">regular</code>
              </li>
              <li>
                Use notación de lenguajes:{' '}
                <code className="bg-blue-100 px-1 rounded">L = &#123; a^n b^n | n ≥ 0 &#125;</code>
              </li>
              <li>
                Patrones reconocidos:{' '}
                <code className="bg-blue-100 px-1 rounded">a^n b^n</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">ww</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">0^n 1^n</code>
              </li>
            </ul>
            <div className="mt-2 p-2 bg-white rounded border border-blue-200">
              <p className="font-medium text-xs text-blue-600 mb-1">Ejemplo válido:</p>
              <p className="text-xs italic">
                "Use el teorema de bombeo para demostrar que L = &#123; a^n b^n | n ≥ 0 &#125; no es regular."
              </p>
            </div>
          </div>

          {/* PCP */}
          <div>
            <h4 className="font-semibold mb-2">✓ Post Correspondence Problem (PCP):</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Incluya palabras clave: <code className="bg-blue-100 px-1 rounded">PCP</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">post</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">correspondencia</code>
              </li>
              <li>
                Use formato de pares:{' '}
                <code className="bg-blue-100 px-1 rounded">(a,ab)</code>,{' '}
                <code className="bg-blue-100 px-1 rounded">(ba,a)</code>
              </li>
              <li>
                Los pares deben contener letras minúsculas o números
              </li>
            </ul>
            <div className="mt-2 p-2 bg-white rounded border border-blue-200">
              <p className="font-medium text-xs text-blue-600 mb-1">Ejemplo válido:</p>
              <p className="text-xs italic">
                "Resolver el PCP: (a,ab), (ba,a), (aba,b)."
              </p>
            </div>
          </div>

          {/* Consejos */}
          <div className="pt-3 border-t border-blue-200">
            <h4 className="font-semibold mb-2">💡 Consejos:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
              <li>Sea específico con el problema que desea resolver</li>
              <li>Use notación estándar cuando sea posible</li>
              <li>Incluya suficiente contexto para la detección automática</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HelpSection;
