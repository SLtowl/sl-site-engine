import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const root = new URL('../', import.meta.url);

test('installation examples target both agents and the same public skill', async () => {
  const readme = await fs.readFile(new URL('README.md', root), 'utf8');
  const commands = [...readme.matchAll(/^npx skills add (\S+) -g -a (\S+) -y$/gm)];
  assert.deepEqual(commands.map(match => [match[1], match[2]]).sort(), [
    ['SLtowl/sl-site-engine', 'claude-code'],
    ['SLtowl/sl-site-engine', 'codex'],
  ]);
});

test('documented invocations match the shared installable skill identity', async () => {
  const readme = await fs.readFile(new URL('README.md', root), 'utf8');
  const skill = await fs.readFile(new URL('skill/sl-site-engine/SKILL.md', root), 'utf8');
  const name = skill.match(/^name: ([a-z0-9-]+)$/m)?.[1];
  assert.equal(name, 'sl-site-engine');
  assert.ok(readme.includes(`$${name}`), 'Missing Codex invocation');
  assert.ok(readme.includes('```text\n/' + name + ' '), 'Missing Claude Code invocation');
  assert.ok(readme.includes(`.claude/skills/${name}/`), 'Missing manual Claude Code installation path');
});
