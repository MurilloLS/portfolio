/**
 * nav.js
 * Two scroll-driven behaviors on the top navigation:
 *  1. Adds `.scrolled` to the bar after a small offset (CSS handles the visual).
 *  2. Highlights the link of the section currently in view (scroll-spy).
 *
 * Listens with `passive: true` to keep scrolling smooth on mobile.
 */
import { $, $$ }       from "../core/dom.js";
import { SECTION_IDS } from "../core/constants.js";

const SCROLL_THRESHOLD     = 20;   // px before the nav border appears
const ACTIVE_OFFSET        = 120;  // how far above viewport top the section "snaps active"
const NEAR_BOTTOM_TOLERANCE = 80;  // px from page bottom that forces last section active

export function init() {
  const nav = $("nav.topnav");
  if (!nav) return;

  const sections = SECTION_IDS
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const links = $$(".nav-links a");

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);

    const probe = window.scrollY + ACTIVE_OFFSET;
    let active = null;
    for (const section of sections) {
      if (section.offsetTop <= probe) active = section.id;
    }

    // If essentially at the bottom of the page, force the last section active.
    // Useful for short final sections that never cross the probe line.
    const atBottom = window.innerHeight + window.scrollY
                   >= document.documentElement.scrollHeight - NEAR_BOTTOM_TOLERANCE;
    if (atBottom && sections.length) active = sections[sections.length - 1].id;

    for (const link of links) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + active);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on init to set initial state
}
