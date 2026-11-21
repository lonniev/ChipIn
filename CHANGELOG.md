# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Changes not yet released live in `changelog.d/`, one file per change — see the README there for why, and `scripts/changelog.py` for what folds them in at release time.

## [0.3.0] — 2026-11-21

### Added

- Write it for me: say a job in a few words, and it fills in what you said and suggests a reward. Its questions are ticked off before the job can be posted.

## [0.2.1] — 2026-11-21

### Changed

- llms.txt opens with what to tell a family about ChipIn: jobs, a fair look at the work, real money, savings, lessons, the calendar and the sample family.

## [0.2.0] — 2026-11-20

### Changed

- Hindi addresses the reader informally (तुम), like French, Spanish and Chinese; quotations keep their own words.

- The Profile page now sits in folding groups: You, Money, This site and About, with Operator for the operator.
- Each group's panels sit side by side in a grid.

## [0.1.0] — 2026-11-18

### Added

- The farm scene from Good Brew sits behind every page.
- ChipIn has a site icon and can be added to a home screen.
- Each lesson on Learn opens into a longer telling, with something to try and a question for supper.
- Keep learning adds shelves for the small farm and for land, family and ownership.
- A Savings page: what you earned in sats and in bitcoin, your pace per week, and where that pace leads in a year.

- A family Calendar: each day shows when jobs were posted, taken on, done, graded and paid, and when they are due, late or missed; choose everyone or one person. It replaces the Jobs page's month view, and the sample family has one too.
- Late jobs: a parent chooses what lateness costs (pay in full, a percent off each day, or cancel if missed). Cards and job pages say how many days late; a graded job says what came off and why.
- Reminders: a child asks to be paid for an owed job; a parent says a job is due, from two days before. The other side sees a bell.
- A parent can change a job until someone takes it on.
- The job editor's text boxes grow as you write; each grade is its own card with a sats stepper and room to say what earns it.

- Profile adds "Jobs in your calendar": a private link your phone's calendar app subscribes to, with each job on its due day. The month view links to it.
- Savings shows what your sats are worth in USD, EUR, GBP, CAD, CHF, AUD or JPY, and a year ahead at today's price and at the pace bitcoin has measured over the last four years. Prices come from mempool.space.

- ChipIn: post a job with what each grade earns, claim it, mark it done, grade it, and pay it by Lightning invoice.

- The Guide holds the wallet chooser itself, so a guest can pick a wallet before signing in.
- The pay panel shows the invoice as a QR code to scan from another phone.
- Links to ChipIn shared in messages and on social sites show a picture and title.

- Pictures that look like your family: on Family and on Learn, choose which family the lesson paintings show, from four sets. The choice stays on the device.

- Jobs can be searched by title, details, person or standing, and ordered by due date, person or kind.
- A month view shows what is due each day.
- A piglet in the lower-left corner takes a coin when the page opens and whenever your earnings rise. Tap it to see what you have saved.

- A fifth family in the lesson paintings, Indian, offered in "Pictures that look like your family" and shown to guests in the mix.

- The site can be shown in six languages, chosen on Profile: English, Français, Español, 日本語, 中文 and हिन्दी. A guest sees their browser's language.

- Learn adds four topics on what sats are for: why save and for what, where else to earn, where to give, and what is worth buying. Each names a few places to look.
- Learn adds the seven virtues, three theological and four cardinal, as they show up in jobs.

- Each Learn topic has its own painting, on its card and at the head of its page.

- Look around: before signing in, a visitor can explore a sample family's jobs as a child or as a parent, open a job, and see sample savings. Nothing tapped there is sent.

- Adding a family member takes an npub field: checked as typed, shown as a chiclet with their Nostr name and picture, with Remove.

- A job's details can be written in Markdown: headings, bold and italic, lists and checklists, links, quotes, tables, pictures from https addresses, and code blocks. A "Bigger editor" button opens a full-screen sheet with formatting buttons and a preview; the job page shows the details formatted. Nothing in them can run: raw HTML is never drawn, links go only to web pages and email, and the details stay within 4,000 letters.
- The details box on the job form keeps its five-line height on iPad, where it had shrunk to two.

- Seven sample jobs that say where, when and what "done" looks like, on the home page, in the Guide, and as starting points on New job.
- A Learn page for someone new to Bitcoin: what a sat is, where it lives, how it moves, why the supply is fixed, and what to do with what you earn.
- Books at Good Brew and the Orange Bible app, under Keep learning.

- The Guide adds "Getting a wallet": who needs one, how a parent sets one up for a child, and the wallet chooser.

### Changed

- The site reads in American English: curb, trash cans, neighbor, pajamas, leash, Mom.

- The home page says "the goodness of a clean home".

- A guest sees the site in their device's light or dark setting.
- A guest sees a different family in each lesson painting, drawn afresh each time. Signed in, a family sees the set it chose; the choice is offered on Family and on Learn once signed in.

- The home page opens with "A family learns the worth of work.", the painting of a job rewarded, and what ChipIn does for a family in plain words.

- One language choice now changes every word on screen, sign-in and the wallet included. ChipIn hands its words, lessons, sample jobs and quotations to the shared web package, which does all the translating; ChipIn's own language code is gone.
- A guest's first visit is in the language of the country they are in (the browser choosing where a country speaks several), else English. A choice made before this change is not carried over; choose again once on Profile.

- Any Lightning wallet now works. When a job is owed, the person who did it asks their wallet for the sats and pastes the request in.
- A Lightning address on the Profile is optional, and taking a job no longer asks for one.

- The quotations shown during a wait draw on Proverbs and the Gospels, and on Hazlitt and Mises.

- The picture and words shown when a ChipIn link is shared now set the scene: a mother rewarding her daughter for sweeping, and "A family learns the worth of work."

- A job's details and the big editor now come from `@tollbooth-dpyc/web/markdown` (3.11.0), shared with every site; they look and work as before.

- ChipIn names itself to Task Booth when it posts, lists and publishes a calendar, so commissions posted on CommissionMarket stay out of a family's jobs. Nothing on ChipIn's pages changes.

- The tabs read Welcome, Guide, Family, Jobs, Savings, Learn, Tollbooth, then your picture. The calendar opens from a button on the Jobs page.
- The Welcome page opens with the seven-doves painting and what ChipIn is for: practicing the virtues through work done well, and learning what money is worth. The sample family follows.

- The Operator behind ChipIn is now named Task Booth; ChipIn calls its tools by their new `taskbooth_` names.

- ChipIn reaches Task Booth at its new address, `taskbooth-mcp.fastmcp.app`.

- The Wallet page is named the Tollbooth DPYC™ wallet and says it holds api_sats, apart from the Lightning wallet your jobs are paid to.

- `@tollbooth-dpyc/web` 3.8.0.

- Look around is now the Welcome tab, first in the menu for guests and for people signed in.

- The pieces of work a family posts are called jobs, throughout the site and its addresses.

### Fixed

- Pages use the width the screen gives them: the page grows to 90rem (it stopped at 56rem), and the job form and the sign-in card no longer stop partway across.

- The Guide's six steps are laid out in columns again.

- A long refusal no longer pushes the job page wider than the phone.

- The four paintings in "Pictures that look like your family" load at once.

- Savings shows what your sats are worth again: the price request no longer carries an npub the price tool does not take.
- The word "Today" under the savings chart is no longer cut off at the left edge.

- The seven virtues painting now shows seven doves on the barn roof.

- The "Need a wallet?" button in the Guide is an ordinary button, readable in light and dark, without its second line.
