/** The painting for each lesson in each family's set. Each is fetched only when shown. */

import { DEFAULT_PICTURES, type PictureSet } from "./pictures.ts";

const found = import.meta.glob<string>("../assets/lessons/*/*.webp", { eager: true, query: "?url", import: "default" });

/** "white/earn-it" → url */
const byKey = new Map(Object.entries(found).map(([path, url]) => [path.split("/").slice(-2).join("/").slice(0, -".webp".length), url]));

export const artFor = (slug: string, set: PictureSet): string | undefined =>
  byKey.get(`${set}/${slug}`) ?? byKey.get(`${DEFAULT_PICTURES}/${slug}`);
