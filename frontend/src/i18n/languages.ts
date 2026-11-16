/** The languages ChipIn can be shown in. Language is presentation only: Task Booth is never told. */

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
] as const;

export type Language = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_KEY = "chipin:language";

const isLanguage = (value: unknown): value is Language => LANGUAGES.some((l) => l.code === value);

/** A stored choice, or English when what was stored is not one of the languages. */
export function languageFrom(stored: unknown): Language {
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
}

/** The first of the browser's preferred languages ChipIn has: `fr-CA` is French, `zh-TW` is Chinese. */
export function languageForBrowser(preferred: readonly string[]): Language {
  for (const tag of preferred) {
    const base = String(tag).toLowerCase().split(/[-_]/)[0];
    if (isLanguage(base)) return base;
  }
  return DEFAULT_LANGUAGE;
}

/**
 * How dates and money are written beside words in `language`: the browser's own
 * variant of it when it has one (`en-GB`, `fr-CA`), or else the language itself.
 */
export function localeFor(language: Language, preferred: readonly string[]): string {
  return preferred.find((tag) => languageForBrowser([tag]) === language && String(tag).toLowerCase().split(/[-_]/)[0] === language) ?? language;
}
