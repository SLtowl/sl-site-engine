#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const DEEP_AXES = [
  'thesis',
  'primaryObject',
  'hierarchy',
  'composition',
  'representation',
  'typography'
];

const VALID_REASONS = new Set(['content', 'hierarchy', 'action', 'brand', 'feedback', 'expression']);
const VALID_CONTINUATIONS = new Set(['deepen-story', 'reveal-proof', 'move-to-task', 'not-requested']);
const HEX = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const FUNCTION_COLOR = /^(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|color)\(/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const isText = value => typeof value === 'string' && value.trim().length > 0;
const normalize = value => String(value ?? '').trim().toLowerCase().replace(/[_\s]+/g, '-');
const isColor = value => isText(value) && (HEX.test(value.trim()) || FUNCTION_COLOR.test(value.trim()) || /^var\(--[a-z0-9-]+\)$/i.test(value.trim()));

function pairDifferences(left, right) {
  const differing = DEEP_AXES.filter(axis => normalize(left.axes?.[axis]) !== normalize(right.axes?.[axis]));
  return {differing, count: differing.length};
}

function localTarget(entry, baseDir) {
  if (!isText(entry) || /^(?:https?:|data:|system:)/i.test(entry)) return null;
  return path.resolve(baseDir, entry);
}

async function checkFile(entry, baseDir, label, errors) {
  const target = localTarget(entry, baseDir);
  if (!target) return;
  try {
    const stat = await fs.stat(target);
    if (!stat.isFile()) errors.push(`${label} is not a file: ${entry}`);
  } catch {
    errors.push(`${label} does not exist: ${entry}`);
  }
}

export async function auditDirectionSet(data, options = {}) {
  const stage = options.stage ?? 'concept';
  const minDifferences = Number(options.minDifferences ?? 3);
  const baseDir = options.baseDir ? path.resolve(options.baseDir) : null;
  const errors = [];
  const warnings = [];
  const pairs = [];

  if (!['concept', 'reference'].includes(stage)) {
    errors.push(`Unknown stage "${stage}"; use concept or reference.`);
  }
  if (!Number.isInteger(minDifferences) || minDifferences < 1 || minDifferences > DEEP_AXES.length) {
    errors.push(`minDifferences must be an integer from 1 to ${DEEP_AXES.length}.`);
  }

  const brief = data?.brief;
  for (const field of ['subject', 'audience', 'pageJob']) {
    if (!isText(brief?.[field])) errors.push(`brief.${field} is required.`);
  }
  if (!isText(brief?.primaryAction)) warnings.push('brief.primaryAction is empty; confirm that the page intentionally has no primary action.');

  const viewport = data?.viewport;
  if (!Number.isInteger(viewport?.width) || viewport.width < 240) errors.push('viewport.width must be an integer of at least 240.');
  if (!Number.isInteger(viewport?.height) || viewport.height < 240) errors.push('viewport.height must be an integer of at least 240.');

  const directions = Array.isArray(data?.directions) ? data.directions : [];
  if (directions.length < 2) errors.push('At least two directions are required for a comparison set.');

  const ids = new Set();
  const names = new Set();

  for (const [index, direction] of directions.entries()) {
    const prefix = `directions[${index}]`;
    const id = normalize(direction?.id);
    const name = normalize(direction?.name);

    if (!SLUG.test(id)) errors.push(`${prefix}.id must be a lowercase kebab-case key.`);
    if (ids.has(id)) errors.push(`${prefix}.id duplicates "${direction.id}".`);
    ids.add(id);

    if (!isText(direction?.name)) errors.push(`${prefix}.name is required.`);
    if (names.has(name)) errors.push(`${prefix}.name duplicates "${direction.name}".`);
    names.add(name);

    if (!isText(direction?.idea) || direction.idea.trim().length < 24) {
      errors.push(`${prefix}.idea must explain the project-specific concept in at least 24 characters.`);
    }
    if (direction?.continuation !== undefined && !VALID_CONTINUATIONS.has(direction.continuation)) {
      errors.push(`${prefix}.continuation must be deepen-story, reveal-proof, move-to-task, or not-requested.`);
    }

    for (const axis of DEEP_AXES) {
      const value = direction?.axes?.[axis];
      if (!isText(value)) {
        errors.push(`${prefix}.axes.${axis} is required.`);
      } else if (!SLUG.test(value)) {
        errors.push(`${prefix}.axes.${axis} must be a lowercase kebab-case decision key.`);
      }
    }

    const hardFailures = direction?.audit?.hardFailures;
    if (!Array.isArray(hardFailures)) {
      errors.push(`${prefix}.audit.hardFailures must be an array.`);
    } else if (hardFailures.length > 0) {
      errors.push(`${prefix} contains hard failures: ${hardFailures.join('; ')}`);
    }

    const warningSignals = direction?.audit?.warningSignals;
    if (!Array.isArray(warningSignals)) {
      errors.push(`${prefix}.audit.warningSignals must be an array.`);
    } else if (warningSignals.length >= 3 && (!isText(direction?.audit?.warningRationale) || direction.audit.warningRationale.trim().length < 30)) {
      errors.push(`${prefix} has ${warningSignals.length} warning signals without a brief-specific rationale.`);
    }

    if (stage === 'reference') {
      const palette = direction?.tokens?.palette;
      if (!Array.isArray(palette) || palette.length < 2 || palette.length > 8 || palette.some(value => !isColor(value))) {
        errors.push(`${prefix}.tokens.palette must contain 2–8 explicit CSS colors.`);
      }
      if (!Array.isArray(direction?.tokens?.fonts) || direction.tokens.fonts.length === 0 || direction.tokens.fonts.some(value => !isText(value))) {
        errors.push(`${prefix}.tokens.fonts must list the exact font families.`);
      }
      for (const field of ['radius', 'density']) {
        if (!isText(direction?.tokens?.[field])) errors.push(`${prefix}.tokens.${field} is required.`);
      }

      const implementation = direction?.implementation;
      if (!isText(implementation?.prototype)) errors.push(`${prefix}.implementation.prototype is required.`);
      if (!isText(implementation?.screenshot)) errors.push(`${prefix}.implementation.screenshot is required.`);
      if (!Array.isArray(implementation?.assets)) errors.push(`${prefix}.implementation.assets must be an array.`);
      if (!Array.isArray(implementation?.fonts) || implementation.fonts.length === 0) {
        errors.push(`${prefix}.implementation.fonts must list a local, remote, or system: font source.`);
      }

      const visibleElements = direction?.audit?.visibleElements;
      if (!Array.isArray(visibleElements) || visibleElements.length === 0) {
        errors.push(`${prefix}.audit.visibleElements must justify the salient visible elements.`);
      } else {
        for (const [elementIndex, element] of visibleElements.entries()) {
          const elementPrefix = `${prefix}.audit.visibleElements[${elementIndex}]`;
          if (!isText(element?.element)) errors.push(`${elementPrefix}.element is required.`);
          if (!VALID_REASONS.has(element?.reason)) errors.push(`${elementPrefix}.reason must be content, hierarchy, action, brand, feedback, or expression.`);
          if (!isText(element?.evidence) || element.evidence.trim().length < 12) errors.push(`${elementPrefix}.evidence must be concrete.`);
        }
      }

      if (baseDir) {
        await checkFile(implementation?.prototype, baseDir, `${prefix} prototype`, errors);
        await checkFile(implementation?.screenshot, baseDir, `${prefix} screenshot`, errors);
        for (const [assetIndex, asset] of (implementation?.assets ?? []).entries()) {
          await checkFile(asset, baseDir, `${prefix} asset[${assetIndex}]`, errors);
        }
        for (const [fontIndex, font] of (implementation?.fonts ?? []).entries()) {
          await checkFile(font, baseDir, `${prefix} font[${fontIndex}]`, errors);
        }
      }
    }
  }

  for (let leftIndex = 0; leftIndex < directions.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < directions.length; rightIndex += 1) {
      const left = directions[leftIndex];
      const right = directions[rightIndex];
      const difference = pairDifferences(left, right);
      pairs.push({left: left?.id, right: right?.id, ...difference});
      if (difference.count < minDifferences) {
        errors.push(`Directions "${left?.id}" and "${right?.id}" differ on only ${difference.count}/${DEEP_AXES.length} deep axes; minimum is ${minDifferences}.`);
      }
    }
  }

  return {
    ok: errors.length === 0,
    stage,
    directionCount: directions.length,
    pairCount: pairs.length,
    errors,
    warnings,
    pairs
  };
}

function parseArgs(argv) {
  const result = {file: null, stage: 'concept', minDifferences: 3, json: false};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith('--') && !result.file) result.file = arg;
    else if (arg === '--stage') result.stage = argv[++index];
    else if (arg === '--min-differences') result.minDifferences = Number(argv[++index]);
    else if (arg === '--json') result.json = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!result.file) throw new Error('Usage: node scripts/audit-direction-set.mjs <manifest.json> [--stage concept|reference] [--min-differences 3] [--json]');
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const file = path.resolve(args.file);
  const data = JSON.parse(await fs.readFile(file, 'utf8'));
  const report = await auditDirectionSet(data, {
    stage: args.stage,
    minDifferences: args.minDifferences,
    baseDir: path.dirname(file)
  });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(`${report.ok ? 'PASS' : 'FAIL'} · ${report.directionCount} directions · ${report.pairCount} pair checks · ${report.stage} stage`);
    for (const warning of report.warnings) console.log(`WARN · ${warning}`);
    for (const error of report.errors) console.log(`FAIL · ${error}`);
  }
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch(error => {
    console.error(`FAIL · ${error.message}`);
    process.exitCode = 1;
  });
}
