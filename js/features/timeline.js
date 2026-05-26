/**
 * timeline.js (feature)
 * Renders the horizontal "Journey" timeline.
 *
 * The data is intentionally reversed so the most recent entry appears
 * on the right — chronological flow left → right matches a Western
 * reading order while keeping the data array newest-first.
 *
 * Re-renders on:
 *   - state.lang → translate title / org / description
 */
import { $ }             from "../core/dom.js";
import { state }         from "../core/state.js";
import { observeReveal } from "../core/observer.js";
import { t }             from "./i18n.js";
import data              from "../data/index.js";

function itemTemplate(entry, index, isLatest) {
  return `
    <div class="tl-h-item ${isLatest ? "active" : ""}" data-reveal data-delay="${index}">
      <div class="tl-h-year">${entry.year}</div>
      <div class="tl-h-title">${t(entry.key + "Title")}</div>
      <div class="tl-h-org">${t(entry.key + "Org")}</div>
      <div class="tl-h-desc">${t(entry.key + "Desc")}</div>
    </div>
  `;
}

function render() {
  const el = $("#timeline");
  if (!el) return;

  const items = [...data.timeline].reverse(); // chronological left → right
  el.innerHTML = items
    .map((entry, i) => itemTemplate(entry, i, i === items.length - 1))
    .join("");

  el.querySelectorAll("[data-reveal]").forEach(observeReveal);
}

export function init() {
  render();
  state.subscribe("lang", render);
}
