/**
 * theme.js
 * Wires the theme toggle button and applies the current theme to <body>.
 * Reacts to state changes so any module can call `state.set('theme', ...)`
 * (notably the terminal `theme` command) and the UI stays in sync.
 */
import { $ }      from "../core/dom.js";
import { state }  from "../core/state.js";
import { THEMES } from "../core/constants.js";

const ICONS = {
  [THEMES.LIGHT]: "☀",
  [THEMES.DARK]:  "☾"
};

function apply(theme) {
  document.body.dataset.theme = theme;
  const btn = $("#themeBtn");
  if (btn) btn.textContent = ICONS[theme] ?? ICONS[THEMES.LIGHT];
}

export function init() {
  apply(state.get("theme"));
  state.subscribe("theme", apply);

  const btn = $("#themeBtn");
  if (btn) btn.addEventListener("click", () => state.toggleTheme());
}
