# Code-faithful references

Use this reference before building and when comparing screenshots.

A sketch and a final code-faithful reference are different stages. An exploratory generated composition may guide approval but carries no pixel-match guarantee. Final references must come from actual code. A coded sketch records its current implementation without implying the user has approved its direction.

Code fidelity is a release condition for the final reference, not an optional priority traded for originality or beauty. Check feasibility while offering compositions, then implement the selected one with the exact local assets/fonts. If a material layer remains unresolved, keep the artifact at sketch status and disclose it. Never present a prettier unimplemented raster as the final code-faithful result.

## Implementation map

Map every visible layer before rendering:

| Layer | Record |
| --- | --- |
| Layout | grid, flex, absolute composition, SVG, or canvas |
| Typography | exact font files, weights, fallbacks, and line-height |
| Imagery | local path, licensed source, or generation requirement |
| Effects | exact CSS, SVG filter, mask, blend mode, or canvas method |
| Motion | trigger, duration, easing, and reduced-motion behavior |
| Content | exact copy and source status |

If a layer cannot be mapped, explain the limitation while it is still a proposal and offer a realizable substitute. After composition approval, get agreement before materially removing or simplifying an accepted feature. Refresh the browser screenshot after any agreed change; do not retain a misleading approved picture alongside different code.

## Prototype scope

For option exploration, build only what is needed to prove the requested section and target viewport:

- static semantic HTML;
- scoped CSS and exact tokens;
- only the JavaScript required for a visible state;
- real or explicitly labeled demo content;
- deterministic assets.

For a landing-page direction, the smallest useful proof is often two viewport renders: the hero and the first meaningful continuation. For an isolated-section request, one render is enough.

Do not spend time implementing full navigation, backend calls, complete responsiveness, or every state for every option. Those belong to the selected direction.

## Rendering contract

Declare one viewport for the comparison and render every option at that exact size and device scale. Wait for fonts and images before capture. Keep browser zoom at 100%.

Also record browser/runtime and screenshot device scale. Fidelity applies to the captured code, exact resources and these conditions. It is not a guarantee of identical pixels across all operating systems, devices, viewports or later production edits.

Record:

- viewport width and height;
- screenshot path;
- continuation screenshot path when requested;
- prototype path;
- font names and file paths or URLs;
- asset list;
- known fidelity limits.

The screenshot must come from the prototype. Never treat an image-generation output of the whole interface as the final reference.

## Comparison

Compare the selected implementation and approved reference at the same viewport. Inspect:

- composition and major bounds;
- text wrapping, font weight, and baseline rhythm;
- spacing and component scale;
- image crop and focal point;
- colors, borders, shadows, and layer order.

Correct the code or simplify the reference until the differences are explainable. Small operating-system differences in font antialiasing are acceptable; different font metrics, wrapping, or layout are not.

## Asset generation

Generated assets must be standalone and controllable: photography, illustration, texture, 3D scenes, people, or isolated objects. Keep text, controls, charts, and layout in code. A person is not a quality shortcut; use one only when the subject calls for one.

When identity must persist across a product, person, or object set, generate one anchor asset first and use it as the reference for later scenes or crops. Record prompts, identity references, asset paths, aspect ratios, and crop requirements when they materially affect reproducibility.

The reference is faithful only when the exact local asset shown in the screenshot is loaded by the prototype. A generated image that merely resembles the coded implementation does not qualify.
