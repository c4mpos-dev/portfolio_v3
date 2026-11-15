import { notFound } from "next/navigation";

// Only ever renders the 404, so there is no navigation to keep instant.
export const instant = false;

/** Any address that matches no page renders the [lang] 404, inside the site's layout. */
export default function CatchAll() {
  notFound();
}
