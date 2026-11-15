/** The family's names, shared by every page and kept on this device. */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadFamily, nameOf, saveFamily, withMember, withoutMember, type Member } from "./family.ts";

interface Family {
  members: Member[];
  add: (npub: string, name: string) => void;
  remove: (npub: string) => void;
  /** "You", a name given here, or a short npub. */
  name: (npub: string) => string;
}

const Ctx = createContext<Family | null>(null);

export function FamilyProvider({ me, children }: { me: string; children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(loadFamily);

  // Another tab changed the names.
  useEffect(() => {
    const onStorage = () => setMembers(loadFamily());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const change = useCallback((next: (list: Member[]) => Member[]) => {
    setMembers((list) => {
      const changed = next(list);
      saveFamily(changed);
      return changed;
    });
  }, []);

  const value = useMemo<Family>(() => ({
    members,
    add: (npub, name) => change((list) => withMember(list, npub, name)),
    remove: (npub) => change((list) => withoutMember(list, npub)),
    name: (npub) => nameOf(members, npub, me),
  }), [members, me, change]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFamily(): Family {
  const family = useContext(Ctx);
  if (!family) throw new Error("useFamily needs a FamilyProvider above it.");
  return family;
}
