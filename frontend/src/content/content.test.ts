/**
 * Every language's files say everything English says, in the same shape.
 * English is checked against the structure in `src/lib`; every other language
 * folder that exists is checked against English, so a translation that drops a
 * lesson or a grade fails here. The words on the pages are checked in `src/i18n`.
 */

import { readdirSync, existsSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";
import english from "./en/index.ts";
import { LANGUAGES } from "@tollbooth-dpyc/web";
import type { LanguageContent } from "../lib/content.ts";
import { LESSON_SHAPES, libraryIn, SHELF_SHAPES } from "../lib/lessons.ts";
import { SAMPLE_SHAPES, samplesIn } from "../lib/samples.ts";

const here = new URL(".", import.meta.url);
const folders = readdirSync(here, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

const packs: Record<string, LanguageContent> = {};
for (const code of folders) packs[code] = (await import(new URL(`./${code}/index.ts`, here).href)).default;

test("every content folder is one of the languages, and has its UI catalog beside the English one", () => {
  assert.ok(folders.includes("en"));
  for (const code of folders) {
    assert.ok(LANGUAGES.some((l) => l.code === code), `src/content/${code} is not a language ChipIn offers`);
    assert.ok(existsSync(new URL(`../i18n/${code}.ts`, here)), `src/i18n/${code}.ts is missing`);
  }
});

test("the English content has words for every lesson, shelf, book and sample job", () => {
  for (const shape of LESSON_SHAPES) {
    const text = english.lessons.lessons[shape.slug];
    assert.ok(text, shape.slug);
    assert.ok(text.title && text.tryThis && text.ask && text.lines.length && text.more.length, shape.slug);
    const places = "links" in shape ? shape.links.length : 0;
    assert.equal(text.links?.length ?? 0, places, `${shape.slug}: one line for each outside link`);
  }
  assert.deepEqual(Object.keys(english.lessons.lessons).sort(), LESSON_SHAPES.map((s) => s.slug).sort());
  for (const shelf of SHELF_SHAPES) {
    assert.ok(english.lessons.shelves[shelf.key], shelf.key);
    for (const book of shelf.books) assert.ok(english.lessons.books[book.handle], book.handle);
  }
  for (const shape of SAMPLE_SHAPES) {
    const text = english.samples[shape.key];
    assert.ok(text && text.title && text.description && text.kind && text.teaches, shape.key);
    assert.equal(text.grades.length, shape.sats.length, `${shape.key}: one grade for each reward`);
  }
  assert.deepEqual(Object.keys(english.samples).sort(), SAMPLE_SHAPES.map((s) => s.key).sort());
  assert.ok(english.quotes.length > 0);
});

for (const [code, pack] of Object.entries(packs)) {
  test(`${code}: every lesson is told in full, in the same shape as English`, () => {
    assert.deepEqual(Object.keys(pack.lessons.lessons).sort(), Object.keys(english.lessons.lessons).sort());
    const mine = libraryIn(pack.lessons), theirs = libraryIn(english.lessons);
    theirs.lessons.forEach((model, i) => {
      const lesson = mine.lessons[i];
      assert.equal(lesson.slug, model.slug);
      assert.ok(lesson.title && lesson.tryThis && lesson.ask, model.slug);
      assert.equal(lesson.lines.length, model.lines.length, `${model.slug}: lines`);
      assert.equal(lesson.more.length, model.more.length, `${model.slug}: more`);
      for (const line of [...lesson.lines, ...lesson.more]) assert.ok(line.trim().length > 0, model.slug);
      assert.equal(!!lesson.saying, !!model.saying, `${model.slug}: saying`);
      if (lesson.saying) assert.ok(lesson.saying.text && lesson.saying.from, `${model.slug}: saying`);
      assert.equal(lesson.points?.length, model.points?.length, `${model.slug}: points`);
      assert.deepEqual(lesson.points?.map((p) => !!p.group), model.points?.map((p) => !!p.group), `${model.slug}: point groups`);
      for (const p of lesson.points ?? []) assert.ok(p.name && p.says, `${model.slug}: point`);
      assert.equal(pack.lessons.lessons[model.slug].links?.length, english.lessons.lessons[model.slug].links?.length, `${model.slug}: links`);
      for (const k of lesson.links ?? []) assert.ok(k.says, `${model.slug}: ${k.name}`);
      assert.equal(!!lesson.care, !!model.care, `${model.slug}: care`);
    });
    assert.equal(mine.words.length, theirs.words.length);
    for (const w of mine.words) assert.ok(w.word && w.means, w.word);
    for (const word of ["npub", "nsec"]) assert.ok(mine.words.some((w) => w.word === word), `${word} keeps its name`);
    for (const shelf of mine.shelves) {
      assert.ok(shelf.title, shelf.key);
      for (const book of shelf.books) assert.ok(book.says, book.handle);
    }
  });

  test(`${code}: every sample job has its words and a name for every grade`, () => {
    assert.deepEqual(Object.keys(pack.samples).sort(), Object.keys(english.samples).sort());
    const mine = samplesIn(pack.samples), theirs = samplesIn(english.samples);
    theirs.forEach((model, i) => {
      const sample = mine[i];
      assert.ok(sample.title && sample.kind && sample.teaches, model.key);
      assert.equal(sample.description.split("\n").length, model.description.split("\n").length, `${model.key}: one sentence to a line`);
      assert.equal(pack.samples[model.key].grades.length, model.rows.length, `${model.key}: grades`);
      sample.rows.forEach((row, j) => {
        assert.ok(row.name, `${model.key}: grade ${j + 1}`);
        assert.equal(!!row.criteria, !!model.rows[j].criteria, `${model.key}: ${row.name}`);
      });
      assert.equal(new Set(sample.rows.map((r) => r.name.toLowerCase())).size, sample.rows.length, `${model.key}: grade names differ`);
    });
  });

  test(`${code}: there is a quotation for each English one, each saying where it is from`, () => {
    assert.equal(pack.quotes.length, english.quotes.length);
    assert.equal(new Set(pack.quotes.map((q) => q.text)).size, pack.quotes.length);
    for (const q of pack.quotes) assert.ok(q.text && q.author, q.text);
  });
}
