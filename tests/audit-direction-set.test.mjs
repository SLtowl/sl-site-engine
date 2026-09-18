import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {auditDirectionSet} from '../skill/sl-site-engine/scripts/audit-direction-set.mjs';

const axes = seed => ({
  thesis: `thesis-${seed}`,
  primaryObject: `object-${seed}`,
  hierarchy: `hierarchy-${seed}`,
  composition: `composition-${seed}`,
  representation: `representation-${seed}`,
  typography: `typography-${seed}`
});

function direction(id, overrides = {}) {
  return {
    id,
    name: `Direction ${id}`,
    idea: `A project-specific concept for the ${id} direction.`,
    axes: axes(id),
    tokens: {
      palette: ['#111111', '#f2efe8'],
      fonts: ['Georgia', 'Arial'],
      radius: '0px',
      density: 'compact'
    },
    implementation: {
      prototype: `${id}.html`,
      screenshot: `${id}.png`,
      assets: [],
      fonts: ['system:Georgia', 'system:Arial']
    },
    audit: {
      hardFailures: [],
      warningSignals: [],
      warningRationale: '',
      visibleElements: [
        {element: 'Primary action', reason: 'action', evidence: 'Starts the requested user task'}
      ]
    },
    ...overrides
  };
}

const manifest = directions => ({
  brief: {
    subject: 'Night observatory visits',
    audience: 'Families planning a visit',
    pageJob: 'Choose an observation session',
    primaryAction: 'View available sessions'
  },
  viewport: {width: 1440, height: 1000},
  directions
});

test('passes a meaningfully divergent concept set', async () => {
  const report = await auditDirectionSet(manifest([
    direction('field-log'),
    direction('sky-index'),
    direction('orbit-path')
  ]));
  assert.equal(report.ok, true);
  assert.equal(report.pairCount, 3);
});

test('rejects a surface recolor disguised as another direction', async () => {
  const original = direction('original');
  const recolor = direction('recolor', {
    axes: {...original.axes, typography: 'typography-recolor'},
    tokens: {...original.tokens, palette: ['#331155', '#f8edff']}
  });
  const report = await auditDirectionSet(manifest([original, recolor]));
  assert.equal(report.ok, false);
  assert.match(report.errors.join('\n'), /differ on only 1\/6/);
});

test('one hard failure blocks the direction', async () => {
  const blocked = direction('blocked');
  blocked.audit.hardFailures.push('Invented customer count');
  const report = await auditDirectionSet(manifest([blocked, direction('clean')]));
  assert.equal(report.ok, false);
  assert.match(report.errors.join('\n'), /Invented customer count/);
});

test('reference stage accepts a subject-specific expressive detail without a pre-existing brand book', async () => {
  const expressive = direction('expressive');
  expressive.audit.visibleElements.push({
    element: 'Hand-drawn fruit vignette',
    reason: 'expression',
    evidence: 'Introduces a proposed hand-crafted visual voice for the seasonal pastry offering'
  });
  const report = await auditDirectionSet(manifest([expressive, direction('type-led')]), {stage: 'reference'});
  assert.equal(report.ok, true, report.errors.join('\n'));
});

test('three warning signals require a specific rationale', async () => {
  const noisy = direction('noisy');
  noisy.audit.warningSignals = ['gradient-headline', 'glass-cards', 'aurora-blob'];
  const report = await auditDirectionSet(manifest([noisy, direction('quiet')]));
  assert.equal(report.ok, false);
  assert.match(report.errors.join('\n'), /without a brief-specific rationale/);
});

test('reference stage verifies artifacts and visible-element evidence', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'direction-audit-'));
  t.after(async () => fs.rm(root, {recursive: true, force: true}));
  await fs.writeFile(path.join(root, 'ready.html'), '<!doctype html><title>Ready</title>');
  await fs.writeFile(path.join(root, 'ready.png'), Buffer.from([137, 80, 78, 71]));

  const ready = direction('ready', {
    implementation: {
      prototype: 'ready.html',
      screenshot: 'ready.png',
      assets: [],
      fonts: ['system:Georgia']
    }
  });
  const second = direction('second', {
    implementation: {
      prototype: 'missing.html',
      screenshot: 'missing.png',
      assets: [],
      fonts: ['system:Arial']
    }
  });

  const report = await auditDirectionSet(manifest([ready, second]), {stage: 'reference', baseDir: root});
  assert.equal(report.ok, false);
  assert.match(report.errors.join('\n'), /missing\.html/);
  assert.match(report.errors.join('\n'), /missing\.png/);
});

test('reference stage accepts explicit system fonts and existing files', async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'direction-audit-'));
  t.after(async () => fs.rm(root, {recursive: true, force: true}));
  for (const id of ['one', 'two']) {
    await fs.writeFile(path.join(root, `${id}.html`), '<!doctype html><title>Ready</title>');
    await fs.writeFile(path.join(root, `${id}.png`), Buffer.from([137, 80, 78, 71]));
  }
  const report = await auditDirectionSet(manifest([direction('one'), direction('two')]), {stage: 'reference', baseDir: root});
  assert.equal(report.ok, true);
});
