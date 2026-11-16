/**
 * The language on screen, shared by every page.
 *
 * English is in the main bundle. Every other language is one chunk, fetched
 * the first time it is chosen; English shows while it loads, and stays when a
 * language has no files yet. The choice is kept on this device.
 */

import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import english from "../content/en/index.ts";
import { libraryIn, type Library } from "../lib/lessons.ts";
import type { QuoteText } from "../lib/quotes.ts";
import { samplesIn, type SampleJob } from "../lib/samples.ts";
import type { MessageKey } from "./en.ts";
import { DEFAULT_LANGUAGE, LANGUAGE_KEY, languageForBrowser, languageFrom, localeFor, type Language } from "./languages.ts";
import type { LanguagePack } from "./pack.ts";
import { pieces, translator, type Translate, type Vars } from "./translate.ts";

/** Each language's pack, by its folder under `src/content/`. A language with no folder is simply not here. */
const found = import.meta.glob<{ default: LanguagePack }>(["../content/*/index.ts", "!../content/en/index.ts"]);
const loaders = new Map(Object.entries(found).map(([path, load]) => [path.split("/").slice(-2)[0], load]));

/** `t(key, vars)` says a message. `t.rich` puts a link or a styled number in a `{name}` place. */
export interface T extends Translate {
  rich: (key: MessageKey, nodes: Record<string, ReactNode>) => ReactNode;
}

interface I18n {
  /** The language chosen. */
  language: Language;
  /** The language the words on screen are in: English until the chosen one has loaded. */
  shown: Language;
  choose: (language: Language) => void;
  t: T;
  library: Library;
  samples: SampleJob[];
  quotes: QuoteText[];
}

function made(language: Language, shown: Language, pack: LanguagePack, choose: (language: Language) => void): I18n {
  const say = translator(pack.messages, english.messages);
  const t: T = Object.assign((key: MessageKey, vars?: Vars) => say(key, vars), {
    rich: (key: MessageKey, nodes: Record<string, ReactNode>) => pieces(say(key)).map((piece, i) => (
      <Fragment key={i}>{typeof piece === "string" ? piece : piece.hole in nodes ? nodes[piece.hole] : `{${piece.hole}}`}</Fragment>
    )),
  });
  return { language, shown, choose, t, library: libraryIn(pack.lessons), samples: samplesIn(pack.samples), quotes: pack.quotes };
}

/** With no provider above, a page speaks English: the harness and a lone component still render. */
const Ctx = createContext<I18n>(made(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE, english, () => {}));

/** The languages the browser asks for, most wanted first. */
const preferred = (): readonly string[] => (typeof navigator === "undefined" ? [] : navigator.languages ?? [navigator.language]);

/** The stored choice, or with none the browser's own language. */
function remembered(): Language {
  try {
    const kept = localStorage.getItem(LANGUAGE_KEY);
    if (kept) return languageFrom(kept);
  } catch {
    // A private window keeps nothing; the browser's language decides.
  }
  return languageForBrowser(preferred());
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(remembered);
  const [loaded, setLoaded] = useState<{ language: Language; pack: LanguagePack }>({ language: DEFAULT_LANGUAGE, pack: english });

  // Fetch the chosen language's chunk. A language with no files, or a fetch that fails, leaves English up.
  useEffect(() => {
    let live = true;
    loaders.get(language)?.().then((m) => live && setLoaded({ language, pack: m.default }), () => {});
    return () => { live = false; };
  }, [language]);

  // English shows until the chosen language is the one that has loaded.
  const ready = loaded.language === language;
  const shown = ready ? language : DEFAULT_LANGUAGE;
  const pack = ready ? loaded.pack : english;

  useEffect(() => { document.documentElement.lang = shown; }, [shown]);

  const choose = useCallback((next: Language) => {
    setLanguage(next);
    try { localStorage.setItem(LANGUAGE_KEY, next); } catch { /* the choice lasts this visit */ }
  }, []);

  const value = useMemo(() => made(language, shown, pack, choose), [language, shown, pack, choose]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** `t(key, vars?)`: a message in the language on screen. */
export const useT = (): T => useContext(Ctx).t;

/** The language chosen, and how to choose another. */
export function useLanguage(): { language: Language; choose: (language: Language) => void } {
  const { language, choose } = useContext(Ctx);
  return { language, choose };
}

/** How to write dates and money to match the words on screen: `fr`, or the browser's own `fr-CA`. */
export const useLocale = (): string => localeFor(useContext(Ctx).shown, preferred());

/** The lessons, glossary and bookshelf in the language on screen. */
export const useLessons = (): Library => useContext(Ctx).library;

/** The sample jobs in the language on screen. */
export const useSamples = (): SampleJob[] => useContext(Ctx).samples;

/** The quotations in the language on screen. */
export const useQuotes = (): QuoteText[] => useContext(Ctx).quotes;
