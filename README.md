# 📖 Lengua Castellana 4.º de Primaria · Tema 3: «Prefijos, Palabras Llanas y Demostrativos»

Aplicación web interactiva, pedagógica y lúdica diseñada especialmente para **Olivia (4.º de Educación Primaria)** para repasar, comprender a fondo los conceptos y sacar un 10 en el examen oficial de Lengua Castellana sobre el **Tema 3: «Prefijos, Palabras Llanas, Demostrativos, Obras Narrativas y el Anuncio»** (Colección *CLAVES · Construyendo Mundos*, Grazalema–Santillana).

Basada conceptualmente en el libro y en el modelo oficial de examen (Modelo A y Modelo B), pero con **situaciones originales, personajes propios (Olivia, Lucas, Mateo, Valentina, el erizo Simón y la comadreja Leo)** para entrenar la comprensión lingüística real sin memorizar preguntas de forma mecánica.

---

## 🌟 Características y Módulos Principales (7 Vistas Estándar)

1. **🏠 Inicio (Home):**
   - Hero banner de alto contraste (WCAG AAA) con paleta cálida ámbar/naranja/índigo.
   - Resumen del progreso de Olivia con barra visual y contador de estrellas ⭐ acumulables.
   - Accesos directos a todos los módulos interactivos y expositor de medallas desbloqueadas.

2. **🎯 Misiones Didácticas (5 Misiones Secuenciales con 25 Retos Formativos):**
   - **Misión 1: Detectives del Prefijo (des-, in-, sub-, re-, pre-):** Partículas que van delante de la raíz para formar palabras derivadas, significados de negación, posición inferior, repetición y anterioridad, y la regla ortográfica de `im-` ante *p* y *b*.
   - **Misión 2: El Cazador de Palabras Trampa y Raíces Ocultas:** Discriminar prefijos reales de palabras raíz (*deseo, delgado, premio, reloj, regalo*), variantes `i-` ante *l* y *r* (*ilegal, irresponsable*), y la prueba del descarte para comprobar si existe una raíz real con significado propio.
   - **Misión 3: El Guardián de las Palabras Llanas y la Regla Invertida:** Identificación de la sílaba tónica penúltima, regla de tilde en consonante distinta de *-n* o *-s*, y la gran pregunta trampa de examen: por qué *examen, origen, joven, volumen* no llevan tilde en singular.
   - **Misión 4: Exploradores de los Demostrativos (Cercanía, Distancia Media y Lejanía):** Distancias espaciales y temporales (*este, ese, aquel*), concordancia en género y número, y uso de formas neutras (*esto, eso, aquello*).
   - **Misión 5: Maestros de la Narración y el Gran Anuncio:** Elementos de la narración (narrador, personajes, marco y argumento), clases de obras narrativas (cuento, novela, fábula y leyenda) y los 5 componentes clave de un cartel publicitario persuasivo.

3. **🏆 Simulador de Examen:**
   - **Prueba A: Caso Competencial («El Artefacto Misterioso de la Comadreja Leo»):** 10 ejercicios prácticos contextualizados con una historia narrativa en el río ante el sabio castor Tomás.
   - **Prueba B: Control Oficial de Saberes Básicos (Curricular Formal):** 10 preguntas de conceptos directos, ejercicios de tildes con justificación escrita formal, morfología de demostrativos y preguntas trampa.
   - **Tipologías Variadas de Preguntas Reales de Papel:**
     - `fill_blanks` (rellenar huecos con banco interactivo de chips tecleables o clicables).
     - `text_input` (escribir respuestas y justificaciones ortográficas).
     - `classify_inputs` (clasificar palabras con prefijo vs. palabras raíz, o con tilde vs. sin tilde).
     - `choice` (opciones múltiples con razonamiento didáctico).
   - Corrección inteligente y tolerante (admite acentos, mayúsculas, signos y espacios).
   - Informe pedagógico detallado con nota sobre 10, desglose pregunta a pregunta, explicaciones didácticas de cada fallo, confeti y acceso al diploma.

