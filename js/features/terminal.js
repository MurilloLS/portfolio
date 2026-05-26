/**
 * terminal.js (feature)
 * Controls the terminal overlay UI: opening, closing, keyboard shortcuts
 * and the read-eval-print loop. Command logic lives in
 * `terminal-commands.js`; this module only handles the UI plumbing.
 *
 * Shortcuts:
 *   `       → open
 *   Escape  → close (when open)
 *
 * The launcher button and overlay backdrop click also close/open.
 */
import { $ }                from "../core/dom.js";
import { commands as REGISTRY } from "./terminal-commands.js";

const OPEN_FOCUS_DELAY_MS = 50;

export function init() {
  const overlay  = $("#termOverlay");
  const body     = $("#termBody");
  const input    = $("#termInput");
  const launcher = $("#termLauncher");
  if (!overlay || !body || !input) return;

  function open() {
    overlay.classList.add("open");
    setTimeout(() => input.focus(), OPEN_FOCUS_DELAY_MS);
  }
  function close() {
    overlay.classList.remove("open");
  }

  function print(text, cls = "out") {
    const line = document.createElement("div");
    line.className = "line " + cls;
    line.innerHTML = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }
  function clear() {
    body.innerHTML = "";
  }

  const ctx = { print, clear, close };

  function run(raw) {
    const cmd = raw.trim();
    print(`<span class="user">murillo@portfolio</span>:~$ ${cmd}`);
    if (!cmd) return;

    const handler = REGISTRY[cmd.toLowerCase()];
    if (!handler) {
      print(`command not found: ${cmd}. Try <span style="color:#5d86ff">help</span>.`, "err");
      return;
    }
    const out = handler(ctx);
    if (out != null) print(out.replace(/\n/g, "<br>"));
  }

  // UI wiring
  if (launcher) launcher.addEventListener("click", open);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) close();
  });

  window.addEventListener("keydown", e => {
    if (e.key === "`" && !e.target.matches("input, textarea")) {
      e.preventDefault();
      open();
    }
    if (e.key === "Escape") close();
  });

  input.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    run(input.value);
    input.value = "";
  });
}
