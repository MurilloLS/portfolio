/**
 * data/index.js
 * Aggregates every data module into a single object so feature modules
 * can `import data from '../data/index.js'` without having to know which
 * file each slice lives in. Treat this as the public read-only data API.
 */
import { profile }                            from "./profile.js";
import { i18n }                               from "./i18n.js";
import { projects, filters }                  from "./projects.js";
import { stack }                              from "./stack.js";
import { certifications, courses, languages } from "./certifications.js";
import { timeline }                           from "./timeline.js";

const data = {
  ...profile,
  i18n,
  projects,
  filters,
  stack,
  certifications,
  courses,
  languages,
  timeline
};

export default data;
