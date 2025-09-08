# Sporty — Front Page Vision & Design Spec (MVP)

> Purpose: Help parents quickly understand Sporty and start the flow to get sport recommendations for their child.

---

## Audience & Promise

- **Audience:** Parents of children **ages 4–12**.
- **Promise (hero one-liner):** “**Find the right sport for your child’s future body.**”
- **Subline:** “Personalized recommendations grounded in growth patterns and play preferences.”

---

## Page Structure (top → bottom)

1. **Hero**

   - **Headline:** _Find the right sport for your child’s future body._
   - **Subline:** _Personalized recommendations grounded in growth patterns and play preferences._
   - **Primary CTA:** **Try Sporty →** (routes to `/start`)
   - **Secondary CTA:** **How it works** (scrolls to section #2)
   - **Hero Image:** `/images/hero_kids_playing.jpeg`
     - **Alt:** “Illustration of diverse children happily playing different sports”
   - **Layout:** Split layout on desktop (left copy, right image); stacked on mobile.
   - **Accessibility:** Heading hierarchy starts at `h1`; `aria-label` on CTAs.

2. **How It Works (3 Steps)**

   - **Intro line:** _Three simple steps to your child’s sport matches._
   - **Cards (three-up on desktop, single column mobile):**
     1. **Step 1: Tell us about your child**
        - Icon: `/images/howitworks_step1.jpeg`
        - Copy: “Age, height, weight and play preferences.”
     2. **Step 2: We predict growth & strengths**
        - Icon: `/images/howitworks_step2.jpeg`
        - Copy: “Our model estimates fit across key movement patterns.”
     3. **Step 3: Get personalized sport matches**
        - Icon: `/images/howitworks_step3.jpeg`
        - Copy: “See sports that fit now—and as your child grows.”
   - **Inline reassurance:** “No account needed · Takes under 1 minute”

3. **Sample Results (Social Proof / Tangibility)**

   - **Section title:** _See an example result_
   - **Two sample cards (carousel on mobile, side-by-side on desktop):**
     - **Card A (Anna, 7):**
       - Image: `/images/sample_card_anna.jpeg` (alt: “Young girl trying gymnastics”)
       - Title: “For Anna (7)”
       - Matches: “Gymnastics · Swimming · Climbing”
       - Micro bullets:
         - “Great strength-to-weight ratio for her age”
         - “Low joint load, full-body coordination”
         - “Enjoys focused, skill-based play”
     - **Card B (Leo, 9):**
       - Image: `/images/sample_card_leo.jpeg` (alt: “Young boy playing basketball outside”)
       - Title: “For Leo (9)”
       - Matches: “Basketball · Rowing · Judo”
       - Micro bullets:
         - “Developing reach and leg power”
         - “Team dynamics suit his energy”
         - “Good skill progression curve”
   - **Inline CTA:** “Try Sporty →”

4. **Why Sporty? (Trust & Reassurance)**

   - **Short body copy:**  
     “Every child is unique. Sporty helps match your child with activities where they can thrive—balancing physical fit, skill development, and fun.”
   - **Badges image:** `/images/trust_badges.jpeg`
     - **Badges labels:** “Built with care · Science-informed · For ages 4–12”
   - **Disclaimer (small):** “General guidance only; not medical advice.”

5. **FAQ (Compact)**

   - Q: _What information do I need?_  
     A: “Age, height, weight and play preferences. No signup required.”
   - Q: _Is this a medical assessment?_  
     A: “No. It’s general guidance to help you explore options.”
   - Q: _Which sports do you cover?_  
     A: “From swimming and gymnastics to team and racket sports.”

6. **Footer**
   - Links: About · FAQ · Contact · Privacy
   - **Family image strip (subtle):** `/images/footer_family.jpeg`
     - Alt: “Family preparing for exercise together”
   - Soft repeated CTA: “Ready to discover your child’s best fit? **Start now →**”

---

## Visual & Brand Direction

### Tone & Vibe

- **Calm, trustworthy, and a little playful.** Parents should feel supported and respected, not “sold to.”
- **Science-informed without being clinical.** Friendly language, minimal jargon.

### Color System

- **Base:** Warm neutrals (off-white background, soft gray text).
- **Accent (primary):** Cheerful, modern **teal or coral** used sparingly for CTAs and highlights.
- **Status tints:**
  - Success/positive: soft green tint
  - Info: soft blue tint
  - Caution: amber tint (used rarely)
- **Contrast:** Meet WCAG AA for text on backgrounds.

### Typography

- **Headings:** Rounded sans (e.g., **Nunito** or **Inter** with slightly higher weight for H1/H2).
- **Body:** Same family; comfortable line-height (1.6–1.75).
- **Hierarchy:** H1 (hero), H2 (section titles), H3 (card titles), body/small.

### Spacing & Layout

- **Grid:** 12-column desktop grid; 4-pt spacing scale (8/12/16/24/32/48).
- **Whitespace:** Generous breathing room around hero and section intros.
- **Cards:** `rounded-2xl`, soft shadow (low elevation), balanced padding.

### Imagery

- **Style:** Soft, friendly illustration (or photo in soft daylight), inclusive casting and body types, minimal background clutter.
- **Consistency:** Keep a cohesive palette and line weight across icons/illustrations.
- **Optimization:** Export **WebP/JPG** for large visuals, **PNG/SVG** for icons. Provide **2x** retina variants.

### Motion

- **Subtle and purposeful.**
  - Fade/slide on section reveal (150–250ms).
  - Button hover: gentle scale (1.02) + shadow lift.
  - No parallax or heavy animations.

### Components (Front Page Only)

- **Primary Button:** Solid accent, large touch target, visible focus ring.
- **Secondary Button/Link:** Ghost or subtle underline.
- **Card:** Image (optional) → title → 2–3 bullets → CTA (if needed).
- **Badge Row:** Small rounded badges for trust cues.
- **FAQ Accordion:** Reduced chrome; focus on readable content.

---

## Accessibility

- Headings follow semantic order.
- Sufficient color contrast (≥ 4.5:1).
- Keyboard navigable, visible focus rings.
- Descriptive `alt` text for every image (provided above).
- Labels tied to inputs (not on front page yet, but maintain pattern for CTAs).

---

## Performance

- Use `next/image` (or equivalent) with responsive sizes and lazy-loading (except hero set to `priority`).
- Serve modern formats (WebP) where possible; keep hero ≤ 200–300 KB compressed.
- Preload primary font with `font-display: swap`.
- Avoid layout shifts (reserve image aspect ratios).

---

## Copy Snippets (ready to insert)

- **Hero H1:** _Find the right sport for your child’s future body._
- **Hero Sub:** _Personalized recommendations grounded in growth patterns and play preferences._
- **Primary CTA:** **Try Sporty →**
- **How It Works Title:** _Three simple steps to your child’s sport matches._
- **Why Title:** _Why Sporty?_
- **Why Body:** _Every child is unique. Sporty helps match your child with activities where they can thrive—balancing physical fit, skill development, and fun._
- **Disclaimer:** _General guidance only; not medical advice._

---

## Image Inventory (Front Page Only)

- `/images/hero_kids_playing.jpeg` — hero illustration (16:9) — **Alt:** “Illustration of diverse children happily playing different sports”
- `/images/howitworks_step1.jpeg` — icon (1:1) — **Alt:** “Icon of a form for entering child details”
- `/images/howitworks_step2.jpeg` — icon (1:1) — **Alt:** “Icon representing prediction of growth and strengths”
- `/images/howitworks_step3.jpeg` — icon (1:1) — **Alt:** “Icon representing personalized sport matches”
- `/images/sample_card_anna.jpeg` — sample result card (4:3) — **Alt:** “Young girl trying gymnastics”
- `/images/sample_card_leo.jpeg` — sample result card (4:3) — **Alt:** “Young boy playing basketball outside”
- `/images/trust_badges.jpeg` — badges strip (3:1) — **Alt:** “Three badges: care, science-informed, ages 4–12”
- `/images/footer_family.jpeg` — footer band (21:9) — **Alt:** “Family preparing for exercise together”

---

## Acceptance Criteria (Front Page)

- Clear hero message with two CTAs visible above the fold on desktop and mobile.
- “How it Works” shows 3 simple steps with icons and one-line explanations.
- “Sample Results” displays two example cards with images and 2–3 bullets each.
- “Why Sporty?” includes badges and a one-paragraph reassurance.
- FAQ has 3 concise questions.
- All images load responsively with correct `alt` text.
- Lighthouse 90+ (Performance, Access, Best Practices, SEO).
