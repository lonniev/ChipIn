/** The tours: the package's shared ones for sign-in, the wallet and the profile. */

import { accountTour, signInTour, walletTour, type Tour } from "@tollbooth-dpyc/web";

export const TOURS: Record<string, Tour> = {
  signin: signInTour(),
  wallet: walletTour(),
  account: accountTour("account", [
    { target: "account.payout", title: "Where you get paid", says: "A Lightning address, if your wallet gives you one. Without it, you ask your wallet for the sats each time." },
  ]),
};
