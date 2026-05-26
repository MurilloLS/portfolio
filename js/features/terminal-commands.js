/**
 * terminal-commands.js
 * Registry of every command the terminal recognises.
 *
 * Contract for a command function `(ctx) => string | null`
 *   ctx.print(text, cls?)  — write a line into the terminal
 *   ctx.close()            — close the terminal overlay
 *   ctx.clear()            — wipe the terminal buffer
 *   return string          — appended as an `.out` line
 *   return null            — caller does nothing (the command handled its own output)
 *
 * To add a command:
 *   export const myCmd = () => `output text`;
 *   then register it in the `commands` map at the bottom.
 */
import { state } from "../core/state.js";
import data      from "../data/index.js";

const help = () =>
`Available commands:
  about     stack     projects     contact     whoami
  social    ls/dir    clear        theme       lang
  sudo hire me        exit`;

const about = () =>
`Murillo Santos · Software Engineer based in São Paulo, BR.
Specializes in .NET, Angular & Cloud. Currently studying ADS @ FATEC.`;

const stack = () =>
`Languages:   ${data.stack.languages.join(", ")}
Frameworks:  ${data.stack.frameworks.join(", ")}
Cloud:       ${data.stack.cloud.join(", ")}
Data:        ${data.stack.data.join(", ")}`;

const projects = () =>
  data.projects
    .map((p, i) => `  ${String(i + 1).padStart(2, " ")}. ${p.title.padEnd(28)} ${p.lang.padEnd(10)} ${p.url}`)
    .join("\n");

const contact = () =>
`email:     ${data.email}
github:    ${data.github}
linkedin:  ${data.linkedin}`;

const whoami = () => "murillo · full-stack · brasileiro · disponível";
const social = () => `→ GitHub:   ${data.github}\n→ LinkedIn: ${data.linkedin}`;
const ls     = () => "hero  about  stack  work  journey  contact";

const clear  = ctx => { ctx.clear(); return null; };

const theme  = () => { state.toggleTheme(); return `theme → ${state.get("theme")}`; };
const lang   = () => { state.toggleLang();  return `lang → ${state.get("lang")}`;  };

const exit   = ctx => { ctx.close(); return null; };

/**
 * Easter egg: `sudo hire me`.
 * Returns null because it writes multiple lines itself rather than
 * a single output string.
 */
const sudoHireMe = ctx => {
  ctx.print("[sudo] password: ********");
  ctx.print("Access granted.");
  ctx.print(`→ ${data.email} · ${data.linkedin}`);
  return null;
};

export const commands = {
  help, about, stack, projects, contact, whoami,
  social,
  ls, dir: ls,            // dir is an alias of ls
  clear, theme, lang, exit,
  "sudo hire me": sudoHireMe
};
