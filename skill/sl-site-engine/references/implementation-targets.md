# Implementation target

Use before coding a selected direction. The visual process is shared; the implementation and final browser capture follow the selected project stack.

## Choose once

Inspect the supplied project first: package manifest, lockfile, framework configuration, routes, language and existing component/style conventions. Do not inspect unrelated folders or secrets to infer a stack.

- **Existing project:** keep its stack, router, package manager and conventions. State what was detected. Do not migrate or scaffold over it just because another framework is popular. If a new explicit request conflicts with the existing stack, clarify whether a migration or a separate prototype is intended before changing it.
- **Explicit target:** reuse it without asking again. React alone does not imply Next.js. An existing stack outside the options below stays valid; adapt to it or disclose a concrete tool limitation.
- **New project, no target:** ask one short question with these choices:

  “What should the page be built with: HTML/CSS/JavaScript, React, Next.js (React), or would you like me to recommend one?”

HTML and CSS are not competing choices. Both React and Next.js still use markup and styles. A framework choice does not select Tailwind, a UI library or a backend automatically.

For **help choosing**, explain the recommendation in one sentence based on the task: plain HTML/CSS/JS for a self-contained page with modest interactions; React for reusable interactive components or an intended React app; Next.js for an intended Next.js site or a need for its routing/rendering features. These are starting points, not restrictions on what each technology can do. Recommend the smallest suitable setup, not a visual-quality ranking. “Help me choose” permits a stated recommendation and proceeding; it is not an assertion that the user explicitly selected that framework.

If the question is unanswered, leave the target unresolved during visual sketches. If the user asks to proceed without more questions, state a provisional recommendation using the same criteria. Resolve it before the final coded reference. Quick/Thorough and research consent do not imply a stack choice.

## HTML/CSS/JavaScript

Use semantic HTML, scoped styles and only the JavaScript needed for agreed interactions. Keep text, layout and controls editable. Supply a local preview command when assets or modules need HTTP. Do not add a framework just to make the deliverable appear more advanced.

## React

Use the existing build setup. For a new standalone React reference, a lightweight setup such as Vite is sufficient when compatible with the brief; check current package requirements when scaffolding. Preserve the project's JavaScript/TypeScript choice.

Deliver real JSX/TSX components with styles and reusable assets. Use React state, event handlers and refs for interactions, with cleanup for external subscriptions. Do not wrap an entire static page in an iframe or raw HTML injection and call it a React implementation. A component source file without a runnable entry is incomplete.

## Next.js

Next.js is a React framework, not a separate design language. Preserve an existing App Router or Pages Router project. For a new project, use the current supported App Router setup unless the brief requires otherwise; consult current official setup documentation rather than pinning an obsolete version in this skill.

Create the needed page, layout, components, styling and public assets within that structure. In App Router, keep browser-only APIs, state and event handlers within appropriate client boundaries; a stylesheet alone does not require a Client Component. Do not add server endpoints, authentication, payments or real booking merely because the framework supports them.

## Same design, actual runtime

Keep the approved typography, spacing, crops, masks and interaction intent when choosing a stack. A later migration requires a new browser comparison. Image/font optimizations and default/reset styles can change visible layout; inspect their output rather than assuming identical pixels.

Install/run using the project's package manager and lockfile. Record the command and actual preview route. Run available build/type checks appropriate to the target, then test the visible controls and check console/hydration errors. Capture the selected route after fonts/images and relevant hydration settle, with the agreed viewport and device scale. Compilation alone is not a visual or interaction test.

If the environment cannot install dependencies, start the target, or capture its page, report the exact unverified layer. Do not silently replace React/Next.js with HTML or label an HTML screenshot as their verified output. Offer that fallback for approval.

Deliver the required source, styles, assets, package manifest/lockfile when applicable, and launch instructions. Record missing integrations separately. Framework support in these instructions is not proof that every runtime, generated project or host agent has been tested.

Official references: [React integration](https://react.dev/learn/add-react-to-an-existing-project), [Next.js setup](https://nextjs.org/docs/app/getting-started/installation), [Next.js server/client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components).
