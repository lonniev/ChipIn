/** A wait worth reading: the status line, then a quotation on work and thrift. */

import { QuoteScroller } from "@tollbooth-dpyc/web/react";
import { CHIPIN_QUOTES } from "../lib/quotes";

export default function Waiting({ heading }: { heading: string }) {
  return (
    <QuoteScroller
      quotes={CHIPIN_QUOTES}
      heading={heading}
      spinner
      intervalMs={6000}
      classNames={{
        root: "waiting",
        heading: "waiting-head",
        figure: "waiting-figure",
        text: "waiting-text",
        mark: "waiting-mark",
        author: "waiting-author",
      }}
    />
  );
}
