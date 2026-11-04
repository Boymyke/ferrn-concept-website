// Builds src/<client>/index.src.html -> public/<client>/index.html
// Inlines Lucide icons ({{icon:name}}), Simple Icons ({{si:name}}), and shared partials.
// Usage: node tools/build.mjs splendid-freight
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nm = join(root, "tools", "node_modules");
const lucideDir = join(nm, "lucide-static", "icons");
const siDir = join(nm, "simple-icons", "icons");

const client = process.argv[2];
if (!client) { console.error("usage: node tools/build.mjs <client>"); process.exit(1); }
const srcDir = join(root, "src", client);
let html = readFileSync(join(srcDir, "index.src.html"), "utf8");

const partials = existsSync(join(srcDir, "partials.mjs"))
  ? (await import(join(srcDir, "partials.mjs"))).default : {};

const icon = (name, cls = "ico") => {
  const f = join(lucideDir, `${name}.svg`);
  if (!existsSync(f)) throw new Error(`Lucide icon not found: ${name}`);
  return readFileSync(f, "utf8")
    .replace(/<!--.*?-->\s*/s, "")
    .replace(/class="[^"]*"/, `class="${cls}" aria-hidden="true"`)
    .replace(/\s*width="24"\s*height="24"/, "")
    .replace(/\n\s*/g, " ").replace(/>\s+</g, "><").trim();
};
const si = (name) => {
  const f = join(siDir, `${name}.svg`);
  if (!existsSync(f)) throw new Error(`Simple icon not found: ${name}`);
  return readFileSync(f, "utf8").replace("<svg", '<svg aria-hidden="true"').replace(/<title>.*?<\/title>/, "");
};

for (const [k, v] of Object.entries(partials)) {
  html = html.split(`{{${k}}}`).join(typeof v === "function" ? v({ icon, si }) : v);
}
html = html.replace(/\{\{icon:([a-z0-9-]+)\}\}/g, (_, n) => icon(n));
html = html.replace(/\{\{si:([a-z0-9-]+)\}\}/g, (_, n) => si(n));
const left = html.match(/\{\{[^}]+\}\}/g);
if (left) throw new Error("Unresolved placeholders: " + [...new Set(left)].join(", "));

const out = join(root, "public", client, "index.html");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, html);
console.log("built", out, (html.length / 1024).toFixed(1) + " KB");
