/** A person's face on screen: their initial on a colour that is always theirs. */

const HUES = [12, 38, 95, 150, 190, 215, 265, 320];

/** The same npub always gets the same hue. */
export function hueOf(npub: string): number {
  let sum = 0;
  for (const ch of npub) sum = (sum * 31 + ch.charCodeAt(0)) >>> 0;
  return HUES[sum % HUES.length];
}

export function initialOf(name: string): string {
  const first = [...name.trim()][0];
  return first ? first.toUpperCase() : "?";
}

/** Pictures a chore's name can start with. */
export const CHORE_PICTURES = ["🧹", "🛏️", "🍽️", "🗑️", "🧺", "🐕", "🌱", "📚", "🚗", "🛒"];

/** The picture a title starts with, and the rest of it. */
export function splitPicture(title: string): { picture: string; rest: string } {
  const found = CHORE_PICTURES.find((p) => title.startsWith(p));
  return found ? { picture: found, rest: title.slice(found.length).trim() } : { picture: "", rest: title };
}
