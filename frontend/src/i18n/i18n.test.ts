import { test } from "node:test";
import assert from "node:assert/strict";
import english, { en } from "./en.ts";
import { DEFAULT_LANGUAGE, LANGUAGE_KEY, LANGUAGES, languageForBrowser, languageFrom, localeFor } from "./languages.ts";
import { fill, holesOf, pieces, say, translator } from "./translate.ts";

test("there are six languages, each named in its own words, and English is the default", () => {
  assert.deepEqual(LANGUAGES.map((l) => l.code), ["en", "fr", "es", "ja", "zh", "hi"]);
  assert.deepEqual(LANGUAGES.map((l) => l.name), ["English", "Français", "Español", "日本語", "中文", "हिन्दी"]);
  assert.equal(DEFAULT_LANGUAGE, "en");
  assert.equal(LANGUAGE_KEY, "chipin:language");
});

test("a browser's language is matched by its first part, whatever the region", () => {
  assert.equal(languageForBrowser(["fr-CA"]), "fr");
  assert.equal(languageForBrowser(["zh-TW"]), "zh");
  assert.equal(languageForBrowser(["zh-Hant-HK"]), "zh");
  assert.equal(languageForBrowser(["es-419"]), "es");
  assert.equal(languageForBrowser(["JA"]), "ja");
  assert.equal(languageForBrowser(["hi_IN"]), "hi");
  assert.equal(languageForBrowser(["en-GB"]), "en");
});

test("the first preferred language ChipIn has wins, and none of them is English", () => {
  assert.equal(languageForBrowser(["de-DE", "es-MX", "fr"]), "es");
  assert.equal(languageForBrowser(["de", "pt-BR"]), "en");
  assert.equal(languageForBrowser([]), "en");
});

test("a stored choice that is not a language falls back to English", () => {
  assert.equal(languageFrom("ja"), "ja");
  assert.equal(languageFrom("fr-CA"), "en");
  assert.equal(languageFrom("klingon"), "en");
  assert.equal(languageFrom(null), "en");
  assert.equal(languageFrom(7), "en");
});

test("dates and money follow the browser's own variant of the language on screen", () => {
  assert.equal(localeFor("en", ["en-GB", "fr"]), "en-GB");
  assert.equal(localeFor("fr", ["en-GB", "fr-CA"]), "fr-CA");
  assert.equal(localeFor("ja", ["en-US"]), "ja");
  assert.equal(localeFor("zh", []), "zh");
});

test("a message's places are filled, and a place nobody filled stays visible", () => {
  assert.equal(fill("in {days} days", { days: 3 }), "in 3 days");
  assert.equal(fill("{a} and {a} and {b}", { a: "x", b: 0 }), "x and x and 0");
  assert.equal(fill("Pay {sats} sats", {}), "Pay {sats} sats");
  assert.equal(fill("Pay {sats} sats"), "Pay {sats} sats");
  assert.equal(fill("Remove {name}", { other: "x" }), "Remove {name}");
  assert.equal(fill("no places", { days: 3 }), "no places");
});

test("t says a key in the catalog's words, and in English when the catalog lacks it", () => {
  const t = translator({ "nav.chores": "Corvées", "due.inDays": "dans {days} jours" }, english);
  assert.equal(t("nav.chores"), "Corvées");
  assert.equal(t("due.inDays", { days: 3 }), "dans 3 jours");
  assert.equal(t("nav.family"), "Family");
  assert.equal(t("actions.paySats"), "Pay {sats} sats");
  assert.equal(say(t, { key: "due.inDays", vars: { days: 2 } }), "dans 2 jours");
  assert.equal(say(t, null), "");
});

test("a message is cut at its places, so a page can put a link in one", () => {
  assert.deepEqual(pieces("This is a sample. {signIn} to do it for real."), ["This is a sample. ", { hole: "signIn" }, " to do it for real."]);
  assert.deepEqual(pieces("{sats} sats saved"), [{ hole: "sats" }, " sats saved"]);
  assert.deepEqual(pieces("plain"), ["plain"]);
  assert.deepEqual(holesOf("{b} then {a}"), ["a", "b"]);
});

test("every English message says something, and its key reads as dotted words", () => {
  const keys = Object.keys(en);
  assert.ok(keys.length > 200);
  for (const [key, text] of Object.entries(en)) {
    assert.match(key, /^[a-z][A-Za-z_]*(\.[A-Za-z_]+)+$/, key);
    assert.ok(text.trim().length > 0, key);
  }
});

test("the default export is the English catalog itself", () => {
  assert.equal(english, en);
});
