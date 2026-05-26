/**
 * footer.js
 * Replaces the `#year` placeholder with the current year. Trivial, but
 * extracting it keeps `main.js` free of one-liner side effects.
 */
import { $ } from "../core/dom.js";

export function init() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
