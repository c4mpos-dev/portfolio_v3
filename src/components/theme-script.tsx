"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useRef } from "react";
import { themeInitScript } from "./theme-toggle";

/**
 * Applies the saved theme before the first paint. Inserted only into the server HTML
 * (once), so React never renders a <script> on the client — which it warns about when
 * the root layout re-renders, e.g. on a language switch. After that, LangProvider
 * restores the theme itself.
 */
export function ThemeScript() {
  const inserted = useRef(false);
  useServerInsertedHTML(() => {
    if (inserted.current) return null;
    inserted.current = true;
    return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
  });
  return null;
}
