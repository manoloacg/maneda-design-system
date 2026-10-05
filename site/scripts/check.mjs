// Run with: npm run check
// 1. Copy rules: no em dashes, no AI vocabulary, no diminutives, no "architect" title, no "licensed" about Manolo.
// 2. English and Portuguese files have the same structure.
// 3. Every internal link in the built site (dist) points to a real page.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

let failures = 0;
const fail = (msg) => { failures++; console.log('FAIL', msg); };

const walk = (dir, out = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (['node_modules', 'dist', '.astro', '.git'].includes(f)) continue;
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

// 1. Copy rules, on source text files
const textExt = new Set(['.astro', '.json', '.md', '.ts', '.css', '.mjs']);
const banned = /\b(elevate[sd]?|seamless(ly)?|unlock(s|ed|ing)?|tailored|crafted|journey|passion(ate)?|vibrant|cutting-edge|holistic|transform your space|little|tiny|cozy|white-label|drafting services|drafting support|permit sets)\b/i;
const diminutive = /\b(?!(?:cozinha|caminho|vizinh|linha|minha|tinha|sozinh|rainha|farinha|galinha|casinha)\w*)\w{3,}(zinho|zinha|inho|inha)s?\b/i;
const seal = /Where a seal is required|Quando um selo é exigido/;
for (const file of walk('.').filter((f) => textExt.has(extname(f)) && !f.endsWith('package-lock.json') && !f.includes('scripts/'))) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    if (/[—–]/.test(line)) fail(`dash ${at}: ${line.trim().slice(0, 80)}`);
    const internalDoc = ['README.md', 'LAUNCH.md', 'CONTENT-NEEDED.md', 'QUALITY-REPORT.md'].includes(file);
    if (internalDoc) return;
    if (!file.endsWith('.css') && !file.endsWith('.ts') && !file.endsWith('.astro') || file.endsWith('.json')) {
      const b = line.match(banned); if (b) fail(`banned word "${b[0]}" ${at}`);
      if (file.includes('/pt.json') || file.includes('/pt/') || file.endsWith('pt.json')) {
        const d = line.match(diminutive); if (d) fail(`possible diminutive "${d[0]}" ${at}`);
      }
      if (/\barchitect\b/i.test(line) && !/"(label|value)": "Architect"/i.test(line)) fail(`"architect" ${at}: ${line.trim().slice(0, 80)}`);
      if (/\bArquiteto\b/.test(line) && !/"label": "Arquiteto"/.test(line)) fail(`"Arquiteto" ${at}`);
      if (/\blicensed\b|licenciado/i.test(line) && !seal.test(line) && !/seal/i.test(line) && !/engineer|engenheiro/i.test(line) && !/licensed professional|profissional licenciado/i.test(line)) fail(`"licensed" ${at}: ${line.trim().slice(0, 80)}`);
    }
  });
}

// 2. Parallel structure of EN and PT files
const shape = (v, path = '', out = []) => {
  if (Array.isArray(v)) { out.push(`${path}[${v.length}]`); v.forEach((x, i) => typeof x === 'object' && shape(x, `${path}[${i}]`, out)); }
  else if (v && typeof v === 'object') for (const k of Object.keys(v)) shape(v[k], `${path}.${k}`, out);
  else out.push(path);
  return out;
};
for (const [a, b] of [['src/i18n/en.json', 'src/i18n/pt.json'], ['src/content/pages/en.json', 'src/content/pages/pt.json']]) {
  const A = shape(JSON.parse(readFileSync(a, 'utf8'))), B = shape(JSON.parse(readFileSync(b, 'utf8')));
  A.filter((k) => !B.includes(k)).forEach((k) => fail(`missing in PT: ${k}`));
  B.filter((k) => !A.includes(k)).forEach((k) => fail(`missing in EN: ${k}`));
}

// 3. Internal links in the built site
if (existsSync('dist')) {
  const pages = walk('dist').filter((f) => f.endsWith('.html'));
  const ids = new Map();
  const html = new Map(pages.map((p) => [p, readFileSync(p, 'utf8')]));
  const toFile = (url) => {
    let p = url.split('#')[0].split('?')[0];
    if (p.endsWith('/')) p += 'index.html';
    return join('dist', p);
  };
  for (const [page, text] of html) {
    for (const m of text.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
      const url = m[1];
      if (url.startsWith('//')) continue;
      const file = toFile(url);
      if (!existsSync(file)) { fail(`broken link ${url} in ${page}`); continue; }
      const hash = url.split('#')[1];
      if (hash && file.endsWith('.html')) {
        const target = html.get(file) ?? readFileSync(file, 'utf8');
        if (!new RegExp(`id="${hash}"`).test(target)) fail(`missing anchor #${hash} for ${url} in ${page}`);
      }
    }
    for (const m of text.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) {
      try { JSON.parse(m[1]); } catch { fail(`invalid JSON-LD in ${page}`); }
      if (m[1].includes('PLACEHOLDER')) fail(`[PLACEHOLDER] inside JSON-LD in ${page}`);
      if (/streetAddress|telephone/.test(m[1])) fail(`address or phone in JSON-LD in ${page}`);
    }
    const noindex = /name="robots" content="noindex/.test(text);
    const title = text.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
    const desc = text.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
    if (title.length > 70) fail(`title over 70 characters in ${page}`);
    if (!noindex && (desc.length < 50 || desc.length > 165)) fail(`description length ${desc.length} in ${page}`);
    for (const need of ['rel="canonical"', 'hreflang="en"', 'hreflang="pt-BR"', 'property="og:title"', 'property="og:image"']) {
      if (!text.includes(need)) fail(`missing ${need} in ${page}`);
    }
    const h1 = (text.match(/<h1[\s>]/g) || []).length;
    if (h1 !== 1 && !page.includes('404')) fail(`${h1} h1 tags in ${page}`);
    for (const m of text.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) fail(`img without alt in ${page}`);
  }
  console.log(`checked ${pages.length} built pages`);
}
console.log(failures ? `\n${failures} problem(s)` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
