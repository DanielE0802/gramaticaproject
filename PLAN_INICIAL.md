# 📋 Plan de Inicialización y Arquitectura
## Proyecto: Analizador de Teorema de Bombeo y PCP

**Fecha:** 19 de noviembre de 2025  
**Tecnologías principales:** React + Vite + JavaScript  
**Objetivo:** Aplicación web que analiza y resuelve automáticamente problemas de Teorema de Bombeo y Post Correspondence Problem desde el frontend.

---

## 🧱 1. Configuración Completa del Proyecto

### 1.1 Comandos de Inicialización

```bash
# 1. Crear el proyecto con Vite + React
npm create vite@latest gramaticaproject -- --template react

# 2. Navegar al proyecto
cd gramaticaproject

# 3. Instalar dependencias base
npm install

# 4. (Opcional) Instalar Tailwind CSS para estilos
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Ejecutar el servidor de desarrollo
npm run dev

# 6. Build para producción
npm run build

# 7. Preview del build
npm run preview
```

### 1.2 Explicación de Comandos

| Comando | Propósito |
|---------|-----------|
| `npm create vite@latest` | Inicializa un proyecto Vite con template React optimizado |
| `npm install` | Instala todas las dependencias declaradas en package.json |
| `npm run dev` | Inicia servidor de desarrollo con HMR (Hot Module Replacement) en puerto 5173 |
| `npm run build` | Compila y optimiza para producción en carpeta `/dist` |
| `npm run preview` | Sirve localmente el build de producción para testing |

### 1.3 Estructura de Carpetas Propuesta

```
gramaticaproject/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProblemInput.jsx
│   │   └── ResultView.jsx
│   ├── utils/
│   │   ├── detectProblemType.js
│   │   ├── pumpingLemma.js
│   │   └── pcpSolver.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── constants/
│   │   └── examples.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

### 1.4 Dependencias Recomendadas

**Dependencias Base (Ya incluidas):**
- `react`: ^18.2.0
- `react-dom`: ^18.2.0

**Dependencias Opcionales:**
```bash
# Para estilos (opcional pero recomendado)
npm install -D tailwindcss postcss autoprefixer

# Para manejo de estado más complejo (si crece el proyecto)
# npm install zustand

