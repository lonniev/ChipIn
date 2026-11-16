/**
 * Las lecciones, en español: lo que ChipIn le enseña a quien empieza con Bitcoin.
 * Una oración por línea. Una lección lleva un solo dicho, nunca más.
 * Las claves, el orden de las listas y cuántos elementos tiene cada lista son los del inglés.
 */

import type { LessonsText } from "../../lib/lessons.ts";

export const lessons: LessonsText = {
  lessons: {
    "what-is-a-sat": {
      title: "¿Qué es un sat?",
      lines: [
        "Un sat es el pedacito más pequeño de un bitcoin.",
        "Un bitcoin son 100,000,000 de sats, así como un dólar son 100 centavos.",
        "Los sats que ganas aquí son bitcoin de verdad."
      ],
      more: [
        "Bitcoin empezó en 2009, creado por alguien que firmaba como Satoshi Nakamoto.",
        "El pedacito más pequeño se llama satoshi en su honor, y la gente le dice sat para abreviar.",
        "Un bitcoin entero es mucho más de lo que gana casi cualquier trabajo, por eso los pagos se cuentan en sats.",
        "Mil sats son 0.00001 bitcoin.",
        "Un sat no se puede partir en algo más chico, y tampoco se puede copiar.",
        "Cuando te pagan 500 sats, tienes 500 de los sats que existen, y nadie más tiene esos."
      ],
      tryThis: "Busca el premio más grande de tu lista de trabajos y calcula qué parte de un bitcoin es.",
      ask: "¿Por qué puede ser útil tener un dinero que se cuenta en pedacitos muy pequeños?"
    },
    "where-sats-live": {
      title: "¿Dónde viven los sats?",
      lines: [
        "Tus sats viven en una billetera, una app en un teléfono.",
        "La billetera guarda una llave secreta, y esa llave es lo que hace que los sats sean tuyos.",
        "Cuida bien la llave, y nadie te los puede quitar."
      ],
      more: [
        "Una billetera de bitcoin funciona distinto que un monedero con monedas adentro.",
        "Guarda una llave, que es un número secreto muy largo.",
        "Quien conoce la llave puede gastar los sats, así que la llave es lo que hay que cuidar.",
        "Casi todas las billeteras te dan doce o veinticuatro palabras para escribir en papel, y esas palabras son la llave.",
        "Guarda ese papel donde la familia guarda las cosas importantes.",
        "Nunca escribas esas palabras en un sitio web, y nunca les tomes foto.",
        "La Guía enseña cómo elegir una billetera y prepararle una a un niño."
      ],
      tryThis: "Con mamá o papá, busca dónde muestra tu billetera sus palabras de respaldo, y decidan juntos dónde van a guardar el papel.",
      ask: "¿Qué diferencia hay entre que alguien te guarde tu dinero y que lo guardes tú mismo?"
    },
    "how-sats-move": {
      title: "¿Cómo se mueven los sats?",
      lines: [
        "Los sats viajan por Lightning, un camino rápido construido sobre Bitcoin.",
        "Tu billetera escribe una solicitud por los sats que ganaste.",
        "La billetera de mamá o papá la paga, y los sats llegan en uno o dos segundos.",
        "Van directo de una billetera a la otra."
      ],
      more: [
        "Bitcoin anota cada pago en un registro que comparte el mundo entero.",
        "Ese registro es muy seguro y un poco lento, así que los pagos pequeños usan Lightning.",
        "En Lightning, tu billetera escribe una factura: una solicitud por un número exacto de sats.",
        "La billetera de quien paga lee la factura y envía exactamente eso.",
        "El pago tarda uno o dos segundos y cuesta casi nada.",
        "Nadie en medio guarda tus sats por el camino."
      ],
      tryThis: "Cuando te deban un trabajo, abre tu billetera, toca Recibir y haz la solicitud tú mismo.",
      ask: "¿Por qué quien recibe el pago escribe la solicitud, y quien paga solo la aprueba?"
    },
    "why-nobody-can-make-more": {
      title: "¿Por qué nadie puede hacer más?",
      lines: [
        "Nunca habrá más de 21,000,000 de bitcoin.",
        "Nadie puede imprimir de más, como cada año se imprimen más dólares.",
        "El dinero que sigue siendo escaso conserva su valor mientras lo ahorras."
      ],
      more: [
        "Los dólares, los pesos y los euros los hacen los bancos centrales, y cada año hacen más.",
        "Cuando hay más dinero buscando el mismo pan, el pan cuesta más.",
        "Por eso un abuelo se acuerda de cuando un pan costaba unos centavos.",
        "Las reglas de Bitcoin permiten 21,000,000 de monedas y ni una más.",
        "Las monedas nuevas llegan con un calendario que se reduce a la mitad cada cuatro años más o menos, hasta que ya no quede ninguna por emitir.",
        "Ninguna persona, empresa ni gobierno puede cambiar eso por decisión propia.",
        "A un dinero así se le llama dinero sólido: mide lo mismo mañana que hoy."
      ],
      saying: {
        text: "La balanza falsa es abominación para el SEÑOR, y la pesa justa es su deleite.",
        from: "Proverbios 11:1"
      },
      tryThis: "Pregúntale a un abuelo cuánto costaba un pan o un litro de gasolina cuando tenía tu edad.",
      ask: "Si pudieras imprimir tu propio dinero para gastar, ¿qué pasaría con el precio de los dulces en casa?"
    },
    "earn-it": {
      title: "Gánatelo",
      lines: [
        "El dinero es un gracias por ayudar a alguien.",
        "Barriste el piso, y ahora la familia tiene una cocina limpia.",
        "Los sats dicen que tu trabajo valió algo para ellos."
      ],
      more: [
        "A nadie le pagan por querer dinero.",
        "A la gente le pagan cuando hace algo que otra persona valora.",
        "Al panadero le pagan porque tú prefieres tener el pan que las monedas.",
        "Los dos salen ganando, y eso es un trato justo.",
        "Un trabajo en casa es ese mismo trato en pequeño.",
        "Mientras mejor sirves, más vale tu trabajo."
      ],
      saying: {
        text: "En todo trabajo hay provecho, y el hablar de los labios solo lleva a la pobreza.",
        from: "Proverbios 14:23"
      },
      tryThis: "Elige un trabajo y hazlo un poco mejor de lo que pide la calificación.",
      ask: "¿A quién le ayudó el último trabajo que hiciste?"
    },
    "save-some": {
      title: "Ahorra una parte",
      lines: [
        "Los sats que guardas hoy pueden comprar algo mejor después.",
        "Esperar cuesta trabajo, y así es como la gente llega a tener mucho.",
        "Prueba guardar la mitad de lo que ganas."
      ],
      more: [
        "Puedes gastar hoy lo que ganas, o guardarlo para después.",
        "Guardarlo se llama ahorrar, y es escoger un bien más grande después en lugar de uno pequeño ahora.",
        "Cada herramienta, tienda y granja que existe la construyó alguien que primero ahorró.",
        "Los ahorros también mantienen firme a una familia cuando algo se rompe o falta el trabajo.",
        "Ahorrar funciona mejor con un dinero que conserva su valor mientras espera.",
        "Empieza con poco, y hazlo cada vez que te paguen."
      ],
      saying: {
        text: "Quien reúne con su trabajo verá crecer lo que tiene.",
        from: "Proverbios 13:11"
      },
      tryThis: "Elige algo por lo que valga la pena esperar, y cuenta cuántos trabajos te va a tomar.",
      ask: "¿Qué tiene nuestra familia gracias a que alguien ahorró para eso?"
    },
    "keep-your-word": {
      title: "Cumple tu palabra",
      lines: [
        "Tocar “¡Yo lo hago!” es una promesa.",
        "La gente confía en quien termina lo que aceptó hacer.",
        "La confianza vale más que cualquier premio."
      ],
      more: [
        "El comercio funciona con promesas.",
        "Un tendero promete que su báscula es honesta, y un albañil promete que la pared va a aguantar.",
        "Cuando tomas un trabajo, alguien deja de preocuparse por él porque tú dijiste que lo harías.",
        "Si no vas a poder terminarlo, dilo pronto y devuélvelo.",
        "A quien tiene fama de cumplir su palabra le ofrecen el mejor trabajo.",
        "Ese buen nombre tarda años en ganarse y un día en perderse."
      ],
      saying: {
        text: "El que es fiel en lo más pequeño también es fiel en lo mucho.",
        from: "Lucas 16:10"
      },
      tryThis: "Si tomaste un trabajo que no vas a poder terminar, devuélvelo hoy y di por qué.",
      ask: "¿En quién confías más para que haga lo que dice, y por qué?"
    },
    "give-some": {
      title: "Da una parte",
      lines: [
        "Lo que ganaste es tuyo para compartir.",
        "Un regalo te cuesta algo, y eso es lo que lo hace un regalo.",
        "Aparta un poco para alguien que lo necesite."
      ],
      more: [
        "Solo puedes regalar lo que es tuyo.",
        "Por eso ganar va primero: te da con qué dar.",
        "Desde hace mucho, las familias de fe apartan la décima parte antes de gastar cualquier cosa.",
        "Un regalo dado en silencio ayuda a quien lo recibe y forma a quien lo da.",
        "Dar tu tiempo también cuenta: un trabajo hecho para un vecino, sin pedir premio.",
        "Decide tu parte antes de que lleguen los sats, y dar se vuelve costumbre."
      ],
      saying: {
        text: "Mayor bendición es dar que recibir.",
        from: "Hechos 20:35"
      },
      tryThis: "Elige qué parte de tu próximo premio vas a dar, y para quién es.",
      ask: "¿A quién cerca de nosotros le vendría bien una ayuda esta semana?"
    },
    "what-to-save-for": {
      title: "¿Por qué ahorrar, y para qué?",
      lines: [
        "Ahorrar convierte muchos premios pequeños en una cosa grande.",
        "Una meta le da una razón a cada trabajo.",
        "Elige algo que valga la espera."
      ],
      more: [
        "Ahorra primero para algo que puedas alcanzar en unas semanas, y así aprendes que funciona.",
        "Una buena herramienta es una gran primera meta: una navaja de bolsillo, una caña de pescar, un juego de lápices.",
        "Después, ahorra para algo que gane dinero: semillas, unas gallinas ponedoras, una podadora para cortar pasto.",
        "A las cosas que ganan dinero se les llama capital, y con ellas los ahorros crecen trabajando.",
        "Guarda algo para los días difíciles, porque las cosas se rompen cuando menos lo esperas.",
        "Algunas familias ahorran para el futuro lejano: una primera camioneta, una escuela de oficios, un pedazo de tierra.",
        "Los sats guardados durante años pueden valer más o menos en dólares cuando los gastes."
      ],
      saying: {
        text: "Tesoro deseable y aceite hay en la casa del sabio, y el hombre necio todo lo gasta.",
        from: "Proverbios 21:20"
      },
      tryThis: "Escribe una meta para este mes y otra para este año, y cuánto cuesta cada una en sats.",
      ask: "¿Para qué ahorrabas tú cuando tenías mi edad?"
    },
    "where-else-to-earn": {
      title: "¿Dónde más puedo ganar sats?",
      lines: [
        "Los trabajos de la casa son una manera.",
        "Cualquier persona con una billetera Lightning te puede pagar.",
        "La manera más segura es hacer o fabricar algo que la gente quiera."
      ],
      more: [
        "Vende lo que cultivas o haces: huevos, verduras, leña, pan casero, una artesanía.",
        "Un letrero con el código de tu billetera convierte un puesto en una tienda que acepta sats.",
        "Ofrece tu trabajo a los vecinos: cortar el pasto, juntar hojas, quitar la nieve, cuidar mascotas.",
        "Pídeles a tus abuelos y padrinos que te manden el dinero de cumpleaños en sats.",
        "Algunas apps pagan pequeñas cantidades de sats por leer, escuchar o escribir.",
        "Esas cantidades son pequeñas, y cada app tiene sus propias reglas y sus propias razones para pagar.",
        "Úsalas con mamá o papá, y nunca le des a una app las palabras secretas de tu billetera."
      ],
      tryThis: "Piensa en una cosa que podrías vender o un trabajo que podrías hacerle a un vecino, y pregúntale a mamá o papá.",
      ask: "¿Qué podría hacer o cultivar nuestra familia por lo que alguien pagaría?",
      links: [
        "Una app de la Biblia que premia con sats la lectura diaria.",
        "Una app de pódcast que paga sats por escuchar.",
        "Un foro donde las buenas publicaciones ganan sats. Para niños más grandes, con mamá o papá."
      ],
      care: "ChipIn no maneja estos servicios ni recibe pago de ellos. Lee las condiciones de cada uno con mamá o papá."
    },
    "where-to-give": {
      title: "¿Dónde puedo dar?",
      lines: [
        "Da primero a la gente que puedes ver.",
        "Luego a obras en las que crees, más lejos.",
        "Los sats cruzan el mundo en un segundo, así que un regalo pequeño puede llegar muy lejos."
      ],
      more: [
        "Empieza cerca de casa: tu iglesia, un vecino necesitado, una familia que pasa por una temporada difícil.",
        "Si tu iglesia todavía no acepta sats, da en la ofrenda y ofrécete a ayudarles a prepararlo.",
        "Un regalo de tiempo cuenta: un trabajo hecho para alguien que no puede hacerlo.",
        "Más lejos, algunos grupos reciben sats directamente y dicen qué hacen con ellos.",
        "Antes de darle a alguien que no conoces, pídele a mamá o papá que revise quiénes son.",
        "Da en silencio, y no lleves la cuenta de las gracias."
      ],
      saying: {
        text: "Dios ama a quien da con alegría.",
        from: "2 Corintios 9:7"
      },
      tryThis: "Elige una persona o una causa, y aparta para ella una parte de tu próximo premio.",
      ask: "¿Quién ha sido generoso con nuestra familia, y qué significó para nosotros?",
      links: [
        "Gente que reúne sats para proyectos, muchos de ellos escuelas y comunidades.",
        "Paga a las personas que construyen el software libre de Bitcoin."
      ],
      care: "ChipIn no responde por ninguna causa de la lista. Averigua bien sobre cada una antes de dar."
    },
    "what-is-worth-buying": {
      title: "¿Qué vale la pena comprar?",
      lines: [
        "Compra cosas que duran, que enseñan o que te ayudan a trabajar.",
        "Algo que se acaba en un día rara vez vale una semana de trabajos.",
        "Antes de gastar, espera una noche."
      ],
      more: [
        "Un libro vale la pena: se puede leer otra vez y prestar a un amigo.",
        "Una herramienta vale la pena: te deja hacer un trabajo que antes no podías.",
        "Las semillas y los animales valen la pena: se convierten en comida, y a veces en más sats.",
        "La buena comida vale la pena, sobre todo la de un granjero que conoces.",
        "Un regalo para otra persona vale la pena.",
        "De cualquier cosa que quieras, pregúntate si en un año te seguirá dando gusto tenerla.",
        "Cada año más tiendas aceptan sats, y un mapa muestra las que están cerca de ti."
      ],
      tryThis: "Piensa en las últimas tres cosas que quisiste, y pregúntate de cada una si la seguirías queriendo en un año.",
      ask: "¿Qué es lo mejor que ha comprado nuestra familia, y por qué?",
      links: [
        "Libros sobre dinero, granja y familia, y café.",
        "Un mapa de tiendas y granjas cerca de ti que aceptan bitcoin."
      ],
      care: "La información puede estar desactualizada. Pregunta en la tienda antes de ir."
    },
    "the-virtues": {
      title: "Las siete virtudes",
      lines: [
        "Una virtud es un buen hábito del corazón.",
        "Los cristianos enseñan siete desde hace mucho: tres que da Dios y cuatro que cualquiera puede practicar.",
        "Los trabajos son un buen lugar para practicarlas."
      ],
      more: [
        "Las tres virtudes teologales vienen de la primera carta de San Pablo a los Corintios.",
        "A las cuatro virtudes cardinales les pusieron nombre los griegos, y las retomaron Ambrosio, Agustín y Tomás de Aquino.",
        "Cardinal viene de la palabra latina para bisagra: el resto de una vida buena gira sobre estas cuatro.",
        "Junto a estas se enseñan otras listas, y todas se parecen mucho entre sí.",
        "El fruto del Espíritu en Gálatas 5 nombra amor, gozo, paz, paciencia, amabilidad, bondad, fidelidad, mansedumbre y dominio propio.",
        "Una virtud crece como un músculo, usándola un poco cada día."
      ],
      points: [
        {
          group: "Teologal",
          name: "Fe",
          says: "Confiar en Dios y en sus promesas."
        },
        {
          group: "Teologal",
          name: "Esperanza",
          says: "Esperar el bien de Dios, y trabajar para alcanzarlo."
        },
        {
          group: "Teologal",
          name: "Caridad",
          says: "Amar a Dios y al prójimo dando de ti mismo. Pablo dice que es la mayor."
        },
        {
          group: "Cardinal",
          name: "Prudencia",
          says: "Elegir bien: pensar antes de tomar un trabajo o gastar un sat."
        },
        {
          group: "Cardinal",
          name: "Justicia",
          says: "Dar a cada quien lo que le toca: trabajo honesto por paga honesta."
        },
        {
          group: "Cardinal",
          name: "Fortaleza",
          says: "Terminar el trabajo difícil cuando preferirías parar."
        },
        {
          group: "Cardinal",
          name: "Templanza",
          says: "Dominar lo que deseas: ahorrar cuando podrías gastar."
        }
      ],
      saying: {
        text: "Y ahora permanecen la fe, la esperanza y la caridad, estas tres; y la mayor de ellas es la caridad.",
        from: "1 Corintios 13:13"
      },
      tryThis: "Elige una virtud para la semana y fíjate cada vez que un trabajo te la pida.",
      ask: "¿Cuál de las siete te sale más fácil, y cuál te cuesta más?"
    }
  },
  words: [
    {
      word: "Bitcoin",
      means: "Dinero que vive en internet y que es independiente de todo banco y de todo país."
    },
    {
      word: "Sat",
      means: "El pedacito más pequeño de un bitcoin. Es la forma corta de satoshi."
    },
    {
      word: "Billetera",
      means: "La app que guarda la llave de tus sats."
    },
    {
      word: "Lightning",
      means: "La manera rápida de enviar sats de una billetera a otra."
    },
    {
      word: "Factura",
      means: "Una solicitud de sats que escribe una billetera. Empieza con “lnbc”."
    },
    {
      word: "npub",
      means: "Tu nombre en ChipIn. Lo puedes compartir sin peligro."
    },
    {
      word: "nsec",
      means: "El secreto detrás de tu npub. Nunca lo compartas."
    },
    {
      word: "Blockchain",
      means: "El registro de todos los pagos de bitcoin, que guardan miles de computadoras a la vez."
    }
  ],
  shelves: {
    money: "Dinero y mercados",
    farm: "La granja pequeña",
    land: "Tierra, familia y propiedad"
  },
  books: {
    "the-bitcoin-standard": "La historia del dinero, y por qué importa una cantidad fija.",
    "economics-in-one-lesson": "Mira más allá de hoy, a lo que una decisión causa después.",
    "basic-economics": "Cómo encajan los precios, el trabajo y el comercio, en palabras sencillas.",
    "the-church-and-the-market": "Una defensa cristiana del comercio libre y honesto.",
    "you-can-farm": "Cómo empezar una granja como negocio familiar.",
    "the-market-gardener": "Vivir de media hectárea de huerta.",
    "the-contrary-farmer": "Unas pocas hectáreas, cultivadas por puro gusto.",
    "dirt-to-soil": "Una familia le devuelve la vida a su tierra.",
    "the-land-was-everything": "Lo que la granja familiar le dio a un pueblo.",
    "whats-wrong-with-the-world": "El hogar y la familia como la medida de las cosas.",
    "the-servile-state": "Por qué la propiedad en manos de muchos mantiene libre a la gente.",
    "small-is-beautiful": "La economía a la medida de las personas."
  }
};
