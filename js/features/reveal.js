/**
 * reveal.js
 * Wires every `[data-reveal]` element to the shared IntersectionObserver
 * defined in `core/observer.js`.
 *
 * Failsafe: if the page is rendered inside an iframe (or any context where
 * IntersectionObserver doesn't fire on initial layout), elements that
 * happen to be above the fold get revealed manually after the first paint.
 */
import { $$ }            from "../core/dom.js";
import io, { observeReveal } from "../core/observer.js";

function revealVisibleNow() {
  const vh = window.innerHeight;
  $$("[data-reveal]:not(.in)").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
      el.classList.add("in");
      io.unobserve(el);
    }
  });
}

export function init() {
  $$("[data-reveal]").forEach(observeReveal);
  requestAnimationFrame(() => requestAnimationFrame(revealVisibleNow));
  setTimeout(revealVisibleNow, 400);
}
