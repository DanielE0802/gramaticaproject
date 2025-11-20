/**
 * Footer Component
 * 
 * Responsabilidad: Mostrar información secundaria del proyecto
 * - Créditos
 * - Año dinámico
 * - Layout simple
 */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-text-muted text-sm">
          © {currentYear} - Gramática Project | Teoría de la Computación
        </p>
      </div>
    </footer>
  );
}

export default Footer;
