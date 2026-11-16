/**
 * The lessons, in English: what ChipIn teaches someone new to Bitcoin.
 * One sentence to a line. A lesson may carry one saying, never more.
 *
 * To translate: copy this folder, and translate the string values only.
 * Keys, the order of lists, and how many items a list has stay as they are.
 * Book titles, authors and the names of outside places are kept in `src/lib/lessons.ts`.
 */

import type { LessonsText } from "../../lib/lessons.ts";

export const lessons: LessonsText = {
  lessons: {
    "what-is-a-sat": {
      title: "What is a sat?",
      lines: [
        "A sat is the smallest piece of a bitcoin.",
        "One bitcoin is 100,000,000 sats, the way one dollar is 100 cents.",
        "The sats you earn here are real bitcoin."
      ],
      more: [
        "Bitcoin began in 2009, made by someone who signed as Satoshi Nakamoto.",
        "The smallest piece is named a satoshi after him, and people say sat for short.",
        "A whole bitcoin is far more than most chores earn, so wages are counted in sats.",
        "One thousand sats is 0.00001 bitcoin.",
        "A sat cannot be cut smaller, and it cannot be copied.",
        "When you are paid 500 sats, you hold 500 of the sats that exist, and nobody else holds those."
      ],
      tryThis: "Find the biggest reward on your chores list and work out what part of a bitcoin it is.",
      ask: "Why might it help to have money that can be counted in very small pieces?"
    },
    "where-sats-live": {
      title: "Where do sats live?",
      lines: [
        "Your sats live in a wallet, an app on a phone.",
        "The wallet holds a secret key, and the key is what makes the sats yours.",
        "Keep the key safe, and nobody can take them."
      ],
      more: [
        "A wallet does not hold coins the way a purse does.",
        "It holds a key, a very long secret number.",
        "Whoever knows the key can spend the sats, so the key is the thing to guard.",
        "Most wallets give you twelve or twenty-four words to write on paper, and those words are the key.",
        "Keep that paper where the family keeps important things.",
        "Never type those words into a website, and never photograph them.",
        "The Guide shows how to choose a wallet and set one up for a child."
      ],
      tryThis: "With a parent, find where your wallet shows its backup words, and agree where the paper will be kept.",
      ask: "What is the difference between someone holding your money for you and you holding it yourself?"
    },
    "how-sats-move": {
      title: "How do sats move?",
      lines: [
        "Sats travel over Lightning, a fast road built on Bitcoin.",
        "Your wallet writes a request for the sats you earned.",
        "Mom or Dad's wallet pays it, and the sats arrive in a second or two.",
        "They go straight from one wallet to the other."
      ],
      more: [
        "Bitcoin writes every payment into a record that the whole world shares.",
        "That record is very safe and a little slow, so small payments use Lightning.",
        "On Lightning, your wallet writes an invoice: a request for an exact number of sats.",
        "The payer's wallet reads the invoice and sends exactly that.",
        "The payment takes a second or two and costs almost nothing.",
        "Nobody in the middle holds your sats on the way."
      ],
      tryThis: "When a chore is owed to you, open your wallet, tap Receive, and make the request yourself.",
      ask: "Why does the person being paid write the request, and the payer only approve it?"
    },
    "why-nobody-can-make-more": {
      title: "Why can nobody make more?",
      lines: [
        "There will only ever be 21,000,000 bitcoin.",
        "Nobody can print extra, the way more dollars are printed each year.",
        "Money that stays scarce keeps its worth while you save it."
      ],
      more: [
        "Dollars, pounds and euros are made by central banks, and more are made every year.",
        "When there is more money chasing the same bread, the bread costs more.",
        "That is why a grandparent remembers a loaf costing a few cents.",
        "Bitcoin's rules allow 21,000,000 coins and no more.",
        "New coins arrive on a schedule that halves about every four years, until none are left to issue.",
        "No person, company or government can change that by deciding to.",
        "Money like this is called sound money: it measures the same tomorrow as today."
      ],
      saying: {
        text: "A false balance is abomination to the LORD: but a just weight is his delight.",
        from: "Proverbs 11:1"
      },
      tryThis: "Ask a grandparent what a loaf of bread or a gallon of gas cost when they were your age.",
      ask: "If you could print your own pocket money, what would happen to the price of sweets at home?"
    },
    "earn-it": {
      title: "Earn it",
      lines: [
        "Money is a thank-you for helping someone.",
        "You swept the floor, so the family has a clean kitchen.",
        "The sats say that your work was worth something to them."
      ],
      more: [
        "Nobody is paid for wanting money.",
        "People are paid when they do something another person values.",
        "A baker is paid because you would rather have the bread than the coins.",
        "Both of you come away better off, and that is what a fair trade is.",
        "A chore is the same trade on a small scale.",
        "The better you serve, the more your work is worth."
      ],
      saying: {
        text: "In all labour there is profit: but the talk of the lips tendeth only to penury.",
        from: "Proverbs 14:23"
      },
      tryThis: "Pick one chore and do it a little better than the grade asks.",
      ask: "Who was helped by the last piece of work you did?"
    },
    "save-some": {
      title: "Save some",
      lines: [
        "Sats you keep today can buy something better later.",
        "Waiting is hard, and it is how people grow rich.",
        "Try keeping half of what you earn."
      ],
      more: [
        "You can spend what you earn today, or keep it for later.",
        "Keeping it is called saving, and it means choosing a bigger good later over a small one now.",
        "Every tool, shop and farm that exists was built by someone who saved first.",
        "Savings also keep a family steady when something breaks or work is short.",
        "Saving works best in money that holds its worth while it waits.",
        "Start small, and do it every time you are paid."
      ],
      saying: {
        text: "He that gathereth by labour shall increase.",
        from: "Proverbs 13:11"
      },
      tryThis: "Choose something worth waiting for, and count how many chores it will take.",
      ask: "What is something our family has because somebody saved for it?"
    },
    "keep-your-word": {
      title: "Keep your word",
      lines: [
        "Tapping “I'll do it!” is a promise.",
        "People trust the one who finishes what they took on.",
        "Trust is worth more than any one reward."
      ],
      more: [
        "Trade runs on promises.",
        "A shopkeeper promises the scale is honest, and a builder promises the wall will stand.",
        "When you take a chore, someone stops worrying about it because you said you would do it.",
        "If you cannot finish, say so early and give it back.",
        "A person known for keeping their word is offered the best work.",
        "That name takes years to earn and a day to lose."
      ],
      saying: {
        text: "He that is faithful in that which is least is faithful also in much.",
        from: "Luke 16:10"
      },
      tryThis: "If you have taken a chore you cannot finish, give it back today and say why.",
      ask: "Whom do you trust most to do what they say, and why?"
    },
    "give-some": {
      title: "Give some",
      lines: [
        "What you earned is yours to share.",
        "A gift costs you something, and that is what makes it a gift.",
        "Set a little aside for someone who needs it."
      ],
      more: [
        "You can only give away what is yours.",
        "That is why earning comes first: it makes you able to give.",
        "Families of faith have long set aside a tenth before spending anything.",
        "A gift given quietly helps the one who receives it and shapes the one who gives.",
        "Giving time counts as well: a chore done for a neighbor, with no reward asked.",
        "Decide your share before the sats arrive, and giving becomes a habit."
      ],
      saying: {
        text: "It is more blessed to give than to receive.",
        from: "Acts 20:35"
      },
      tryThis: "Choose a share to give from your next reward, and who it is for.",
      ask: "Who near us could use some help this week?"
    },
    "what-to-save-for": {
      title: "Why save, and for what?",
      lines: [
        "Saving turns many small rewards into one big thing.",
        "A goal gives each chore a reason.",
        "Pick something worth the wait."
      ],
      more: [
        "Save first for something you can reach in a few weeks, so you learn that it works.",
        "A good tool is a fine first goal: a pocket knife, a fishing rod, a set of pencils.",
        "Next, save for something that earns: seeds, a few laying hens, a mower to cut lawns with.",
        "Things that earn are called capital, and they are how savings grow by work.",
        "Keep some back for a rainy day, because things break when you least expect it.",
        "Some families save for the far future: a first truck, a trade school, a piece of land.",
        "Sats set aside for years may be worth more or less in dollars when you spend them."
      ],
      saying: {
        text: "There is treasure to be desired and oil in the dwelling of the wise; but a foolish man spendeth it up.",
        from: "Proverbs 21:20"
      },
      tryThis: "Write down one goal for this month and one for this year, and what each costs in sats.",
      ask: "What did you save for when you were my age?"
    },
    "where-else-to-earn": {
      title: "Where else can I earn sats?",
      lines: [
        "Chores at home are one way.",
        "Anyone with a Lightning wallet can pay you.",
        "The surest way is to make or do something people want."
      ],
      more: [
        "Sell what you grow or make: eggs, vegetables, firewood, baking, a craft.",
        "A sign with your wallet's code on it turns a farm stand into a shop that takes sats.",
        "Offer work to neighbors: mowing, raking, shoveling snow, pet sitting.",
        "Ask grandparents and godparents to send birthday money as sats.",
        "Some apps pay small amounts of sats for reading, listening or writing.",
        "Those amounts are small, and each app has its own rules and its own reasons for paying.",
        "Use them with a parent, and never give an app your wallet's secret words."
      ],
      tryThis: "Think of one thing you could sell or one job you could do for a neighbor, and ask a parent about it.",
      ask: "What could our family make or grow that someone would pay for?",
      links: [
        "A Bible app that rewards daily reading with sats.",
        "A podcast app that pays sats for listening.",
        "A forum where good posts earn sats. For older children, with a parent."
      ],
      care: "ChipIn does not run these and is not paid by them. Read each one's terms with a parent."
    },
    "where-to-give": {
      title: "Where can I give?",
      lines: [
        "Give first to people you can see.",
        "Then to work you believe in, farther away.",
        "Sats cross the world in a second, so a small gift can go a long way."
      ],
      more: [
        "Begin close to home: your church, a neighbor in need, a family having a hard season.",
        "If your church does not take sats yet, give in the plate and offer to help them set it up.",
        "A gift of time counts: a chore done for someone who cannot do it.",
        "Farther off, some groups take sats directly and say what they do with them.",
        "Before giving to anyone you do not know, ask a parent to look at who they are.",
        "Give quietly, and do not keep count of thanks."
      ],
      saying: {
        text: "God loveth a cheerful giver.",
        from: "2 Corinthians 9:7"
      },
      tryThis: "Choose one person or cause, and set aside a share of your next reward for them.",
      ask: "Who has been generous to our family, and what did it mean to us?",
      links: [
        "People raising sats for projects, many of them schools and communities.",
        "Pays the people who build Bitcoin's free software."
      ],
      care: "ChipIn does not vouch for any cause listed. Look into each one before you give."
    },
    "what-is-worth-buying": {
      title: "What is worth buying?",
      lines: [
        "Buy things that last, teach, or help you work.",
        "A thing that is gone in a day is rarely worth a week of chores.",
        "Before you spend, wait one night."
      ],
      more: [
        "A book is worth buying: it can be read again and lent to a friend.",
        "A tool is worth buying: it lets you do work you could not do before.",
        "Seeds and animals are worth buying: they turn into food, and sometimes into more sats.",
        "Good food is worth buying, most of all from a farmer you know.",
        "A gift for someone else is worth buying.",
        "Of anything you want, ask whether you will still be glad of it in a year.",
        "More shops take sats each year, and a map shows the ones near you."
      ],
      tryThis: "Look at the last three things you wanted, and ask of each whether you would still want it in a year.",
      ask: "What is the best thing our family ever bought, and why?",
      links: [
        "Books on money, farming and family, and coffee.",
        "A map of shops and farms near you that take bitcoin."
      ],
      care: "A listing may be out of date. Ask the shop before you go."
    },
    "the-virtues": {
      title: "The seven virtues",
      lines: [
        "A virtue is a good habit of the heart.",
        "Christians have long taught seven: three given by God and four that anyone can practice.",
        "Chores are a good place to practice them."
      ],
      more: [
        "The three theological virtues come from Saint Paul's first letter to the Corinthians.",
        "The four cardinal virtues were named by the Greeks and taken up by Ambrose, Augustine and Aquinas.",
        "Cardinal comes from the Latin for hinge: the rest of a good life swings on these four.",
        "Other lists are taught beside these, and they agree more than they differ.",
        "The fruit of the Spirit in Galatians 5 names love, joy, peace, patience, kindness, goodness, faithfulness, gentleness and self-control.",
        "A virtue grows the way a muscle does, by being used a little every day."
      ],
      points: [
        {
          group: "Theological",
          name: "Faith",
          says: "Trusting God and his promises."
        },
        {
          group: "Theological",
          name: "Hope",
          says: "Expecting good from God, and working toward it."
        },
        {
          group: "Theological",
          name: "Charity",
          says: "Loving God and neighbor by giving of yourself. Paul calls it the greatest."
        },
        {
          group: "Cardinal",
          name: "Prudence",
          says: "Choosing well: thinking before you take a chore or spend a sat."
        },
        {
          group: "Cardinal",
          name: "Justice",
          says: "Giving each person their due: honest work for honest pay."
        },
        {
          group: "Cardinal",
          name: "Fortitude",
          says: "Finishing the hard job when you would rather stop."
        },
        {
          group: "Cardinal",
          name: "Temperance",
          says: "Mastering what you want: saving when you could spend."
        }
      ],
      saying: {
        text: "And now abideth faith, hope, charity, these three; but the greatest of these is charity.",
        from: "1 Corinthians 13:13"
      },
      tryThis: "Pick one virtue for the week and notice each time a chore asks it of you.",
      ask: "Which of the seven comes easiest to you, and which is hardest?"
    }
  },
  words: [
    {
      word: "Bitcoin",
      means: "Money that lives on the internet and belongs to no bank or country."
    },
    {
      word: "Sat",
      means: "The smallest piece of a bitcoin. Short for satoshi."
    },
    {
      word: "Wallet",
      means: "The app that holds the key to your sats."
    },
    {
      word: "Lightning",
      means: "The fast way to send sats from one wallet to another."
    },
    {
      word: "Invoice",
      means: "A request for sats that a wallet writes. It starts with “lnbc”."
    },
    {
      word: "npub",
      means: "Your name on ChipIn. It is safe to share."
    },
    {
      word: "nsec",
      means: "The secret behind your npub. Never share it."
    },
    {
      word: "Blockchain",
      means: "The record of every bitcoin payment, kept by thousands of computers at once."
    }
  ],
  shelves: {
    money: "Money and markets",
    farm: "The small farm",
    land: "Land, family and ownership"
  },
  books: {
    "the-bitcoin-standard": "The history of money, and why a fixed supply matters.",
    "economics-in-one-lesson": "Look past today to what a choice does later.",
    "basic-economics": "How prices, work and trade fit together, in plain words.",
    "the-church-and-the-market": "A Christian case for free and honest trade.",
    "you-can-farm": "Starting a farm as a family business.",
    "the-market-gardener": "A living from an acre and a half.",
    "the-contrary-farmer": "A few dozen acres, farmed for the love of it.",
    "dirt-to-soil": "One family rebuilds its land.",
    "the-land-was-everything": "What the family farm gave a people.",
    "whats-wrong-with-the-world": "The home and the family as the measure of things.",
    "the-servile-state": "Why widely owned property keeps people free.",
    "small-is-beautiful": "Economics at the scale of people."
  }
};
