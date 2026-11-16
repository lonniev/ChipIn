/**
 * The big editor for a job's details: a sheet over the page with room to write,
 * buttons that add Markdown (bold, lists, checklists, links, code), and a
 * preview of how the job page will show it.
 */

import { useEffect, useRef, useState } from "react";
import { Bold, Code, Heading2, Italic, Link2, List, ListChecks, ListOrdered, Quote, SquareCode, X } from "lucide-react";
import { useT } from "../i18n";
import { apply, type Tool } from "../lib/markdownEdit";
import MarkdownText from "./MarkdownText";

const TOOLS: { tool: Tool; icon: typeof Bold }[] = [
  { tool: "bold", icon: Bold },
  { tool: "italic", icon: Italic },
  { tool: "heading", icon: Heading2 },
  { tool: "bullets", icon: List },
  { tool: "numbers", icon: ListOrdered },
  { tool: "checklist", icon: ListChecks },
  { tool: "quote", icon: Quote },
  { tool: "link", icon: Link2 },
  { tool: "code", icon: Code },
  { tool: "codeBlock", icon: SquareCode },
];

export default function SpecEditor({ value, maxLength, onDone }: {
  value: string;
  maxLength: number;
  /** The text as it stands when the editor closes. */
  onDone: (text: string) => void;
}) {
  const t = useT();
  const sheet = useRef<HTMLDialogElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(value);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const d = sheet.current;
    if (d && !d.open) d.showModal();
    box.current?.focus();
  }, []);

  function use(tool: Tool) {
    const el = box.current;
    if (!el) return;
    const made = apply(tool, text, el.selectionStart, el.selectionEnd, t("spec.filler"));
    if (made.text.length > maxLength) return;
    setText(made.text);
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(made.start, made.end); });
  }

  const left = maxLength - text.length;
  return (
    <dialog ref={sheet} className="spec-sheet" onCancel={(e) => { e.preventDefault(); onDone(text); }} aria-label={t("spec.title")}>
      <div className="spec-head">
        <h2 className="panel-title">{t("spec.title")}</h2>
        <button type="button" className="btn btn-go" onClick={() => onDone(text)}>{t("spec.done")}</button>
        <button type="button" className="icon-btn" onClick={() => onDone(text)} aria-label={t("spec.done")} title={t("spec.done")}>
          <X size={22} aria-hidden />
        </button>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("spec.view")}>
        <button type="button" className={!preview ? "pick pick-on" : "pick"} aria-pressed={!preview} onClick={() => setPreview(false)}>{t("spec.write")}</button>
        <button type="button" className={preview ? "pick pick-on" : "pick"} aria-pressed={preview} onClick={() => setPreview(true)}>{t("spec.preview")}</button>
      </div>
      {preview ? (
        <div className="spec-preview card panel">{text.trim() ? <MarkdownText text={text} /> : <p className="muted">{t("spec.empty")}</p>}</div>
      ) : (
        <>
          <div className="spec-tools" role="toolbar" aria-label={t("spec.tools")}>
            {TOOLS.map(({ tool, icon: Icon }) => (
              <button key={tool} type="button" className="icon-btn" onMouseDown={(e) => e.preventDefault()} onClick={() => use(tool)}
                aria-label={t(`spec.tool.${tool}`)} title={t(`spec.tool.${tool}`)}>
                <Icon size={20} aria-hidden />
              </button>
            ))}
          </div>
          <textarea ref={box} className="field spec-text" value={text} maxLength={maxLength} onChange={(e) => setText(e.target.value)}
            placeholder={t("newJob.wherePlaceholder")} aria-label={t("newJob.where")} />
          <p className="muted text-sm">{t("spec.help")}</p>
        </>
      )}
      <p className="muted text-right text-sm num">{t("newJob.charsLeft", { count: left })}</p>
    </dialog>
  );
}
