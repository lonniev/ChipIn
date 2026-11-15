/** True while someone is looking around the sample family: nothing may be sent, and links stay inside the sample. */

import { createContext, useContext } from "react";

export const LookContext = createContext(false);
export const useLooking = () => useContext(LookContext);
