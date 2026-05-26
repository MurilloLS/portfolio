/**
 * projects.js (feature)
 * Renders the project cards. Filtering is driven by `state.filter`; the
 * chips themselves live in `features/filters.js`.
 *
 * Re-renders on:
 *   - state.lang   → translate description, "Featured" badge, "View on GitHub"
 *   - state.filter → narrow the visible list
 *
 * Cards are clickable to expand the description (mobile-friendly, since
 * mobile has no hover). Clicks on the inner anchor don't trigger the toggle.
 */
import { $ }              from "../core/dom.js";
import { state }          from "../core/state.js";
import { observeReveal }  from "../core/observer.js";
import { t }              from "./i18n.js";
import data               from "../data/index.js";

function cardTemplate(project, index) {
  const featuredBadge = project.featured
    ? `<span class="featured-mark">${t("featured")}</span>`
    : "";
  const starsOrId = project.stars > 0 ? `★ ${project.stars}` : `/${project.id}`;

  return `
    <div class="project-card" data-reveal data-id="${project.id}" data-delay="${(index % 2) + 1}">
      <div class="header-bar">
        <div class="lang">${project.lang}</div>
        <div style="display:flex;gap:8px;align-items:center">
          ${featuredBadge}
          <span>${project.year}</span>
        </div>
      </div>
      <div class="body">
        <h3>${project.title}</h3>
        <div class="desc">${t(project.descKey) ?? ""}</div>
        <div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
      <div class="footer-bar">
        <span>${starsOrId}</span>
        <a class="link" href="${project.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${t("viewRepo")} →</a>
      </div>
    </div>
  `;
}

function render() {
  const grid = $("#projects");
  if (!grid) return;

  const activeFilter = state.get("filter");
  const visible = data.projects.filter(p =>
    activeFilter === "all" || p.filterTags.includes(activeFilter)
  );

  grid.innerHTML = visible.map(cardTemplate).join("");

  grid.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      card.classList.toggle("locked");
    });
    observeReveal(card);
  });
}

export function init() {
  render();
  state.subscribe("lang", render);
  state.subscribe("filter", render);
}
