/**
 * Which family the lesson paintings show. A family picks the set that looks
 * like them. The choice stays on the device: it is nobody else's business.
 */

export const PICTURE_SETS = [
  { key: "white", label: "White" },
  { key: "african", label: "African" },
  { key: "hispanic", label: "Hispanic" },
  { key: "asian", label: "Asian" },
] as const;

export type PictureSet = (typeof PICTURE_SETS)[number]["key"];

export const DEFAULT_PICTURES: PictureSet = "white";
export const PICTURES_KEY = "chipin:pictures";

export function pictureSetFrom(stored: unknown): PictureSet {
  return PICTURE_SETS.some((s) => s.key === stored) ? (stored as PictureSet) : DEFAULT_PICTURES;
}

/** One of the sets, picked by a number from 0 up to 1, such as `Math.random()`. */
export function pictureSetAt(roll: number): PictureSet {
  const i = Math.min(PICTURE_SETS.length - 1, Math.max(0, Math.floor(roll * PICTURE_SETS.length)));
  return PICTURE_SETS[i].key;
}
