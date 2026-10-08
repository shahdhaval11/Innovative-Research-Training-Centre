"use client";

import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

// Placeholder for CKEditor: same value/onChange contract, so it can be swapped
// for <CKEditor /> without touching the form that uses it.
const TOOLS = [
  { cmd: "bold", icon: Bold, label: "Bold" },
  { cmd: "italic", icon: Italic, label: "Italic" },
  { cmd: "insertUnorderedList", icon: List, label: "Bulleted list" },
  { cmd: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
];

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
  }, [value]);

  return (
    <div className="min-w-0 overflow-hidden rounded-md border border-secondary-200 focus-within:border-primary-600">
      <div className="flex gap-1 border-b border-secondary-100 bg-secondary-50 p-1.5">
        {TOOLS.map(({ cmd, icon: Icon, label }) => (
          <button
            key={cmd}
            type="button"
            aria-label={label}
            onMouseDown={(e) => {
              e.preventDefault();
              document.execCommand(cmd);
              onChange(ref.current?.innerHTML ?? "");
            }}
            className="rounded p-1.5 text-secondary-600 hover:bg-secondary-200"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="h-48 resize-y overflow-y-auto px-3 py-2 text-sm leading-relaxed [overflow-wrap:anywhere] text-secondary-800 outline-none [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
}
