---
name: Safari Auto-Optimization Protocol
description: Mandatory rules for AI agents to automatically optimize all React, CSS, and animation components for Safari (WebKit) during creation.
---

# 🛑 CRITICAL SAFARI (WEBKIT) ENFORCEMENT RULES 🛑

**THE GOLDEN RULE: NEVER COMPROMISE DESIGN QUALITY**
Your absolute first priority is to design a **10/10, stunning, complex component** that looks and feels perfect in Chromium browsers. **NEVER** dumb down a design, remove animations, or simplify your code to make a "7/10 component" just to play it safe for Safari. 
Design the ultimate, highest-quality version of the component first. Then, **AUGMENT** that 10/10 component with the additive Safari fallback rules below so it works on WebKit. If an effect is impossible in Safari, build the 10/10 version anyway and let it gracefully degrade in Safari. NEVER sacrifice the primary design.

**AGENT DIRECTIVE:** Every time you create or modify a frontend component, CSS file, or animation block, you MUST implicitly apply the following Safari/WebKit optimizations as additive fallbacks. Do NOT wait for the user to ask for Safari fixes. Build them natively into your code off the bat.

## 1. DEFAULT TO HARDWARE ACCELERATION
Whenever you add motion, transitions, parallax, or magnetic tracking to an element, you must force Safari to GPU offload it. This is purely a performance boost and does not change the Chrome design.
- **Rule:** Automatically inject `translateZ(0)` or `translate3d` transforms alongside your other transforms.
- **Example CSS:** `transform: translate3d(0, 0, 0);`
- **Example React:** `style={{ transform: "translate3d(0, 0, 0)", WebkitTransform: "translateZ(0)" }}`

## 2. ELIMINATE REPAINT FLICKERING
Safari struggles with z-index ordering during animations and causes elements to 'flicker'.
- **Rule:** If an element is animating, transitioning, or overlapping with transparency, you must hide the backface. This does not affect Chrome's visual output.
- **Example CSS:** `-webkit-backface-visibility: hidden; backface-visibility: hidden;`
- **Example React:** `style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}`

## 3. ALWAYS DECLARE 'WILL-CHANGE'
Do not leave Safari guessing what properties will animate.
- **Rule:** Before applying Framer Motion, CSS transitions, or keyframes, define the `will-change` property on the exact changing vectors (especially `transform` and `opacity`).
- **Example:** `style={{ willChange: "transform, opacity" }}`

## 4. MUST PROVIDE WEBKIT MASKS
Standard CSS `mask-image` often fails silently in Safari, hiding entire content blocks. You must still use cutting-edge masking for the 10/10 design, just ensure the prefix is attached.
- **Rule:** If you use gradients, clip-paths, or masks, you must always provide the exact same rule with a `-webkit-` prefix alongside the standard property. No exceptions.
- **Example CSS:** 
  `-webkit-mask-image: linear-gradient(to bottom, transparent, black);`
  `mask-image: linear-gradient(to bottom, transparent, black);`
- **Example React:** 
  `WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',`
  `maskImage: 'linear-gradient(to bottom, transparent, black)'`

## 5. ROBUST SCROLLBARS
macOS standard scrollbars can break high-end UI design.
- **Rule:** Explicitly style `::-webkit-scrollbar`, `::-webkit-scrollbar-track`, and `::-webkit-scrollbar-thumb` to ensure custom scrollbars render securely across the WebKit engine.

**Self-Check Before Answering:** 
1. Is this the absolute best (10/10) component design possible? Have I compromised any visual quality?
2. Have I augmented it with `WebkitBackfaceVisibility`, `translateZ(0)`, and prefixed `-webkit-mask` without removing any complex visual flair? 
If the answer to either is no, rewrite your code before submitting it to the user.
