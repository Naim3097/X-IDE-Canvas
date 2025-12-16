# Landing Page Design System

This document outlines the design system, component library, and technical specifications used for the X.IDE landing page (`index.html`). Use this as a reference to replicate the professional, Microsoft-like aesthetic for other projects.

## 1. Technical Stack

*   **Framework**: HTML5
*   **Styling**: Tailwind CSS (via CDN) + Custom CSS Overrides
*   **Fonts**: Inter (Google Fonts) + System Fonts fallback
*   **Icons**: SVG (Feather/Lucide style) - No external icon libraries for the landing page to keep it lightweight.

## 2. Design Principles

*   **Minimalism**: Clean lines, ample whitespace, no clutter.
*   **Professionalism**: High contrast, strict grid alignment, business-oriented typography.
*   **Clarity**: Direct copy, clear calls-to-action (CTAs), no distractions.
*   **Responsiveness**: Mobile-first approach using Tailwind's responsive prefixes (`md:`, `lg:`).

## 3. Color Palette

### Grayscale (Slate)
Used for text, backgrounds, and borders to create a neutral, professional look.

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `White` | `#ffffff` | Main Background, Cards |
| `Slate-50` | `#f8fafc` | Secondary Backgrounds (Features, Footer) |
| `Slate-100` | `#f1f5f9` | Hover States, Subtle Backgrounds |
| `Slate-200` | `#e2e8f0` | Borders, Dividers |
| `Slate-300` | `#cbd5e1` | Disabled states, Placeholders |
| `Slate-500` | `#64748b` | Secondary Text, Meta info |
| `Slate-600` | `#475569` | Body Text |
| `Slate-900` | `#0f172a` | Headings, Primary Buttons, Dark Backgrounds |
| `Black` | `#1a1a1a` | Primary Brand Color (Overrides) |

### Accents
Used sparingly for highlights and interactive elements.

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| `Blue-600` | `#2563eb` | Links, Badges, "Popular" tags |
| `Green-500` | `#22c55e` | Success icons (Checkmarks) |

## 4. Typography

**Font Family**: `'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, Roboto, sans-serif`

### Scale & Weights
*   **Headings**: `font-weight: 600`, `letter-spacing: -0.02em`
    *   H1: `text-5xl md:text-6xl` (Hero)
    *   H2: `text-3xl` (Section Headers)
    *   H3: `text-xl` (Card Headers)
*   **Body**: `text-base` or `text-lg` (Intro text), `text-slate-600`
*   **Buttons**: `font-weight: 600`, `font-size: 15px`

## 5. Component Library

### Buttons

**Primary Button**
Solid black background, white text, sharp corners (4px radius).
```css
.btn-primary {
    background-color: #1a1a1a;
    color: white;
    padding: 10px 24px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
}
.btn-primary:hover {
    background-color: #333;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**Secondary Button**
White background, slate border, dark text.
```css
.btn-secondary {
    background-color: white;
    color: #1a1a1a;
    border: 1px solid #e2e8f0;
    padding: 10px 24px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.btn-secondary:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
```

### Navigation Bar
Sticky, white background with slight transparency and blur.
*   **Height**: `h-16` (64px)
*   **Border**: Bottom border `border-slate-200`
*   **Z-Index**: `z-50`
*   **Links**: Gray (`text-slate-600`) turning black on hover.

### Feature Cards
Clean white cards with subtle borders and hover lift effect.
```css
.feature-card {
    border: 1px solid #e2e8f0;
    padding: 2.5rem;
    border-radius: 8px;
    transition: all 0.2s;
    background: white;
}
.feature-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
}
```

### Pricing Cards
*   **Standard**: White bg, slate border.
*   **Pro/Highlighted**: Dark bg (`bg-slate-900`), white text, "Popular" badge.

## 6. Layout Structure

### Page Sections
*   **Container**: `max-w-7xl mx-auto px-6` (Standard width constraint)
*   **Vertical Spacing**: `py-24` (96px) for major sections.
*   **Grid**: `grid md:grid-cols-3 gap-8` for features/templates.

### Hero Section
*   **Layout**: Split 50/50 on desktop (`lg:grid-cols-2`).
*   **Content**: Left aligned text, Right aligned image/mockup.
*   **Visuals**: Subtle background gradients (blur effects) behind images to add depth without clutter.

## 7. Implementation Checklist for New Projects

1.  [ ] Include Tailwind CSS CDN.
2.  [ ] Copy the `<style>` block from `index.html` for custom overrides (Buttons, Typography).
3.  [ ] Set `body` font-family to the system stack.
4.  [ ] Use the `max-w-7xl` container for all main content.
5.  [ ] Stick to the Slate color palette for all UI elements.
6.  [ ] Use SVGs for icons instead of heavy icon libraries.
