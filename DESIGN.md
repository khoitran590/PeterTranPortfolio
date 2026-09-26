---
version: alpha
name: Peter Tran Portfolio
description: A quiet editorial portfolio led by software projects and photography.
colors:
  dark-background: "#0e1014"
  dark-foreground: "#ffffff"
  dark-surface: "#171a20"
  dark-border: "rgba(255, 255, 255, 0.11)"
  dark-muted: "#aeb5c1"
  dark-accent: "#818cf8"
  dark-accent-soft: "#a5b4fc"
  dark-nav: "rgba(20, 23, 28, 0.88)"
  light-background: "#f7f8fa"
  light-foreground: "#0f172a"
  light-surface: "#ffffff"
  light-border: "rgba(15, 23, 42, 0.12)"
  light-muted: "#475569"
  light-accent: "#4f46e5"
  light-accent-soft: "#4338ca"
  light-nav: "rgba(255, 255, 255, 0.72)"
typography:
  display:
    fontFamily: "CDA Independence, Georgia, serif"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "CDA Independence, Georgia, serif"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.4
  clock-control:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  card: "1rem"
  control: "0.75rem"
  pill: "9999px"
spacing:
  gutter-mobile: "1rem"
  gutter-tablet: "1.5rem"
  gutter-wide: "2rem"
  section-mobile: "5rem"
  section-wide: "6rem"
  card-padding: "1.5rem"
components:
  button-primary-dark:
    backgroundColor: "{colors.dark-foreground}"
    textColor: "{colors.light-foreground}"
    rounded: "{rounded.control}"
    padding: "0.875rem 1.75rem"
  button-primary-light:
    backgroundColor: "{colors.light-foreground}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.control}"
    padding: "0.875rem 1.75rem"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-foreground}"
    rounded: "{rounded.card}"
  card-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-foreground}"
    rounded: "{rounded.card}"
  filter-selected-dark:
    backgroundColor: "{colors.dark-accent}"
    textColor: "{colors.dark-foreground}"
    rounded: "{rounded.pill}"
  filter-selected-light:
    backgroundColor: "{colors.light-accent}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.pill}"
---

# Design System: Peter Tran Portfolio

## Overview

**Creative North Star: "The Quiet Editorial Folio"**

The site presents software projects and photography as the work of one person. The interface is quiet, warm, and approachable: large editorial headings establish a point of view, while restrained controls and surfaces let the artifacts carry the visual weight. It uses the same structure in dark and light themes rather than treating light mode as a separate design. Glass and luminosity are concentrated in the floating navigation, viewer, and violet interaction states; content surfaces stay calm.

This is an experience-oriented portfolio. Visitors should reach selected work, a résumé, or contact details quickly. Navigation is linkable and familiar; motion is limited to the clock, gallery, and small state changes.

**Key Characteristics:**
- Self-hosted expressive display type over a plain system body face.
- Dark ink and cool paper themes with one quiet violet interaction accent.
- Flat, bordered content surfaces, translucent navigation, and generous section spacing.
- Project images and photography are the strongest color on most screens.

## Colors

The default dark theme uses deep neutral surfaces; the light theme uses cool paper and ink. Quiet violet marks links, focus, and select metadata. The frontmatter records exact values; source definitions live in `src/index.css`.

### Primary
- **Quiet violet:** Interactive emphasis and selected states use `dark-accent` or `light-accent` according to theme. Softer accent variants support linked text and focus rings.

### Neutral
- **Dark ink:** `dark-background` is the page ground; `dark-surface` separates cards and the form with a one-pixel border.
- **Cool paper:** `light-background` is the light page ground; `light-surface` holds controls and cards.
- **Readable foreground:** `dark-foreground` and `light-foreground` carry headings and primary controls. The muted tokens carry supporting copy.
- **Translucent navigation:** `dark-nav` and `light-nav` are reserved for the fixed navigation surface.

**The One Accent Rule.** Keep quiet violet for interaction and sparse project metadata; allow images to supply the remaining color.

## Typography

**Display Font:** CDA Independence, self-hosted variable face, with Georgia as fallback.
**Body Font:** Native system sans stack.
**Clock Control Font:** Native UI monospace stack, limited to the flip-disk controls.

The display face gives the portfolio an editorial signature. The body face keeps descriptions, controls, and technical details direct and legible.

### Hierarchy
- **Display:** Hero name uses a fluid size (`clamp(3.25rem, 8vw, 5rem)`) with tight leading (1.02).
- **Headline:** Section headings use a fluid size (`clamp(2.125rem, 5vw, 3.25rem)`) and line height (1.08).
- **Title:** Project names and prominent card headings use the system face, usually at 1.25–1.5rem and bold weight.
- **Body:** Primary prose starts at 1rem with relaxed leading (1.6); introductions cap their measure at 65ch.
- **Label:** Navigation and controls use the system face at small sizes with clear weight. Uppercase is reserved for compact group labels such as project sections and filter captions.
- **Clock control:** The flip-disk mode and custom-color controls use a small UI monospace face to echo the clock's measured display.

