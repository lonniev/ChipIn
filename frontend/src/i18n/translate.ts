/** Turning a message key into words. Pure, so the lib functions that speak can be tested in Node. */

import type { MessageKey, Messages } from "./en.ts";

export type Vars = Record<string, string | number>;

/** Something a pure function wants said: the message, and what goes in its `{name}` places. */
export interface Said {
  key: MessageKey;
  vars?: Vars;
}

const HOLE = /\{(\w+)\}/g;

/** The template with each `{name}` filled. A name nobody gave stays visible, so a slip is seen. */
export function fill(template: string, vars: Vars = {}): string {
  return template.replace(HOLE, (whole, name: string) => (name in vars ? String(vars[name]) : whole));
}

/** The template cut at its `{name}` places, for a page that puts a link or a number's own styling there. */
export function pieces(template: string): Array<string | { hole: string }> {
  const out: Array<string | { hole: string }> = [];
  let from = 0;
  for (const m of template.matchAll(HOLE)) {
    if (m.index > from) out.push(template.slice(from, m.index));
    out.push({ hole: m[1] });
    from = m.index + m[0].length;
  }
  if (from < template.length) out.push(template.slice(from));
  return out;
}

/** The `{name}` places a template has, sorted, for checking a translation kept them all. */
export function holesOf(template: string): string[] {
  return [...template.matchAll(HOLE)].map((m) => m[1]).sort();
}

export type Translate = (key: MessageKey, vars?: Vars) => string;

/** A `t` over one catalog. A key the catalog lacks is said in the fallback's words. */
export function translator(messages: Partial<Messages>, fallback: Messages): Translate {
  return (key, vars) => fill(messages[key] ?? fallback[key] ?? key, vars);
}

/** What a pure function asked to have said, or nothing when it asked for nothing. */
export function say(t: Translate, said: Said | null): string {
  return said ? t(said.key, said.vars) : "";
}
