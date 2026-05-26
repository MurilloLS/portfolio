/**
 * certifications.js (feature)
 * Renders three lists side by side in the "Certifications & Languages" block:
 *   #certsList   — certifications
 *   #coursesList — courses
 *   #langsList   — spoken languages with CEFR level
 *
 * Re-renders on:
 *   - state.lang → translate spoken-language names and the "Native" badge
 */
import { $ }     from "../core/dom.js";
import { state } from "../core/state.js";
import { t }     from "./i18n.js";
import data      from "../data/index.js";

function entryTemplate(entry) {
  const orgEl = entry.org ? `<span class="org">${entry.org}</span>` : "";
  return `<li><span class="name">${entry.name}</span>${orgEl}</li>`;
}

function languageTemplate(entry) {
  const name = t(entry.key) ?? entry.key;
  const level = entry.level === "native" ? t("langNative") : entry.level;
  return `<li><span class="name">${name}</span><span class="level">${level}</span></li>`;
}

function render() {
  const certs   = $("#certsList");
  const courses = $("#coursesList");
  const langs   = $("#langsList");
  if (!certs) return; // section absent — nothing to do

  certs.innerHTML   = data.certifications.map(entryTemplate).join("");
  if (courses) courses.innerHTML = data.courses.map(entryTemplate).join("");
  if (langs)   langs.innerHTML   = data.languages.map(languageTemplate).join("");
}

export function init() {
  render();
  state.subscribe("lang", render);
}
