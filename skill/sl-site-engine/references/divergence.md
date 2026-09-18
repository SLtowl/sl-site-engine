# Meaningful divergence

Use this reference before building three or more directions.

## Separate concept from treatment

A direction is a different answer to the communication or workflow problem. It is not a recurring layout with new colors.

Define each direction on six deep axes:

1. **Thesis** — the central argument or experience.
2. **Primary object** — what owns the first viewport.
3. **Hierarchy** — what the user learns first, second, and third.
4. **Composition topology** — the spatial system, not merely alignment.
5. **Representation** — the role of product UI, photography, illustration, data, type, or empty space.
6. **Typography logic** — how type carries meaning, not just the font name.

For a page or landing-page set, also record a **continuation role** outside the six pairwise axes: `deepen-story`, `reveal-proof`, `move-to-task`, or `not-requested`. This prevents ten polished heroes from collapsing into the same generic second section.

Palette, radii, shadows, mood words, and animation are surface axes. They support a concept but cannot establish one alone.

## Pairwise difference rule

Every pair must differ on at least three of the six deep axes. Compare explicit short keys in the direction manifest, then inspect the actual silhouettes. If two options make the same argument through the same structure, keep the stronger one and replace the other.

Do not game the rule by inventing synonyms for the same choice. `split-product`, `product-split`, and `two-column-product` are one topology.

## Set-level coverage

Across a large set, deliberately explore different kinds of answers:

- content-led and object-led;
- sparse and information-dense;
- linear narrative and direct utility;
- image-dominant, type-dominant, and interface-dominant;
- conventional but exceptionally resolved and structurally risky but justified.
- a shared media asset used through genuinely different crops and roles, and an image-free option when the brief supports it.

Do not force one item from every category. The brief decides which branches are useful.

Agree on the visual proposals without shrinking the requested count. Approval of a common palette or component library does not make all concepts one composition. If the user selects only one for further implementation, retain the remaining sketches as proposals rather than falsely marking the whole set approved.

In `visibleElements`, `expression` is also a valid reason for a proposed subject-specific visual language. Describe its contribution; no pre-existing brand book is required.

## Direction manifest

Use a JSON file shaped like this for automated auditing:

```json
{
  "brief": {
    "subject": "A concrete subject",
    "audience": "A concrete audience",
    "pageJob": "One job",
    "primaryAction": "One action"
  },
  "viewport": { "width": 1440, "height": 1000 },
  "directions": [
    {
      "id": "short-stable-id",
      "name": "Project-specific name",
      "idea": "One sentence explaining the concept",
      "continuation": "deepen-story",
      "axes": {
        "thesis": "decision-key",
        "primaryObject": "object-key",
        "hierarchy": "hierarchy-key",
        "composition": "topology-key",
        "representation": "representation-key",
        "typography": "type-logic-key"
      },
      "tokens": {
        "palette": ["#000000", "#ffffff"],
        "fonts": ["Exact Font Name"],
        "radius": "0px",
        "density": "compact"
      },
      "implementation": {
        "prototype": "references/direction-01/index.html",
        "screenshot": "references/direction-01.png",
        "secondScreenshot": "references/direction-01-next.png",
        "assets": [],
        "fonts": []
      },
      "audit": {
        "hardFailures": [],
        "warningSignals": [],
        "warningRationale": "",
        "visibleElements": [
          {
            "element": "Primary action",
            "reason": "action",
            "evidence": "Starts the requested booking flow"
          }
        ]
      }
    }
  ]
}
```

Run:

```sh
node scripts/audit-direction-set.mjs path/to/direction-set.json --stage concept
node scripts/audit-direction-set.mjs path/to/direction-set.json --stage reference
```

The script catches structural failures. It does not replace visual judgment.
