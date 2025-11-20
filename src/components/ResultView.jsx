/**
 * ResultView Component
 * 
 * Responsabilidad: Renderizar la solución generada
 * - Mostrar tipo de problema detectado
 * - Mostrar pasos de la solución
 * - Mostrar conclusión
 * - Manejar estados: vacío, cargando, error, solución
 * 
 * Props:
 * - solution: objeto con la solución generada
 * - problemType: tipo de problema ('pumping', 'pcp', 'unknown')
 * - isLoading: booleano indicando si está procesando
 * - error: mensaje de error si existe
 */

function ResultView({ solution, problemType, isLoading, error }) {
  // Estado: Vacío (sin solución)
  if (!solution && !isLoading && !error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-muted mb-2">
          Ingrese un problema para comenzar
        </h3>
        <p className="text-text-muted">
          Escriba o seleccione un ejemplo de Teorema de Bombeo o PCP
        </p>
      </div>
    );
  }

  // Estado: Cargando
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-text-muted">Analizando problema...</p>
        </div>
      </div>
    );
  }

  // Estado: Error
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-error rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-error"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-error">Error al analizar</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Solución mostrada
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Tipo de problema */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-text mb-2">Solución Generada</h2>
        <div className="inline-block px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-medium">
          Tipo: {problemType === 'pumping' ? 'Teorema de Bombeo' : problemType === 'pcp' ? 'PCP' : 'Desconocido'}
        </div>
      </div>

      {/* Pasos de la solución */}
      {solution.steps && solution.steps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-text mb-4">Pasos:</h3>
          <ol className="space-y-4">
            {solution.steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full font-semibold mr-3">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold text-text mb-1">{step.title}</h4>
                  <p className="text-text-muted whitespace-pre-line">{step.explanation || step.description}</p>
                  {(step.math || step.formula) && (
                    <div className="mt-2 p-3 bg-gray-50 rounded font-mono text-sm whitespace-pre-line">
                      {step.math || step.formula}
                    </div>
                  )}
                  {step.example && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                      <strong>Ejemplo:</strong> {step.example}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Conclusión */}
      {solution.conclusion && (
        <div className="bg-green-50 border-l-4 border-secondary p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="font-semibold text-text mb-1">Conclusión:</h4>
              <p className="text-text-muted">{solution.conclusion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata adicional (si existe) */}
      {solution.metadata && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <details className="text-sm text-text-muted">
            <summary className="cursor-pointer font-medium hover:text-primary">
              Ver detalles técnicos
            </summary>
            <pre className="mt-2 p-3 bg-gray-50 rounded overflow-x-auto">
              {JSON.stringify(solution.metadata, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default ResultView;
