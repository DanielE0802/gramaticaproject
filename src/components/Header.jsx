/**
 * Header Component
 * 
 * Responsabilidad: Mostrar el título principal y toggle de tema
 * - Título del proyecto
 * - Subtítulo explicativo
 * - Botón para cambiar tema claro/oscuro
 */

function Header({ isDarkMode, toggleTheme }) {
  return (
    <header className="bg-[var(--card)] border-b border-[var(--border)] shadow-lg theme-transition">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-3">
          {/* Título centrado */}
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-4">
            {/* Icon - Circuit board */}
            <svg className="w-7 h-7 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--text)]">
              Analizador de Teorema de Bombeo y PCP
            </h1>
          </div>

          {/* Toggle de tema */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--card-hover)] border border-[var(--border)] transition-all duration-300 hover:scale-105 theme-transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                // Icono de Sol (modo claro)
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Icono de Luna (modo oscuro)
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <p className="text-center text-[var(--text-secondary)] text-lg font-light">
          Genera soluciones automáticas paso a paso desde el navegador
        </p>
      </div>
    </header>
  );
}

export default Header;
