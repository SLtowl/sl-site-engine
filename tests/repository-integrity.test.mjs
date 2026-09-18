import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillRoot = path.join(root, 'skill', 'sl-site-engine');
const exists = async target => fs.stat(target).then(stat => stat.isFile() || stat.isDirectory()).catch(() => false);

test('local Markdown links resolve to repository files', async () => {
  for (const [base, relative] of [[skillRoot, 'SKILL.md'], [root, 'README.md']]) {
    const source = await fs.readFile(path.join(base, relative), 'utf8');
    const links = [...source.matchAll(/\[[^\]]*\]\(([^)]+)\)|!\[[^\]]*\]\(([^)]+)\)/g)]
      .map(match => match[1] ?? match[2])
      .filter(link => !/^(?:https?:|mailto:|#)/i.test(link));
    for (const link of links) {
      const clean = decodeURIComponent(link.split('#')[0]);
      assert.equal(await exists(path.resolve(base, path.dirname(relative), clean)), true, `${relative} points to missing ${link}`);
    }
  }
});

test('OpenAI metadata icons exist', async () => {
  const yaml = await fs.readFile(path.join(skillRoot, 'agents', 'openai.yaml'), 'utf8');
  const icons = [...yaml.matchAll(/icon_(?:small|large):\s*"([^"]+)"/g)].map(match => match[1]);
  assert.equal(icons.length, 2);
  for (const icon of icons) assert.equal(await exists(path.resolve(skillRoot, icon)), true, `Missing ${icon}`);
});

test('the browser example contains ten unique two-screen 1440 by 900 references', async () => {
  const exampleRoot = path.join(root, 'examples', 'rune-directions');
  const report = JSON.parse(await fs.readFile(path.join(exampleRoot, 'capture-report.json'), 'utf8'));
  assert.equal(report.length, 20);
  assert.equal(new Set(report.map(item => item.id)).size, 10);
  assert.deepEqual(new Set(report.map(item => item.view)), new Set(['hero', 'next']));
  assert.equal(new Set(report.map(item => item.sha256)).size, 20);

  for (const item of report) {
    assert.equal(item.width, 1440);
    assert.equal(item.height, 900);
    assert.ok(item.changedPixelRatio <= 0.0005, `${item.id} drifted ${item.changedPixelRatio}`);
    const file = path.join(exampleRoot, item.file);
    const buffer = await fs.readFile(file);
    assert.equal(createHash('sha256').update(buffer).digest('hex'), item.sha256);
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.width, 1440);
    assert.equal(metadata.height, 900);
  }
});

test('public visuals and generated subject media have the expected shape', async () => {
  const checks = [
    ['cover.png', 1672, 941],
    ['assets/process.png', 1600, 840],
    ['examples/rune-directions/browser.png', 1600, 1000],
    ['assets/media/site-engine-poster.png', 1920, 1080],
    ['assets/media/sl-site-engine-preview.gif', 720, 405]
  ];
  for (const [relative, width, height] of checks) {
    const metadata = await sharp(path.join(root, relative)).metadata();
    assert.equal(metadata.width, width, relative);
    assert.equal(metadata.height, height, relative);
  }

  const product = await sharp(path.join(root, 'examples', 'rune-directions', 'media', 'rune-product.png')).metadata();
  assert.equal(product.hasAlpha, true, 'the isolated product asset must preserve transparency');
});

