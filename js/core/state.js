/**
 * state.js
 * Central app state with a minimal pub/sub. Feature modules subscribe to the
 * slices they care about.
 *
 * Anatomy:
 *   state.get(key)            → read current value
 *   state.set(key, value)     → write and notify subscribers (no-op if equal)
 *   state.subscribe(key, fn)  → react to changes; returns an unsubscribe fn
 *
 * Persisted slices (LANG, THEME) auto-save to localStorage on set.
 */
import { LANGS, THEMES } from "./constants.js";

const STORAGE_KEYS = {
  lang:  "pf-lang",
  theme: "pf-theme"
};

const DEFAULTS = {
  lang:   LANGS.PT,
  theme:  THEMES.LIGHT,
  filter: "all"
};

const PERSISTED = new Set(["lang", "theme"]);


function readInitial(key) {
  if (!PERSISTED.has(key)) return DEFAULTS[key];
  const stored = localStorage.getItem(STORAGE_KEYS[key]);
  return stored ?? DEFAULTS[key];
}

const values = {
  lang:   readInitial("lang"),
  theme:  readInitial("theme"),
  filter: DEFAULTS.filter
};

const subscribers = new Map(); // key -> Set<fn>

function notify(key, value) {
  const set = subscribers.get(key);
  if (!set) return;
  for (const fn of set) {
    try { fn(value); }
    catch (err) { console.error(`[state] subscriber for "${key}" threw:`, err); }
  }
}

export const state = {
  get(key) {
    return values[key];
  },

  set(key, value) {
    if (values[key] === value) return; 
    values[key] = value;
    if (PERSISTED.has(key)) localStorage.setItem(STORAGE_KEYS[key], value);
    notify(key, value);
  },

  subscribe(key, fn) {
    if (!subscribers.has(key)) subscribers.set(key, new Set());
    subscribers.get(key).add(fn);
    return () => subscribers.get(key)?.delete(fn);
  },

  toggleTheme() {
    this.set("theme", values.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
  },
  toggleLang() {
    this.set("lang", values.lang === LANGS.PT ? LANGS.EN : LANGS.PT);
  }
};
