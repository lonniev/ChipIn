/**
 * One language's lessons, sample jobs and quotations. The words on ChipIn's
 * pages are in `src/i18n/<code>.ts`.
 *
 * A new language is this folder copied with every string translated, plus its
 * words file, both added to `registerChipIn` in `src/i18n/index.ts`.
 */

import type { LanguageContent } from "../../lib/content.ts";
import { lessons } from "./lessons.ts";
import { quotes } from "./quotes.ts";
import { samples } from "./samples.ts";

const content: LanguageContent = { lessons, samples, quotes };

export default content;
