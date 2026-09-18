# SL Site Engine

A Codex skill for choosing a website design and getting its browser preview with editable HTML and CSS.

![SL Site Engine cover](cover.png)

[Install](#installation) · [Usage](#usage) · [Preview](#preview) · [How it works](#how-it-works) · [MIT License](LICENSE)

## What you get

- **A choice of layouts.** Compare compositions before committing to one.
- **A reference with code.** The final image is a screenshot of the supplied prototype.
- **Details chosen for your project.** Agree on colors, button shapes, content and visual density.

Ask for one page or several directions. Photos and illustrations can be generated separately; text and controls remain editable.

## Installation

Run this in your terminal:

```sh
npx skills add SLtowl/sl-site-engine -g -a codex -y
```

Requires Node.js/npm. Installation uses the open-source [skills CLI](https://github.com/vercel-labs/skills). Start a new Codex task after installing.

## Usage

**Choose a design for one page**

```text
Use $sl-site-engine to create a homepage reference for my bakery.
Help me choose the layout, colors and buttons.
```

**Compare several directions**

```text
Use $sl-site-engine to create 10 different directions for my car tuning studio.
Use deep blue and black, with rectangular controls. Start with the first screen.
```

Already have a brief, images or a component library? Include them in the task. The skill uses decisions you have already made.

## Preview

[![Website designs on floating 3D panels](assets/media/sl-site-engine-preview.gif)](assets/media/sl-site-engine.mp4)

[Watch the video](https://github.com/SLtowl/sl-site-engine/raw/refs/heads/main/assets/media/sl-site-engine.mp4)

The cover and video are promotional artwork, not working website examples.

## How it works

### Start with the brief

The agent asks up to three initial questions about your business, brand voice, palette, controls and amount of detail. It recommends looking at relevant websites and design references, but searches only with your permission.

### Choose a layout

For one final reference, you usually compare two or three sketches. If you asked for several directions, you choose from that set.

After choosing, you compare a calmer and a richer version and agree on the content and actions. With a connected component library, the agent shows two or three real button options and recommends one.

### See the page in a browser

The agent builds the design with fonts, separate images and editable HTML/CSS, then takes a screenshot at the agreed viewport size.

**Quick** shows the first checked set. **Thorough** adds one internal revision pass. Research permission is separate from either mode.

### Refine what needs changing

A request to change a button changes the button. If the whole design feels wrong, the agent returns to the composition. Approved choices and saved comparison versions are preserved.

## Design checks

The skill reviews composition, subject size, copy, controls and image placement. Decorative section numbers and tiny captions attached to ornamental lines are excluded. Useful numbers, navigation and meaningful icons are allowed.

Colors, rounded corners and patterns follow the brief. Business claims must be supplied or verified, not invented. A claimed library component must come from that library.

[Design checklist](skill/sl-site-engine/references/anti-slop.md) · [Reference accuracy](skill/sl-site-engine/references/fidelity.md) · [Working with images](skill/sl-site-engine/references/media-strategy.md)

<details>
<summary>Requirements and limits</summary>

The agent needs local file access and a browser to build and capture pages. Search and image generation require their own tools. A paid UI plugin is not required.

Early sketches can use generated imagery and are labelled as sketches. Only the final browser capture shows the implemented page.

Screenshot accuracy depends on the recorded viewport, browser, fonts and assets. Other screen sizes need separate checks. Responsive layouts, backend services, payments and ordering flows are separate work unless requested.

Sets of three or more directions also pass script-based checks for meaningful differences, asset paths, fonts and reasons for including visible elements.

This is an early release. Technical checks can catch errors, but cannot establish which design looks better. The skill does not guarantee a better result than working without it.

</details>

## Also by SL

[SL UI Library](https://github.com/SLtowl/sl-ui-library) provides UI components you can use with this skill. Connecting a library is optional; unavailable components must be disclosed.

[Graphite Dashboard Design](https://github.com/SLtowl/graphite-dashboard-design) is a separate skill for dashboards in a graphite palette.

## License

[MIT](LICENSE). You can use, modify and share the skill, including in commercial projects, while retaining the copyright and license notices.
