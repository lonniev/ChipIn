/**
 * A text box that grows with what is written, so nothing is typed into a slit.
 * Browsers that size a box to its content do it in CSS (`field-sizing`); for the
 * rest the height follows the text after each change.
 */

import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";

const SIZES_ITSELF = typeof CSS !== "undefined" && typeof CSS.supports === "function" && CSS.supports("field-sizing", "content");

export default function GrowText({ value, onText, minRows = 1, oneLine = false, className = "", style, ...rest }: {
  value: string;
  onText: (text: string) => void;
  /** The least height, in lines, even when empty. */
  minRows?: number;
  /** A title: Enter does not start a new line, but long words still wrap. */
  oneLine?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  const box = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || SIZES_ITSELF) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      ref={box}
      rows={minRows}
      className={`field grow-text ${className}`}
      style={{ ...style, ["--rows" as string]: minRows }}
      value={value}
      onChange={(e) => onText(oneLine ? e.target.value.replace(/\s*\n\s*/g, " ") : e.target.value)}
      onKeyDown={oneLine ? (e) => { if (e.key === "Enter") e.preventDefault(); } : undefined}
      {...rest}
    />
  );
}
