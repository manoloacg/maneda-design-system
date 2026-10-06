// Builds public/admin/config.yml, the settings for the visual editor.
// Run: npm run cms:config   (npm run check tells you when it is out of date)
// The file is written as JSON, which is valid YAML.
import { readFileSync, writeFileSync } from 'node:fs';

const REPO = 'manoloacg/maneda-design-system';
const BRANCH = 'claude/focused-cannon-kgwtpc'; // change to "main" after the site moves to main, then run npm run cms:config
const ROOT = 'site/src/content';

const read = (p) => JSON.parse(readFileSync(p.startsWith('../') ? `src/${p.slice(3)}` : `src/content/${p}`, 'utf8'));
const humanize = (k) => k.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ').replace(/^./, (c) => c.toUpperCase());

function field(name, value) {
  const label = humanize(name);
  if (typeof value === 'boolean') return { label, name, widget: 'boolean', required: false };
  if (typeof value === 'number') return { label, name, widget: 'number', value_type: Number.isInteger(value) ? 'int' : 'float', required: false };
  if (typeof value === 'string') return { label, name, widget: value.length > 90 || value.includes('\n') ? 'text' : 'string', required: false };
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) return { label, name, widget: 'list', required: false, field: { label: 'Item', name: 'item', widget: 'text', required: false } };
    const keys = [...new Set(value.flatMap((v) => Object.keys(v)))];
    return { label, name, widget: 'list', required: false, fields: keys.map((k) => field(k, value.find((v) => k in v)[k])) };
  }
  return { label, name, widget: 'object', required: false, collapsed: true, fields: Object.entries(value).map(([k, v]) => field(k, v)) };
}
const fieldsOf = (obj) => Object.entries(obj).map(([k, v]) => field(k, v));
const file = (label, path, name) => ({ label, name, file: `${ROOT}/${path}`, format: 'json', fields: fieldsOf(read(path)) });

const slots = read('slots.json');
const slotNotes = read('pages/en.json').slots;
const slotFields = Object.keys(slots).map((id) => ({
  label: slotNotes[id]?.note ?? id, name: id, widget: 'image', required: false, hint: `Slot: ${id}`,
  media_folder: '/site/src/assets/slots', public_folder: '/src/assets/slots',
}));

const img = (label, name) => ({ label, name, widget: 'image', required: false });
const projectFields = [
  { label: 'Title', name: 'title', widget: 'string' },
  { label: 'Project number', name: 'number', widget: 'string', hint: 'Like MDS-26-05. The file name is made from this, so use the same number in English and Portuguese.' },
  { label: 'Order on the page', name: 'order', widget: 'number', value_type: 'int' },
  { label: 'Type', name: 'type', widget: 'select', options: ['residential', 'outdoor', 'commercial', 'interiors'] },
  { label: 'Show on the site', name: 'published', widget: 'boolean', default: true, hint: 'Turn off to hide the project without deleting it.' },
  { label: 'Location', name: 'location', widget: 'string', hint: 'City or state only. Never a street address.' },
  { label: 'Size', name: 'size', widget: 'string', required: false },
  { label: 'Scope', name: 'scope', widget: 'string' },
  { label: 'Role', name: 'role', widget: 'string' },
  { label: 'Year', name: 'year', widget: 'string' },
  { label: 'One-line result (shown on the project card)', name: 'result', widget: 'string' },
  { label: 'Client approved real names in writing', name: 'clientApproved', widget: 'boolean', default: false, hint: 'Keep this off unless the client approved in writing.' },
  img('Main image', 'heroImage'),
  { label: 'Main image description', name: 'heroAlt', widget: 'string' },
  img('Card image (if different from the main image)', 'cardImage'),
  { label: 'The brief', name: 'brief', widget: 'text' },
  { label: 'The context', name: 'context', widget: 'text' },
  { label: 'Design decisions (3 to 5)', name: 'moves', widget: 'list', min: 3, max: 5, summary: '{{fields.title}}', fields: [
    { label: 'Decision', name: 'title', widget: 'string' },
    { label: 'Why', name: 'text', widget: 'text' },
    img('Image', 'image'),
    { label: 'Image description', name: 'alt', widget: 'string', required: false },
    { label: 'Note shown in the gray frame while there is no image', name: 'visual', widget: 'string', required: false },
  ] },
  { label: 'Sketch to final', name: 'sketch', widget: 'object', required: false, collapsed: true, fields: [
    img('Early sketch', 'earlyImage'), { label: 'Early sketch description', name: 'earlyAlt', widget: 'string', required: false },
    img('Final plan or elevation', 'finalImage'), { label: 'Final description', name: 'finalAlt', widget: 'string', required: false },
    { label: 'Note for the early frame', name: 'early', widget: 'string', required: false },
    { label: 'Note for the final frame', name: 'final', widget: 'string', required: false },
  ] },
  img('Sheet excerpt (remove title block, owner name and address first)', 'documentsImage'),
  { label: 'Sheet excerpt description', name: 'documentsAlt', widget: 'string', required: false },
  { label: 'Sheet excerpt note', name: 'documents', widget: 'string', required: false },
  { label: 'The outcome', name: 'outcome', widget: 'text', required: false },
  { label: 'Extra text', name: 'body', widget: 'markdown', required: false },
];
const projects = (lang, label) => ({
  label, name: `projects_${lang}`, folder: `${ROOT}/projects/${lang}`, extension: 'md', format: 'frontmatter', create: true,
  slug: '{{number}}', identifier_field: 'title', summary: '{{number}}  {{title}}', media_folder: '../../../assets', fields: projectFields,
});
const journal = (lang, label) => ({
  label, name: `journal_${lang}`, folder: `${ROOT}/journal/${lang}`, extension: 'md', format: 'frontmatter', create: true, slug: '{{title}}',
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Short description', name: 'description', widget: 'text' },
    { label: 'Date', name: 'date', widget: 'string', required: false, hint: 'YYYY-MM-DD. Needed before the article is published.' },
    { label: 'Draft', name: 'draft', widget: 'boolean', default: true, hint: 'Turn off when the article is finished.' },
    { label: 'Article', name: 'body', widget: 'markdown', required: false },
  ],
});

