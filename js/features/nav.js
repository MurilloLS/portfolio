/**
 * nav.js
 * Three responsibilities on the top navigation:
 *  1. Adds `.scrolled` to the bar after a small offset (CSS handles the visual).
 *  2. Highlights the link of the section currently in view (scroll-spy).
 *  3. Toggles the mobile drawer (hamburger menu).
 *
 * Listens with `passive: true` to keep scrolling smooth on mobile.
 */
import { $, $$ }       from "../core/dom.js";
import { SECTION_IDS } from "../core/constants.js";

const SCROLL_THRESHOLD      = 20;
const ACTIVE_OFFSET         = 120;
const NEAR_BOTTOM_TOLERANCE = 80;

export function init() {
  const nav = $("nav.topnav");
  if (!nav) return;

  const sections = SECTION_IDS
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const links = $$(".nav-links a");

  // --- Scroll behavior + scroll-spy -------------------------------------
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);

    const probe = window.scrollY + ACTIVE_OFFSET;
    let active = null;
    for (const section of sections) {
      if (section.offsetTop <= probe) active = section.id;
    }

    const atBottom = window.innerHeight + window.scrollY
                   >= document.documentElement.scrollHeight - NEAR_BOTTOM_TOLERANCE;
    if (atBottom && sections.length) active = sections[sections.length - 1].id;

    for (const link of links) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + active);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Mobile drawer (hamburger) ----------------------------------------
  const toggle      = $("#navToggle");
  const linksGroup  = $(".nav-links");
  if (!toggle || !linksGroup) return;

  function setDrawer(open) {
    toggle.setAttribute("aria-expanded", String(open));
    linksGroup.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setDrawer(!isOpen);
  });

  // Clicking a link inside the drawer closes it (after the scroll-to anchor).
  links.forEach(link => link.addEventListener("click", () => setDrawer(false)));

  // Escape closes the drawer when open.
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setDrawer(false);
    }
  });

  // If user resizes from mobile back to desktop while drawer is open, close it.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && linksGroup.classList.contains("open")) {
      setDrawer(false);
    }
  });
}