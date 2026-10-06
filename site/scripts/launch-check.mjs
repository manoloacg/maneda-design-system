// Run with: npm run launch-check
// Tells you, in plain language, what still blocks launch. It changes nothing.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'));
const walk = (d, o = []) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, o) : o.push(p); } return o; };
const off = ['resources', 'resourcesThankYou', 'journal'].filter((k) => !site.features?.[k === 'resourcesThankYou' ? 'resources' : k]);
const count = (file) => {
  let text = readFileSync(file, 'utf8');
  if (file.includes('src/content/pages/')) {
    const data = JSON.parse(text);
    off.forEach((k) => delete data[k]);
    text = JSON.stringify(data);
  }
  return (text.match(/\[PLACEHOLDER/g) || []).length;
};
const blockers = [], warnings = [], done = [];
const need = (ok, okMsg, badMsg) => (ok ? done.push(okMsg) : blockers.push(badMsg));

need(!site.url.includes('example.com'), `Domain set: ${site.url}`, 'Domain not set. Put the real address in src/content/site.json ("url").');
need(!site.email.includes('PLACEHOLDER'), `Studio email set: ${site.email}`, 'Studio email missing in site.json.');
need(!site.form.accessKey.includes('PLACEHOLDER'), 'Form access key set. The form will send real email.', 'Form is in test mode. Add the Web3Forms access key in site.json ("form.accessKey").');
need(!site.replyWindow.en.includes('PLACEHOLDER') && !site.replyWindow.pt.includes('PLACEHOLDER'), 'Reply window promise set.', 'Reply window promise is still a placeholder (site.json, "replyWindow").');

// Image slots: every slot id in the page copy, and which ones already have a file in src/assets/slots.
const slotIds = Object.keys(JSON.parse(readFileSync('src/content/pages/en.json', 'utf8')).slots ?? {});
const slotFiles = existsSync('src/assets/slots') ? readdirSync('src/assets/slots') : [];
const empty = slotIds.filter((id) => !slotFiles.some((f) => f.startsWith(id + '.')));
if (site.showPlaceholders) blockers.push(`Gray placeholder frames are ON (site.json "showPlaceholders": true). Set it to false at launch. ${empty.length} of ${slotIds.length} image slots are still empty and will simply disappear. Fill them from src/assets/slots (file name = slot id) if you want them shown.`);
else done.push(`Placeholder frames are off. ${slotIds.length - empty.length} of ${slotIds.length} image slots have images; the rest are hidden.`);
const sealEn = 'Where a seal is required, drawings are reviewed and sealed by a licensed professional of record.';
need(site.legalReviewDone === true, 'Privacy policy and standard agreement reviewed by a lawyer.', 'Legal review not done. See LEGAL-CHECKLIST.md, then set "legalReviewDone": true in site.json.');
need(JSON.parse(readFileSync('src/i18n/en.json', 'utf8')).footer.seal === sealEn, 'Seal sentence present and exact.', 'Seal sentence changed or missing in src/i18n/en.json.');

const groups = [
  ['Page copy (src/content/pages)', walk('src/content/pages')],
  ['Site settings and UI text', ['src/content/site.json', ...walk('src/i18n').filter((f) => f.endsWith('.json'))]],
  ['Case studies (src/content/projects)', walk('src/content/projects').filter((f) => !/^published:\s*false/m.test(readFileSync(f, 'utf8')))],
  ...(site.features?.journal ? [['Journal posts (src/content/journal)', walk('src/content/journal')]] : []),
];
for (const [name, files] of groups) {
  const n = files.reduce((sum, f) => sum + count(f), 0);
  (n ? blockers : done).push(n ? `${n} placeholders left in ${name}.` : `No placeholders in ${name}.`);
}

for (const f of walk('src/content/projects').filter((f) => f.includes('/en/'))) {
  const approved = /clientApproved:\s*true/.test(readFileSync(f, 'utf8'));
  warnings.push(`${f.split('/').pop()}: clientApproved is ${approved}. Keep it false unless the client approved real names in writing.`);
}
if (site.features?.resources) {
  if (!existsSync('public/resources/before-you-hire-a-designer.pdf')) blockers.push('Checklist PDF missing.');
  else if (readFileSync('public/resources/before-you-hire-a-designer.pdf', 'latin1').includes('PLACEHOLDER')) blockers.push('The checklist PDFs are still the placeholder files (public/resources).');
} else {
  warnings.push('Resources page is OFF (site.json features.resources). Turn it on after the real checklist PDFs are in public/resources.');
}
if (!site.features?.journal) warnings.push('Journal is OFF (site.json features.journal). Turn it on after at least one article is finished.');
(site.indexing ? done : warnings).push(site.indexing ? 'Search indexing is ON.' : 'Search indexing is OFF. Turn it on only on launch day ("indexing": true in site.json).');
(site.analytics.enabled ? done : warnings).push(site.analytics.enabled ? 'Analytics is on.' : 'Analytics is off. Optional. Turn on only after you approve it.');

const show = (title, list, mark) => { if (list.length) { console.log(`\n${title}`); list.forEach((l) => console.log(`  ${mark} ${l}`)); } };
show('DONE', done, '[ok]');
show('WARNINGS (read, then decide)', warnings, '[!]');
show('BLOCKERS (fix before launch)', blockers, '[x]');
console.log(blockers.length ? `\n${blockers.length} blocker(s). Not ready to launch.` : '\nNo blockers. Ready to launch.');
process.exit(blockers.length ? 1 : 0);
