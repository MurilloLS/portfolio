/**
 * timeline.js
 * Career and education events shown horizontally in the "Journey" section.
 * The renderer reverses this list so chronological order reads left → right.
 *
 * Each entry references three i18n keys: `${key}Title`, `${key}Org`, `${key}Desc`.
 * `icon` is currently informational; you can extend the renderer to use it.
 */
export const timeline = [
  { year: "2025 — now",  key: "tlUsi",   icon: "work" },
  { year: "2024 — 2026", key: "tlCaju",  icon: "work" },
  { year: "2023 — 2026", key: "tlFatec", icon: "educ" },
  { year: "2021 — 2022", key: "tlTec",   icon: "educ" }
];
