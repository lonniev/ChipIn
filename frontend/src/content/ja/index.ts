/**
 * English, whole: the UI catalog and the content.
 *
 * A new language is this folder copied, with every string translated, plus its
 * UI catalog at `src/i18n/<code>.ts`. In the copy, change the one import below
 * from `en.ts` to that catalog.
 */

import messages from "../../i18n/ja.ts";
import type { LanguagePack } from "../../i18n/pack.ts";
import { lessons } from "./lessons.ts";
import { quotes } from "./quotes.ts";
import { samples } from "./samples.ts";

const pack: LanguagePack = { messages, lessons, samples, quotes };

export default pack;
