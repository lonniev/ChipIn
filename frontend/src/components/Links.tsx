/** A named person or chore is a link to it. */

import { Link } from "react-router-dom";
import { useFamily } from "../lib/FamilyContext";

export const choreHref = (taskId: string) => `/chores/${encodeURIComponent(taskId)}`;
export const personHref = (npub: string) => `/family?who=${encodeURIComponent(npub)}`;

export function PersonLink({ npub }: { npub: string }) {
  const { name } = useFamily();
  return <Link to={personHref(npub)} className="ent" title={npub}>{name(npub)}</Link>;
}

export function People({ npubs }: { npubs: string[] }) {
  return (
    <>
      {npubs.map((n, i) => (
        <span key={n}>{i > 0 && ", "}<PersonLink npub={n} /></span>
      ))}
    </>
  );
}
