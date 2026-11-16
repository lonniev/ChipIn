/** The tours: the package's shared ones for sign-in, the wallet and the profile. */

import { accountTour, signInTour, walletTour, type Tour } from "@tollbooth-dpyc/web";
import type { Translate } from "../i18n/index.ts";

/** The tours, with ChipIn's own step said in the language on screen. */
export function toursIn(t: Translate): Record<string, Tour> {
  return {
    signin: signInTour(),
    wallet: walletTour(),
    account: accountTour("account", [
      { target: "account.payout", title: t("profile.payout.title"), says: t("profile.payout.tour") },
    ]),
  };
}
