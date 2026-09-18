import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../skill/sl-site-engine');

test('every local skill reference resolves inside the distributable skill', async () => {
  const queue = ['SKILL.md'];
  const seen = new Set();
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    seen.add(rel);
    const body = await fs.readFile(path.join(root, rel), 'utf8');
    for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const href = match[1].split('#')[0];
      if (!href || /^(?:https?:|mailto:)/.test(href)) continue;
      const target = path.resolve(root, path.dirname(rel), href);
      assert.ok(target.startsWith(root + path.sep), `${rel}: link escapes skill`);
      assert.ok((await fs.stat(target)).isFile(), `${rel}: missing ${href}`);
      if (target.endsWith('.md')) queue.push(path.relative(root, target));
    }
  }
  const referenceFiles = (await fs.readdir(path.join(root, 'references'))).filter(name => name.endsWith('.md'));
  for (const name of referenceFiles) assert.ok(seen.has(path.join('references', name)), `Unreachable reference: ${name}`);
});

test('installable skill has no machine-specific workspace paths or unfinished scaffolds', async () => {
  for (const rel of ['SKILL.md', ...(await fs.readdir(path.join(root, 'references'))).map(name => `references/${name}`)]) {
    const body = await fs.readFile(path.join(root, rel), 'utf8');
    assert.doesNotMatch(body, /[A-Z]:[\\/]Users[\\/]|\/home\/[^/]+\/|\[TODO\]|TODO:|TBD:/, rel);
  }
});
