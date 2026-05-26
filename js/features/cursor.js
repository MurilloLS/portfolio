/**
 * cursor.js
 * The terminal-prompt-styled cursor that follows the mouse with a small
 * lerp smoothing factor. Adds `cursor-active` to <body> while hovering
 * interactive elements so the CSS can morph the cursor look.
 */
import { $ } from "../core/dom.js";

const SMOOTHING = 0.5;
const INTERACTIVE_SELECTOR = "a, button, .project-card, .chip";

export function init() {
  const dot = $(".cursor-dot");
  if (!dot) return; // touch-only viewports hide the cursor — nothing to do

  let targetX = -100, targetY = -100;
  let renderedX = -100, renderedY = -100;

  window.addEventListener("mousemove", e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function tick() {
    renderedX += (targetX - renderedX) * SMOOTHING;
    renderedY += (targetY - renderedY) * SMOOTHING;
    dot.style.transform = `translate(${renderedX}px, ${renderedY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener("mouseover", e => {
    if (e.target.closest(INTERACTIVE_SELECTOR)) {
      document.body.classList.add("cursor-active");
    }
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(INTERACTIVE_SELECTOR)) {
      document.body.classList.remove("cursor-active");
    }
  });
}
