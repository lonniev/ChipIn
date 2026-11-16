/**
 * Les petits boulots d'exemple, en français. Chacun dit où, quand, et à quoi on voit que c'est fait,
 * une phrase par ligne (les lignes sont séparées par \n).
 * Les notes gardent le même ordre que dans `content/en/samples.ts`.
 */

import type { SamplesText } from "../../lib/samples.ts";

export const samples: SamplesText = {
  "sweep-kitchen": {
    kind: "Une habitude de chaque jour",
    title: "Balayer le sol de la cuisine",
    description: "Chaque soir, après le repas, une fois la table débarrassée.\nBalaie sous la table et le long des armoires.\nVide la pelle dans la poubelle et raccroche le balai à son crochet.",
    grades: [
      {
        name: "Impeccable",
        criteria: "Aucune miette sous la table ni près des armoires"
      },
      {
        name: "Balayé",
        criteria: "Balayé, avec quelques endroits oubliés"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Un petit travail fait chaque jour finit par compter."
  },
  "make-bed": {
    kind: "Une habitude de chaque jour",
    title: "Faire ton lit avant l'école",
    description: "Chaque matin d'école, avant le petit-déjeuner.\nTire bien à plat le drap et la couverture, et pose l'oreiller en haut du lit.\nLe pyjama se range sous l'oreiller.",
    grades: [
      {
        name: "Fait",
        criteria: "Bien à plat, l'oreiller en haut, rien par terre"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Commence la journée en terminant quelque chose."
  },
  "trash-cans": {
    kind: "Un petit boulot de chaque semaine",
    title: "Sortir les poubelles au bord de la rue",
    description: "Jeudi soir, avant la nuit.\nRoule les deux poubelles du côté de la maison jusqu'au bout de l'allée, couvercles fermés.\nRentre-les vendredi après l'école.",
    grades: [
      {
        name: "Sorties et rentrées",
        criteria: "Sorties jeudi, rentrées vendredi"
      },
      {
        name: "Sorties seulement",
        criteria: "Sorties à temps, mais quelqu'un d'autre les a rentrées"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Les autres comptent sur toi pour y penser."
  },
  "walk-dog": {
    kind: "Prendre soin d'un autre",
    title: "Promener Rex autour du pâté de maisons",
    description: "Après l'école, avant le repas du soir.\nVingt minutes, en laisse, autour du pâté de maisons.\nPrends un sac, et remplis son bol d'eau au retour.",
    grades: [
      {
        name: "Belle promenade",
        criteria: "Vingt minutes, sac utilisé, bol d'eau rempli"
      },
      {
        name: "Petite promenade",
        criteria: "Sorti et rentré en moins de dix minutes"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Quelqu'un dépend de ton travail."
  },
  "weed-bed": {
    kind: "Un gros boulot, une seule fois",
    title: "Désherber le massif de fleurs devant la maison",
    description: "Ce samedi matin, avant le repas de midi.\nLe massif près des marches de l'entrée, de l'allée jusqu'à la clôture.\nArrache chaque mauvaise herbe avec sa racine, et mets-les dans le bac des déchets de jardin.",
    grades: [
      {
        name: "Excellent travail",
        criteria: "Plus aucune mauvaise herbe, racines comprises, et l'allée balayée"
      },
      {
        name: "Assez bien",
        criteria: "La plupart des mauvaises herbes enlevées"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Un travail plus difficile rapporte plus."
  },
  "read-chapter": {
    kind: "Un travail pour l'esprit",
    title: "Lire un chapitre et nous le raconter",
    description: "Un soir de cette semaine, avant le coucher.\nLis un chapitre entier de ton livre.\nLe lendemain, au repas du soir, raconte à la famille ce qui s'y passe.",
    grades: [
      {
        name: "Lu et raconté",
        criteria: "Le chapitre entier, et tu nous as raconté l'histoire"
      },
      {
        name: "Lu",
        criteria: "Lu, mais tu n'as pas su en dire grand-chose"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Apprendre est aussi un travail, et il mérite d'être payé."
  },
  "rake-leaves": {
    kind: "Un geste de bonté",
    title: "Ratisser les feuilles chez Mme Miller, la voisine",
    description: "Samedi après-midi, après lui avoir demandé son accord.\nRatisse sa pelouse de devant en un seul tas au bord de la rue.\nRange le râteau dans notre remise.",
    grades: [
      {
        name: "Pelouse dégagée",
        criteria: "Toute la pelouse de devant, en un seul tas"
      },
      {
        name: "À moitié fait",
        criteria: "Une partie de la pelouse"
      },
      {
        name: "Pas fait",
        criteria: ""
      }
    ],
    teaches: "Le travail est une façon de servir son voisin."
  }
};
