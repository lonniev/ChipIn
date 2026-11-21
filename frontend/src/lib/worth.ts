/**
 * What sats are worth in a family's own currency, today and ahead.
 * The prices are mempool.space's, passed on by Task Booth. The sums are ChipIn's.
 */

import type { Point } from "./savings.ts";

const SATS = 100_000_000;
const YEAR = 365 * 86_400;

export const FIATS = ["USD", "EUR", "GBP", "CAD", "CHF", "AUD", "JPY"] as const;
export type Fiat = (typeof FIATS)[number];

export const isFiat = (value: unknown): value is Fiat => FIATS.includes(value as Fiat);

export const FIAT_KEY = "chipin:fiat";

/** The currency this device last chose, remembered here only as a convenience. */
export function rememberedFiat(): Fiat {
  try {
    const kept = localStorage.getItem(FIAT_KEY);
    return isFiat(kept) ? kept : "USD";
  } catch {
    return "USD";
  }
}

/** Sats in a currency at a price per bitcoin. */
export function worth(sats: number, price: number): number {
  return (sats / SATS) * price;
}

interface Reading {
  price: number;
  observed_at: number;
  history: { observed_at: number; price: number }[];
}

export interface Growth {
  /** Growth per year as a fraction: 0.25 is 25% a year. */
  perYear: number;
  /** The years the measure spans. */
  years: number;
}

/** How fast the price grew per year, from the oldest price given to today's. Null with nothing to measure from. */
export function yearlyGrowth(reading: Reading): Growth | null {
  const oldest = [...reading.history].sort((a, b) => a.observed_at - b.observed_at)[0];
  if (!oldest || oldest.price <= 0 || reading.price <= 0) return null;
  const years = (reading.observed_at - oldest.observed_at) / YEAR;
  if (years < 0.5) return null;
  return { perYear: (reading.price / oldest.price) ** (1 / years) - 1, years };
}

export interface WorthPoint {
  at: number;
  /** Worth if the price stays where it is today. */
  steady: number;
  /** Worth if the price keeps growing as it has. */
  grown: number;
}

/** The sats ahead of you, in the currency: at today's price, and at a price that keeps its past pace. */
export function worthAhead(ahead: Point[], price: number, growth: Growth | null, now: number): WorthPoint[] {
  return ahead.map((p) => {
    const years = Math.max(0, (p.at - now) / YEAR);
    const later = growth ? price * (1 + growth.perYear) ** years : price;
    return { at: p.at, steady: worth(p.sats, price), grown: worth(p.sats, later) };
  });
}

/** Money as the language on screen writes it, or the device's own way with none given: "$1.23", "¥190". Small sums keep their cents. */
export function asMoney(amount: number, fiat: string, locale?: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: fiat, maximumFractionDigits: amount >= 100 ? 0 : 2 }).format(amount);
}
