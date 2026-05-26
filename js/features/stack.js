/**
 * stack.js (feature)
 * Renders the three stack columns (#stackLang, #stackCloud, #stackData).
 * Items are language-independent, so this only runs once at init.
 */
import { $ } from "../core/dom.js";
import data  from "../data/index.js";

function renderColumn(elementId, items) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.innerHTML = items.map((item, i) => `
    <div class="stack-pill">
      <span>${item}</span>
      <span class="meta">${String(i + 1).padStart(2, "0")}</span>
    </div>
  `).join("");
}

export function init() {
  renderColumn("stackLang",  [...data.stack.languages, ...data.stack.frameworks]);
  renderColumn("stackCloud", data.stack.cloud);
  renderColumn("stackData",  data.stack.data);
}
