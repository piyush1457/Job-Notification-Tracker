# KodNest Premium Build System

Design system for KodNest. Calm, intentional, coherent.

## Quick Start

```html
<link rel="stylesheet" href="design-system/index.css" />
```

Or in your build pipeline:

```css
@import "./design-system/index.css";
```

## Structure

| File | Purpose |
|------|---------|
| `tokens.css` | Colors, typography, spacing, layout variables |
| `base.css` | Resets, body, headings, focus states |
| `layout.css` | App shell, workspace + panel structure |
| `components.css` | Buttons, inputs, cards, top bar, proof footer, states |
| `index.css` | Single entry point (imports all) |
| `DESIGN_SYSTEM.md` | Full specification and rules |

## Class Naming

All classes use the `kn-` prefix (KodNest) to avoid collisions.

## HTML Shell Example

```html
<div class="kn-app-shell">
  <header class="kn-top-bar">
    <div class="kn-top-bar-left">Project Name</div>
    <div class="kn-top-bar-center">Step 1 / 5</div>
    <div class="kn-top-bar-right">
      <span class="kn-status-badge kn-status-badge--progress">In Progress</span>
    </div>
  </header>
  <section class="kn-context-header">
    <h1>Headline</h1>
    <p>One-line subtext.</p>
  </section>
  <main class="kn-workspace-layout">
    <div class="kn-workspace-primary"><!-- 70% --></div>
    <div class="kn-workspace-secondary"><!-- 30% --></div>
  </main>
  <footer class="kn-proof-footer">
    <label class="kn-proof-item"><input type="checkbox" /> UI Built</label>
    <!-- ... -->
  </footer>
</div>
```

See `DESIGN_SYSTEM.md` for full specification.
