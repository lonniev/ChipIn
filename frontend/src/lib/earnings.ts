/** What someone has earned from chores, from the list Task Queue gave. */

interface Earning {
  performer: string | null;
  standing: string;
  assessment?: { sats: number } | null;
}

export interface Earnings {
  /** Sats that arrived. */
  earned: number;
  /** Sats graded and owed, still on their way. */
  coming: number;
}

export function earningsOf(tasks: Earning[], me: string): Earnings {
  return tasks.reduce<Earnings>((sum, t) => {
    if (!me || t.performer !== me) return sum;
    const sats = t.assessment?.sats ?? 0;
    if (t.standing === "paid") return { ...sum, earned: sum.earned + sats };
    if (t.standing === "owed") return { ...sum, coming: sum.coming + sats };
    return sum;
  }, { earned: 0, coming: 0 });
}
