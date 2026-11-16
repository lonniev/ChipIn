/**
 * What ChipIn teaches someone new to Bitcoin: what a sat is, where it lives,
 * how it moves, and what earning, saving and giving do to a person.
 *
 * This file holds what is the same in every language: each lesson's address,
 * picture and outside links, and the bookshelf. The words are per language,
 * in `src/content/<language>/lessons.ts`.
 */

export const SATS_PER_BITCOIN = 100_000_000;
export const BITCOIN_EVER = 21_000_000;

export type LessonGroup = "money" | "character" | "uses" | "virtues";

interface LessonShape {
  /** The lesson's address: /learn/<slug>. */
  slug: string;
  picture: string;
  group: LessonGroup;
  /** Places outside ChipIn. Each opens in a new tab. */
  links?: ReadonlyArray<{ name: string; href: string }>;
}

export const LESSON_SHAPES = [
  { slug: "what-is-a-sat", picture: "🪙", group: "money" },
  { slug: "where-sats-live", picture: "👛", group: "money" },
  { slug: "how-sats-move", picture: "⚡", group: "money" },
  { slug: "why-nobody-can-make-more", picture: "⛏️", group: "money" },
  { slug: "earn-it", picture: "💪", group: "character" },
  { slug: "save-some", picture: "🌰", group: "character" },
  { slug: "keep-your-word", picture: "🤝", group: "character" },
  { slug: "give-some", picture: "🎁", group: "character" },
  { slug: "what-to-save-for", picture: "🎯", group: "uses" },
  {
    slug: "where-else-to-earn", picture: "🧺", group: "uses",
    links: [
      { name: "Orange Bible", href: "https://orangebible.com" },
      { name: "Fountain", href: "https://fountain.fm" },
      { name: "Stacker News", href: "https://stacker.news" },
    ],
  },
  {
    slug: "where-to-give", picture: "🕊️", group: "uses",
    links: [
      { name: "Geyser", href: "https://geyser.fund" },
      { name: "OpenSats", href: "https://opensats.org" },
    ],
  },
  {
    slug: "what-is-worth-buying", picture: "🛒", group: "uses",
    links: [
      { name: "Good Brew", href: "https://cafe.tollbooth-dpyc.com/collections/books" },
      { name: "BTC Map", href: "https://btcmap.org" },
    ],
  },
  { slug: "the-virtues", picture: "🧭", group: "virtues" },
] as const satisfies ReadonlyArray<LessonShape>;

export type LessonSlug = (typeof LESSON_SHAPES)[number]["slug"];

const GOOD_BREW = "https://cafe.tollbooth-dpyc.com";

/** Where a family can go on learning: three shelves at Good Brew. A book's handle is its product page there. */
export const SHELF_SHAPES = [
  {
    key: "money",
    books: [
      { name: "The Bitcoin Standard", by: "Saifedean Ammous", handle: "the-bitcoin-standard" },
      { name: "Economics in One Lesson", by: "Henry Hazlitt", handle: "economics-in-one-lesson" },
      { name: "Basic Economics", by: "Thomas Sowell", handle: "basic-economics" },
      { name: "The Church and the Market", by: "Thomas E. Woods Jr.", handle: "the-church-and-the-market" },
    ],
  },
  {
    key: "farm",
    books: [
      { name: "You Can Farm", by: "Joel Salatin", handle: "you-can-farm" },
      { name: "The Market Gardener", by: "Jean-Martin Fortier", handle: "the-market-gardener" },
      { name: "The Contrary Farmer", by: "Gene Logsdon", handle: "the-contrary-farmer" },
      { name: "Dirt to Soil", by: "Gabe Brown", handle: "dirt-to-soil" },
    ],
  },
  {
    key: "land",
    books: [
      { name: "The Land Was Everything", by: "Victor Davis Hanson", handle: "the-land-was-everything" },
      { name: "What's Wrong with the World", by: "G. K. Chesterton", handle: "whats-wrong-with-the-world" },
      { name: "The Servile State", by: "Hilaire Belloc", handle: "the-servile-state" },
      { name: "Small Is Beautiful", by: "E. F. Schumacher", handle: "small-is-beautiful" },
    ],
  },
] as const;

