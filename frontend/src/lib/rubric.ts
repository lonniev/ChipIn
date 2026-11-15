/** A chore's rewards: the grades, and the sats each one earns. */

export interface Grade {
  name: string;
  sats: number;
  criteria: string;
}

export interface Rubric {
  grades: Grade[];
  appeal: string;
}

/** A grade as the form holds it: sats is whatever was typed. */
export interface GradeRow {
  name: string;
  sats: string;
  criteria: string;
}

export const MAX_GRADES = 12;
export const MAX_GRADE_SATS = 100_000_000;

export const STARTER_ROWS: GradeRow[] = [
  { name: "Great job", sats: "1000", criteria: "" },
  { name: "Good enough", sats: "500", criteria: "" },
  { name: "Not done", sats: "0", criteria: "" },
];

/** The most a chore can earn. */
export function topSats(rubric: Pick<Rubric, "grades">): number {
  return rubric.grades.reduce((most, g) => Math.max(most, g.sats), 0);
}

/** The grades highest first, as people read a reward list. */
export function byReward(grades: Grade[]): Grade[] {
  return [...grades].sort((a, b) => b.sats - a.sats);
}

/** The form's rows as a rubric, or the sentence that says what to fix. */
export function rubricFrom(rows: GradeRow[]): { rubric: Rubric } | { problem: string } {
  const filled = rows.filter((r) => r.name.trim() || r.sats.trim());
  if (!filled.length) return { problem: "Add at least one grade." };
  if (filled.length > MAX_GRADES) return { problem: `A chore has at most ${MAX_GRADES} grades.` };
  const grades: Grade[] = [];
  const seen = new Set<string>();
  for (const row of filled) {
    const name = row.name.trim();
    if (!name) return { problem: "Every grade needs a name." };
    if (name.length > 60) return { problem: `"${name.slice(0, 20)}…" is longer than 60 characters.` };
    const key = name.toLowerCase();
    if (seen.has(key)) return { problem: `Two grades are named "${name}".` };
    seen.add(key);
    if (!/^\d+$/.test(row.sats.trim())) return { problem: `"${name}" needs a whole number of sats.` };
    const sats = Number(row.sats.trim());
    if (sats > MAX_GRADE_SATS) return { problem: `"${name}" earns more than ${MAX_GRADE_SATS} sats.` };
    grades.push({ name, sats, criteria: row.criteria.trim().slice(0, 500) });
  }
  return { rubric: { grades, appeal: "" } };
}
