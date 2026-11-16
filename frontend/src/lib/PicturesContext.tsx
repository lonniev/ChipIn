/** The painting set this device chose, shared by every page that shows a lesson. */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { artFor } from "./lessonArt.ts";
import { DEFAULT_PICTURES, PICTURES_KEY, pictureSetAt, pictureSetFrom, type PictureSet } from "./pictures.ts";

interface Pictures {
  set: PictureSet;
  choose: (set: PictureSet) => void;
  /** Someone signed in sees the family they chose. A guest sees a different family each time. */
  chosen: boolean;
}

const Ctx = createContext<Pictures>({ set: DEFAULT_PICTURES, choose: () => {}, chosen: false });

function remembered(): PictureSet {
  try {
    return pictureSetFrom(localStorage.getItem(PICTURES_KEY));
  } catch {
    return DEFAULT_PICTURES;
  }
}

export function PicturesProvider({ signedIn, children }: { signedIn: boolean; children: ReactNode }) {
  const [set, setSet] = useState<PictureSet>(remembered);
  const choose = useCallback((next: PictureSet) => {
    setSet(next);
    try { localStorage.setItem(PICTURES_KEY, next); } catch { /* the choice lasts this visit */ }
  }, []);
  const value = useMemo(() => ({ set, choose, chosen: signedIn }), [set, choose, signedIn]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePictures = () => useContext(Ctx);

/**
 * The painting for a lesson. Signed in, it is from the family's chosen set.
 * For a guest, each painting is drawn from a set picked afresh whenever it
 * comes on screen, so a visitor meets every family.
 */
export function useLessonArt(slug: string): string | undefined {
  const { set, chosen } = useContext(Ctx);
  // A new pick for each lesson shown, and again each time the same lesson comes back on screen.
  const guestSet = useMemo<PictureSet>(() => pictureSetAt(Math.random()), [slug]);
  return artFor(slug, chosen ? set : guestSet);
}