export function build() {
  const cfg = {
    backend: { name: 'github', repo: REPO, branch: BRANCH },
    publish_mode: 'simple',
    media_folder: 'site/src/assets/uploads',
    public_folder: '/src/assets/uploads',
    collections: [
      { label: 'Page text: English', name: 'pages_en', files: [file('All page text, English', 'pages/en.json', 'pages_en')] },
      { label: 'Page text: Portuguese', name: 'pages_pt', files: [file('All page text, Portuguese', 'pages/pt.json', 'pages_pt')] },
      { label: 'Prices and services', name: 'prices', files: [file('Prices', 'pricing.json', 'pricing'), file('The five services', 'services.json', 'services')] },
      { label: 'Image slots', name: 'slots', files: [{ label: 'Gray frames: add images here', name: 'slots', file: `${ROOT}/slots.json`, format: 'json', fields: slotFields }] },
      projects('en', 'Projects: English'),
      projects('pt', 'Projects: Portuguese'),
      { label: 'Studio settings', name: 'settings', files: [file('Email, switches, form, address', 'site.json', 'site')] },
      {
        label: 'Client words',
        name: 'voices',
        files: [
          {
            label: 'Quotes (written permission only)',
            name: 'voices',
            file: `${ROOT}/testimonials.json`,
            format: 'json',
            fields: [
              { label: 'Rule', name: '_help', widget: 'text', required: false },
              {
                label: 'Quotes',
                name: 'items',
                widget: 'list',
                required: false,
                fields: [
                  { label: 'Quote, English', name: 'quoteEn', widget: 'text', required: false },
                  { label: 'Quote, Portuguese', name: 'quotePt', widget: 'text', required: false },
                  { label: 'Name, exactly as approved', name: 'name', widget: 'string', required: false },
                  { label: 'Role or place, exactly as approved', name: 'role', widget: 'string', required: false },
                  { label: 'Written permission received', name: 'approved', widget: 'boolean', required: false },
                ],
              },
            ],
          },
        ],
      },
      { label: 'Menus, buttons, footer', name: 'ui', files: [file('Menus and buttons, English', '../i18n/en.json', 'ui_en'), file('Menus and buttons, Portuguese', '../i18n/pt.json', 'ui_pt')] },
      journal('en', 'Journal: English'),
      journal('pt', 'Journal: Portuguese'),
    ],
  };
  // The i18n files live one folder up from src/content.
  cfg.collections.find((c) => c.name === 'ui').files.forEach((f) => { f.file = f.file.replace('/content/../i18n/', '/i18n/'); });
  return JSON.stringify(cfg, null, 2) + '\n';
}

if (process.argv[1].endsWith('gen-cms-config.mjs')) {
  writeFileSync('public/admin/config.yml', build());
  console.log('wrote public/admin/config.yml');
}
