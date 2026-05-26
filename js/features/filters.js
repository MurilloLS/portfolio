/**
 * filters.js
 * Renders the filter chips above the project grid. Clicking a chip writes
 * to `state.filter` — the projects feature is subscribed to that key and
 * re-renders. This is the textbook example of decoupled rendering:
 * filters know nothing about projects, and vice versa.
 *
 * Re-renders on:
 *   - state.lang   → label of "All" chip is translated
 *   - state.filter → highlight the active chip
 */
import { $ }     from "../core/dom.js";
import { state } from "../core/state.js";
import { t }     from "./i18n.js";
import data      from "../data/index.js";

function chipLabel(filter) {
  if (filter.labelKey) return t(filter.labelKey) ?? filter.id;
  return filter.label ?? filter.id;
}

function render() {
  const el = $("#filters");
  if (!el) return;

  const active = state.get("filter");
  el.innerHTML = data.filters.map(f => `
    <button class="chip ${f.id === active ? "active" : ""}" data-f="${f.id}">${chipLabel(f)}</button>
  `).join("");

  el.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => state.set("filter", chip.dataset.f));
  });
}

export function init() {
  render();
  state.subscribe("lang", render);
  state.subscribe("filter", render);
}
