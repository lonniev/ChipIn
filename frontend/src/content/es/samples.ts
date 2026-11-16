/**
 * Los quehaceres de muestra, en español. Cada uno dice dónde, cuándo y cómo se ve cuando está "hecho",
 * una oración por línea (las líneas se separan con \n).
 * Cada quehacer mantiene sus calificaciones en el mismo orden: los sats de cada una están en `src/lib/samples.ts`.
 */

import type { SamplesText } from "../../lib/samples.ts";

export const samples: SamplesText = {
  "sweep-kitchen": {
    kind: "Un hábito de cada día",
    title: "Barre el piso de la cocina",
    description: "Cada noche, después de levantar la mesa de la cena.\nBarre debajo de la mesa y a lo largo de los gabinetes.\nVacía el recogedor en la basura y cuelga la escoba en su gancho.",
    grades: [
      {
        name: "Impecable",
        criteria: "Ni una migaja debajo de la mesa ni junto a los gabinetes"
      },
      {
        name: "Barrido",
        criteria: "Barrido, con algunos lugares sin limpiar"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "El trabajo pequeño de cada día se va sumando."
  },
  "make-bed": {
    kind: "Un hábito de cada día",
    title: "Tiende tu cama antes de ir a la escuela",
    description: "Cada mañana de escuela, antes del desayuno.\nEstira bien la sábana y la cobija, y pon la almohada en la cabecera.\nLa pijama va debajo de la almohada.",
    grades: [
      {
        name: "Tendida",
        criteria: "Bien estirada, la almohada en la cabecera, nada en el piso"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "Empieza el día terminando algo."
  },
  "trash-cans": {
    kind: "Un trabajo de cada semana",
    title: "Saca los botes de basura a la calle",
    description: "El jueves por la tarde, antes de que oscurezca.\nLleva los dos botes desde el costado de la casa hasta el final de la entrada, con las tapas cerradas.\nTráelos de regreso el viernes después de la escuela.",
    grades: [
      {
        name: "Ida y vuelta",
        criteria: "Afuera el jueves, de regreso el viernes"
      },
      {
        name: "Solo la ida",
        criteria: "Afuera a tiempo, y alguien más los trajo de regreso"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "Los demás cuentan con que te acuerdes."
  },
  "walk-dog": {
    kind: "Cuidar a otro",
    title: "Saca a pasear a Rex alrededor de la cuadra",
    description: "Después de la escuela, antes de la cena.\nVeinte minutos, con la correa, alrededor de la cuadra.\nLleva una bolsa, y llena su plato de agua cuando regreses.",
    grades: [
      {
        name: "Gran paseo",
        criteria: "Veinte minutos, bolsa usada, plato de agua lleno"
      },
      {
        name: "Paseo corto",
        criteria: "Ida y vuelta en menos de diez minutos"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "Alguien depende de tu trabajo."
  },
  "weed-bed": {
    kind: "Un trabajo grande de una sola vez",
    title: "Quita la hierba mala del jardín de enfrente",
    description: "Este sábado por la mañana, antes de la comida.\nEl cantero junto a los escalones de la entrada, desde el caminito hasta la cerca.\nArranca cada hierba de raíz y échalas en el bote de desechos del jardín.",
    grades: [
      {
        name: "Excelente trabajo",
        criteria: "Ni una hierba mala, con todo y raíz, y el caminito barrido"
      },
      {
        name: "Bastante bien",
        criteria: "Casi toda la hierba mala quitada"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "El trabajo más difícil gana más."
  },
  "read-chapter": {
    kind: "Trabajo para la mente",
    title: "Lee un capítulo y cuéntanos de qué trata",
    description: "Cualquier noche de esta semana, antes de dormir.\nLee un capítulo completo de tu libro.\nAl día siguiente, en la cena, cuéntale a la familia lo que pasó.",
    grades: [
      {
        name: "Leído y contado",
        criteria: "El capítulo completo, y nos contaste la historia"
      },
      {
        name: "Leído",
        criteria: "Lo leíste, y pudiste contar poco de él"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "Aprender también es trabajo, y merece su paga."
  },
  "rake-leaves": {
    kind: "Un acto de bondad",
    title: "Junta las hojas de la Sra. Miller, la vecina",
    description: "El sábado por la tarde, pidiéndole permiso primero.\nJunta con el rastrillo las hojas de su jardín de enfrente en un solo montón junto a la calle.\nGuarda el rastrillo en nuestro cobertizo.",
    grades: [
      {
        name: "Jardín limpio",
        criteria: "Todo el jardín de enfrente, en un solo montón"
      },
      {
        name: "A medias",
        criteria: "Una parte del jardín"
      },
      {
        name: "Sin hacer",
        criteria: ""
      }
    ],
    teaches: "El trabajo es una manera de servir al vecino."
  }
};
