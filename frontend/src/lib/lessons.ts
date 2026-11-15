/**
 * What ChipIn teaches someone new to Bitcoin: what a sat is, where it lives,
 * how it moves, and what earning, saving and giving do to a person.
 * One sentence to a line. A lesson may carry one saying, never more.
 */

export interface Lesson {
  /** The lesson's address: /learn/<slug>. */
  slug: string;
  picture: string;
  title: string;
  lines: string[];
  saying?: { text: string; from: string };
  /** The longer telling, one sentence to a line. */
  more: string[];
  /** Something to do, today, with what was just read. */
  tryThis: string;
  /** A question for the supper table. */
  ask: string;
}

export const SATS_PER_BITCOIN = 100_000_000;
export const BITCOIN_EVER = 21_000_000;

export const MONEY_LESSONS: ReadonlyArray<Lesson> = [
  {
    slug: "what-is-a-sat",
    picture: "🪙",
    title: "What is a sat?",
    lines: [
      "A sat is the smallest piece of a bitcoin.",
      "One bitcoin is 100,000,000 sats, the way one dollar is 100 cents.",
      "The sats you earn here are real bitcoin.",
    ],
    more: [
      "Bitcoin began in 2009, made by someone who signed as Satoshi Nakamoto.",
      "The smallest piece is named a satoshi after him, and people say sat for short.",
      "A whole bitcoin is far more than most chores earn, so wages are counted in sats.",
      "One thousand sats is 0.00001 bitcoin.",
      "A sat cannot be cut smaller, and it cannot be copied.",
      "When you are paid 500 sats, you hold 500 of the sats that exist, and nobody else holds those.",
    ],
    tryThis: "Find the biggest reward on your chores list and work out what part of a bitcoin it is.",
    ask: "Why might it help to have money that can be counted in very small pieces?",
  },
  {
    slug: "where-sats-live",
    picture: "👛",
    title: "Where do sats live?",
    lines: [
      "Your sats live in a wallet, an app on a phone.",
      "The wallet holds a secret key, and the key is what makes the sats yours.",
      "Keep the key safe, and nobody can take them.",
    ],
    more: [
      "A wallet does not hold coins the way a purse does.",
      "It holds a key, a very long secret number.",
      "Whoever knows the key can spend the sats, so the key is the thing to guard.",
      "Most wallets give you twelve or twenty-four words to write on paper, and those words are the key.",
      "Keep that paper where the family keeps important things.",
      "Never type those words into a website, and never photograph them.",
    ],
    tryThis: "With a parent, find where your wallet shows its backup words, and agree where the paper will be kept.",
    ask: "What is the difference between someone holding your money for you and you holding it yourself?",
  },
  {
    slug: "how-sats-move",
    picture: "⚡",
    title: "How do sats move?",
    lines: [
      "Sats travel over Lightning, a fast road built on Bitcoin.",
      "Your wallet writes a request for the sats you earned.",
      "Mum or Dad's wallet pays it, and the sats arrive in a second or two.",
      "They go straight from one wallet to the other.",
    ],
    more: [
      "Bitcoin writes every payment into a record that the whole world shares.",
      "That record is very safe and a little slow, so small payments use Lightning.",
      "On Lightning, your wallet writes an invoice: a request for an exact number of sats.",
      "The payer's wallet reads the invoice and sends exactly that.",
      "The payment takes a second or two and costs almost nothing.",
      "Nobody in the middle holds your sats on the way.",
    ],
    tryThis: "When a chore is owed to you, open your wallet, tap Receive, and make the request yourself.",
    ask: "Why does the person being paid write the request, and the payer only approve it?",
  },
  {
    slug: "why-nobody-can-make-more",
    picture: "⛏️",
    title: "Why can nobody make more?",
    lines: [
      "There will only ever be 21,000,000 bitcoin.",
      "Nobody can print extra, the way more dollars are printed each year.",
      "Money that stays scarce keeps its worth while you save it.",
    ],
    saying: { text: "A false balance is abomination to the LORD: but a just weight is his delight.", from: "Proverbs 11:1" },
    more: [
      "Dollars, pounds and euros are made by central banks, and more are made every year.",
      "When there is more money chasing the same bread, the bread costs more.",
      "That is why a grandparent remembers a loaf costing a few cents.",
      "Bitcoin's rules allow 21,000,000 coins and no more.",
      "New coins arrive on a schedule that halves about every four years, until none are left to issue.",
      "No person, company or government can change that by deciding to.",
      "Money like this is called sound money: it measures the same tomorrow as today.",
    ],
    tryThis: "Ask a grandparent what a loaf of bread or a gallon of petrol cost when they were your age.",
    ask: "If you could print your own pocket money, what would happen to the price of sweets at home?",
  },
];