# Para animaciones suaves (opcional)
# npm install framer-motion
```

**Restricciones:**
- ✅ NO usar librerías pesadas
- ✅ Mantener bundle ligero
- ✅ Todo el procesamiento en el cliente

### 1.5 Scripts Principales

Archivo `package.json` contendrá:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 📐 2. Arquitectura del Proyecto

### 2.1 Componentes Principales

#### **App.jsx** (Componente Raíz)
- **Responsabilidad:** Layout general, orquestación de estados
- **Estados:**
  - `inputText`: texto del problema ingresado
  - `problemType`: tipo detectado ('pumping', 'pcp', null)
  - `solution`: objeto con pasos y resultado
  - `isLoading`: indicador de procesamiento
- **Estructura:**
  ```
  <Header />
  <main>
    <ProblemInput />
    <ResultView />
  </main>
  <Footer />
  ```

#### **ProblemInput.jsx**
- **Responsabilidad:** Captura de entrada del usuario
- **Elementos:**
  - `<textarea>`: entrada de texto grande (10+ líneas)
  - `<button>`: trigger para análisis
  - Ejemplo de problemas predefinidos (dropdown opcional)
- **Props:**
  - `onAnalyze`: callback que envía texto a App
  - `isLoading`: deshabilita botón durante procesamiento
- **Validaciones:**
  - Texto no vacío
  - Mínimo de caracteres

#### **ResultView.jsx**
- **Responsabilidad:** Renderizar solución generada
- **Secciones:**
  - Tipo de problema identificado
  - Pasos de solución (lista numerada)
  - Conclusión final
  - Visualización de la cadena dividida (si es Bombeo)
  - Tabla de solución (si es PCP)
- **Props:**
  - `solution`: objeto con estructura específica
  - `problemType`: string identificador
- **Estados visuales:**
  - Vacío (mensaje de bienvenida)
  - Cargando (spinner/skeleton)
  - Solución mostrada
  - Error (mensaje amigable)

#### **Header.jsx**
- **Responsabilidad:** Título y navegación básica
- **Contenido:**
  - Título del proyecto
  - Subtítulo explicativo
  - (Opcional) Links a documentación

#### **Footer.jsx**
- **Responsabilidad:** Información secundaria
- **Contenido:**
  - Créditos
  - Año
  - (Opcional) Links útiles

### 2.2 Módulos de Lógica (src/utils/)

#### **detectProblemType.js**

**Función principal:** `detectProblemType(text)`

**Lógica:**
1. Buscar palabras clave en el texto:
   - **Bombeo:** "bombeo", "pumping", "regular", "a^n b^n", "ww"
   - **PCP:** "PCP", "post", "correspondencia", "pares", "(", ")"
2. Usar expresiones regulares para identificar patrones:
   - Notación de lenguajes: `L = { ... }`
   - Pares de PCP: `(α₁, β₁), (α₂, β₂)`
3. Retornar objeto:
   ```javascript
   {
     type: 'pumping' | 'pcp' | 'unknown',
     confidence: 0.0-1.0,
     extractedData: { /* datos parseados */ }
   }
   ```

**Casos especiales:**
- Si no detecta claramente, devolver `type: 'unknown'`
- Extraer datos relevantes (lenguaje, pares) durante detección

---

#### **pumpingLemma.js**

**Función principal:** `solvePumpingLemma(languageDefinition)`

**Pasos del algoritmo:**

1. **Análisis de entrada:**
   - Parsear definición del lenguaje
   - Identificar patrones comunes:
     - `a^n b^n`: cantidad igual de a's y b's
     - `ww`: repetición de palabra
     - `a^n b^m c^n`: dependencias entre posiciones

2. **Aplicación del Teorema:**
   ```
   Para todo n ≥ 1, existe una constante p (longitud de bombeo)
   tal que toda cadena s con |s| ≥ p puede dividirse en s = xyz
   cumpliendo:
   - |xy| ≤ p
   - |y| > 0
   - xy^i z ∈ L para todo i ≥ 0
   ```

3. **Generación de contradicción:**
   - Elegir cadena s específica (ejemplo: a^p b^p)
   - Mostrar división posible xyz
   - Bombear y demostrar que xy²z ∉ L
   - Concluir: el lenguaje NO es regular

4. **Salida estructurada:**
   ```javascript
   {
     steps: [
       { title: "Suposición", description: "...", formula: "..." },
       { title: "Elección de cadena", description: "...", example: "..." },
       { title: "División xyz", description: "...", diagram: "..." },
       { title: "Bombeo", description: "...", contradiction: "..." },
       { title: "Conclusión", description: "..." }
     ],
     conclusion: "El lenguaje L no es regular",
     isRegular: false
   }
   ```

**Lenguajes soportados inicialmente:**
- `a^n b^n`
- `ww`
- `a^n b^m con n ≠ m`
- `0^n 1^n`

---

#### **pcpSolver.js**

**Función principal:** `solvePCP(pairs)`

**Entrada:**
```javascript
pairs = [
  { top: "a", bottom: "ab" },
  { top: "ba", bottom: "a" },
  { top: "aba", bottom: "b" }
]
```

**Algoritmo (Backtracking limitado):**

1. **Inicialización:**
   - Crear cola de exploraciones
   - Límite de profundidad: 8 niveles
   - Timeout: 5000ms

2. **Exploración recursiva:**
   ```javascript
   function backtrack(topString, bottomString, sequence, depth) {
     if (topString === bottomString && topString !== "") {
       return { found: true, sequence, result: topString };
     }
     if (depth > MAX_DEPTH) return { found: false };
     
     for (let i = 0; i < pairs.length; i++) {
       // Intentar agregar par[i]
       backtrack(
         topString + pairs[i].top,
         bottomString + pairs[i].bottom,
         [...sequence, i],
         depth + 1
       );
     }
   }
   ```

3. **Poda de ramas:**
   - Si `|topString - bottomString| > MAX_DIFF`, descartar
   - Si se repite estado, descartar
   - Preferir ramas que reducen diferencia

4. **Salida:**
   ```javascript
   {
     hasSolution: true/false,
     sequence: [0, 1, 0, 2], // índices de pares usados
     topResult: "abaaba",
     bottomResult: "abaaba",
     steps: [
       { step: 1, pair: "(a, ab)", top: "a", bottom: "ab" },
       { step: 2, pair: "(ba, a)", top: "aba", bottom: "aba" },
       // ...
     ]
   }
   ```

**Casos especiales:**
- Si no hay solución en MAX_DEPTH: "No se encontró solución en 8 pasos"
- Si hay timeout: "El problema es muy complejo"

---

### 2.3 Flujo de Datos

```
┌─────────────────┐
│  Usuario ingresa│
│  texto problema │
└────────┬────────┘
         │
         ▼
