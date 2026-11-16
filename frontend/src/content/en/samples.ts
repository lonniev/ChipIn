/**
 * The sample jobs, in English. Each says where, when, and what "done" looks like,
 * one sentence to a line (lines are separated by \n).
 *
 * To translate: copy this folder, and translate the string values only.
 * Each job keeps its grades in the same order: the sats each earns are in `src/lib/samples.ts`.
 */

import type { SamplesText } from "../../lib/samples.ts";

export const samples: SamplesText = {
  "sweep-kitchen": {
    kind: "A daily habit",
    title: "Sweep the kitchen floor",
    description: "Every evening, after supper is cleared.\nSweep under the table and along the cabinets.\nEmpty the dustpan into the trash and hang the broom back on its hook.",
    grades: [
      {
        name: "Spotless",
        criteria: "No crumbs under the table or by the cabinets"
      },
      {
        name: "Swept",
        criteria: "Swept, with a few spots missed"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Small work done every day adds up."
  },
  "make-bed": {
    kind: "A daily habit",
    title: "Make your bed before school",
    description: "Every school morning, before breakfast.\nPull the sheet and blanket flat, and put the pillow at the top.\nPajamas go under the pillow.",
    grades: [
      {
        name: "Made",
        criteria: "Flat, pillow at the top, nothing on the floor"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Start the day by finishing something."
  },
  "trash-cans": {
    kind: "A weekly job",
    title: "Take the trash cans to the curb",
    description: "Thursday evening, before dark.\nWheel both cans from the side of the house to the end of the driveway, lids shut.\nBring them back on Friday after school.",
    grades: [
      {
        name: "Out and back",
        criteria: "Out on Thursday, back on Friday"
      },
      {
        name: "Out only",
        criteria: "Out on time, but someone else brought them back"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Others count on you to remember."
  },
  "walk-dog": {
    kind: "Caring for another",
    title: "Walk Rex around the block",
    description: "After school, before supper.\nTwenty minutes, on the leash, around the block.\nTake a bag, and fill his water bowl when you are back.",
    grades: [
      {
        name: "Great walk",
        criteria: "Twenty minutes, bag used, water bowl filled"
      },
      {
        name: "Short walk",
        criteria: "Out and back in under ten minutes"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Someone depends on your work."
  },
  "weed-bed": {
    kind: "A big one-off job",
    title: "Weed the front flower bed",
    description: "This Saturday morning, before lunch.\nThe bed by the front steps, from the walk to the fence.\nPull each weed out by the root, and put them in the yard waste bin.",
    grades: [
      {
        name: "Great job",
        criteria: "No weeds left, roots and all, and the walk swept"
      },
      {
        name: "Good enough",
        criteria: "Most weeds gone"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Harder work earns more."
  },
  "read-chapter": {
    kind: "Work for the mind",
    title: "Read a chapter and tell us about it",
    description: "Any evening this week, before bed.\nRead one whole chapter of your book.\nAt supper the next day, tell the family what happened in it.",
    grades: [
      {
        name: "Read and told",
        criteria: "The whole chapter, and you told us the story"
      },
      {
        name: "Read",
        criteria: "Read it, but could not say much about it"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Learning is work too, and it is worth being paid for."
  },
  "rake-leaves": {
    kind: "A kindness",
    title: "Rake the leaves for Mrs. Miller next door",
    description: "Saturday afternoon, with her say-so first.\nRake her front lawn into one pile by the curb.\nPut the rake back in our shed.",
    grades: [
      {
        name: "Lawn cleared",
        criteria: "The whole front lawn, in one pile"
      },
      {
        name: "Half done",
        criteria: "Part of the lawn"
      },
      {
        name: "Not done",
        criteria: ""
      }
    ],
    teaches: "Work is a way to serve a neighbor."
  }
};
