/** Where a chore stands, as an icon and a word. */

import { BadgeCheck, Ban, CircleDot, ClipboardCheck, Hand, Hourglass, Scale, Star, Undo2, Zap } from "lucide-react";
import { STANDING_WORD, type Standing } from "../lib/moves";

const ICON: Record<Standing, typeof Zap> = {
  posted: CircleDot,
  expired: Hourglass,
  claimed: Hand,
  done: ClipboardCheck,
  assessed: Star,
  appealed: Scale,
  owed: Zap,
  paid: BadgeCheck,
  rejected: Ban,
  withdrawn: Undo2,
};

export default function StandingBadge({ standing }: { standing: Standing }) {
  const Icon = ICON[standing];
  return (
    <span className={`badge badge-${standing}`}>
      <Icon size={14} aria-hidden />
      {STANDING_WORD[standing]}
    </span>
  );
}