4. **⚡ Desafío Express (Test Infinito):**
   - Generador aleatorio de preguntas rápidas con contador de racha para entrenar en momentos libres.

5. **🕹️ Arcade Contrarreloj (45 Segundos):**
   - 3 Modalidades contrarreloj:
     1. *¿Prefijo Real o Trampa?* (Clasifica a toda velocidad palabras con prefijo auténtico frente a palabras raíz).
     2. *¿Lleva Tilde o No? (Llanas)* (Decide en un segundo según la regla V-N-S invertida).
     3. *Radar de Distancias* (Cercanía vs. Lejanía con demostrativos).
   - Multiplicadores de combo, aviso sonoro y récord personal guardado.

6. **🧪 Laboratorio Interactivo:**
   - **La Máquina Creadora de Prefijos:** Selector interactivo de prefijo + palabra raíz con animación en directo del cambio de significado.
   - **La Báscula de las Palabras Llanas:** Escáner silábico con penúltima sílaba iluminada y justificaciones de tilde.
   - **El Radar 3D de Demostrativos:** Mapa espacial de distancias (aquí, ahí, allí) con tabla de concordancia.
   - **La Agencia de Publicidad de Olivia:** Creador interactivo de anuncios con titular, imagen, características, eslogan y punto de venta.

7. **📖 Esquemas Visuales y 🎓 Diploma de Honor:**
   - Resumen esquemático con los 4 bloques clave para repasar antes de entrar al examen.
   - Diploma Oficial personalizado para Olivia con nombre editable, nota obtenida, fecha automática y botón para imprimir en papel (`window.print()`).

8. **🔊 Accesibilidad y Sonido:**
   - Web Audio API sintetizado nativo (sin archivos `.mp3` externos).
   - Síntesis de voz en español para leer preguntas y explicaciones.
   - Lluvia de confeti local en notas altas y misiones superadas.

---

## 🛡️ Blindaje Visual y Técnico

- **Cabecera Anti-Superposición:** Header 100% sólido `#ffffff !important;` (`sticky top-0 z-index: 100`), sin transparencias ni `backdrop-blur`, garantizando que ninguna tarjeta se solape al hacer scroll.
- **Hero Banner WCAG AAA:** Clase `.hero-banner` blindada en `style.css` con fondo ámbar sólido oscuro y textos de máximo contraste legible.
- **Vanilla SPA sin dependencias pesadas:** HTML5, CSS con Tailwind precompilado localmente y JavaScript modular. Carga instantánea y compatibilidad total con iPad y tablets.

---

## 🚀 Cómo Ejecutar en Local

```bash
cd c:\99_CODIGOFUENTE\Personal\Olivia_4\Lengua_Tema3
python -m http.server 3000
```
Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

O simplemente haz doble clic sobre el archivo `index.html`.

---

## ☁️ Despliegue en Vercel

1. Repositorio en GitHub: `https://github.com/franggpt-code/olivia-lengua-4-tema3`.
2. Proyecto desplegado en Vercel: `https://olivia-lengua-4-tema3.vercel.app`.

---

## 📁 Estructura del Proyecto

```text
Lengua_Tema3/
├── index.html                           # Interfaz SPA interactiva principal con cabecera sólida
├── css/
│   ├── tailwind.min.css                 # CSS de Tailwind precompilado localmente
│   └── style.css                        # Estilos personalizados, colores y print
├── js/
│   ├── confetti.min.js                  # Motor de confeti local
│   ├── audio.js                         # Web Audio API sintético + SpeechSynthesis
│   ├── data.js                          # Banco curricular estructurado (misiones, tests, arcade)
│   └── app.js                           # Controlador SPA, navegación, estrellas y diploma
├── Lengua_4_Tema3_Claves_Santillana.md  # Resumen de saberes curriculares
├── vercel.json                          # Configuración de despliegue y seguridad
├── package.json                         # Metadatos del proyecto
└── README.md                            # Guía completa de uso y despliegue
```
