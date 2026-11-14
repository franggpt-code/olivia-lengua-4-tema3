// =============================================================================
// BANCO PEDAGÓGICO DE DATOS · LENGUA CASTELLANA 4.º PRIMARIA · TEMA 3
// Proyecto CLAVES / Construyendo Mundos (Grazalema - Santillana)
// "Los Prefijos, Palabras Llanas, Demostrativos, Obras Narrativas y el Anuncio"
// Entrenador Personal de Olivia
// =============================================================================

const LENGUA_DATA = {
  meta: {
    title: "Lengua Castellana 4.º Primaria · Tema 3",
    unit: "Tema 3: Prefijos, Llanas, Demostrativos, Narración y Publicidad",
    subject: "Lengua Castellana",
    student: "Olivia",
    grade: "4.º Educación Primaria",
    schoolProject: "Proyecto CLAVES · Construyendo Mundos (Santillana)",
    version: "1.0.0"
  },

  // ===========================================================================
  // 5 MISIONES DIDÁCTICAS TEMÁTICAS (5 PREGUNTAS FORMATIVAS CADA UNA = 25 RETOS)
  // ===========================================================================
  missions: [
    {
      id: 1,
      title: "Misión 1: Detectives del Prefijo (des-, in-, sub-, re-, pre-)",
      icon: "🔍",
      badge: "Insignia de la Derivación",
      description: "Aprende qué es un prefijo, cómo se añade delante de una palabra y qué nuevo significado aporta.",
      questions: [
        {
          id: "m1_1",
          question: "¿Qué es un prefijo en lengua castellana?",
          options: [
            "Una letra que se coloca al final de una palabra para formar el plural.",
            "Una partícula o morfema que se añade DELANTE de una palabra raíz para crear una palabra nueva con distinto significado.",
            "El nombre de la persona que escribe un cuento o una novela.",
            "Un tipo especial de tilde que solo llevan las palabras agudas."
          ],
          correct: 1,
          explanation: "¡Exacto! Los prefijos van siempre DELANTE de una palabra primitiva (raíz) para formar palabras derivadas: hacer → DEShacer, marino → SUBmarino."
        },
        {
          id: "m1_2",
          question: "¿Qué significado aporta el prefijo «sub-» en palabras como «submarino», «subsuelo» o «subcampeón»?",
          options: [
            "Significa hacer una acción dos veces.",
            "Significa lo contrario o negación.",
            "Significa 'debajo de' o 'de categoría inferior'.",
            "Significa que algo ocurre antes de tiempo."
          ],
          correct: 2,
          explanation: "¡Brillante! «Sub-» significa debajo de: subsuelo (debajo del suelo), submarino (debajo del mar), subcampeón (por debajo del campeón)."
        },
        {
          id: "m1_3",
          question: "Olivia quiere formar el antónimo (contrario) de la palabra «posible». ¿Qué forma con prefijo es la correcta y por qué?",
          options: [
            "«Inposible», con n porque todos los prefijos de negación son in-.",
            "«Imposible», con m porque antes de la letra 'p' y de la 'b' se escribe siempre 'm'.",
            "«Desposible», porque des- es el único prefijo de negación.",
            "«Subposible», porque está debajo de lo posible."
          ],
          correct: 1,
          explanation: "¡Regla de oro ortográfica! El prefijo in- se transforma en «im-» delante de p y b: posible → IMposible, perfecto → IMperfecto, borrable → IMborrable."
        },
        {
          id: "m1_4",
          question: "¿Qué indica el prefijo «re-» en palabras como «recargar», «reorganizar» o «releer»?",
          options: [
            "Indica que algo no se puede hacer jamás.",
            "Indica repetición (volver a hacer) o aumento de intensidad.",
            "Indica que ocurre en el pasado lejano.",
            "Indica que se hace debajo de la tierra."
          ],
          correct: 1,
          explanation: "¡Genial! El prefijo «re-» significa repetición o insistencia: releer (volver a leer), recargar (volver a cargar la batería)."
        },
        {
          id: "m1_5",
          question: "Lucas y Mateo van a ver el pase especial de una película antes de que se estrene en los cines. ¿Cómo se llama ese pase?",
          options: [
            "Un desestreno.",
            "Un subestreno.",
            "Un preestreno (porque el prefijo «pre-» significa 'antes de').",
            "Un reestreno (porque se ve por primera vez)."
          ],
          correct: 2,
          explanation: "¡Muy bien! «Pre-» significa antes de: preestreno (antes del estreno), prehistoria (antes de la historia escrita), precalentar (calentar antes)."
        }
      ]
    },

    {
      id: 2,
      title: "Misión 2: El Cazador de Palabras Trampa y Raíces Ocultas",
      icon: "🕵️‍♀️",
      badge: "Insignia Cazatrampas",
      description: "¡Cuidado con las palabras tramposas! Descubre cuándo unas letras iniciales son un prefijo real y cuándo son parte de la palabra original.",
      questions: [
        {
          id: "m2_1",
          question: "¿Cuál de estas cuatro palabras tiene un PREFIJO REAL de negación?",
          options: [
            "Delgado",
            "Deseo",
            "Despeinado",
            "Destino"
          ],
          correct: 2,
          explanation: "¡Gran ojo de detective! En «despeinado», si quitamos des- queda la palabra real «peinado». En cambio, en delgado, deseo y destino, esas letras forman parte de la raíz (no existe 'gado' ni 'eo')."
        },
        {
          id: "m2_2",
          question: "En un examen de 4.º aparece este grupo de palabras: «premio», «prehistoria», «precio» y «prenda». ¿Cuál es la ÚNICA que tiene prefijo?",
          options: [
            "Premio",
            "Prehistoria",
            "Precio",
            "Prenda"
          ],
          correct: 1,
          explanation: "¡Excelente! «Prehistoria» se compone del prefijo pre- + la palabra raíz historia. Las palabras premio, precio y prenda no tienen prefijo; 'pre-' forma parte de su raíz."
        },
        {
          id: "m2_3",
          question: "¿Qué ocurre con palabras como «recuerdo», «reloj» o «regalo»?",
          options: [
            "Tienen el prefijo re- porque empiezan por re.",
            "NO tienen prefijo, porque re- forma parte de su palabra raíz original.",
            "Son palabras inventadas.",
            "Tienen prefijo de negación."
          ],
          correct: 1,
          explanation: "¡Atenta a la trampa! Un reloj no es volver a 'loj', ni un regalo es volver a 'galo'. En estas palabras, 're' pertenece a la propia raíz de la palabra."
        },
        {
          id: "m2_4",
          question: "Valentina busca el antónimo con prefijo para «legal» y «responsable». ¿Cuáles son las formas correctas?",
          options: [
            "Inlegal y inresponsable.",
            "Ilegal (con i-) e irresponsable (con i- duplicando la r).",
            "Deslegal y desresponsable.",
            "Sublegal y subresponsable."
          ],
          correct: 1,
          explanation: "¡Regla especial de in-! Ante la letra 'l' se convierte en «i-» (ilegal, ilógico) y ante la letra 'r' también se usa «i-» duplicando la r (irresponsable, irreal)."
        },
        {
          id: "m2_5",
          question: "¿Cuál es la regla definitiva para saber si una palabra tiene prefijo?",
          options: [
            "Contar cuántas sílabas tiene la palabra.",
            "Quitar las letras iniciales: si lo que queda es una palabra que existe por sí misma en español, ¡sí es un prefijo!",
            "Mirar si lleva tilde en la última sílaba.",
            "Ver si rima con otra palabra."
          ],
          correct: 1,
          explanation: "¡Esa es la clave de oro! Si al retirar la partícula inicial reconoces una palabra con significado propio (des-hacer → hacer), entonces es un prefijo auténtico."
        }
      ]
    },

    {
      id: 3,
      title: "Misión 3: El Guardián de las Palabras Llanas y la Regla Invertida",
      icon: "⚖️",
      badge: "Insignia de la Sílaba Llana",
      description: "Aprende a reconocer la sílaba tónica penúltima y la regla oficial de tildes para palabras llanas.",
      questions: [
        {
          id: "m3_1",
          question: "¿Cuándo es una palabra LLANA (o grave)?",
          options: [
            "Cuando la sílaba que suena con más fuerza (tónica) es la última.",
            "Cuando la sílaba tónica es la PENÚLTIMA (la segunda empezando por el final).",
            "Cuando la sílaba tónica es la antepenúltima.",
            "Cuando tiene cuatro sílabas o más."
          ],
          correct: 1,
          explanation: "¡Muy bien! Las palabras llanas tienen el golpe de voz en la penúltima sílaba: ven-TA-na, LÁ-piz, ár-bol, ca-MI-no."
        },
        {
          id: "m3_2",
          question: "¿Cuál es la regla oficial de acentuación de las palabras llanas?",
          options: [
            "Llevan tilde siempre que terminan en vocal, en -n o en -s.",
            "Llevan tilde cuando terminan en una consonante DISTINTA de -n o -s (o en dos consonantes juntas).",
            "Todas las palabras llanas llevan tilde obligatoriamente.",
            "Nunca llevan tilde si tienen más de dos sílabas."
          ],
          correct: 1,
          explanation: "¡La regla invertida! Al revés que las agudas: las llanas llevan tilde cuando terminan en consonante que NO sea 'n' ni 's' (como árbol, césped, lápiz)."
        },
        {
          id: "m3_3",
          question: "¡ALERTA TRAMPA DE EXAMEN! ¿Por qué la palabra «examen» NO lleva tilde en singular?",
          options: [
            "Porque es una palabra aguda que termina en -n.",
            "Porque es una palabra llana (ex-A-men) que termina en consonante -n, y las llanas en -n NO llevan tilde.",
            "Porque las palabras de tres sílabas nunca llevan tilde.",
            "En realidad sí lleva tilde: se escribe 'exámen'."
          ],
          correct: 1,
          explanation: "¡Pregunta estrella de examen! «Examen», «origen», «joven» y «volumen» son palabras llanas terminadas en -n, por lo que NUNCA llevan tilde en singular (en plural sí: ex-á-me-nes, porque es esdrújula)."
        },
        {
          id: "m3_4",
          question: "¿Cuál de estos grupos contiene ÚNICAMENTE palabras llanas que DEBEN llevar tilde?",
          options: [
            "Mesa, libro, pelota, silla.",
            "Árbol, lápiz, césped, difícil.",
            "Café, colibrí, melocotón, compás.",
            "Plátano, música, pájaro, médico."
          ],
          correct: 1,
          explanation: "¡Perfecto! Árbol (termina en -l), lápiz (en -z), césped (en -d) y difícil (en -l) son llanas que terminan en consonantes distintas de -n y -s, por lo que llevan tilde."
        },
        {
          id: "m3_5",
          question: "¿Cómo justificarías de forma formal y correcta en tu examen por qué «lápiz» lleva tilde?",
          options: [
            "«Lleva tilde porque suena muy bonito».",
            "«Lleva tilde porque es una palabra llana que termina en una consonante distinta de -n y -s (en este caso, en consonante -z)».",
            "«Lleva tilde porque es una palabra aguda terminada en vocal».",
            "«Lleva tilde porque es una palabra esdrújula»."
          ],
          correct: 1,
          explanation: "¡Respuesta de 10 absoluto! Esa es exactamente la justificación que piden los profesores de 4.º en Santillana: señalar qué tipo de palabra es (llana) y en qué letra termina."
        }
      ]
    },

    {
      id: 4,
      title: "Misión 4: Exploradores de los Demostrativos (Cercanía, Distancia Media y Lejanía)",
      icon: "🧭",
      badge: "Insignia del Demostrativo",
      description: "Domina las distancias espaciales y temporales que expresan este, ese y aquel.",
      questions: [
        {
          id: "m4_1",
          question: "¿Para qué sirven los demostrativos en una oración?",
          options: [
            "Para indicar la acción que realiza el sujeto.",
            "Para señalar la distancia (en el espacio o en el tiempo) entre la persona que habla y el objeto o ser del que se habla.",
            "Para indicar si una palabra es aguda o llana.",
            "Para contar cantidades exactas como 1, 2, 3..."
          ],
          correct: 1,
          explanation: "¡Exacto! Los demostrativos sitúan las cosas respecto al que habla: cerca (este), a media distancia (ese) o lejos (aquel)."
        },
        {
          id: "m4_2",
          question: "Olivia tiene un libro en la mano y dice: «Me encanta _____ libro». ¿Qué demostrativo expresa CERCANÍA?",
          options: [
            "Aquel",
            "Ese",
            "Este",
            "Esos"
          ],
          correct: 2,
          explanation: "¡Muy bien! «Este» (masculino singular) expresa cercanía, porque Olivia lo tiene justo al lado o en sus propias manos."
        },
        {
          id: "m4_3",
          question: "Lucas señala una montaña muy alta y lejana en el horizonte y dice: «Subiremos a _____ cumbre». ¿Qué demostrativo expresa LEJANÍA en femenino singular?",
          options: [
            "Esta",
            "Esa",
            "Aquella",
            "Aquellas"
          ],
          correct: 2,
          explanation: "¡Perfecto! «Aquella» es un demostrativo femenino singular que indica lejanía (lejos tanto del que habla como del que escucha)."
        },
        {
          id: "m4_4",
          question: "Analiza morfológicamente el demostrativo de la frase: «Dame esos rotuladores».",
          options: [
            "Demostrativo, femenino, singular, cercanía.",
            "Demostrativo, masculino, plural, distancia media.",
            "Demostrativo, masculino, singular, lejanía.",
            "Pronombre personal de 3.ª persona."
          ],
          correct: 1,
          explanation: "¡Impecable! «Esos»: es masculino plural y expresa distancia media (está cerca de la persona que escucha)."
        },
        {
          id: "m4_5",
          question: "¿Cuáles son las formas neutras de los demostrativos y qué particularidad tienen?",
          options: [
            "Este, ese y aquel; siempre acompañan a nombres masculinos.",
            "Esto, eso y aquello; siempre funcionan como pronombres y nunca llevan tilde.",
            "Estos, esos y aquellos; son plurales.",
            "No existen formas neutras en español."
          ],
          correct: 1,
          explanation: "¡De matrícula de honor! «Esto», «eso» y «aquello» son formas neutras, se usan para señalar hechos o cosas en general ('¿Qué es esto?') y nunca llevan tilde."
        }
      ]
    },

    {
      id: 5,
      title: "Misión 5: Maestros de la Narración y el Gran Anuncio",
      icon: "📖",
      badge: "Insignia de la Creatividad",
      description: "Descubre los tipos de obras narrativas (cuento, novela, fábula, leyenda) y las partes de un anuncio publicitario.",
      questions: [
        {
          id: "m5_1",
          question: "¿Qué caracteriza a una OBRA NARRATIVA?",
          options: [
            "Que solo contiene listas de compras y recetas.",
            "Que una voz llamada narrador cuenta unos hechos que les suceden a unos personajes en un lugar y tiempo determinados.",
            "Que está escrita exclusivamente para recitarse con rimas y versos.",
            "Que solo explica cómo usar un electrodoméstico."
          ],
          correct: 1,
          explanation: "¡Excelente! En las obras narrativas hay un narrador, personajes, un marco espacial/temporal y un argumento dividido en planteamiento, nudo y desenlace."
        },
        {
          id: "m5_2",
          question: "Si leemos una narración breve protagonizada por una zorra y un cuervo que termina con una enseñanza moral llamada 'moraleja', ¿ante qué tipo de obra narrativa estamos?",
          options: [
            "Una novela.",
            "Una fábula.",
            "Una leyenda.",
            "Una enciclopedia."
          ],
          correct: 1,
          explanation: "¡Así es! Las FÁBULAS son narraciones breves cuyos protagonistas suelen ser animales humanizados y que terminan con una moraleja didáctica."
        },
        {
          id: "m5_3",
          question: "¿En qué se diferencia principalmente una NOVELA de un CUENTO en 4.º de Primaria?",
          options: [
            "El cuento es una historia breve con pocos personajes; la novela es una narración larga, más compleja y dividida en capítulos.",
            "El cuento siempre es real y la novela es de mentira.",
            "La novela no tiene personajes y el cuento sí.",
            "El cuento se escribe en verso y la novela con dibujos."
          ],
          correct: 0,
          explanation: "¡Exactamente! El cuento es un relato corto y concentrado; la novela es una obra extensa con múltiples personajes, tramas y dividida en capítulos."
        },
        {
          id: "m5_4",
          question: "¿Cuáles son los elementos imprescindibles que deben aparecer en un ANUNCIO PUBLICITARIO?",
          options: [
            "Solo el precio del producto en letras muy pequeñas.",
            "Nombre/titular llamativo, ilustración sugerente, características/ventajas, eslogan pegadizo e información de contacto.",
            "Un poema de 40 estrofas con rima consonante.",
            "Una lista alfabética con todas las palabras de un diccionario."
          ],
          correct: 1,
          explanation: "¡Muy bien! Un anuncio necesita un titular atrayente, una imagen que capte la mirada, las cualidades del producto, un eslogan fácil de recordar y dónde conseguirlo."
        },
        {
          id: "m5_5",
          question: "¿Qué es el ESLOGAN en un texto publicitario?",
          options: [
            "La firma del fabricante del producto.",
            "Una frase breve, pegadiza e ingeniosa que resume la idea principal y anima a comprar o probar el producto.",
            "El código de barras de la caja.",
            "La fecha de caducidad del alimento."
          ],
          correct: 1,
          explanation: "¡Perfecto! El eslogan es el lema memorable que se graba en la cabeza del público: por ejemplo, '¡El imán que encuentra todas tus aventuras!'."
        }
      ]
    }
  ],

  // ===========================================================================
  // SIMULADOR DE EXAMEN (PRUEBA A COMPETENCIAL + PRUEBA B CURRICULAR)
  // Con preguntas de elección múltiple, rellenar huecos, respuestas escritas y clasificación
  // ===========================================================================
  exams: {
    testA: {
      id: "testA",
      title: "Prueba A: Caso Competencial («La Expedición al Valle de los Robles»)",
      description: "Acompaña a Simón el erizo y a la comadreja Leo en su conflicto ante el sabio castor Tomás en la orilla del gran río.",
      context: `El artefacto misterioso de la comadreja Leo
Un día de otoño, el erizo Simón y la comadreja Leo acudieron a la orilla del gran río a ver al sabio castor Tomás, que era el mediador de los animales del valle. Al parecer, la comadreja Leo le había vendido a Simón un telescopio submarino para descubrir tesoros antiguos en el fondo del agua. El pobre erizo Simón llevaba varias semanas sumergiendo aquel telescopio sin conseguir ver nada más que fango y algas verdosas.
–Quiero que Leo me devuelva mis bellotas doradas porque este telescopio es inservible y no funciona –reclamó Simón indignado.
–¡Ni hablar! –respondió la comadreja Leo–. Si no funciona es porque Simón es impaciente y no sabe orientarlo. ¡A veces hay que ser más hábil y observador!
El castor Tomás se acarició la barba durante un largo rato bajo un sauce frondoso. Después sentenció:
–Bien. Creo que Simón tiene razón: Leo debe devolver las bellotas doradas porque este artefacto no parece cumplir lo prometido. Ahora bien, si la comadreja Leo demuestra que su telescopio funciona y encuentra algún objeto valioso en este río, Simón volverá a adquirir aquel telescopio y se quedará con el hallazgo.
Leo protestó y protestó, pero no tuvo más remedio que reintegrar las bellotas. Y cuentan que desde aquel día, jamás volvió a engañar a ningún vecino del valle.`,
      questions: [
        {
          id: "ta_1",
          type: "choice",
          question: "¿Por qué acudieron el erizo Simón y la comadreja Leo ante el sabio castor Tomás?",
          options: [
            "Porque querían organizar una carrera de natación por el río.",
            "Porque Simón reclamaba la devolución de sus bellotas doradas tras comprar un telescopio submarino que no funcionaba.",
            "Porque el castor Tomás era el dueño de la fábrica de telescopios.",
            "Porque Simón había perdido sus gafas de bucear en el agua."
          ],
          correct: 1,
          explanation: "¡Correcto! Simón acudió a reclamar justicia porque Leo le vendió un artefacto inservible y se negaba a devolverle el importe."
        },
        {
          id: "ta_2",
          type: "choice",
          question: "¿Qué condición justa propuso el castor Tomás para resolver el conflicto entre ambos animales?",
          options: [
            "Que tiraran el telescopio al fondo del lago y no hablaran más.",
            "Que Leo devolviera las bellotas, pero si demostraba que el telescopio funcionaba hallando algo valioso, Simón se lo recompraría.",
            "Que el castor Tomás se quedara con el telescopio y las bellotas.",
            "Que Simón le regalara diez manzanas silvestres a Leo."
          ],
          correct: 1,
          explanation: "¡Exacto! El sabio mediador ordenó devolver el dinero de inmediato, pero dio a Leo la oportunidad de demostrar si su invento era real o un engaño."
        },
        {
          id: "ta_3",
          type: "text_input",
          question: "En el texto aparecen las palabras «inservible» e «impaciente». Escribe únicamente el PREFIJO que comparten ambas palabras (recuerda que cambia de forma ante la letra p):",
          inputs: [
            {
              label: "Prefijo de negación",
              placeholder: "Escribe el prefijo (ej: in- / im-)",
              accepted: ["in", "in-", "im", "im-", "in/im", "in- / im-", "in o im"]
            }
          ],
          wordBank: ["in-", "im-", "des-", "sub-", "pre-"],
          explanation: "¡Muy bien! El prefijo de negación es «in-», que se convierte en «im-» delante de la letra 'p' en «impaciente»."
        },
        {
          id: "ta_4",
          type: "choice",
          question: "¿Qué aprendió la comadreja Leo al final de la historia tras la sentencia del castor Tomás?",
          options: [
            "Que debía construir telescopios más grandes con espejos de oro.",
            "Que no debía volver a intentar engañar a ningún habitante del valle.",
            "Que el castor Tomás era su mejor amigo de la infancia.",
            "Que las bellotas doradas no servían para comer."
          ],
          correct: 1,
          explanation: "¡Esa es la moraleja! La justicia prevaleció y Leo aprendió que la honestidad es fundamental y no se debe engañar a los demás."
        },
        {
          id: "ta_5",
          type: "fill_blanks",
          question: "Completa el análisis de los demostrativos que aparecen en las oraciones del cuento:",
          template: "En la frase «Simón llevaba varias semanas sumergiendo {0} telescopio», la palabra es un demostrativo de distancia {1}. En cambio, en «{2} telescopio es inservible», se usa un demostrativo que expresa {3}.",
          blanks: [
            { placeholder: "demostrativo...", accepted: ["aquel"] },
            { placeholder: "distancia...", accepted: ["lejanía", "lejana", "alejada"] },
            { placeholder: "demostrativo...", accepted: ["este"] },
            { placeholder: "distancia...", accepted: ["cercanía", "cerca"] }
          ],
          wordBank: ["aquel", "este", "lejanía", "cercanía", "ese", "distancia media"],
          explanation: "«Aquel» indica lejanía en el tiempo o espacio; «este» indica cercanía respecto al hablante."
        },
        {
          id: "ta_6",
          type: "choice",
          question: "En el texto leemos: «Simón es impaciente y no sabe orientarlo. ¡A veces hay que ser más hábil!». ¿Por qué «hábil» lleva tilde?",
          options: [
            "Porque es una palabra aguda que termina en consonante l.",
            "Porque es una palabra llana que termina en una consonante distinta de -n y -s (en este caso, en consonante -l).",
            "Porque todas las palabras que empiezan por h llevan tilde.",
            "Porque es una palabra esdrújula."
          ],
          correct: 1,
          explanation: "¡Regla de oro de las llanas! Há-bil tiene la fuerza en la penúltima sílaba (llana) y termina en -l, por eso lleva tilde obligatoria."
        },
        {
          id: "ta_7",
          type: "classify_inputs",
          question: "Clasifica estas 4 palabras del texto según tengan un PREFIJO REAL o sean una PALABRA RAÍZ SIN PREFIJO:",
          items: [
            { name: "submarino", placeholder: "con prefijo / sin prefijo", accepted: ["con prefijo", "con_prefijo", "prefijo", "prefijo real", "si"] },
            { name: "delgado", placeholder: "con prefijo / sin prefijo", accepted: ["sin prefijo", "sin_prefijo", "raiz", "palabra raiz", "no"] },
            { name: "inservible", placeholder: "con prefijo / sin prefijo", accepted: ["con prefijo", "con_prefijo", "prefijo", "prefijo real", "si"] },
            { name: "deseo", placeholder: "con prefijo / sin prefijo", accepted: ["sin prefijo", "sin_prefijo", "raiz", "palabra raiz", "no"] }
          ],
          wordBank: ["con prefijo", "sin prefijo"],
          explanation: "«Submarino» (sub- + marino) e «inservible» (in- + servible) tienen prefijo real. «Delgado» y «deseo» son raíces completas sin prefijo."
        },
        {
          id: "ta_8",
          type: "choice",
          question: "¿Qué tipo de texto literario es la historia del erizo Simón y la comadreja Leo?",
          options: [
            "Una obra teatral dividida en actos y escenas.",
            "Una fábula o cuento narrativo con animales humanizados y enseñanza moral final.",
            "Un poema lírico con versos de arte menor.",
            "Un catálogo de instrucciones científicas."
          ],
          correct: 1,
          explanation: "¡Muy bien! Es una obra narrativa (un relato en prosa con narrador, personajes y lección didáctica)."
        },
        {
          id: "ta_9",
          type: "fill_blanks",
          question: "Si la comadreja Leo quisiera publicar un ANUNCIO auténtico para vender su invento, completa los cuatro elementos imprescindibles que debe incluir:",
          template: "El anuncio debe tener un {0} llamativo y creativo, una {1} o dibujo atractivo, una descripción de sus {2} o ventajas y un {3} breve y pegadizo.",
          blanks: [
            { placeholder: "elemento 1...", accepted: ["titular", "titulo", "título", "nombre"] },
            { placeholder: "elemento 2...", accepted: ["imagen", "ilustracion", "ilustración", "foto", "dibujo"] },
            { placeholder: "elemento 3...", accepted: ["caracteristicas", "características", "cualidades", "ventajas", "funciones"] },
            { placeholder: "elemento 4...", accepted: ["eslogan", "lema"] }
          ],
          wordBank: ["titular", "imagen", "características", "eslogan", "índice", "resumen"],
          explanation: "Los cuatro pilares de un anuncio son el titular, la imagen, las características/ventajas y el eslogan memorable."
        },
        {
          id: "ta_10",
          type: "choice",
          question: "¿Cuál de estos posibles eslóganes sería el más adecuado y persuasivo para anunciar el telescopio submarino?",
          options: [
            "«Compre un objeto de metal de 20 centímetros que pesa medio kilo».",
            "«¡Telescopio Aqua-Visor: descubre los tesoros que el río esconde!»",
            "«No sabemos si funciona, pero pruébelo usted mismo en el agua».",
            "«Un cilindro con dos lentes de aumento transparente»."
          ],
          correct: 1,
          explanation: "¡Genial! Un eslogan publicitario debe ser entusiasta, rítmico, breve y destacar el beneficio emocionante del producto."
        }
      ]
    },

    testB: {
      id: "testB",
      title: "Prueba B: Control Oficial de Saberes Básicos (Curricular y Preguntas Trampa)",
      description: "Entrena los ejercicios formales de examen del colegio: prefijos, palabras llanas, tildes, demostrativos y obras narrativas.",
      context: "Esta prueba reproduce la estructura de los controles oficiales de Santillana CLAVES / Construyendo Mundos: formación de palabras derivadas con prefijos, acentuación de llanas, análisis morfológico de demostrativos y géneros narrativos.",
      questions: [
        {
          id: "tb_1",
          type: "choice",
          question: "¿Cuál de estas palabras contiene el prefijo «pre-» que indica anterioridad ('antes de')?",
          options: [
            "Precio",
            "Precalentar",
            "Premio",
            "Prenda"
          ],
          correct: 1,
          explanation: "¡Brillante! Precalentar significa calentar antes (pre- + calentar). En precio, premio y prenda, 'pre' forma parte inseparable de la raíz."
        },
        {
          id: "tb_2",
          type: "fill_blanks",
          question: "Escribe la palabra derivada con prefijo que corresponde a cada una de estas definiciones:",
          template: "1. Volver a organizar algo: {0}. 2. Lo que está situado debajo del suelo: {1}. 3. Una persona que no tiene paciencia: {2}. 4. Quitar los botones o desabrochar una prenda: {3}.",
          blanks: [
            { placeholder: "palabra con prefijo...", accepted: ["reorganizar"] },
            { placeholder: "palabra con prefijo...", accepted: ["subsuelo"] },
            { placeholder: "palabra con prefijo...", accepted: ["impaciente"] },
            { placeholder: "palabra con prefijo...", accepted: ["desabrochar", "desabotonar"] }
          ],
          wordBank: ["reorganizar", "subsuelo", "impaciente", "desabrochar", "preestreno", "submarino"],
          explanation: "re-organizar (repetición), sub-suelo (debajo), im-paciente (negación con m antes de p), des-abrochar (acción contraria)."
        },
        {
          id: "tb_3",
          type: "choice",
          question: "Identifica la palabra INTRUSA que NO tiene prefijo en este grupo: «despeinado», «descoser», «deseo», «desconfianza».",
          options: [
            "Despeinado",
            "Descoser",
            "Deseo",
            "Desconfianza"
          ],
          correct: 2,
          explanation: "¡Correcto! «Deseo» es la intrusa: la palabra completa es la raíz primitiva. No existe la palabra 'eo' en español."
        },
        {
          id: "tb_4",
          type: "text_input",
          question: "Escribe la justificación formal de examen: ¿Por qué la palabra «árbol» lleva tilde?",
          inputs: [
            {
              label: "Terminación de la palabra árbol",
              placeholder: "Ej: consonante distinta de n o s / consonante l",
              accepted: [
                "consonante distinta de n y s",
                "consonante distinta de n o s",
                "consonante l",
                "l",
                "-l",
                "letra l",
                "una consonante distinta de n y s",
                "termina en consonante l"
              ]
            }
          ],
          wordBank: ["consonante distinta de n y s", "consonante l", "vocal a", "consonante n"],
          explanation: "¡Perfecto! Árbol lleva tilde porque es una palabra llana terminada en una consonante distinta de -n y -s (en este caso, en consonante -l)."
        },
        {
          id: "tb_5",
          type: "classify_inputs",
          question: "Indica cuáles de estas palabras llanas DEBEN LLEVAR TILDE y cuáles NO LLEVAN TILDE:",
          items: [
            { name: "lapiz", placeholder: "con tilde / sin tilde", accepted: ["con tilde", "con_tilde", "si", "lleva tilde"] },
            { name: "examen", placeholder: "con tilde / sin tilde", accepted: ["sin tilde", "sin_tilde", "no", "no lleva tilde"] },
            { name: "cesped", placeholder: "con tilde / sin tilde", accepted: ["con tilde", "con_tilde", "si", "lleva tilde"] },
            { name: "joven", placeholder: "con tilde / sin tilde", accepted: ["sin tilde", "sin_tilde", "no", "no lleva tilde"] },
            { name: "dificil", placeholder: "con tilde / sin tilde", accepted: ["con tilde", "con_tilde", "si", "lleva tilde"] },
            { name: "ventana", placeholder: "con tilde / sin tilde", accepted: ["sin tilde", "sin_tilde", "no", "no lleva tilde"] }
          ],
          wordBank: ["con tilde", "sin tilde"],
          explanation: "Lápiz (-z), césped (-d) y difícil (-l) llevan tilde por terminar en consonante distinta de n o s. Examen y joven terminan en -n y ventana en vocal, por eso NO llevan tilde."
        },
        {
          id: "tb_6",
          type: "choice",
          question: "¿Por qué «volumen» y «origen» NO llevan tilde, a pesar de tener la fuerza en la penúltima sílaba?",
          options: [
            "Porque son palabras llanas terminadas en consonante -n, y las llanas en -n nunca llevan tilde.",
            "Porque son palabras agudas.",
            "Porque las palabras de más de dos sílabas no llevan tilde.",
            "En realidad sí llevan tilde siempre."
          ],
          correct: 0,
          explanation: "¡Regla clave de 4.º! Las palabras llanas terminadas en -n (volumen, origen, joven, examen) no llevan tilde en singular."
        },
        {
          id: "tb_7",
          type: "fill_blanks",
          question: "Escribe la forma del demostrativo que corresponde a cada indicación gramatical:",
          template: "1. Femenino, plural, distancia media: {0}. 2. Masculino, singular, cercanía: {1}. 3. Femenino, singular, lejanía: {2}. 4. Masculino, plural, cercanía: {3}.",
          blanks: [
            { placeholder: "demostrativo...", accepted: ["esas"] },
            { placeholder: "demostrativo...", accepted: ["este"] },
            { placeholder: "demostrativo...", accepted: ["aquella"] },
            { placeholder: "demostrativo...", accepted: ["estos"] }
          ],
          wordBank: ["esas", "este", "aquella", "estos", "esos", "aquel", "esta"],
          explanation: "Esas (media distancia fem. pl.), este (cercanía masc. sing.), aquella (lejanía fem. sing.), estos (cercanía masc. pl.)."
        },
        {
          id: "tb_8",
          type: "choice",
          question: "Indica el género, número y distancia del demostrativo en: «Mira aquel pájaro en la copa del abeto».",
          options: [
            "Demostrativo, femenino, singular, cercanía.",
            "Demostrativo, masculino, singular, distancia de lejanía.",
            "Demostrativo, masculino, plural, distancia media.",
            "Pronombre personal de 2.ª persona."
          ],
          correct: 1,
          explanation: "¡Muy bien! «Aquel»: masculino, singular y expresa lejanía en el espacio respecto al hablante y al oyente."
        },
        {
          id: "tb_9",
          type: "choice",
          question: "¿Cuáles son las cuatro clases principales de obras narrativas que se estudian en 4.º de Primaria?",
          options: [
            "El poema, la canción, el trabalenguas y la adivinanza.",
            "El cuento, la novela, la fábula y la leyenda.",
            "El cómic, el diccionario, el periódico y el folleto.",
            "La noticia, la entrevista, el reportaje y la carta."
          ],
          correct: 1,
          explanation: "¡Exacto! Las cuatro grandes obras narrativas literarias de 4.º son el cuento, la novela, la fábula y la leyenda."
        },
        {
          id: "tb_10",
          type: "choice",
          question: "Un alumno escribe este texto para un anuncio: «Zapatillas Turbo-Flash: ¡Corre tan rápido como el viento! De venta en Deportes Sol». ¿Qué elemento corresponde a «¡Corre tan rápido como el viento!»?",
          options: [
            "El precio de fábrica.",
            "El eslogan publicitario.",
            "El titular o nombre de la marca.",
            "Las instrucciones de lavado de la tela."
          ],
          correct: 1,
          explanation: "¡Excelente! «¡Corre tan rápido como el viento!» es el eslogan: una frase ingeniosa y memorable que sintetiza la ventaja del producto."
        }
      ]
    }
  },

  // ===========================================================================
  // DESAFÍO EXPRESS (TEST INFINITO DE PREGUNTAS RÁPIDAS ALEATORIAS)
  // ===========================================================================
  expressPool: [
    {
      q: "¿Qué prefijo añadirías a 'marino' para indicar que navega bajo el mar?",
      options: ["Des-", "Sub-", "Pre-", "Re-"],
      correct: 1,
      exp: "Sub- significa 'debajo de': submarino."
    },
    {
      q: "¿Cuál de estas palabras llanas termina en -l y por tanto LLEVA TILDE?",
      options: ["Papel", "Fácil", "Canal", "Pastel"],
      correct: 1,
      exp: "Fácil es llana (FÁ-cil) y termina en -l. Las otras tres son agudas (pa-PEL, ca-NAL, pas-TEL)."
    },
    {
      q: "¿Qué demostrativo expresa distancia media en femenino singular?",
      options: ["Esta", "Esa", "Aquella", "Esas"],
      correct: 1,
      exp: "Esa es femenino singular de distancia media."
    },
    {
      q: "¿Lleva tilde la palabra llana 'césped'?",
      options: ["Sí, porque termina en consonante distinta de -n y -s (-d).", "No, porque termina en consonante d.", "Solo si es plural.", "Es aguda."],
      correct: 0,
      exp: "Césped es llana terminada en -d, por lo que lleva tilde obligatoria."
    },
    {
      q: "¿Cuál es el antónimo con prefijo de 'peinado'?",
      options: ["Impeinado", "Despeinado", "Subpeinado", "Prepeinado"],
      correct: 1,
      exp: "Despeinado lleva el prefijo de acción contraria 'des-'."
    },
    {
      q: "¿Qué tipo de obra narrativa tiene como personajes animales y enseña una moraleja?",
      options: ["Novela", "Fábula", "Cuento", "Leyenda"],
      correct: 1,
      exp: "La fábula siempre contiene animales personificados y una moraleja didáctica."
    },
    {
      q: "¿Lleva tilde la palabra 'examen'?",
      options: ["Sí, siempre en la a.", "NO, porque es llana terminada en -n.", "Lleva tilde en la e.", "Solo cuando se aprueba."],
      correct: 1,
      exp: "Examen es llana terminada en -n, ¡jamás lleva tilde en singular!"
    },
    {
      q: "¿Qué prefijo se añade a 'historia' para hablar de la época anterior a la invención de la escritura?",
      options: ["Sub-", "Des-", "Pre-", "Re-"],
      correct: 2,
      exp: "Prehistoria: pre- significa 'antes de'."
    },
    {
      q: "En la frase 'Mira aquellos pájaros en el cielo', ¿qué expresa 'aquellos'?",
      options: ["Cercanía", "Distancia media", "Lejanía", "Futuro"],
      correct: 2,
      exp: "Aquellos es un demostrativo de lejanía (masculino plural)."
    },
    {
      q: "¿Cómo se escribe el antónimo de 'borrable'?",
      options: ["Inborrable", "Imborrable", "Desborrable", "Subborrable"],
      correct: 1,
      exp: "Imborrable: antes de la 'b' y de la 'p' siempre se escribe 'm'."
    },
    {
      q: "¿Cuál de estas palabras NO tiene prefijo?",
      options: ["Reorganizar", "Delgado", "Subsuelo", "Preestreno"],
      correct: 1,
      exp: "Delgado es una palabra raíz completa, no tiene prefijo."
    },
    {
      q: "¿Qué elemento de un anuncio publicitario es una frase breve y pegadiza para recordar el producto?",
      options: ["El código postal", "El eslogan", "El precio en euros", "La fecha"],
      correct: 1,
      exp: "El eslogan es el lema pegadizo que sintetiza el producto."
    },
    {
      q: "¿Lleva tilde la palabra llana 'árbol'?",
      options: ["Sí, termina en consonante l.", "No, termina en consonante.", "Solo en mayúsculas.", "Es esdrújula."],
      correct: 0,
      exp: "Árbol es llana terminada en consonante distinta de n o s."
    },
    {
      q: "¿Qué demostrativo expresa cercanía en masculino singular?",
      options: ["Este", "Ese", "Aquel", "Estos"],
      correct: 0,
      exp: "Este libro (cercanía, masculino singular)."
    },
    {
      q: "¿Cuál es la sílaba tónica de una palabra llana?",
      options: ["La última", "La penúltima", "La antepenúltima", "La primera"],
      correct: 1,
      exp: "La penúltima sílaba: ven-TA-na, LÁ-piz."
    }
  ],

  // ===========================================================================
  // ARCADE DE CLASIFICACIÓN RÁPIDA (CONTRARRELOJ DE 45 SEGUNDOS)
  // ===========================================================================
  arcade: {
    modes: [
      {
        id: "prefijos",
        title: "🕹️ ¿Prefijo Real o Trampa?",
        description: "Clasifica a toda velocidad si la palabra tiene un prefijo auténtico o si es una palabra raíz sin prefijo.",
        leftBtn: { label: "✨ Prefijo Real", key: "real" },
        rightBtn: { label: "🛑 Raíz / Trampa", key: "trampa" },
        items: [
          { word: "Despeinado", type: "real" },
          { word: "Delgado", type: "trampa" },
          { word: "Submarino", type: "real" },
          { word: "Deseo", type: "trampa" },
          { word: "Reorganizar", type: "real" },
          { word: "Premio", type: "trampa" },
          { word: "Prehistoria", type: "real" },
          { word: "Reloj", type: "trampa" },
          { word: "Imposible", type: "real" },
          { word: "Regalo", type: "trampa" },
          { word: "Incapaz", type: "real" },
          { word: "Precio", type: "trampa" },
          { word: "Subsuelo", type: "real" },
          { word: "Destino", type: "trampa" },
          { word: "Releer", type: "real" },
          { word: "Prenda", type: "trampa" },
          { word: "Deshacer", type: "real" },
          { word: "Recuerdo", type: "trampa" },
          { word: "Precalentar", type: "real" },
          { word: "Invierno", type: "trampa" }
        ]
      },
      {
        id: "tildes",
        title: "🕹️ ¿Lleva Tilde o No? (Llanas)",
        description: "Decide en un segundo si estas palabras llanas deben llevar tilde según la regla V-N-S invertida.",
        leftBtn: { label: "✍️ SÍ Lleva Tilde", key: "si" },
        rightBtn: { label: "❌ NO Lleva Tilde", key: "no" },
        items: [
          { word: "Árbol", type: "si" },
          { word: "Examen", type: "no" },
          { word: "Lápiz", type: "si" },
          { word: "Ventana", type: "no" },
          { word: "Césped", type: "si" },
          { word: "Joven", type: "no" },
          { word: "Difícil", type: "si" },
          { word: "Lunes", type: "no" },
          { word: "Líder", type: "si" },
          { word: "Origen", type: "no" },
          { word: "Fósil", type: "si" },
          { word: "Libreta", type: "no" },
          { word: "Cráter", type: "si" },
          { word: "Tijeras", type: "no" },
          { word: "Azúcar", type: "si" },
          { word: "Volumen", type: "no" },
          { word: "Ámbar", type: "si" },
          { word: "Camino", type: "no" },
          { word: "Tórax", type: "si" },
          { word: "Pelota", type: "no" }
        ]
      },
      {
        id: "distancias",
        title: "🕹️ Radar de Distancias",
        description: "Clasifica los demostrativos rápidamente entre Cercanía (este...) o Lejanía (aquel...).",
        leftBtn: { label: "📍 Cercanía", key: "cerca" },
        rightBtn: { label: "🏔️ Lejanía", key: "lejos" },
        items: [
          { word: "Este", type: "cerca" },
          { word: "Aquel", type: "lejos" },
          { word: "Esta", type: "cerca" },
          { word: "Aquella", type: "lejos" },
          { word: "Estos", type: "cerca" },
          { word: "Aquellos", type: "lejos" },
          { word: "Estas", type: "cerca" },
          { word: "Aquellas", type: "lejos" },
          { word: "Esto", type: "cerca" },
          { word: "Aquello", type: "lejos" }
        ]
      }
    ]
  },

  // ===========================================================================
  // EXPLORADOR / LABORATORIO INTERACTIVO (4 PESTAÑAS TÁCTILES CON DATOS CURIOSOS)
  // ===========================================================================
  lab: {
    tabs: [
      {
        id: "prefijos",
        title: "🧪 El Laboratorio de Prefijos",
        icon: "🔬",
        description: "Experimenta combinando prefijos con palabras raíz para ver cómo cambia su significado en directo.",
        items: [
          {
            prefix: "des-",
            meaning: "Oposición, acción contraria o privación",
            examples: [
              { root: "peinado", result: "despeinado", desc: "Que no está peinado o está revuelto." },
              { root: "hacer", result: "deshacer", desc: "Desarmar lo que estaba hecho." },
              { root: "montar", result: "desmontar", desc: "Separar las piezas de algo." },
              { root: "confianza", result: "desconfianza", desc: "Falta de confianza o recelo." }
            ],
            tip: "¡Ojo al dato! Si quitas des- y queda una palabra que no existe (como en des-eo o del-gado), ¡no es prefijo!"
          },
          {
            prefix: "in- / im- / i-",
            meaning: "Negación o valor contrario",
            examples: [
              { root: "capaz", result: "incapaz", desc: "Que no tiene capacidad." },
              { root: "posible", result: "imposible", desc: "Que no puede suceder (con 'm' antes de 'p')." },
              { root: "borrable", result: "imborrable", desc: "Que no se puede borrar (con 'm' antes de 'b')." },
              { root: "legal", result: "ilegal", desc: "Que es contrario a la ley (con 'i-' antes de 'l')." },
              { root: "responsable", result: "irresponsable", desc: "Que no es responsable (con 'i-' duplicando la 'r')." }
            ],
            tip: "¡Regla ortográfica de oro! Ante 'p' y 'b' se transforma obligatoriamente en «im-»."
          },
          {
            prefix: "sub-",
            meaning: "Debajo de o categoría inmediatamente inferior",
            examples: [
              { root: "suelo", result: "subsuelo", desc: "Capa de terreno debajo del suelo." },
              { root: "marino", result: "submarino", desc: "Que navega o se encuentra bajo el agua del mar." },
              { root: "campeón", result: "subcampeón", desc: "Clasificado en segundo lugar, justo debajo del campeón." },
              { root: "director", result: "subdirector", desc: "Persona que está inmediatamente bajo el director." }
            ],
            tip: "¡Dato curioso! La palabra 'submarino' funciona a la vez como adjetivo (un volcán submarino) y como sustantivo (un submarino de exploración)."
          },
          {
            prefix: "re-",
            meaning: "Repetición (volver a hacer) o intensidad",
            examples: [
              { root: "cargar", result: "recargar", desc: "Volver a cargar la energía o batería." },
              { root: "organizar", result: "reorganizar", desc: "Organizar de nuevo de forma distinta." },
              { root: "leer", result: "releer", desc: "Leer por segunda o más veces." },
              { root: "llenar", result: "rellenar", desc: "Llenar por completo un espacio vacío." }
            ],
            tip: "¡Cuidado con la trampa! En 'reloj', 'regalo' o 'recuerdo', 're' no es prefijo porque es parte de su raíz original."
          },
          {
            prefix: "pre-",
            meaning: "Anterioridad (antes de)",
            examples: [
              { root: "historia", result: "prehistoria", desc: "Periodo anterior a la historia escrita." },
              { root: "estreno", result: "preestreno", desc: "Pase de una obra o película antes del estreno oficial." },
              { root: "calentar", result: "precalentar", desc: "Calentar el horno antes de meter la comida." },
              { root: "cocinado", result: "precocinado", desc: "Alimento cocinado previamente antes de venderlo." }
            ],
            tip: "¡Ojo al dato! 'Premio' y 'precio' NO tienen prefijo pre-."
          }
        ]
      },
      {
        id: "llanas",
        title: "⚖️ La Báscula de las Palabras Llanas",
        icon: "📐",
        description: "Comprueba cómo funciona la regla V-N-S invertida con sílabas tónicas interactivas.",
        rules: [
          {
            title: "Sílaba Tónica: La Penúltima",
            desc: "Las palabras llanas tienen el golpe fuerte de voz en la penúltima sílaba: ven-TA-na, LÁ-piz, ár-bol.",
            accentRule: "Llevan tilde cuando terminan en consonante DISTINTA de -n o -s."
          },
          {
            title: "Terminan en -l, -r, -d, -z, -x, -m → ¡SÍ LLEVAN TILDE!",
            examples: [
              { word: "ár-bol", ending: "-l", reason: "Termina en consonante l (distinta de n o s)" },
              { word: "lá-piz", ending: "-z", reason: "Termina en consonante z" },
              { word: "cés-ped", ending: "-d", reason: "Termina en consonante d" },
              { word: "lí-der", ending: "-r", reason: "Termina en consonante r" },
              { word: "tó-rax", ending: "-x", reason: "Termina en consonante x" },
              { word: "ál-bum", ending: "-m", reason: "Termina en consonante m" }
            ]
          },
          {
            title: "Terminan en Vocal, -n o -s → ¡NO LLEVAN TILDE!",
            examples: [
              { word: "me-sa", ending: "vocal a", reason: "Termina en vocal" },
              { word: "li-bro", ending: "vocal o", reason: "Termina en vocal" },
              { word: "lu-nes", ending: "consonante s", reason: "Termina en consonante s" },
              { word: "ti-je-ras", ending: "consonante s", reason: "Termina en consonante s" },
              { word: "can-tan", ending: "consonante n", reason: "Termina en consonante n" }
            ]
          },
          {
            title: "⚠️ ¡LA GRAN PREGUNTA TRAMPA DE EXAMEN!",
            desc: "Las palabras «examen», «origen», «joven» y «volumen» son llanas terminadas en -n. Por tanto: ¡NUNCA LLEVAN TILDE EN SINGULAR! Solo la llevan en plural al convertirse en esdrújulas: ex-á-me-nes, o-rí-ge-nes, jó-ve-nes.",
            highlight: true
          }
        ]
      },
      {
        id: "demostrativos",
        title: "🧭 El Radar de los Demostrativos",
        icon: "📍",
        description: "Explora las tres distancias espaciales y temporales con la tabla interactiva de concordancia.",
        distances: [
          {
            zone: "Cercanía 📍",
            where: "Al lado de quien habla (aquí)",
            forms: {
              mascSing: "este",
              femSing: "esta",
              mascPlur: "estos",
              femPlur: "estas",
              neutro: "esto"
            },
            example: "Este estuche que tengo en la mano es nuevo."
          },
          {
            zone: "Distancia Media 🚶",
            where: "Cerca de quien escucha o no muy lejos (ahí)",
            forms: {
              mascSing: "ese",
              femSing: "esa",
              mascPlur: "esos",
              femPlur: "esas",
              neutro: "eso"
            },
            example: "Pásame esa libreta que está sobre tu mesa."
          },
          {
            zone: "Lejanía 🏔️",
            where: "Lejos tanto de quien habla como de quien escucha (allí)",
            forms: {
              mascSing: "aquel",
              femSing: "aquella",
              mascPlur: "aquellos",
              femPlur: "aquellas",
              neutro: "aquello"
            },
            example: "Mira aquel águila volando sobre la montaña lejana."
          }
        ]
      },
      {
        id: "publicidad",
        title: "📢 Taller del Anuncio Publicitario",
        icon: "🎨",
        description: "Conoce las 5 partes mágicas de cualquier anuncio y monta tu propio producto de éxito.",
        parts: [
          {
            name: "1. Titular o Nombre del Producto",
            desc: "Llamativo, grande y creativo para captar la atención de inmediato.",
            example: "«SUPER-LUPA BOTÁNICA 3000»"
          },
          {
            name: "2. Ilustración o Imagen Atractiva",
            desc: "Muestra el objeto en acción, con colores vivos y detalles visuales.",
            example: "Dibujo de la lupa enfocando una flor con destellos dorados."
          },
          {
            name: "3. Características y Ventajas",
            desc: "Explica para qué sirve, materiales de calidad y por qué es mejor que los demás.",
            example: "Aumento de 20x, luz LED solar incorporada y carcasa de bambú indestructible."
          },
          {
            name: "4. Eslogan Pegadizo",
            desc: "Frase breve, con ritmo y fácil de recordar que resume la promesa del producto.",
            example: "«¡Mira lo pequeño, descubre lo inmenso!»"
          },
          {
            name: "5. Dónde Conseguirlo / Contacto",
            desc: "Precio, tienda colaboradora o web.",
            example: "De venta en la papelería del colegio por solo 4 bellotas."
          }
        ]
      }
    ]
  },

  // ===========================================================================
  // ESQUEMAS VISUALES DE REPASO (PARA LEER ANTES DE ENTRAR AL EXAMEN)
  // ===========================================================================
  summaryCards: [
    {
      title: "1. Los Prefijos Principales de 4.º",
      color: "border-amber-400 bg-amber-50 text-amber-900",
      content: [
        "**des-**: acción contraria o negación (*despeinado, deshacer*).",
        "**in- / im- / i-**: negación (*incapaz; im- ante p/b: imposible, imborrable; i- ante l/r: ilegal, irresponsable*).",
        "**sub-**: debajo de o inferior (*submarino, subsuelo, subcampeón*).",
        "**re-**: repetición o intensidad (*reorganizar, releer, recargar*).",
        "**pre-**: antes de (*preestreno, prehistoria, precalentar*).",
        "**¡Alerta Trampa!**: En *delgado, deseo, premio, reloj, regalo*, no hay prefijo porque son palabras raíz."
      ]
    },
    {
      title: "2. Regla de Acentuación de Palabras Llanas",
      color: "border-orange-400 bg-orange-50 text-orange-900",
      content: [
        "**Sílaba tónica**: La PENÚLTIMA sílaba (*ár-bol, ven-ta-na*).",
        "**Llevan tilde**: Cuando terminan en consonante DISTINTA de -n o -s (*árbol, lápiz, césped, líder, difícil, tórax*).",
        "**NO llevan tilde**: Si terminan en vocal (*mesa*), en -n (*cantan*) o en -s (*tijeras*).",
        "**¡Pregunta Estrella!**: *Examen, origen, joven, volumen* NO llevan tilde porque terminan en consonante -n."
      ]
    },
    {
      title: "3. Tabla Completa de los Demostrativos",
      color: "border-indigo-400 bg-indigo-50 text-indigo-900",
      content: [
        "**Cercanía**: este, esta, estos, estas (neutro: *esto*).",
        "**Distancia media**: ese, esa, esos, esas (neutro: *eso*).",
        "**Lejanía**: aquel, aquella, aquellos, aquellas (neutro: *aquello*).",
        "**Concordancia**: Concuerdan siempre en género y número con el sustantivo al que acompañan."
      ]
    },
    {
      title: "4. Obras Narrativas y el Anuncio Publicitario",
      color: "border-rose-400 bg-rose-50 text-rose-900",
      content: [
        "**Obras narrativas**: Relatos con narrador, personajes, marco (tiempo y espacio) y argumento (planteamiento, nudo, desenlace).",
        "**4 clases**: Cuento (breve y ficticio), Novela (larga y en capítulos), Fábula (animales con moraleja), Leyenda (hechos reales con magia).",
        "**El Anuncio Publicitario**: Titular llamativo + Imagen atrayente + Características del producto + Eslogan pegadizo + Dónde conseguirlo."
      ]
    }
  ]
};
