/** The picture painted for each lesson, by the lesson's slug. Each is fetched only when shown. */

const found = import.meta.glob<string>("../assets/lessons/*.webp", { eager: true, query: "?url", import: "default" });

const bySlug = new Map(Object.entries(found).map(([path, url]) => [path.slice(path.lastIndexOf("/") + 1, -".webp".length), url]));

export const artFor = (slug: string): string | undefined => bySlug.get(slug);