test('the README cover stays independent and the example hierarchy is intentional', async () => {
  const exampleRoot = path.join(root, 'examples', 'rune-directions');
  assert.equal(await exists(path.join(exampleRoot, 'cover.html')), false);
  assert.equal(await exists(path.join(exampleRoot, 'cover.css')), false);

  const capture = await fs.readFile(path.join(exampleRoot, 'capture.mjs'), 'utf8');
  assert.doesNotMatch(capture, /cover\.(?:html|png)/);

  const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
  const exampleImages = [...readme.matchAll(/examples\/rune-directions\/screenshots\/[^)]+\.png/g)].map(match => match[0]);
  assert.equal(exampleImages.length, 20);
  assert.equal(exampleImages.filter(image => image.endsWith('-hero.png')).length, 10);
  assert.equal(exampleImages.filter(image => image.endsWith('-next.png')).length, 10);

  const detailsStart = readme.indexOf('<details>');
  const detailsEnd = readme.indexOf('</details>');
  assert.ok(detailsStart > 0 && detailsEnd > detailsStart);
  assert.match(readme.slice(detailsStart, detailsEnd), /View All Directions/);
  assert.equal((readme.slice(0, detailsStart).match(/examples\/rune-directions\/screenshots\//g) ?? []).length, 2);
  assert.equal((readme.slice(detailsStart, detailsEnd).match(/examples\/rune-directions\/screenshots\//g) ?? []).length, 18);

  const headings = [...readme.matchAll(/^## (.+)$/gm)].map(match => match[1]);
  assert.equal(headings.at(-1), 'License');
});

test('the promotional film has committed technical evidence', async () => {
  const metadata = JSON.parse(await fs.readFile(path.join(root, 'assets', 'media', 'sl-site-engine.json'), 'utf8'));
  assert.deepEqual(metadata.video, {
    width: 1920,
    height: 1080,
    fps: 60,
    durationFrames: 480,
    durationSeconds: 8,
    codec: 'h264',
    audioStreams: 0
  });
  assert.ok(metadata.loopMeanChannelDifference < 1.1);

  const mp4 = await fs.readFile(path.join(root, 'assets', 'media', 'sl-site-engine.mp4'));
  assert.ok(mp4.length > 4_000_000);
  assert.match(mp4.subarray(0, 64).toString('latin1'), /ftyp/);
});

test('the rendered off-state has no bright slivers at reported corners and overlaps', async () => {
  // Fixed image regions from the user-reported artifacts in the 1920×1080 first frame.
  // Verify rendered pixels, not the mask implementation or its chosen coordinates.
  const regions = [
    {name: 'Velora upper-left bevel', left: 60, top: 220, width: 100, height: 68},
    {name: 'Workshop left overlap', left: 518, top: 520, width: 32, height: 170},
    {name: 'Workshop bottom overlap', left: 600, top: 725, width: 275, height: 31},
  ];
  for (const {name, ...region} of regions) {
    const {data, info} = await sharp(path.join(root, 'assets/media/site-engine-poster.png'))
      .extract(region).removeAlpha().raw().toBuffer({resolveWithObject: true});
    let brightPixels = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const luminance = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (luminance > 90) brightPixels++;
    }
    assert.equal(brightPixels, 0, `${name}: ${brightPixels} bright pixels escape the off-state`);
  }
});

test('the Russian readme remains local-only', async () => {
  const ignore = await fs.readFile(path.join(root, '.gitignore'), 'utf8');
  assert.match(ignore, /^README\.ru\.local\.md$/m);
  assert.equal(await exists(path.join(root, 'README.ru.md')), false);
});

test('source files contain no unfinished scaffold markers', async () => {
  const targets = [
    'README.md',
    'examples/rune-directions/MEDIA.md'
  ];
  for (const target of targets) {
    const source = await fs.readFile(path.join(root, target), 'utf8');
    assert.doesNotMatch(source, /(?:\[TODO\]|TODO:|TBD:|PLACEHOLDER:)/i, target);
  }

  for (const target of [
    'SKILL.md',
    'references/briefing.md',
    'references/divergence.md',
    'references/anti-slop.md',
    'references/fidelity.md',
    'references/media-strategy.md'
  ]) {
    const source = await fs.readFile(path.join(skillRoot, target), 'utf8');
    assert.doesNotMatch(source, /(?:\[TODO\]|TODO:|TBD:|PLACEHOLDER:)/i, target);
  }
});

test('skill identity and installation command use the SL Site Engine name', async () => {
  const skill = await fs.readFile(path.join(skillRoot, 'SKILL.md'), 'utf8');
  const readme = await fs.readFile(path.join(root, 'README.md'), 'utf8');
  const agent = await fs.readFile(path.join(skillRoot, 'agents', 'openai.yaml'), 'utf8');
  assert.match(skill, /^name: sl-site-engine$/m);
  assert.match(readme, /npx skills add SLtowl\/sl-site-engine -g -a codex -y/);
  assert.match(agent, /display_name: "SL Site Engine"/);
  assert.match(agent, /\$sl-site-engine/);
});

test('the installable skill stays compact and separate from repository media', async () => {
  const entries = await fs.readdir(skillRoot, {recursive: true, withFileTypes: true});
  const files = entries.filter(entry => entry.isFile());
  let totalBytes = 0;
  for (const entry of files) {
    totalBytes += (await fs.stat(path.join(entry.parentPath, entry.name))).size;
  }

  assert.ok(totalBytes < 100_000, `installable runtime grew to ${totalBytes} bytes`);
  assert.equal(await exists(path.join(skillRoot, 'examples')), false);
  assert.equal(await exists(path.join(skillRoot, 'motion')), false);
  assert.equal(await exists(path.join(skillRoot, 'node_modules')), false);
  assert.equal(await exists(path.join(skillRoot, 'assets', 'media')), false);

  const rootLicense = await fs.readFile(path.join(root, 'LICENSE'));
  const skillLicense = await fs.readFile(path.join(skillRoot, 'LICENSE'));
  assert.deepEqual(skillLicense, rootLicense);
});