┌────────────────────┐
│  ProblemInput.jsx  │
│  Captura texto     │
└────────┬───────────┘
         │ onAnalyze(text)
         ▼
┌────────────────────┐
│     App.jsx        │
│  Estado central    │
└────────┬───────────┘
         │
         ├─► detectProblemType(text)
         │   └─► { type: 'pumping', data: {...} }
         │
         ├─► if type === 'pumping':
         │   └─► solvePumpingLemma(data)
         │
         └─► if type === 'pcp':
             └─► solvePCP(data)
                 │
                 ▼
         ┌──────────────┐
         │ solution obj │
         └──────┬───────┘
                │
                ▼
         ┌─────────────────┐
         │ ResultView.jsx  │
         │ Renderiza pasos │
         └─────────────────┘
```

### 2.4 Estados Globales/Locales

**En App.jsx (Estado principal):**
```javascript
const [state, setState] = useState({
  inputText: "",
  problemType: null,  // 'pumping' | 'pcp' | 'unknown'
  solution: null,
  isLoading: false,
  error: null
});
```

**En ProblemInput.jsx (Estado local):**
```javascript
const [localText, setLocalText] = useState("");
const [selectedExample, setSelectedExample] = useState(null);
```

**En ResultView.jsx (Sin estado, solo props):**
- Recibe `solution` y `problemType`
- Renderizado condicional basado en props

---

## 🎨 3. Diseño UI Inicial

### 3.1 Layout General

```
┌─────────────────────────────────────┐
│           HEADER                     │
│  Analizador de Teorema de Bombeo    │
│         y PCP                        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     SECCIÓN DE ENTRADA              │
│  ┌─────────────────────────────┐   │
│  │ Ingrese su problema aquí... │   │
│  │                             │   │
│  │  (textarea grande)          │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [ Ejemplos ▼ ]  [ Analizar → ]    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│     SECCIÓN DE RESULTADOS           │
│  ╔═══════════════════════════════╗ │
│  ║ Tipo: Teorema de Bombeo       ║ │
│  ║                               ║ │
│  ║ Pasos:                        ║ │
│  ║ 1. Suposición...              ║ │
│  ║ 2. Elección de cadena...      ║ │
│  ║ 3. División xyz...            ║ │
│  ║ 4. Bombeo...                  ║ │
│  ║ 5. Conclusión...              ║ │
│  ║                               ║ │
│  ║ ✅ El lenguaje NO es regular  ║ │
│  ╚═══════════════════════════════╝ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FOOTER                     │
│  © 2025 - Gramática Project         │
└─────────────────────────────────────┘
```

### 3.2 Paleta de Colores Propuesta

```css
:root {
  --primary: #2563eb;      /* Azul principal */
  --secondary: #10b981;    /* Verde éxito */
  --background: #f8fafc;   /* Fondo claro */
  --card: #ffffff;         /* Tarjetas */
  --text: #1e293b;         /* Texto principal */
  --text-muted: #64748b;   /* Texto secundario */
  --border: #e2e8f0;       /* Bordes */
  --error: #ef4444;        /* Rojo error */
}
```

### 3.3 Componentes UI

**Input Section:**
- Textarea: min-height 200px, border rounded, focus highlight
- Botón: Color primario, efecto hover, disabled cuando loading
- Dropdown ejemplos: Lista desplegable con 4-5 ejemplos

**Result Card:**
- Fondo blanco con sombra suave
- Padding generoso
- Títulos con jerarquía clara (h2, h3)
- Pasos numerados con espaciado
- Conclusión destacada (borde o fondo de color)

**Estados visuales:**
- Loading: Spinner central o skeleton
- Vacío: Mensaje "Ingrese un problema para comenzar"
- Error: Alerta roja con mensaje claro

### 3.4 Mejoras con Tailwind (Opcional)

Si se instala Tailwind, usar clases utility:
```jsx
<textarea className="w-full min-h-[200px] p-4 border-2 border-gray-300 
                     rounded-lg focus:border-blue-500 focus:outline-none" />

