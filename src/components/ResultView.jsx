/**
 * ResultView Component - Redesigned
 * 
 * Diseño tecnológico moderno sin emojis, usando solo iconos SVG
 */

function ResultView({ solution, problemType, isLoading, error }) {
  // Estado: Vacío (sin solución)
  if (!solution && !isLoading && !error) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-12 text-center border border-blue-500/20">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-12 h-12 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-2xl font-bold text-slate-400">
            Ingrese un problema para comenzar
          </h3>
          <p className="text-slate-500 max-w-md">
            Escriba o seleccione un ejemplo de Teorema de Bombeo o PCP
          </p>
        </div>
      </div>
    );
  }

  // Estado: Cargando
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-12 border border-cyan-500/30">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-700 border-t-cyan-500"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-2">Analizando problema...</p>
            <p className="text-sm text-slate-400">Procesando con algoritmos avanzados</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Error
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-900/20 to-slate-900 rounded-2xl shadow-2xl border-2 border-red-500/50 p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
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
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-400 mb-2">Error al analizar</h3>
            <p className="text-red-300/80">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Solución mostrada
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 border border-blue-500/20">
      {/* Tipo de problema */}
      <div className="mb-8 pb-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Solución Generada</h2>
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-semibold text-cyan-300">
              {problemType === 'pumping' ? 'Teorema de Bombeo' : problemType === 'pcp' ? 'PCP' : 'Desconocido'}
            </span>
          </div>
        </div>
      </div>

      {/* Renderizado específico para PCP */}
      {problemType === 'pcp' ? (
        <div className="space-y-8">
          {/* Título de sección PCP */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <h3 className="text-2xl font-bold text-white">
                Post Correspondence Problem
              </h3>
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
          </div>

          {/* Grid: Tabla + Estadísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tabla de pasos */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h4 className="text-lg font-bold text-white">Secuencia de Construcción</h4>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-700 to-slate-600">
                      <th className="px-4 py-4 text-left font-bold text-cyan-300">Paso</th>
                      <th className="px-4 py-4 text-left font-bold text-cyan-300">Par</th>
                      <th className="px-4 py-4 text-left font-bold text-cyan-300">Superior</th>
                      <th className="px-4 py-4 text-left font-bold text-cyan-300">Inferior</th>
                      <th className="px-4 py-4 text-center font-bold text-cyan-300">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {solution.steps && solution.steps.map((step, index) => (
                      <tr 
                        key={index} 
                        className={`transition-all ${
                          step.match 
                            ? 'bg-emerald-500/10 hover:bg-emerald-500/20' 
                            : 'bg-slate-800/50 hover:bg-slate-700/50'
                        }`}
                      >
                        <td className="px-4 py-4 font-bold text-slate-300">{step.step}</td>
                        <td className="px-4 py-4">
                          <code className="text-sm bg-slate-700 text-purple-300 px-3 py-1.5 rounded-lg font-mono">
                            {step.pair}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-sm font-bold text-cyan-400 font-mono">
                            {step.topAccumulated}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-sm font-bold text-blue-400 font-mono">
                            {step.bottomAccumulated}
                          </code>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {step.match ? (
                            <svg className="w-6 h-6 text-emerald-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6 text-slate-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Panel de estadísticas */}
            {solution.stats && (
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h4 className="text-lg font-bold text-white">Estadísticas</h4>
                </div>
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border border-slate-600 p-5 space-y-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Nodos explorados</span>
                      <span className="text-2xl font-bold text-cyan-400">{solution.stats.nodesExplored}</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Ramas podadas</span>
                      <span className="text-2xl font-bold text-purple-400">{solution.stats.branchesPruned}</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Profundidad</span>
                      <span className="text-2xl font-bold text-orange-400">{solution.stats.maxDepthReached}</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-emerald-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Tiempo</span>
                      <span className="text-2xl font-bold text-emerald-400">{solution.stats.timeMs} ms</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sección de resultado final */}
          <div className={`rounded-xl border-2 p-6 ${
            solution.hasSolution 
              ? 'bg-emerald-500/10 border-emerald-500/50' 
              : 'bg-amber-500/10 border-amber-500/50'
          }`}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {solution.hasSolution ? (
                  <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`text-2xl font-bold mb-4 ${
                  solution.hasSolution ? 'text-emerald-300' : 'text-amber-300'
                }`}>
                  {solution.hasSolution ? 'Solución Encontrada' : 'Sin Solución'}
                </h4>
                
                {solution.hasSolution ? (
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <p className="text-sm font-medium text-slate-400 mb-2">Secuencia utilizada:</p>
                      <code className="text-lg font-bold text-cyan-300 font-mono">
                        [{solution.sequence ? solution.sequence.join(', ') : ''}]
                      </code>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <p className="text-sm font-medium text-slate-400 mb-3">Resultado final:</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold text-slate-400 w-24">Superior:</span>
                          <code className="font-mono text-base font-bold text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/30">
                            {solution.topResult}
                          </code>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-semibold text-slate-400 w-24">Inferior:</span>
                          <code className="font-mono text-base font-bold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/30">
                            {solution.bottomResult}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-300 mb-2">
                      No se encontró solución hasta profundidad {solution.stats?.maxDepthReached || 8}.
                    </p>
                    <p className="text-sm text-slate-400 italic">
                      Nota: El PCP es un problema indecidible. La ausencia de solución no implica que no exista.
                    </p>
                  </div>
                )}

                {solution.message && (
                  <div className="mt-4 text-sm text-slate-400">
                    {solution.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mensaje educativo */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/30 p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-indigo-300 mb-3 flex items-center space-x-2">
                  <span>Nota Teórica</span>
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  El <strong className="text-indigo-300">Post Correspondence Problem</strong> es un problema <strong className="text-indigo-300">indecidible</strong> en general. 
                  El hecho de que no se encuentre solución en la profundidad evaluada no implica que no exista, 
                  solo que no se pudo hallar con los límites computacionales establecidos (profundidad máxima: 8, diferencia: 50, timeout: 3s). 
                  Este problema fue demostrado indecidible por <strong className="text-indigo-300">Emil Post en 1946</strong> y es fundamental en la teoría de la computación.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Renderizado para Pumping Lemma */
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h3 className="text-2xl font-bold text-white">Pasos de la Demostración</h3>
          </div>
          <div className="space-y-5">
            {solution.steps && solution.steps.map((step, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-cyan-300 text-lg mb-3">{step.title}</h4>
                    <p className="text-slate-300 whitespace-pre-line leading-relaxed mb-3">
                      {step.explanation || step.description}
                    </p>
                    {(step.math || step.formula) && (
                      <div className="mt-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <pre className="font-mono text-sm text-blue-300 whitespace-pre-line overflow-x-auto">
                          {step.math || step.formula}
                        </pre>
                      </div>
                    )}
                    {step.example && (
                      <div className="mt-3 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                        <div className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <div>
                            <strong className="text-cyan-300 text-sm">Ejemplo:</strong>
                            <p className="text-slate-300 text-sm mt-1">{step.example}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conclusión - Solo para Pumping Lemma */}
      {solution.conclusion && problemType !== 'pcp' && (
        <div className="mt-8 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-emerald-300 text-lg mb-2">Conclusión</h4>
              <p className="text-slate-300 leading-relaxed">{solution.conclusion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Metadata adicional */}
      {solution.metadata && (
        <div className="mt-8 pt-6 border-t border-slate-700">
          <details className="text-sm">
            <summary className="cursor-pointer font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Ver detalles técnicos</span>
            </summary>
            <pre className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700 overflow-x-auto text-slate-300 text-xs">
              {JSON.stringify(solution.metadata, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default ResultView;
