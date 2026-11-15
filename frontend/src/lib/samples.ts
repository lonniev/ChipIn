/**
 * Chores a family can start from. Each one says where, when, and what "done"
 * looks like, because a child cannot do "sweep" without knowing which floor.
 * Together they show the kinds of chore there are: a daily habit, a weekly
 * job, a big one-off, something for the mind, and a kindness.
 */

import type { GradeRow } from "./rubric";

export interface SampleChore {
  /** One of CHORE_PICTURES. */
  picture: string;
  title: string;
  /** Where, when, and how to finish. */
  description: string;
  /** 0 once, 1 every day, 7 every week. */
  everyDays: 0 | 1 | 7;
  rows: GradeRow[];
  /** The kind of chore this one shows. */
  kind: string;
  /** What a child learns from a chore of this kind. */
  teaches: string;
}

const none: GradeRow = { name: "Not done", sats: "0", criteria: "" };

export const SAMPLE_CHORES: ReadonlyArray<SampleChore> = [
  {
    picture: "🧹",
    title: "Sweep the kitchen floor",
    description:
      "Every evening, after supper is cleared.\nSweep under the table and along the cupboards.\nTip the dustpan into the bin and hang the broom back on its hook.",
    everyDays: 1,
    rows: [
      { name: "Spotless", sats: "300", criteria: "No crumbs under the table or by the cupboards" },
      { name: "Swept", sats: "150", criteria: "Swept, with a few spots missed" },
      none,
    ],
    kind: "A daily habit",
    teaches: "Small work done every day adds up.",
  },
  {
    picture: "🛏️",
    title: "Make your bed before school",
    description:
      "Every school morning, before breakfast.\nPull the sheet and blanket flat, and put the pillow at the top.\nPyjamas go under the pillow.",
    everyDays: 1,
    rows: [
      { name: "Made", sats: "100", criteria: "Flat, pillow at the top, nothing on the floor" },
      none,
    ],
    kind: "A daily habit",
    teaches: "Start the day by finishing something.",
  },
  {
    picture: "🗑️",
    title: "Take the bins to the kerb",
    description:
      "Thursday evening, before dark.\nWheel both bins from the side of the house to the end of the drive, lids shut.\nBring them back on Friday after school.",
    everyDays: 7,
    rows: [
      { name: "Out and back", sats: "500", criteria: "Out on Thursday, back on Friday" },
      { name: "Out only", sats: "250", criteria: "Out on time, but someone else brought them back" },
      none,
    ],
    kind: "A weekly job",
    teaches: "Others count on you to remember.",
  },
  {
    picture: "🐕",
    title: "Walk Rex round the block",
    description:
      "After school, before supper.\nTwenty minutes, on the lead, round the block.\nTake a bag, and fill his water bowl when you are back.",
    everyDays: 1,
    rows: [
      { name: "Great walk", sats: "400", criteria: "Twenty minutes, bag used, water bowl filled" },
      { name: "Short walk", sats: "200", criteria: "Out and back in under ten minutes" },
      none,
    ],
    kind: "Caring for another",
    teaches: "Someone depends on your work.",
  },
  {
    picture: "🌱",
    title: "Weed the front flower bed",
    description:
      "This Saturday morning, before lunch.\nThe bed by the front steps, from the path to the fence.\nPull each weed out by the root, and put them in the green bin.",
    everyDays: 0,
    rows: [
      { name: "Great job", sats: "2000", criteria: "No weeds left, roots and all, and the path swept" },
      { name: "Good enough", sats: "1000", criteria: "Most weeds gone" },
      none,
    ],
    kind: "A big one-off job",
    teaches: "Harder work earns more.",
  },
  {
    picture: "📚",
    title: "Read a chapter and tell us about it",
    description:
      "Any evening this week, before bed.\nRead one whole chapter of your book.\nAt supper the next day, tell the family what happened in it.",
    everyDays: 7,
    rows: [
      { name: "Read and told", sats: "600", criteria: "The whole chapter, and you told us the story" },
      { name: "Read", sats: "300", criteria: "Read it, but could not say much about it" },
      none,
    ],
    kind: "Work for the mind",
    teaches: "Learning is work too, and it is worth being paid for.",
  },
  {
    picture: "🍂",
    title: "Rake the leaves for Mrs. Miller next door",
    description:
      "Saturday afternoon, with her say-so first.\nRake her front lawn into one pile by the kerb.\nPut the rake back in our shed.",
    everyDays: 0,
    rows: [
      { name: "Lawn cleared", sats: "1500", criteria: "The whole front lawn, in one pile" },
      { name: "Half done", sats: "700", criteria: "Part of the lawn" },
      none,
    ],
    kind: "A kindness",
    teaches: "Work is a way to serve a neighbour.",
  },
];