<button className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 disabled:opacity-50" />
```

---

## 🧪 4. Ejemplos de Entrada Soportados

### 4.1 Teorema de Bombeo

**Ejemplo 1:**
```
Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular.
```

**Salida esperada:**
- Detección: Bombeo
- Lenguaje: a^n b^n
- Pasos completos de demostración
- Conclusión: NO es regular

---

**Ejemplo 2:**
```
Compruebe con el teorema de bombeo que L = ww no es regular.
```

**Salida esperada:**
- Detección: Bombeo
- Lenguaje: ww (repetición)
- Cadena ejemplo: s = a^p b a^p b
- Demostración de contradicción

---

### 4.2 Post Correspondence Problem (PCP)

**Ejemplo 1:**
```
Resolver el PCP: (a,ab), (ba,a), (aba,b).
```

**Salida esperada:**
- Detección: PCP
- Pares: [(a,ab), (ba,a), (aba,b)]
- Búsqueda de solución
- Resultado: Solución encontrada/no encontrada

---

**Ejemplo 2:**
```
Encuentre si hay solución al PCP con pares (0,01) (01,1).
```

**Salida esperada:**
- Detección: PCP
- Pares: [(0,01), (01,1)]
- Secuencia de pasos explorados
- Resultado con visualización

---

### 4.3 Formato de Ejemplos Predefinidos

Crear archivo `src/constants/examples.js`:

```javascript
export const EXAMPLES = [
  {
    id: 1,
    name: "Bombeo: a^n b^n",
    text: "Use el teorema de bombeo para demostrar que L = { a^n b^n | n ≥ 0 } no es regular.",
    type: "pumping"
  },
  {
    id: 2,
    name: "Bombeo: ww",
    text: "Compruebe con el teorema de bombeo que L = ww no es regular.",
    type: "pumping"
  },
  {
    id: 3,
    name: "PCP: Ejemplo 1",
    text: "Resolver el PCP: (a,ab), (ba,a), (aba,b).",
    type: "pcp"
  },
  {
    id: 4,
    name: "PCP: Ejemplo 2",
    text: "Encuentre si hay solución al PCP con pares (0,01) (01,1).",
    type: "pcp"
  }
];
```

---

## 📌 5. Objetivo General del Proyecto

### 5.1 Funcionalidades Core

1. **Entrada flexible:** Profesor escribe problema en lenguaje natural
2. **Detección inteligente:** Sistema identifica automáticamente el tipo
3. **Resolución automática:** Genera solución paso a paso
4. **Educativo:** Explicaciones claras y didácticas
5. **Sin backend:** Todo procesa en el navegador

### 5.2 Casos de Uso

**Caso 1: Profesor genera ejercicio resuelto**
1. Ingresa enunciado de Teorema de Bombeo
2. Sistema detecta tipo y extrae lenguaje
3. Genera demostración completa
4. Profesor puede copiar/exportar resultado

**Caso 2: Estudiante verifica su solución**
1. Ingresa ejercicio de PCP
2. Sistema busca solución
3. Compara con su respuesta
4. Aprende del proceso paso a paso

**Caso 3: Generación rápida de ejemplos**
1. Selecciona ejemplo predefinido
2. Sistema muestra solución inmediata
3. Puede modificar parámetros
4. Ve resultado actualizado

### 5.3 Restricciones y Limitaciones

**Restricciones técnicas:**
- ✅ Ejecución 100% en frontend
- ✅ Sin APIs externas
- ✅ Bundle ligero (< 500KB)
- ✅ Compatible navegadores modernos

**Limitaciones conocidas:**
- PCP solo busca hasta profundidad 8
- Teorema de Bombeo soporta lenguajes comunes predefinidos
- No parsea lenguajes arbitrarios complejos
- Respuestas en español

---

## 📝 6. Diagrama Conceptual

### 6.1 Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                     │
│                                                          │
│  ┌────────────┐      ┌──────────────┐                  │
│  │   Header   │      │    Footer    │                  │
│  └────────────┘      └──────────────┘                  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │                   App.jsx                        │  │
│  │              (Estado Central)                    │  │
│  │                                                  │  │
│  │  ┌────────────────┐    ┌──────────────────┐    │  │
│  │  │ ProblemInput   │    │   ResultView     │    │  │
│  │  │                │    │                  │    │  │
│  │  │ - Textarea     │    │ - Tipo problema  │    │  │
│  │  │ - Ejemplos     │    │ - Pasos          │    │  │
│  │  │ - Botón enviar │    │ - Conclusión     │    │  │
│  │  └────────────────┘    └──────────────────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              UTILS (Lógica)                      │  │
│  │                                                  │  │
│  │  ┌──────────────────┐                           │  │
│  │  │detectProblemType │                           │  │
│  │  └────────┬─────────┘                           │  │
│  │           │                                      │  │
│  │      ┌────┴────┐                                │  │
│  │      ▼         ▼                                │  │
│  │  ┌──────┐  ┌──────┐                            │  │
│  │  │pumping│  │ PCP  │                            │  │
│  │  │Lemma │  │Solver│                            │  │
│  │  └──────┘  └──────┘                            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Flujo de Interacción

```
Usuario                 UI                  Lógica              Resultado
  │                     │                     │                    │
  ├──Ingresa texto─────►│                     │                    │
  │                     │                     │                    │
  ├──Click Analizar────►│                     │                    │
  │                     │                     │                    │
  │                     ├──detectType()──────►│                    │
  │                     │                     │                    │
  │                     │◄────type='pumping'──┤                    │
  │                     │                     │                    │
  │                     ├──solvePumping()────►│                    │
  │                     │                     │                    │
  │                     │                     ├──Genera pasos─────►│
  │                     │                     │                    │
  │                     │◄────solution obj────┤                    │
  │                     │                     │                    │
  │◄──Muestra resultado─┤                     │                    │
  │                     │                     │                    │
