/**
 * Jobs a family can start from. Each one says where, when, and what "done"
 * looks like, because a child cannot do "sweep" without knowing which floor.
 * Together they show the kinds of job there are: a daily habit, a weekly
 * job, a big one-off, something for the mind, and a kindness.
 *
 * This file holds what is the same in every language: each sample's picture,
 * rhythm, and the sats each grade earns. The words are per language, in
 * `src/content/<language>/samples.ts`.
 */

import type { GradeRow } from "./rubric.ts";

interface SampleShape {
  key: string;
  /** One of JOB_PICTURES. */
  picture: string;
  /** 0 once, 1 every day, 7 every week. */
  everyDays: 0 | 1 | 7;
  /** What each grade earns, best first. The grades' names are per language, in the same order. */
  sats: ReadonlyArray<string>;
}

export const SAMPLE_SHAPES = [
  { key: "sweep-kitchen", picture: "🧹", everyDays: 1, sats: ["300", "150", "0"] },
  { key: "make-bed", picture: "🛏️", everyDays: 1, sats: ["100", "0"] },
  { key: "trash-cans", picture: "🗑️", everyDays: 7, sats: ["500", "250", "0"] },
  { key: "walk-dog", picture: "🐕", everyDays: 1, sats: ["400", "200", "0"] },
  { key: "weed-bed", picture: "🌱", everyDays: 0, sats: ["2000", "1000", "0"] },
  { key: "read-chapter", picture: "📚", everyDays: 7, sats: ["600", "300", "0"] },
  { key: "rake-leaves", picture: "🍂", everyDays: 0, sats: ["1500", "700", "0"] },
] as const satisfies ReadonlyArray<SampleShape>;

export type SampleKey = (typeof SAMPLE_SHAPES)[number]["key"];

/** One sample job's words in one language. */
export interface SampleText {
  /** The kind of job this one shows. */
  kind: string;
  title: string;
  /** Where, when, and how to finish: one sentence to a line, lines separated by "\n". */
  description: string;
  /** Each grade's name and what earns it, in the order `SAMPLE_SHAPES` lists its sats. */
  grades: { name: string; criteria: string }[];
  /** What a child learns from a job of this kind. */
  teaches: string;
}

export type SamplesText = Record<SampleKey, SampleText>;

export interface SampleJob {
  key: SampleKey;
  /** One of JOB_PICTURES. */
  picture: string;
  title: string;
  /** Where, when, and how to finish. */
  description: string;
  /** 0 once, 1 every day, 7 every week. */
  everyDays: 0 | 1 | 7;
  rows: GradeRow[];
  /** The kind of job this one shows. */
  kind: string;
  /** What a child learns from a job of this kind. */
  teaches: string;
}

/** The sample jobs as a page shows them: this file's structure with one language's words. */
export function samplesIn(text: SamplesText): SampleJob[] {
  return SAMPLE_SHAPES.map((shape) => {
    const words = text[shape.key];
    return {
      key: shape.key,
      picture: shape.picture,
      title: words.title,
      description: words.description,
      everyDays: shape.everyDays,
      rows: shape.sats.map((sats, i) => ({ name: words.grades[i]?.name ?? "", sats, criteria: words.grades[i]?.criteria ?? "" })),
      kind: words.kind,
      teaches: words.teaches,
    };
  });
}
