/**
 * certifications.js
 * Three lists rendered in the "Certifications & Languages" section.
 * `languages` here are spoken languages (not programming languages).
 * Each spoken language uses a `key` resolved against i18n.js plus a `level`
 * (a CEFR code, or the literal "native" which the renderer translates).
 */
export const certifications = [
  { name: "Scrum Fundamentals Certified (SFC™)", org: "SCRUMstudy" },
  { name: "Foundational C# with Microsoft",      org: "freeCodeCamp" }
];

export const courses = [
  { name: "Database Programming with SQL", org: "Oracle" },
  { name: "Database Design",               org: "Oracle" },
  { name: "Database Foundations",          org: "Oracle" },
  { name: "Fundamentos da Rede",           org: "Cisco Networking Academy" },
  { name: "Decola Tech 2024",              org: "Avanade" }
];

export const languages = [
  { key: "langPt", level: "native" },
  { key: "langEn", level: "B1" },
  { key: "langEs", level: "A2" }
];
