/**
 * The names this device gives the family's npubs.
 *
 * They stay in this browser and are sent nowhere: Task Queue knows people only
 * by npub. Another device starts with no names until they are added there.
 */

export interface Member {
  npub: string;
  name: string;
}

const KEY = "chipin:family";
const NPUB = /^npub1[02-9ac-hj-np-z]{58}$/;

export function isNpub(text: string): boolean {
  return NPUB.test(text.trim());
}

/** `npub1abcd…wxyz`: enough to tell two apart. */
export function shortNpub(npub: string): string {
  return npub.length > 16 ? `${npub.slice(0, 9)}…${npub.slice(-4)}` : npub;
}

/** The list with this member added, or renamed when the npub is already on it. */
export function withMember(list: Member[], npub: string, name: string): Member[] {
  const member = { npub: npub.trim(), name: name.trim().slice(0, 40) };
  if (!isNpub(member.npub) || !member.name) return list;
  const rest = list.filter((m) => m.npub !== member.npub);
  return [...rest, member].sort((a, b) => a.name.localeCompare(b.name));
}

export function withoutMember(list: Member[], npub: string): Member[] {
  return list.filter((m) => m.npub !== npub);
}

/** What to call an npub: "You", the name this device gave it, or its short form. */
export function nameOf(list: Member[], npub: string, me: string): string {
  if (npub && npub === me) return "You";
  return list.find((m) => m.npub === npub)?.name ?? shortNpub(npub);
}

/** Only well-formed rows survive: storage is text anyone could have edited. */
export function membersFrom(stored: unknown): Member[] {
  if (!Array.isArray(stored)) return [];
  return stored.reduce<Member[]>(
    (list, row) => (row && typeof row.npub === "string" && typeof row.name === "string"
      ? withMember(list, row.npub, row.name) : list),
    [],
  );
}

export function loadFamily(): Member[] {
  try {
    return membersFrom(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  } catch {
    return [];
  }
}

export function saveFamily(list: Member[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // A private window keeps nothing; the names last for this visit.
  }
}
