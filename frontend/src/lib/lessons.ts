/**
 * What ChipIn teaches someone new to Bitcoin: what a sat is, where it lives,
 * how it moves, and what earning, saving and giving do to a person.
 * One sentence to a line. A lesson may carry one saying, never more.
 */

export interface Lesson {
  picture: string;
  title: string;
  lines: string[];
  saying?: { text: string; from: string };
}

export const SATS_PER_BITCOIN = 100_000_000;
export const BITCOIN_EVER = 21_000_000;

export const MONEY_LESSONS: ReadonlyArray<Lesson> = [
  {
    picture: "🪙",
    title: "What is a sat?",
    lines: [
      "A sat is the smallest piece of a bitcoin.",
      "One bitcoin is 100,000,000 sats, the way one dollar is 100 cents.",
      "The sats you earn here are real bitcoin.",
    ],
  },
  {
    picture: "👛",
    title: "Where do sats live?",
    lines: [
      "Your sats live in a wallet, an app on a phone.",
      "The wallet holds a secret key, and the key is what makes the sats yours.",
      "Keep the key safe, and nobody can take them.",
    ],
  },
  {
    picture: "⚡",
    title: "How do sats move?",
    lines: [
      "Sats travel over Lightning, a fast road built on Bitcoin.",
      "Your wallet writes a request for the sats you earned.",
      "Mum or Dad's wallet pays it, and the sats arrive in a second or two.",
      "They go straight from one wallet to the other.",
    ],
  },
  {
    picture: "⛏️",
    title: "Why can nobody make more?",
    lines: [
      "There will only ever be 21,000,000 bitcoin.",
      "Nobody can print extra, the way more dollars are printed each year.",
      "Money that stays scarce keeps its worth while you save it.",
    ],
    saying: { text: "A false balance is abomination to the LORD: but a just weight is his delight.", from: "Proverbs 11:1" },
  },
];

export const CHARACTER_LESSONS: ReadonlyArray<Lesson> = [
  {
    picture: "💪",
    title: "Earn it",
    lines: [
      "Money is a thank-you for helping someone.",
      "You swept the floor, so the family has a clean kitchen.",
      "The sats say that your work was worth something to them.",
    ],
    saying: { text: "In all labour there is profit: but the talk of the lips tendeth only to penury.", from: "Proverbs 14:23" },
  },
  {
    picture: "🌰",
    title: "Save some",
    lines: [
      "Sats you keep today can buy something better later.",
      "Waiting is hard, and it is how people grow rich.",
      "Try keeping half of what you earn.",
    ],
    saying: { text: "He that gathereth by labour shall increase.", from: "Proverbs 13:11" },
  },
  {
    picture: "🤝",
    title: "Keep your word",
    lines: [
      "Tapping “I'll do it!” is a promise.",
      "People trust the one who finishes what they took on.",
      "Trust is worth more than any one reward.",
    ],
    saying: { text: "He that is faithful in that which is least is faithful also in much.", from: "Luke 16:10" },
  },
  {
    picture: "🎁",
    title: "Give some",
    lines: [
      "What you earned is yours to share.",
      "A gift costs you something, and that is what makes it a gift.",
      "Set a little aside for someone who needs it.",
    ],
    saying: { text: "It is more blessed to give than to receive.", from: "Acts 20:35" },
  },
];

export const WORDS: ReadonlyArray<{ word: string; means: string }> = [
  { word: "Bitcoin", means: "Money that lives on the internet and belongs to no bank or country." },
  { word: "Sat", means: "The smallest piece of a bitcoin. Short for satoshi." },
  { word: "Wallet", means: "The app that holds the key to your sats." },
  { word: "Lightning", means: "The fast way to send sats from one wallet to another." },
  { word: "Invoice", means: "A request for sats that a wallet writes. It starts with “lnbc”." },
  { word: "npub", means: "Your name on ChipIn. It is safe to share." },
  { word: "nsec", means: "The secret behind your npub. Never share it." },
  { word: "Blockchain", means: "The record of every bitcoin payment, kept by thousands of computers at once." },
];

/** Where a family can go on learning. */
export const KEEP_LEARNING: ReadonlyArray<{ name: string; by: string; says: string; href: string; store: string }> = [
  {
    name: "The Bitcoin Standard", by: "Saifedean Ammous", store: "Good Brew",
    says: "The history of money, and why a fixed supply matters.",
    href: "https://cafe.tollbooth-dpyc.com/products/the-bitcoin-standard",
  },
  {
    name: "Economics in One Lesson", by: "Henry Hazlitt", store: "Good Brew",
    says: "Look past today to what a choice does later.",
    href: "https://cafe.tollbooth-dpyc.com/products/economics-in-one-lesson",
  },
  {
    name: "Basic Economics", by: "Thomas Sowell", store: "Good Brew",
    says: "How prices, work and trade fit together, in plain words.",
    href: "https://cafe.tollbooth-dpyc.com/products/basic-economics",
  },
  {
    name: "The Church and the Market", by: "Thomas E. Woods Jr.", store: "Good Brew",
    says: "A Christian case for free and honest trade.",
    href: "https://cafe.tollbooth-dpyc.com/products/the-church-and-the-market",
  },
];

export const BOOKSHELF_HREF = "https://cafe.tollbooth-dpyc.com/collections/books";
export const ORANGE_BIBLE_HREF = "https://orangebible.com";
