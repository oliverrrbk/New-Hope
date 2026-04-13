---
name: Fluid Display Sizing & Breakpoints
description: A strict protocol for ensuring components scale flawlessly across massive 27-inch monitors, 13-inch laptops, and mobile devices without using hacky CSS transforms.
---

# 🖥️ Fluid Display Sizing Protocol

**AGENT DIRECTIVE:** You are building components that must look identical in proportion on a massive 27-inch monitor AND a 13-inch laptop, down to a mobile phone. 
NEVER use hacky CSS scaling (like `transform: scale(0.65)` or `zoom` for layout), as this breaks Safari animations and bounding boxes. Instead, you MUST use explicit breakpoints and fluid CSS math (`clamp()`) to ensure margins, padding, and typography smoothly adapt to the user's screen out-of-the-box.

## 1. The Three Golden Breakpoints (Borders)
When structuring a component, you must actively account for these three primary screen categories:

1. **📱 Small Display (Mobile & Small Tablets)**
   - **Border:** `0px` to `768px` (In Tailwind, base classes up to `md:`)
   - **Rule:** Layouts stack vertically. Padding is extremely tight. Fonts shrink significantly to prevent text wrapping into ugly long columns. Avoid heavy horizontal scrolling elements unless explicitly requested.

2. **💻 Medium Display (13" to 15" Laptops)**
   - **Border:** `768px` to `1536px` (In Tailwind, classes between `md:` and `2xl:`)
   - **Rule:** THIS IS THE CRITICAL LAPTOP VIEW. Margins, font-sizes, and layout gaps must be roughly **20-30% smaller** than the 27-inch monitor view. If you design something for a massive screen, you MUST restrict its maximum sizes here so it fits fully on a 14-inch screen without excessive, annoying vertical scrolling. 

3. **🖥️ Large Display (27" Monitors & 4K Screens)**
   - **Border:** `1536px` and above (In Tailwind, classes starting from `2xl:`)
   - **Rule:** Unlock maximum breathing room. Use massive margins, huge hero fonts, and expansive padding just like natively designed on a giant monitor.

## 2. The `clamp()` Method (Mandatory Framework)
Whenever possible, instead of writing three completely different sets of hardcoded pixel code for typography and padding (e.g., `text-[30px] md:text-[50px] 2xl:text-[80px]`), utilize modern CSS math called **`clamp(MIN, IDEAL, MAX)`** to smoothly slide the sizes between laptops and massive monitors.

- **Example Usage for Fonts:** `font-size: clamp(30px, 4vw, 80px)`
  - On a phone it locks gracefully at `30px`.
  - On a 14-inch laptop, the viewport math dynamically sizes it smoothly to around `50px`. 
  - On a 27-inch monitor, it expands out and locks at a massive and beautiful `80px`. 
- **Example Usage for Spacing:** Apply this logic to section padding (e.g., `padding-block: clamp(40px, 8vw, 120px)`) so sections get naturally tighter on laptops but breathe heavily on large monitors.

## 3. Safari Animation Protection
Never wrap entirely animated components or layout containers in dynamic `scale()` transformations just to make them fit on a laptop screen (what the industry calls "The 65% Scaling Hack"). This destroys Safari's render pipeline, causes clipping, ruins hitboxes, and breaks hardware-accelerated animations like `Lenis` smooth scroll or Framer Motion physics. Resize elements locally using width, height, padding, and `clamp()` font-size mathematically.

## 4. Component Pre-Delivery Checklist
Before generating and delivering a component or section, verify:
- [ ] Is there a massive font or margin that will physically break out of a 13-inch laptop screen? If so, use `clamp()` or a `md:`/`lg:` breakpoint to force it down.
- [ ] Is `transform: scale(...)` used for responsive layout sizing anywhere? If yes, remove it immediately and use proper CSS sizing layout.
- [ ] Is the padding appropriately huge on `>1536px` monitors, but tightened up for `<1536px` laptops?
