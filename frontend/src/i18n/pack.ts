/** Everything one language supplies: the UI catalog and the content. One chunk per language. */

import type { LessonsText } from "../lib/lessons.ts";
import type { QuoteText } from "../lib/quotes.ts";
import type { SamplesText } from "../lib/samples.ts";
import type { Messages } from "./en.ts";

export interface LanguagePack {
  messages: Messages;
  lessons: LessonsText;
  samples: SamplesText;
  quotes: QuoteText[];
}
