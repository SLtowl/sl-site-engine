![SL Site Engine cover](cover.png)

<h1 align="center">SL Site Engine</h1>
<p align="center">Explore website designs in Codex and preview them from working HTML and CSS.</p>
<p align="center"><a href="#install">Install</a> · <a href="#video">Video</a> · <a href="#how-it-works">How it works</a></p>

Describe your business and choose a layout. The skill helps you settle the content, colors and controls, then builds a prototype and captures it in a browser. You get the screenshot and the code behind it.

## Install

```sh
npx skills add SLtowl/sl-site-engine -g -a codex -y
```

Installation uses the open-source [skills CLI](https://github.com/vercel-labs/skills) and requires Node.js/npm. Start a new Codex task after installing:

> Use $sl-site-engine to create a homepage reference for my bakery. Help me choose the layout.

To compare several designs:

> Use $sl-site-engine to create 10 different directions for my product website. Start with the first screen.

The skill contains instructions for the agent. It needs access to local files and a browser to build and capture pages. Search and image generation require the corresponding tools. A paid UI plugin is not required.

## Video

[![Website designs on floating 3D panels](assets/media/sl-site-engine-preview.gif)](assets/media/sl-site-engine.mp4)

[Watch or download the MP4](https://github.com/SLtowl/sl-site-engine/raw/refs/heads/main/assets/media/sl-site-engine.mp4)

The cover and video are promotional artwork. They do not show working websites.

## How it works

| Step | What happens |
| --- | --- |
| Brief | The agent asks up to three initial questions covering the business, brand voice, colors, button shape and amount of detail. It uses answers you have already given. |
| Research | It offers to look for relevant designs online. Search starts only if you agree. |
| Layout | For a single reference, you usually choose from two or three sketches. If you requested several directions, you choose from that set. |
| Details | You agree on the content and actions, then compare a calmer and a richer version. With a connected component library, the agent shows two or three suitable button options and recommends one. |
| Build | It creates the page with editable text, fonts, images and HTML/CSS, then takes a browser screenshot. |
| Changes | A request to change one detail stays local. If you reject the whole design, the agent revisits the layout. Approved choices and saved comparisons are preserved. |

The default is an expressive design. You can ask for less detail or let the agent make the choices.

**Quick** returns the first checked set. **Thorough** adds one internal revision pass. Neither mode gives permission to search on its own.

## What you get

The final reference is a screenshot of the supplied prototype. Fonts, spacing, image crops and controls are already in the code. Image generation can provide photos, illustrations and textures; text and interface elements remain editable.

Early sketches are labelled as sketches and may use generated imagery. They are not exact previews of the implementation.

The final screenshot matches the code under the recorded browser conditions, including viewport, fonts and assets. Other screen sizes need their own checks. Responsive layouts, backend services, payments and ordering flows are separate work unless requested.

See [reference accuracy](skill/sl-site-engine/references/fidelity.md) and [using images](skill/sl-site-engine/references/media-strategy.md).

## Design checks

The skill checks the layout, size of the main subject, copy, controls and use of images. It excludes decorative section numbers and tiny labels paired with ornamental lines. Useful prices, dates, steps and navigation are allowed.

Colors, rounded corners, icons and patterns follow the brief. Reviews, prices and business claims must not be invented and presented as facts. If the agent says it used a component library, it must use real components from that library and disclose anything unavailable.

Sets of three or more directions also get a script-based check for meaningful differences, asset paths, fonts and reasons for including visible elements. Full rules are in the [design checklist](skill/sl-site-engine/references/anti-slop.md).

This is an early release. Technical checks help catch errors, but they cannot establish whether a design looks better. The skill does not guarantee a better result than working without it.

## Related projects

The skill works without [SL UI Library](https://github.com/SLtowl/sl-ui-library). You can connect it or another component library if you want to use its controls.

Also by SL: [Graphite Dashboard Design](https://github.com/SLtowl/graphite-dashboard-design).

## License

[MIT](LICENSE).
