/** The painting set this device chose, shared by every page that shows a lesson. */

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_PICTURES, PICTURES_KEY, pictureSetFrom, type PictureSet } from "./pictures.ts";

interface Pictures {
  set: PictureSet;
  choose: (set: PictureSet) => void;
}

const Ctx = createContext<Pictures>({ set: DEFAULT_PICTURES, choose: () => {} });

function remembered(): PictureSet {
  try {
    return pictureSetFrom(localStorage.getItem(PICTURES_KEY));
  } catch {
    return DEFAULT_PICTURES;
  }
}

export function PicturesProvider({ children }: { children: ReactNode }) {
  const [set, setSet] = useState<PictureSet>(remembered);
  const choose = useCallback((next: PictureSet) => {
    setSet(next);
    try { localStorage.setItem(PICTURES_KEY, next); } catch { /* the choice lasts this visit */ }
  }, []);
  const value = useMemo(() => ({ set, choose }), [set, choose]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePictures = () => useContext(Ctx);
