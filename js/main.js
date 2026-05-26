/**
 * main.js
 * Entry point. Imports every feature and calls its `init()` once the DOM
 * is parsed. This module is the only place where the boot order is defined.
 *
 * Architecture in one paragraph:
 *   - State lives in `core/state.js` and is the only mutable shared thing.
 *   - Features subscribe to the slices of state they care about and re-render.
 *   - Features never call each other — they communicate through state.
 *   - Data is read-only and imported from `data/`.
 *
 * Boot order rationale:
 *   1. theme  — sets the body attribute before paint so there is no FOUC.
 *   2. i18n   — translates static `data-i` elements before features render
 *               (chips, cards, etc. read the active language from `t()`).
 *   3. structure features (stack, nav, cursor) — pure DOM wiring.
 *   4. content features (filters, projects, timeline, certifications) —
 *      each subscribes to state on init and renders the initial view.
 *   5. reveal  — last so every `[data-reveal]` element added by earlier
 *      features is already in the DOM when the observer wires up.
 *   6. terminal/contact/footer — independent UI sprinkles.
 */
import * as theme          from "./features/theme.js";
import * as i18n           from "./features/i18n.js";
import * as cursor         from "./features/cursor.js";
import * as nav            from "./features/nav.js";
import * as stack          from "./features/stack.js";
import * as filters        from "./features/filters.js";
import * as projects       from "./features/projects.js";
import * as timeline       from "./features/timeline.js";
import * as certifications from "./features/certifications.js";
import * as contact        from "./features/contact.js";
import * as terminal       from "./features/terminal.js";
import * as reveal         from "./features/reveal.js";
import * as footer         from "./features/footer.js";

function boot() {
  // 1. Theme first to prevent flash-of-wrong-theme.
  theme.init();

  // 2. Translate static markup before features render dynamic content.
  i18n.init();

  // 3. Pure structural features.
  cursor.init();
  nav.init();
  stack.init();

  // 4. Content features (each subscribes to its slice of state).
  filters.init();
  projects.init();
  timeline.init();
  certifications.init();

  // 5. Reveal observer last so it picks up every [data-reveal] node.
  reveal.init();

  // 6. Sprinkles.
  contact.init();
  terminal.init();
  footer.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