export const CHARACTER_LESSONS: ReadonlyArray<Lesson> = [
  {
    slug: "earn-it",
    picture: "💪",
    title: "Earn it",
    lines: [
      "Money is a thank-you for helping someone.",
      "You swept the floor, so the family has a clean kitchen.",
      "The sats say that your work was worth something to them.",
    ],
    saying: { text: "In all labour there is profit: but the talk of the lips tendeth only to penury.", from: "Proverbs 14:23" },
    more: [
      "Nobody is paid for wanting money.",
      "People are paid when they do something another person values.",
      "A baker is paid because you would rather have the bread than the coins.",
      "Both of you come away better off, and that is what a fair trade is.",
      "A chore is the same trade on a small scale.",
      "The better you serve, the more your work is worth.",
    ],
    tryThis: "Pick one chore and do it a little better than the grade asks.",
    ask: "Who was helped by the last piece of work you did?",
  },
  {
    slug: "save-some",
    picture: "🌰",
    title: "Save some",
    lines: [
      "Sats you keep today can buy something better later.",
      "Waiting is hard, and it is how people grow rich.",
      "Try keeping half of what you earn.",
    ],
    saying: { text: "He that gathereth by labour shall increase.", from: "Proverbs 13:11" },
    more: [
      "You can spend what you earn today, or keep it for later.",
      "Keeping it is called saving, and it means choosing a bigger good later over a small one now.",
      "Every tool, shop and farm that exists was built by someone who saved first.",
      "Savings also keep a family steady when something breaks or work is short.",
      "Saving works best in money that holds its worth while it waits.",
      "Start small, and do it every time you are paid.",
    ],
    tryThis: "Choose something worth waiting for, and count how many chores it will take.",
    ask: "What is something our family has because somebody saved for it?",
  },
  {
    slug: "keep-your-word",
    picture: "🤝",
    title: "Keep your word",
    lines: [
      "Tapping “I'll do it!” is a promise.",
      "People trust the one who finishes what they took on.",
      "Trust is worth more than any one reward.",
    ],
    saying: { text: "He that is faithful in that which is least is faithful also in much.", from: "Luke 16:10" },
    more: [
      "Trade runs on promises.",
      "A shopkeeper promises the scale is honest, and a builder promises the wall will stand.",
      "When you take a chore, someone stops worrying about it because you said you would do it.",
      "If you cannot finish, say so early and give it back.",
      "A person known for keeping their word is offered the best work.",
      "That name takes years to earn and a day to lose.",
    ],
    tryThis: "If you have taken a chore you cannot finish, give it back today and say why.",
    ask: "Whom do you trust most to do what they say, and why?",
  },
  {
    slug: "give-some",
    picture: "🎁",
    title: "Give some",
    lines: [
      "What you earned is yours to share.",
      "A gift costs you something, and that is what makes it a gift.",
      "Set a little aside for someone who needs it.",
    ],
    saying: { text: "It is more blessed to give than to receive.", from: "Acts 20:35" },
    more: [
      "You can only give away what is yours.",
      "That is why earning comes first: it makes you able to give.",
      "Families of faith have long set aside a tenth before spending anything.",
      "A gift given quietly helps the one who receives it and shapes the one who gives.",
      "Giving time counts as well: a chore done for a neighbour, with no reward asked.",
      "Decide your share before the sats arrive, and giving becomes a habit.",
    ],
    tryThis: "Choose a share to give from your next reward, and who it is for.",
    ask: "Who near us could use some help this week?",
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

export interface Book {
  name: string;
  by: string;
  says: string;
  /** The product's handle at Good Brew. */
  handle: string;
}

const GOOD_BREW = "https://cafe.tollbooth-dpyc.com";
export const bookHref = (book: Book) => `${GOOD_BREW}/products/${book.handle}`;

/** Where a family can go on learning: three shelves at Good Brew. */
export const SHELVES: ReadonlyArray<{ title: string; books: Book[] }> = [
  {
    title: "Money and markets",
    books: [
      { name: "The Bitcoin Standard", by: "Saifedean Ammous", says: "The history of money, and why a fixed supply matters.", handle: "the-bitcoin-standard" },
      { name: "Economics in One Lesson", by: "Henry Hazlitt", says: "Look past today to what a choice does later.", handle: "economics-in-one-lesson" },
      { name: "Basic Economics", by: "Thomas Sowell", says: "How prices, work and trade fit together, in plain words.", handle: "basic-economics" },
      { name: "The Church and the Market", by: "Thomas E. Woods Jr.", says: "A Christian case for free and honest trade.", handle: "the-church-and-the-market" },
    ],
  },
  {
    title: "The small farm",
    books: [
      { name: "You Can Farm", by: "Joel Salatin", says: "Starting a farm as a family business.", handle: "you-can-farm" },
      { name: "The Market Gardener", by: "Jean-Martin Fortier", says: "A living from an acre and a half.", handle: "the-market-gardener" },
      { name: "The Contrary Farmer", by: "Gene Logsdon", says: "A few dozen acres, farmed for the love of it.", handle: "the-contrary-farmer" },
      { name: "Dirt to Soil", by: "Gabe Brown", says: "One family rebuilds its land.", handle: "dirt-to-soil" },
    ],
  },
  {
    title: "Land, family and ownership",
    books: [
      { name: "The Land Was Everything", by: "Victor Davis Hanson", says: "What the family farm gave a people.", handle: "the-land-was-everything" },
      { name: "What's Wrong with the World", by: "G. K. Chesterton", says: "The home and the family as the measure of things.", handle: "whats-wrong-with-the-world" },
      { name: "The Servile State", by: "Hilaire Belloc", says: "Why widely owned property keeps people free.", handle: "the-servile-state" },
      { name: "Small Is Beautiful", by: "E. F. Schumacher", says: "Economics at the scale of people.", handle: "small-is-beautiful" },
    ],
  },
];

export const BOOKSHELF_HREF = `${GOOD_BREW}/collections/books`;
export const ORANGE_BIBLE_HREF = "https://orangebible.com";

export const LESSONS: ReadonlyArray<Lesson> = [...MONEY_LESSONS, ...CHARACTER_LESSONS];
export const lessonAt = (slug: string): Lesson | undefined => LESSONS.find((l) => l.slug === slug);
