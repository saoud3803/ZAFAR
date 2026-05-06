---
name: Aura of Zafar
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#5e5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdb'
  on-secondary-container: '#63635f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#221b09'
  on-tertiary-container: '#8f8269'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#f1e1c4'
  tertiary-fixed-dim: '#d4c5a9'
  on-tertiary-fixed: '#221b09'
  on-tertiary-fixed-variant: '#504630'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-xl:
    fontFamily: Noto Serif
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.15em
  ui-mono:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-edge: 64px
  section-gap: 160px
  stack-sm: 12px
  stack-md: 32px
---

## Brand & Style

This design system establishes an ultra-premium editorial environment that merges the austerity of architectural brutalism with the refinement of high-fashion luxury. The brand personality is quiet but commanding, emphasizing craftsmanship through void space and structural rigidity rather than visual noise.

The style is a hybrid of **Minimalism** and **Brutalism**, utilizing a "Cinematic Editorial" approach. It evokes an emotional response of exclusivity and permanence. Key characteristics include high-contrast monochromatic themes, razor-sharp edges, and a layout that prioritizes large-scale imagery as the primary narrative driver, treated with the reverence of a gallery exhibition.

## Colors

The palette is rooted in a "New Neutral" philosophy, avoiding pure whites in favor of organic, soft ivory and warm sand to convey texture and warmth. 

- **Deep Black (#0D0D0D):** Used for primary typography, structural borders, and deep-immersion backgrounds.
- **Soft Ivory (#F9F7F2):** The default background state, providing a paper-like, editorial feel.
- **Warm Sand (#D4C5A9):** Used for subtle layering, secondary surfaces, and hover states.
- **Refined Gold (#B89B5E):** Reserved exclusively for micro-interactions, high-end accents, and limited edition labels.

## Typography

The typography system relies on a sharp juxtaposition between the classical elegance of **Noto Serif** and the technical, brutalist undertones of **Space Grotesk**. 

Headlines should be treated as architectural elements, often utilizing extreme scale differences to create a sense of hierarchy. Body copy is set in **Inter** for maximum readability in an ecommerce context, ensuring the utilitarian aspects of the shopping experience remain frictionless. All labels and metadata utilize Space Grotesk in all-caps to reinforce the high-fashion, technical specimen aesthetic.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy centered on a 12-column layout with generous outer margins (64px) to create a letterboxed, cinematic effect.

Spacing is aggressive and intentional. Large vertical gaps (160px+) are used between sections to allow products to breathe and to signify a transition in the narrative. Elements are often aligned to a rigid internal grid, but "broken" slightly by oversized typography or asymmetrical image placement to maintain the editorial brutalist feel.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layers** and **Subtle Glassmorphism**.

Depth is communicated through:
1.  **Translucency:** Overlays and navigation bars use a high-density backdrop blur (20px+) with a 70% opacity ivory or black tint, mimicking frosted glass or high-end acrylic.
2.  **Structural Stacking:** Elements do not "float"; they are contained within thin (0.5px - 1px) solid borders.
3.  **Flat Depth:** Z-index hierarchy is indicated by color blocks (e.g., a Warm Sand drawer sliding over a Soft Ivory page) rather than drop shadows.

## Shapes

The shape language is strictly **Sharp (0px)**. All containers, buttons, input fields, and image frames must maintain 90-degree angles to uphold the brutalist, architectural aesthetic. This lack of rounding emphasizes the "premium" nature of the design, suggesting a precision-cut, bespoke quality.

## Components

- **Buttons:** Primary buttons are solid Deep Black with Soft Ivory text, utilizing the `label-caps` style. Hover states involve a fill transition to Refined Gold or a thin border expansion.
- **Inputs:** Minimalist bottom-border only or a full 1px border. Placeholders use `ui-mono` in a muted Warm Sand tone.
- **Cards:** Product cards are borderless by default, relying on the image's aspect ratio (typically a tall 3:4 portrait) to define the space. Text information is left-aligned underneath in a structured stack.
- **Chips/Tags:** Small rectangular boxes with 1px borders and `label-caps` typography. No rounded corners.
- **Navigation:** A persistent top bar with a glassmorphism effect. Menu items utilize `label-caps` with a subtle underline animation on hover.
- **Lookbook Triggers:** Large-scale image components that expand on hover, using the Refined Gold for iconography or "Shop the Look" callouts.