```

### 6.3 Estructura de Datos

**Estado principal (App.jsx):**
```javascript
{
  inputText: string,
  problemType: 'pumping' | 'pcp' | 'unknown' | null,
  solution: {
    type: string,
    steps: [
      {
        title: string,
        description: string,
        formula?: string,
        example?: string
      }
    ],
    conclusion: string,
    metadata: {
      language?: string,
      pairs?: Array,
      hasSolution?: boolean
    }
  },
  isLoading: boolean,
  error: string | null
}
```

---

## 🚀 7. Plan de Continuación

### Fase 1: Setup y Estructura (Siguiente paso)
- [ ] Ejecutar comandos de inicialización
- [ ] Crear estructura de carpetas
- [ ] Configurar Tailwind (opcional)
- [ ] Crear archivos base vacíos

### Fase 2: Componentes UI
- [ ] Implementar Header y Footer
- [ ] Crear ProblemInput con textarea y botón
- [ ] Crear ResultView con estados vacío/loading/error
- [ ] Implementar App.jsx con routing de componentes

### Fase 3: Lógica - Detección
- [ ] Implementar detectProblemType.js
- [ ] Parser de lenguajes de Bombeo
- [ ] Parser de pares PCP
- [ ] Tests de detección

### Fase 4: Lógica - Bombeo
- [ ] Implementar pumpingLemma.js
- [ ] Lógica para a^n b^n
- [ ] Lógica para ww
- [ ] Generación de pasos explicativos

### Fase 5: Lógica - PCP
- [ ] Implementar pcpSolver.js
- [ ] Algoritmo de backtracking
- [ ] Poda de ramas
- [ ] Visualización de pasos

### Fase 6: Integración
- [ ] Conectar utils con componentes
- [ ] Manejo de errores
- [ ] Estados de carga
- [ ] Pulir UI/UX

### Fase 7: Testing y Refinamiento
- [ ] Probar con ejemplos reales
- [ ] Optimizar algoritmos
- [ ] Mejorar mensajes de error
- [ ] Documentación final

---

## 📚 8. Recursos y Referencias

### 8.1 Teorema de Bombeo
- Condiciones: |xy| ≤ p, |y| > 0, xy^i z ∈ L
- Lenguajes comunes no regulares:
  - {a^n b^n | n ≥ 0}
  - {ww | w ∈ Σ*}
  - {a^n b^m | n > m}

### 8.2 PCP (Post Correspondence Problem)
- Entrada: Pares (α₁, β₁), ..., (αₙ, βₙ)
- Objetivo: Encontrar secuencia i₁, i₂, ..., iₖ tal que:
  - α_{i₁}α_{i₂}...α_{iₖ} = β_{i₁}β_{i₂}...β_{iₖ}
- Problema indecidible en general
- Heurística: búsqueda limitada en profundidad

### 8.3 Enlaces Útiles
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind CSS: https://tailwindcss.com
- Teoría de la Computación: Hopcroft, Motwani, Ullman

---

## ✅ 9. Checklist Pre-Código

Antes de comenzar a escribir código, verificar:

- [x] Plan de arquitectura completo
- [x] Estructura de carpetas definida
- [x] Componentes identificados con responsabilidades claras
- [x] Flujo de datos mapeado
- [x] Algoritmos diseñados conceptualmente
- [x] Ejemplos de entrada/salida documentados
- [x] Restricciones técnicas claras
- [ ] Proyecto inicializado con Vite
- [ ] Dependencias instaladas
- [ ] Servidor de desarrollo funcionando

---

## 📞 10. Próximos Pasos

**Inmediatos:**
1. Revisar y aprobar este plan
2. Ejecutar comandos de setup
3. Crear estructura de carpetas
4. Comenzar con componentes básicos

**Preguntas para el usuario:**
- ¿Aprobar este plan antes de continuar?
- ¿Alguna modificación en la arquitectura?
- ¿Preferencia de estilos (Tailwind o CSS vanilla)?
- ¿Priorizar Bombeo o PCP primero?

---

**Documento generado:** 19 de noviembre de 2025  
**Estado:** ✅ Planificación completa - Listo para implementación  
**Próxima acción:** Esperar aprobación para ejecutar comandos de setup
