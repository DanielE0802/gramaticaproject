# 🎓 Gramática Project

**Analizador de Teorema de Bombeo y PCP**

Aplicación web que analiza y resuelve automáticamente problemas de Teorema de Bombeo (Pumping Lemma) y Post Correspondence Problem (PCP) desde el navegador, sin necesidad de backend.

---

## 📋 Descripción

Este proyecto es una herramienta educativa diseñada para profesores y estudiantes de Teoría de la Computación. Permite:

- ✅ Ingresar problemas en lenguaje natural
- ✅ Detección automática del tipo de problema (Bombeo o PCP)
- ✅ Generación de soluciones paso a paso
- ✅ Explicaciones didácticas y detalladas
- ✅ Ejecución 100% en el navegador

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza el build de producción
```

---

## 📁 Estructura del Proyecto

```
gramaticaproject/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.jsx       # Encabezado de la aplicación
│   │   ├── Footer.jsx       # Pie de página
│   │   ├── ProblemInput.jsx # Entrada de problemas
│   │   └── ResultView.jsx   # Vista de resultados
│   │
│   ├── utils/               # Módulos de lógica
│   │   ├── detectProblemType.js  # Detección de tipo de problema
│   │   ├── pumpingLemma.js       # Solver del Teorema de Bombeo
│   │   └── pcpSolver.js          # Solver del PCP
│   │
│   ├── constants/           # Constantes y datos estáticos
│   │   └── examples.js      # Ejemplos predefinidos
│   │
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Punto de entrada
│
├── public/                  # Archivos estáticos
├── index.html               # HTML base
├── package.json             # Dependencias y scripts
└── vite.config.js           # Configuración de Vite
```

---

## 🧪 Ejemplos de Uso

### Teorema de Bombeo

```
Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular.
```

### Post Correspondence Problem

```
Resolver el PCP: (a,ab), (ba,a), (aba,b).
```

---

## 🛠️ Tecnologías Utilizadas

- **React 18.3** - Biblioteca de UI
- **Vite 5.4** - Build tool y dev server
- **Tailwind CSS 4.0** - Framework de estilos
- **JavaScript (ES6+)** - Lenguaje de programación

---

## 🔄 Estado Actual del Proyecto

### ✅ Completado

- [x] Configuración del proyecto con Vite + React
- [x] Instalación de Tailwind CSS
- [x] Estructura de carpetas completa
- [x] Componentes UI base (Header, Footer, ProblemInput, ResultView)
- [x] Módulos utils con estructura (sin lógica implementada)
- [x] Archivo de ejemplos predefinidos
- [x] App.jsx con manejo de estados
- [x] Estilos CSS configurados
- [x] Proyecto compilando correctamente

### 🚧 Pendiente de Implementación

- [ ] Lógica de detección de problemas (detectProblemType.js)
- [ ] Algoritmo del Teorema de Bombeo (pumpingLemma.js)
- [ ] Algoritmo de PCP con backtracking (pcpSolver.js)
- [ ] Parser de lenguajes formales
- [ ] Parser de pares PCP

---

## 🎯 Próximos Pasos

### Fase 1: Detección (Siguiente)
1. Implementar función `detectProblemType()`
2. Crear parsers de lenguajes
3. Crear parsers de pares PCP

### Fase 2: Solver de Bombeo
1. Identificar patrones comunes
2. Generar cadenas de ejemplo
3. Crear división xyz
4. Generar contradicciones

### Fase 3: Solver de PCP
1. Implementar backtracking recursivo
2. Agregar poda de ramas
3. Manejar timeout

---

## 📚 Referencias

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Fecha de Creación:** 19 de noviembre de 2025  
**Versión:** 1.0.0  
**Estado:** ✅ Boilerplate completo - Listo para implementación de lógica

