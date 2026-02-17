# KodNest Premium Build System

**Design System Specification**

A calm, intentional, coherent design system for B2C product experiences. No flash, no hype, no visual drift.

---

## Design Philosophy

- **Calm** — No gradients, glassmorphism, neon, or animation noise
- **Intentional** — Every choice has a reason; nothing decorative
- **Coherent** — Same patterns everywhere; one mind designed it
- **Confident** — Generous whitespace, clear hierarchy, no crowding

**Never:** Flashy, loud, playful, hackathon-style, or student-project feel.

---

## Color System

Maximum **4 colors** across the entire system.

| Role       | Value      | Usage                          |
|------------|------------|--------------------------------|
| Background | `#F7F6F3`  | Page background (off-white)    |
| Text       | `#111111`  | Primary text                   |
| Accent     | `#8B0000`  | CTAs, links, focus, status     |
| Success    | Muted green| Completed, shipped states      |
| Warning    | Muted amber| In-progress, attention states  |

**Derivatives only:** `--kn-text-muted`, `--kn-border` — no new hues. No gradients.

---

## Typography

| Element   | Font          | Size    | Line Height | Notes                    |
|-----------|---------------|---------|-------------|--------------------------|
| H1        | Serif         | 2.5rem  | 1.3         | Large, confident         |
| H2        | Serif         | 1.875rem| 1.3         |                          |
| H3        | Serif         | 1.25rem | 1.3         |                          |
| Body      | Sans-serif    | 16–18px | 1.6–1.8     | Clean, readable          |
| Caption   | Sans-serif    | 14px    | 1.5         | Labels, badges           |

- **Headings:** Serif (e.g. Cormorant Garamond, Georgia), generous spacing
- **Body:** Sans-serif (e.g. DM Sans, system-ui), max-width **720px** for text blocks
- **No** decorative fonts, no random sizes

---

## Spacing System

Use only this scale. Never use 13px, 27px, or arbitrary values.

| Token  | Value |
|--------|-------|
| `xs`   | 8px   |
| `sm`   | 16px  |
| `md`   | 24px  |
| `lg`   | 40px  |
| `xl`   | 64px  |

Whitespace is part of the design.

---

## Global Layout Structure

Every page **must** follow this order:

```
[Top Bar]
    ↓
[Context Header]
    ↓
[Primary Workspace (70%) | Secondary Panel (30%)]
    ↓
[Proof Footer]
```

### Top Bar
- **Left:** Project name
- **Center:** Progress indicator (Step X / Y)
- **Right:** Status badge — `Not Started` | `In Progress` | `Shipped`

### Context Header
- Large serif headline
- One-line subtext
- Clear purpose; no hype language

### Primary Workspace (70% width)
- Main product interaction
- Clean cards, predictable components
- No crowding

### Secondary Panel (30% width)
- Step explanation (short)
- Copyable prompt box
- Buttons: Copy, Build in Lovable, It Worked, Error, Add Screenshot
- Calm styling

### Proof Footer (persistent bottom)
- Checklist: □ UI Built □ Logic Working □ Test Passed □ Deployed
- Each checkbox requires user proof input

---

## Component Rules

| Component    | Rule |
|--------------|------|
| Primary btn  | Solid deep red (`#8B0000`) |
| Secondary btn| Outlined, border only |
| Hover        | Same effect everywhere; no bounce |
| Border radius| Same value everywhere (`6px`) |
| Inputs       | Clean borders, no heavy shadows, clear focus state |
| Cards        | Subtle border, no drop shadows, balanced padding |

---

## Interaction Rules

- **Transitions:** 150–200ms, ease-in-out
- **No** bounce, parallax, or decorative motion

---

## Error & Empty States

| State   | Approach |
|---------|----------|
| Error   | Explain what went wrong + how to fix. Never blame the user. |
| Empty   | Provide next action. Never feel dead. |

---

## File Structure

```
design-system/
├── tokens.css      # CSS variables (colors, spacing, typography)
├── base.css        # Resets, body, headings, links
├── components.css  # Buttons, inputs, cards, panels, badges, states
├── layout.css      # App shell, workspace layout
└── DESIGN_SYSTEM.md
```

**Usage:** Import in order: `tokens` → `base` → `layout` → `components`.

---

## Checklist for Compliance

- [ ] No gradients, glassmorphism, neon, animation noise
- [ ] Only 4 colors (background, text, accent, success/warning)
- [ ] Only 8, 16, 24, 40, 64px spacing
- [ ] Text blocks max 720px
- [ ] Every page has Top Bar → Context Header → Workspace+Panel → Proof Footer
- [ ] Same border radius and transition everywhere
