import type { Access } from "@/content/projects";
import { accessFor } from "@/content/projects-en";
import type { Lang } from "@/i18n";

const MARK: Record<Access, string> = {
  online: "●",
  "codigo-aberto": "</>",
  privado: "■",
  "em-breve": "◐",
};

/** What a visitor can open: online / open source / private. */
export function AccessBadge({ access, lang = "pt", className = "" }: { access: Access; lang?: Lang; className?: string }) {
  const a = accessFor(lang)[access];
  return (
    <span
      title={a.hint}
      className={`inline-flex items-center gap-1.5 border px-1.5 py-0.5 font-mono text-[10.5px] tracking-[0.06em] whitespace-nowrap uppercase ${
        access === "privado" ? "border-line text-muted" : "border-accent text-accent"
      } ${className}`}
    >
      <span aria-hidden>{MARK[access]}</span>
      {a.label}
    </span>
  );
}
