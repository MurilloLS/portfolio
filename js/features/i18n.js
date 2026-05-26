/**
 * i18n.js (feature)
 * Translates every element carrying a `data-i` attribute. Reacts to
 * `state.lang` changes so other features just call `state.set('lang', ...)`
 * (the language pill click, the terminal `lang` command, etc.).
 *
 * Exports `t(key)` so renderers can resolve the active translation
 * without depending on state directly.
 */
import { $, $$ } from "../core/dom.js";
import { state } from "../core/state.js";
import { LANGS } from "../core/constants.js";
import data      from "../data/index.js";

/** Lookup a translated string in the current language. */
export function t(key) {
  return data.i18n[state.get("lang")]?.[key];
}

function apply(lang) {
  const dict = data.i18n[lang];
  if (!dict) return;

  $$("[data-i]").forEach(el => {
    const value = dict[el.dataset.i];
    if (value == null) return;
    el.textContent = value;
    el.classList.toggle("i-empty", value.trim() === "");
  });

  // Highlight the active segment of the language pill (if rendered as segments).
  $$("#langPill .seg").forEach(seg => {
    seg.classList.toggle("active", seg.dataset.lang === lang);
  });

  document.documentElement.lang = lang === LANGS.PT ? "pt-BR" : "en";
}

export function init() {
  apply(state.get("lang"));
  state.subscribe("lang", apply);

  const pill = $("#langPill");
  if (pill) pill.addEventListener("click", () => state.toggleLang());
}
