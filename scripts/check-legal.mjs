// Runs before `npm run build` (the "prebuild" script). It does not stop the build: it makes sure nobody
// publishes the privacy policy and terms with an example address or a placeholder name still in them,
// which Google Play would reject and which would be wrong in a legal text anyway.
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8");
const value = (name) => source.match(new RegExp(`export const ${name} = "([^"]*)"`))?.[1] ?? "";

const checks = [
  ["CONTACT_EMAIL", (v) => !v || /example\.(com|org|net)$/i.test(v), "is still an example address (it is the contact on every legal page)"],
  ["OPERATOR_NAME", (v) => !v || /^YOUR\b/.test(v), "still says YOUR COMPANY OR NAME (the policy must name who runs the app)"],
  ["OPERATOR_COUNTRY", (v) => !v || /^YOUR\b/.test(v), "still says YOUR COUNTRY (the Terms name whose law applies)"],
];

const problems = checks.filter(([name, bad]) => bad(value(name))).map(([name, , why]) => `  - ${name} ${why}`);

if (problems.length) {
  console.warn("\n⚠  Legal pages are not ready to publish. In src/lib/site.ts:\n" + problems.join("\n") + "\n");
} else {
  console.log("Legal pages: contact, operator and country are filled in.");
}
