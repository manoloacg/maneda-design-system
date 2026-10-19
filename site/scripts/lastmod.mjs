/* Last-modified dates for the sitemap, taken from git history, not from the build time.
   Writes src/content/lastmod.json. The sitemap reads that file.

   Page text lives in one shared file per language (src/content/pages/<lang>.json), so a plain
   "last commit that touched the file" would give every page the same date. Instead this walks the
   file's history and records, for each section, the date of the last commit that changed it.

   If the checkout has no history (a shallow clone), it tries to fetch it. If that fails, it keeps
   the committed lastmod.json as is, so the sitemap still shows real dates from the last full run. */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(site, 'src/content/lastmod.json');
const git = (...args) => execFileSync('git', args, { cwd: site, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const keep = (why) => {
  console.log(`lastmod: ${why}. Keeping the committed ${relative(site, out)}.`);
  process.exit(0);
};

try {
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    try {
      execFileSync('git', ['fetch', '--unshallow', '--quiet'], { cwd: site, stdio: 'ignore', timeout: 60000 });
    } catch {
      keep('shallow clone and the full history could not be fetched');
    }
  }
} catch {
  keep('no git checkout');
}

const day = (iso) => iso.slice(0, 10);
/** Commits that touched a file, oldest first: [{ hash, date }]. */
const history = (p) =>
  git('log', '--format=%H %cI', '--', p)
    .split('\n')
    .filter(Boolean)
    .map((l) => ({ hash: l.split(' ')[0], date: day(l.split(' ')[1]) }))
    .reverse();
const lastCommit = (p) => {
  const d = git('log', '-1', '--format=%cI', '--', p);
  return d ? day(d) : undefined;
};
/** For a JSON file, the date each part (picked by the functions in parts) last changed. */
function sectionDates(p, parts) {
  const dates = {};
  const prev = {};
  for (const c of history(p)) {
    let data;
    try {
      data = JSON.parse(git('show', `${c.hash}:./${p}`));
    } catch {
      continue;
    }
    for (const [key, get] of Object.entries(parts(data))) {
      const now = JSON.stringify(get ?? null);
      if (now !== prev[key]) {
        prev[key] = now;
        dates[key] = c.date;
      }
    }
  }
  return dates;
}

const result = {};
const pageSections = ['home', 'services', 'work', 'caseStudy', 'process', 'about', 'contact', 'privacy', 'journal'];
for (const lang of ['en', 'pt']) {
  const d = sectionDates(`src/content/pages/${lang}.json`, (j) => ({
    ...Object.fromEntries(pageSections.map((s) => [s, s === 'services' ? { ...j.services, items: undefined } : j[s]])),
    ...Object.fromEntries(Object.entries(j.services?.items ?? {}).map(([id, v]) => [`service-${id}`, v])),
  }));
  for (const [k, v] of Object.entries(d)) result[`page:${lang}:${k}`] = v;
}
const svc = sectionDates('src/content/services.json', (j) => Object.fromEntries((j.services ?? []).map((s) => [s.id, s])));
for (const [k, v] of Object.entries(svc)) result[`services.json:${k}`] = v;
const pricing = lastCommit('src/content/pricing.json');
if (pricing) result['pricing.json'] = pricing;
for (const folder of ['projects', 'journal']) {
  for (const lang of ['en', 'pt']) {
    const dir = `src/content/${folder}/${lang}`;
    if (!existsSync(join(site, dir))) continue;
    for (const p of git('ls-files', dir).split('\n').filter((f) => f.endsWith('.md'))) {
      const d = lastCommit(p);
      if (d) result[`file:${p}`] = d;
    }
  }
}

const sorted = Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
const before = existsSync(out) ? readFileSync(out, 'utf8') : '';
const next = JSON.stringify(sorted, null, 2) + '\n';
if (before !== next) writeFileSync(out, next);
console.log(`lastmod: ${Object.keys(sorted).length} dates from git history${before === next ? ' (unchanged)' : ''}.`);