export type ShelfKey = (typeof SHELF_SHAPES)[number]["key"];
export type BookHandle = (typeof SHELF_SHAPES)[number]["books"][number]["handle"];

export const BOOKSHELF_HREF = `${GOOD_BREW}/collections/books`;
export const ORANGE_BIBLE_HREF = "https://orangebible.com";

/** One lesson's words in one language. */
export interface LessonText {
  title: string;
  /** A few short sentences, one to a line. */
  lines: string[];
  /** The longer telling, one sentence to a line. */
  more: string[];
  /** A named list inside the lesson, such as the seven virtues. */
  points?: { group?: string; name: string; says: string }[];
  /** One saying and where it is from. */
  saying?: { text: string; from: string };
  /** Something to do, today, with what was just read. */
  tryThis: string;
  /** A question for the supper table. */
  ask: string;
  /** What each outside place is, in the order `LESSON_SHAPES` lists the lesson's links. */
  links?: string[];
  /** Said under the links: what a family should check for itself. */
  care?: string;
}

/** Everything the Learn pages say in one language. */
export interface LessonsText {
  lessons: Record<LessonSlug, LessonText>;
  /** The glossary. "npub" and "nsec" keep their names. */
  words: { word: string; means: string }[];
  /** Each shelf's title. */
  shelves: Record<ShelfKey, string>;
  /** What each book is about, by its handle. */
  books: Record<BookHandle, string>;
}

export interface Lesson {
  slug: LessonSlug;
  picture: string;
  group: LessonGroup;
  title: string;
  lines: string[];
  saying?: { text: string; from: string };
  more: string[];
  tryThis: string;
  ask: string;
  points?: { group?: string; name: string; says: string }[];
  links?: { name: string; href: string; says: string }[];
  care?: string;
}

export interface Book {
  name: string;
  by: string;
  says: string;
  /** The product's handle at Good Brew. */
  handle: string;
}

export const bookHref = (book: Pick<Book, "handle">) => `${GOOD_BREW}/products/${book.handle}`;

/** The lessons, glossary and bookshelf in one language. */
export interface Library {
  /** Every lesson, in reading order. */
  lessons: Lesson[];
  money: Lesson[];
  character: Lesson[];
  uses: Lesson[];
  virtues: Lesson[];
  words: { word: string; means: string }[];
  shelves: { key: ShelfKey; title: string; books: Book[] }[];
  at: (slug: string) => Lesson | undefined;
}

/** The lessons as a page shows them: this file's structure with one language's words. */
export function libraryIn(text: LessonsText): Library {
  const lessons: Lesson[] = LESSON_SHAPES.map((shape) => {
    const words = text.lessons[shape.slug];
    const { links: says, ...rest } = words;
    const places: ReadonlyArray<{ name: string; href: string }> | undefined = "links" in shape ? shape.links : undefined;
    return {
      ...rest,
      slug: shape.slug,
      picture: shape.picture,
      group: shape.group,
      ...(places ? { links: places.map((k, i) => ({ ...k, says: says?.[i] ?? "" })) } : {}),
    };
  });
  const of = (group: LessonGroup) => lessons.filter((l) => l.group === group);
  return {
    lessons,
    money: of("money"),
    character: of("character"),
    uses: of("uses"),
    virtues: of("virtues"),
    words: text.words,
    shelves: SHELF_SHAPES.map((s) => ({
      key: s.key,
      title: text.shelves[s.key],
      books: s.books.map((b) => ({ ...b, says: text.books[b.handle] })),
    })),
    at: (slug) => lessons.find((l) => l.slug === slug),
  };
}
