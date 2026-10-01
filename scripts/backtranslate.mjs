// Back-translation check for the site's 12 translations.
//
// Every translated string goes back to English through Bhashini (via the
// site's own /api/translate) and is compared word-for-word with the English
// original. Lines whose meaning drifted score low and land at the top of the
// report - that is the short list a native speaker should read first. A low
// score is a flag, not a verdict: paraphrase scores low too.
//
//   node scripts/backtranslate.mjs                 # all languages, live site
//   node scripts/backtranslate.mjs hi ta           # some languages
//   API=http://localhost:3000 node scripts/backtranslate.mjs
//
// Writes scripts/backtranslate-report.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const I18N = path.join(here, '..', 'lib', 'i18n');
const API = (process.env.API || 'https://drikr.vercel.app') + '/api/translate';
const ALL = ['hi', 'bn', 'mr', 'te', 'ta', 'gu', 'kn', 'ml', 'or', 'pa', 'as', 'ur'];
const FLAG_BELOW = 0.35;

function load(lang) {
  const src = fs.readFileSync(path.join(I18N, `${lang}.ts`), 'utf8');
  const start = src.indexOf('=', src.indexOf('Dict', src.indexOf('Dict') + 4)) + 1;
  const body = src.slice(start, src.lastIndexOf('export default')).trim().replace(/;$/, '');
  return new Function('return (' + body + ')')();
}

function flatten(o, prefix = '', out = {}) {
  if (typeof o === 'string') out[prefix] = o;
  else if (Array.isArray(o)) o.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else for (const [k, v] of Object.entries(o)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  return out;
}

const clean = (s) => s.replace(/\*\*/g, '').replace(/\{a\}/g, '1');
const words = (s) => new Set(clean(s).toLowerCase().match(/[a-z0-9₹.]+/g) ?? []);
function overlap(a, b) {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 1;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.max(A.size, B.size);
}

async function toEnglish(texts, source) {
  const out = [];
  for (let i = 0; i < texts.length; i += 20) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: texts.slice(i, i + 20).map(clean), source, target: 'en' }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(`${source}: ${res.status} ${j.error ?? ''} ${j.detail ?? ''}`);
    out.push(...j.translations);
  }
  return out;
}

const ready = await fetch(API).then((r) => r.json()).catch(() => ({ ready: false }));
if (!ready.ready) {
  console.log('Bhashini is not configured on', API, '- set BHASHINI_USER_ID and BHASHINI_API_KEY on Vercel first.');
  process.exit(1);
}

const en = flatten(load('en'));
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;
const lines = ['# Back-translation report', '', `Lines scoring below ${FLAG_BELOW} are listed first in each language.`, ''];

for (const lang of langs) {
  const tr = flatten(load(lang));
  // Product names and numbers translate to themselves; skip identical strings.
  const keys = Object.keys(en).filter((k) => tr[k] && tr[k] !== en[k]);
  const back = await toEnglish(keys.map((k) => tr[k]), lang);
  const rows = keys.map((k, i) => ({ k, score: overlap(en[k], back[i]), en: en[k], back: back[i] }));
  rows.sort((a, b) => a.score - b.score);
  const flagged = rows.filter((r) => r.score < FLAG_BELOW);
  console.log(`${lang}: ${keys.length} lines, ${flagged.length} flagged`);
  lines.push(`## ${lang} — ${flagged.length} of ${keys.length} flagged`, '');
  for (const r of flagged) {
    lines.push(`- \`${r.k}\` (${r.score.toFixed(2)})`, `  - English: ${clean(r.en)}`, `  - Back: ${r.back}`);
  }
  lines.push('');
}

fs.writeFileSync(path.join(here, 'backtranslate-report.md'), lines.join('\n'));
console.log('wrote scripts/backtranslate-report.md');
