# SL Site Engine

A skill for Codex and Claude Code. Choose a website design and get its browser preview with editable code in HTML/CSS/JavaScript, React or Next.js.

![SL Site Engine cover](cover.png)

[Install](#installation) · [Usage](#usage) · [Preview](#preview) · [How it works](#how-it-works) · [MIT License](LICENSE)

## What you get

- **A choice of layouts.** Compare compositions before committing to one.
- **A reference with code.** The final image is a screenshot of the supplied prototype.
- **A format that fits your project.** Keep your existing stack, choose one, or ask for a recommendation.
- **Details chosen for your project.** Agree on colors, button shapes, content and visual density.

Ask for one page or several directions. Photos and illustrations can be generated separately; text and controls remain editable.

## Installation

Run the command for your app in a terminal.

**Codex**

```sh
npx skills add SLtowl/sl-site-engine -g -a codex -y
```

**Claude Code**

```sh
npx skills add SLtowl/sl-site-engine -g -a claude-code -y
```

Requires Node.js/npm. Installation uses the open-source [skills CLI](https://github.com/vercel-labs/skills). Start a new task or session after installing. Omit `-g` to install only in the current project.

<details>
<summary>Manual installation for Claude Code</summary>

Download this repository and copy the complete [`skill/sl-site-engine`](skill/sl-site-engine) folder into `.claude/skills/sl-site-engine/` in your project, or `~/.claude/skills/sl-site-engine/` for all projects. Keep its references, scripts and assets together with `SKILL.md`.

Claude Code uses the same skill files; no separate plugin is required. See the [Claude Code skills documentation](https://code.claude.com/docs/en/skills).

</details>

## Usage

In Codex, use `$sl-site-engine` in your request. In Claude Code, start with `/sl-site-engine`:

```text
/sl-site-engine Create a homepage reference for my bakery. Help me choose the layout, colors and buttons.
```

The examples below use Codex syntax. For Claude Code, replace `Use $sl-site-engine to` with `/sl-site-engine`.

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

**Choose the implementation format**

```text
Use $sl-site-engine to create a homepage reference in Next.js.
Build the selected direction in that project and capture its browser preview.
```

You can choose HTML/CSS/JavaScript, React, Next.js (React), or ask for help choosing. If your project already uses a framework, the agent keeps it unless you request a change. HTML and CSS are used together, not offered as competing formats.

## Preview

[![Website designs on floating 3D panels](assets/media/sl-site-engine-preview.gif)](assets/media/sl-site-engine.mp4)

[Watch the video](https://github.com/SLtowl/sl-site-engine/raw/refs/heads/main/assets/media/sl-site-engine.mp4)

The cover and video are promotional artwork, not working website examples.

## How it works

### Start with the brief

The agent asks up to three initial questions about your business, brand voice, palette, controls and amount of detail. It recommends looking at relevant websites and design references, but searches only with your permission.

Before coding, it also resolves the implementation format. Known choices are reused; if you are unsure, it recommends a setup based on the page and how you plan to use it.

### Choose a layout

For one final reference, you usually compare two or three sketches. If you asked for several directions, you choose from that set.

After choosing, you compare a calmer and a richer version and agree on the content and actions. With a connected component library, the agent shows two or three real button options and recommends one.

### See the page in a browser

The agent builds the design directly in the agreed stack, using fonts, separate images and editable controls. It checks the running project and takes a screenshot at the agreed viewport size. A plain HTML preview does not count as a verified React or Next.js result.

**Quick** shows the first checked set. **Thorough** adds one internal revision pass. Research permission is separate from either mode.

### Refine what needs changing

A request to change a button changes the button. If the whole design feels wrong, the agent returns to the composition. Approved choices and saved comparison versions are preserved.

## Design checks

The skill reviews composition, subject size, copy, controls and image placement. Decorative section numbers and tiny captions attached to ornamental lines are excluded. Useful numbers, navigation and meaningful icons are allowed.

Colors, rounded corners and patterns follow the brief. Business claims must be supplied or verified, not invented. A claimed library component must come from that library.

[Design checklist](skill/sl-site-engine/references/anti-slop.md) · [Reference accuracy](skill/sl-site-engine/references/fidelity.md) · [Working with images](skill/sl-site-engine/references/media-strategy.md)

<details>
<summary>Requirements and limits</summary>

Both apps use the same instructions. The agent needs local file access and a browser tool capable of opening local pages and taking screenshots, such as a configured Playwright setup. The skill does not install a browser, image generator or UI library.

Research needs web search and a way to inspect reference images or pages. Image generation needs a separately connected tool; without one, use supplied or appropriately licensed assets, or agree on an image-free direction. Tools connected in Codex do not automatically become available in Claude Code. A paid UI plugin is not required.

Without browser capture, the result remains an unverified prototype, not a final code-faithful reference.

React and Next.js outputs need a suitable Node.js environment and project dependencies. The agent must check the generated project's build, visible interactions and browser output. The skill supplies instructions, not a prebuilt converter or a bundled framework. Its repository tests do not establish that every generated React/Next.js project works; each output needs its own runtime checks.

Claude Code installation from a local checkout has been checked with skills CLI 1.7.0. The full design workflow still needs verification in an authenticated Claude Code session.

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
