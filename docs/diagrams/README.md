# 🗺️ Diagram Catalogue

These editable Mermaid source files explain the application and engineering workflows.

| Diagram | Purpose |
|---|---|
| [System context](system-context.mmd) | External actors, app, providers, and deployment |
| [Data flow](data-flow.mmd) | Current prototype flow versus required server-side authorization |
| [Release flow](release-flow.mmd) | Issue-to-release lifecycle |

## Rendering
GitHub previews Mermaid in Markdown code fences. The `.mmd` files are source assets and can be rendered locally using Mermaid CLI or a compatible editor. Keep generated images derived from these files, not hand-edited copies that drift.

## Accuracy
The diagrams distinguish the current client-side Neon access from a future secure server-mediated architecture. Do not remove that warning unless the source code has changed and been reviewed.