**The Display Restraint Rule.** Use CDA Independence for `h1` and `h2`; use system sans for cards, most controls, and prose. Reserve UI monospace for the clock controls.

## Layout

Sections sit in centered containers up to 80rem for project and gallery content; the home and contact compositions are narrower. Horizontal gutters step from `gutter-mobile` to `gutter-tablet` to `gutter-wide`. Main sections use `section-mobile` vertical padding, increasing to `section-wide` at wider sizes. Related elements use tighter 0.5–1rem intervals; distinct groups usually separate by 2–2.5rem.

The fixed navigation sits above the page on desktop and above the safe area at the bottom on mobile. The footer reserves clearance for the mobile bar. Projects show two featured entries in a two-column layout at wide widths, followed by compact cards; both become a single column on narrow screens. Featured work comes before the technology selector, which filters only the compact projects. About and Contact also collapse from side-by-side compositions to a readable single column. The gallery remains a horizontal, two-row strip that can be scrolled, dragged, or traversed by keyboard.

## Elevation & Depth

The page is flat by default. Card and form surfaces use tonal separation and a one-pixel border, with no resting shadow. The navigation uses a soft shadow and backdrop blur for the glass-like, luminous part of the system while fixed over moving content. Gallery imagery and the photo viewer supply depth through their content and overlay, not through general-purpose card effects.

**The Flat Surface Rule.** Prefer spacing, contrast, and borders to decorative shadows; reserve the stronger shadow for the floating navigation and modal viewer.

## Shapes

Cards have gently curved corners (`rounded.card`); buttons and fields use a slightly tighter radius (`rounded.control`). The desktop navigation uses pill ends (`rounded.pill`). Images clip to the surface they occupy. Borders are light separators, not frames that compete with the content.

## Components

### Buttons
- **Primary:** A high-contrast filled action. It is light on dark pages and ink-dark on light pages; hover changes the fill rather than adding a glow.
- **Secondary:** A subtle outlined or tonal action at the same control radius. Focus remains visibly ringed in either theme.
- **Text links:** Important outbound links pair a concise action label with the shared Lucide arrow icon; footer and profile links stay visually light.

### Project Filter
- A labeled native select sits beside More projects and filters only that smaller set.
- The control is at least 2.75rem high, keeps its selection in the URL, and leaves featured work visible.

### Cards / Containers
- **Featured project:** Media first, followed by role, title, a concise contribution and resulting capability. Technical details are available on demand; the source action names the repository owner. Avoid nested cards, duplicate links, and decorative badges over the image.
- **Compact project:** A smaller image and concise text sit in a bordered surface. The same card radius and border vocabulary apply in both themes.
- **Facts and skills:** Use dividers and proximity for grouped information instead of a card per fact.

### Inputs / Fields
- **Default:** Tonal fill, one-pixel border, control radius, and persistent external labels.
- **Focus:** The theme focus ring and a slightly stronger field surface communicate the active input.
- **Errors:** Field-specific text names the correction; the form also presents a live status message. The contact form keeps a draft through section changes.

### Navigation
- **Desktop:** Centered translucent pill near the top of the viewport with a single moving active indicator.
- **Mobile:** Compact icon-and-label destinations fixed above the safe area, with labels at 0.75rem. These remain links to section URLs, with the active item marked as the current page.
- **Theme:** One control cycles system, light, and dark. Its accessible name states both the current and next mode.

### Signature Elements
- **Flip-disk clock:** An interactive dark/light-aware matrix with display and color controls. Its flip uses a smooth settling ease; reduced-motion settings shorten transitions.
- **Photography strip:** Image-led, horizontally scrollable, and visible without a scroll-triggered entrance. Titles appear on interaction. Selection opens a top-level focused viewer above navigation, with keyboard paging, Escape dismissal, and inert background content.

## Do's and Don'ts

### Do:
- **Do** lead with actual project and photography assets; let their colors distinguish the work.
- **Do** pair display headings with restrained system-sans details.
- **Do** keep dark and light states equally readable, including placeholders, focus rings, and text placed on dark media.
- **Do** preserve the linkable section navigation and the mobile safe-area clearance.

### Don't:
- **Don't** add decorative grids, extra eyebrow labels, nested cards, or duplicate repository actions around projects.
- **Don't** introduce a second accent palette for generic UI chrome.
- **Don't** use a default-only component state where hover, focus, selected, disabled, or error feedback is relevant.
- **Don't** replace project imagery with generic illustrations or invented product claims.
