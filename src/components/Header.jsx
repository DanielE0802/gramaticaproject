/**
 * Header Component
 * 
 * Responsabilidad: Mostrar el título principal y subtítulo del proyecto
 * - Título del proyecto
 * - Subtítulo explicativo
 * - Layout simple y limpio
 */

function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">
          Analizador de Teorema de Bombeo y PCP
        </h1>
        <p className="text-center text-blue-100 mt-2">
          Genera soluciones automáticas paso a paso desde el navegador
        </p>
      </div>
    </header>
  );
}

export default Header;
