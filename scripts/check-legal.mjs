// Runs before `npm run build` (the "prebuild" script). It does not stop the build: it makes sure nobody
// publishes the privacy policy and terms with an example address or a placeholder name still in them,
// which Google Play would reject and which would be wrong in a legal text anyway.
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
const value = (name) => source.match(new RegExp(`export const ${name} = "([^"]*)"`))?.[1] ?? "";

const checks = [
  ["CONTACT_EMAIL", (v) => !v || /example\.(com|org|net)$/i.test(v), "is empty or an example address (it is the contact on every legal page)"],
  ["OPERATOR_NAME", (v) => !v || /^YOUR\b/.test(v), "is empty or still says YOUR (the policy must name who runs the app)"],
  ["OPERATOR_ADDRESS", (v) => !v || /^YOUR\b/.test(v), "is empty or still says YOUR (the policy gives a postal address)"],
  ["GOVERNING_LAW", (v) => !v || /\bYOUR\b/.test(v), "is empty or still says YOUR (the Terms name whose law applies)"],
];

const problems = checks.filter(([name, bad]) => bad(value(name))).map(([name, , why]) => `  - ${name} ${why}`);

if (problems.length) {
  console.warn("\n⚠  Legal pages are not ready to publish. In src/lib/site.ts:\n" + problems.join("\n") + "\n");
} else {
  console.log("Legal pages: contact, operator, address and governing law are filled in.");
}
