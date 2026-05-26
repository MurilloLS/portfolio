/**
 * contact.js
 * The "Copy email" button. Writes the email to the clipboard and
 * temporarily replaces the label with a ✓ confirmation in the active
 * language. The label revert uses the latest translation in case the
 * user toggles language mid-confirmation.
 */
import { $ } from "../core/dom.js";
import { t } from "./i18n.js";
import data  from "../data/index.js";

const FEEDBACK_MS = 1600;

export function init() {
  const btn = $("#copyEmailBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(data.email);
    } catch (err) {
      console.error("[contact] clipboard write failed:", err);
      return;
    }

    const label = btn.querySelector("[data-i]");
    if (!label) return;

    const original = label.textContent;
    label.textContent = "✓ " + (t("copied") ?? "Copied");
    setTimeout(() => { label.textContent = t("copyEmail") ?? original; }, FEEDBACK_MS);
  });
}
