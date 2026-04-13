---
name: Premium UI/UX Overhaul
description: A comprehensive framework for overhauling basic UI drafts into award-winning, highly interactive, and responsive UI/UX experiences (Web & Mobile).
---

# 🎨 Premium UI/UX Overhaul Standard

**AGENT DIRECTIVE:** You will receive a functional but basic website or app draft. Your primary mission is to radically elevate the UI/UX. You have **full creative freedom**: if you see a way to restructure the layout, rewrite content for better impact, or change the flow to make the design look 10x more premium, DO IT. Do not restrict yourself to the original basic structure.

## 🛑 STEP 1: The Vibe Check (MANDATORY)
Before you write or modify a single line of code, you MUST pause and ask the user:
> *"Before I begin the overhaul, what is the exact 'feel' or 'vibe' you want for this website? (e.g., luxury, playful, highly technical, minimal, aggressive?)"*
Wait for the user's response. You will use their answer to strictly guide your typography, colors, and design decisions in Step 2.

## 2. Design System Generation (Colors & Typography)
Once you have the vibe, establish the design system dynamically:
- **Color Inspiration (Human-Driven):** Look at the draft and identify the **dominant/primary color brand** (e.g., if there are green elements, keep the baseline "green"). You are allowed to adjust the specific shade/tint to make it more premium. Then, search the web or draw inspiration from top human-designed palettes (like ColorHunt or similar trends) to find a complete, professional, modern color palette built *around* that primary color that matches the user's requested "vibe".
- **Typography (Complete Freedom):** Disregard the draft's original typography entirely. Select a stunning, high-end Google Font pairing (e.g., a striking Display font for headings, and a highly legible Sans-Serif font for body text) that perfectly embodies the "vibe". 
- **Brand Application (Loose Cohesion):** Apply the colors and fonts organically but cohesively. Do not be so systematic that the site looks robotic. Guidelines:
  - Consistently use the Display font for `h1`/`h2`/`h3` headers, and the simple font for paragraphs (`p`/`span`).
  - Use the primary color for primary actions (large CTA buttons, critical links, active states).
  - Use secondary/accent colors sparingly to highlight important badges, feature boxes, or interactive states.
  - Let the layout breathe; use neutral tones (whites, grays, off-blacks) for 80% of the surface area so the colors pop.

## 🛑 STEP 3: The Moodboard Preview (MANDATORY APPROVAL)
Before applying the design system to the codebase or generating any components, you MUST stop and present a "Moodboard Preview" to the user.
Print out a clean markdown block showing:
1. The 4-5 exact Hex colors you selected (Primary, Secondary, Background, Text).
2. The 2 Google Fonts you selected (Display and Body).
Ask the user: *"Do you approve of this color palette and typography lineup, or should I tweak them before I overhaul the code?"*
Only proceed to overhaul the codebase once the user gives you the green light.

## 4. Universal Layout & Typography Rhythm (Web & Mobile)
- **The 8pt Grid (Static Components):** For internal component gaps, strict margins, and small padding, use mathematical 8pt increments (8px, 16px, 24px). However, for macro typography and huge section gaps, rely entirely on the dynamic `clamp()` framework (as detailed in your Display Scaling protocols) to ensure fluid responsiveness.
- **Responsive Fluidity:** Designs must be flawlessly responsive. 
  - *On Desktop:* Utilize max-widths, CSS grid, and expansive white space.
  - *On Mobile:* Respect touch-targets (minimum 44x44pt), OS safe areas, and readable text measure (do not stretch text edge-to-edge).
- **Iconography:** NEVER use emojis as structural icons. Use scalable, professional vector icons (e.g., Lucide, Phosphor, Heroicons) with exactly consistent stroke widths.

## 5. Awwwards-Style Premium Interactivity
Inject these specific mechanics into your overhauled designs:
- **Lenis Smooth Scroll:** On desktop web projects, ALWAYS integrate a smooth scrolling baseline (like Lenis) to ensure buttery scrolling and perfectly synchronized scroll animations.
- **Micro-Interactions:** Buttons and links must always have hover states and press feedback. Transitions should be 150-300ms using natural easing (e.g., `cubic-bezier(0.16, 1, 0.3, 1)` or spring physics).
- **Magnetic Elements:** For primary CTAs and floating buttons, implement subtle magnetic hover tracking.
- **Depth & Glassmorphism:** Avoid boring flat borders. Use frosted glass (`backdrop-blur`), subtle multi-layered drop shadows, and soft gradients to create 3D depth.
- **Parallax & Scroll Reveals:** Sections should fade or slide in seamlessly as the user scrolls down the page.

## 6. Light & Dark Mode Contrast
- Ensure primary text maintains a minimum 4.5:1 contrast ratio (WCAG standard) against its background, in both light and dark themes.
- Dark mode is not just "inverted colors." Use semantic elevation (use slightly lighter grays for surfaces that sit higher, avoiding pure black #000000 for backgrounds).
