// Prints recommendation + pitch for every lead type × single need × budget, plus a few multi-need combos.
// Run: npx tsx scripts/lead-audit.ts [path-to-leads-module]
import * as path from 'path';
const arg = process.argv.slice(2).find((x) => !x.startsWith('--'));
const mod = arg ? path.resolve(arg) : path.resolve(__dirname, '../lib/leads.ts');
const { recommend, SERVICES_BY_TYPE, BUDGETS, LEAD_TYPES } = require(mod);
const { templateDrafts } = require(path.resolve(__dirname, '../lib/leadDrafts.ts'));
const json = process.argv.includes('--json');
const rows: any[] = [];
for (const t of LEAD_TYPES) {
  const combos: string[][] = SERVICES_BY_TYPE[t.id].map((s: any) => [s.id]);
  combos.push(SERVICES_BY_TYPE[t.id].slice(0, 2).map((s: any) => s.id));
  for (const services of combos) for (const budget of BUDGETS) {
    const a = { type: t.id, services, budget, timing: 'This week', business: 'Acme Co' };
    const r = recommend(a);
    rows.push({ type: t.id, services: services.join('+'), budget, pkg: r.pkg, pitch: r.pitch, draft: templateDrafts({ name: 'Test Lead', answers: a, recommendation: r.pkg }).text });
  }
}
if (json) console.log(JSON.stringify(rows));
else for (const r of rows) console.log(`[${r.type} | ${r.services} | ${r.budget}]\n  PKG:   ${r.pkg}\n  PITCH: ${r.pitch}\n  DRAFT: ${r.draft}\n`);
