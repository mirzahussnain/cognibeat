# CogniBeat: Brand & UI Guidelines

## 1. Brand Identity
**The Concept:** A Context-Aware Deep Work Engine designed for high-focus professionals and students. 
**The Vibe:** Premium, modern, fluid, and highly functional. It bridges the gap between cognitive science and generative audio, designed to appeal to the enterprise, FinTech, and EdTech sectors.

---

## 2. Logo & Iconography
* **The Mark:** A minimalist, continuous-line vector graphic. It begins as a subtle audio soundwave and smoothly curves into the abstract, geometric silhouette of a human brain containing a stylized "spark."
* **Style:** Flat vector line art. No drop shadows or 3D textures.
* **Coloring:** Features a luminous gradient transitioning from Electric Cyan (`#00E5FF`) to Neon Violet (`#B300FF`). 
* **Placement:** Cleanly positioned in the top-left of the application navigation, with a transparent background.

---

## 3. Typography
For maximum legibility and a modern, tech-forward aesthetic, we utilize two highly accessible sans-serif fonts.

| Usage | Font Family | Weights | Notes |
| :--- | :--- | :--- | :--- |
| **Headings & Logo** | `Plus Jakarta Sans` or `Outfit` | SemiBold (600), Bold (700) | Used for the wordmark, page titles, and primary numerical data. |
| **Body & UI Elements** | `Inter` | Regular (400), Medium (500) | Industry standard for dense SaaS dashboards. Used for tooltips, descriptions, and forms. |

---

## 4. Color Palette

### Dark Mode (Default "Focus" State)
Designed to minimize eye strain during deep work sessions, utilizing deep space blues instead of harsh pure blacks.

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Deep Space Blue** | `#0B0F19` | Primary App Background |
| **Slate Surface** | `#1A2235` | Cards, Modals, and Elevated Surfaces |
| **Electric Cyan** | `#00E5FF` | Primary Accent (Active states, progress bars) |
| **Neon Violet** | `#B300FF` | Secondary Accent (Flow state indicators, AI generation) |
| **Off-White text** | `#F8FAFC` | Primary Headings and high-contrast text |
| **Muted Gray Text** | `#94A3B8` | Secondary body copy and subtle UI borders |

### Light Mode (Corporate / Clean State)
A crisp, highly accessible alternative for enterprise environments.

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Ghost White** | `#F8FAFC` | Primary App Background |
| **Pure White** | `#FFFFFF` | Cards and Surfaces (with soft drop shadow) |
| **Ocean Blue** | `#2563EB` | Primary Accent |
| **Deep Slate Text** | `#0F172A` | Primary Headings and body copy |

---

## 5. "Motion Vibes" (Framer Motion Specs)
Animations should feel intentional, fluid, and liquid-like to represent "flow." Avoid chaotic or purely decorative bouncing.

* **Breathing Background Mesh:** A large, blurred SVG blob behind the audio player. 
  * *Animation:* `animate={{ rotate: 360, scale: [1, 1.05, 1] }}` over a 10-second easing curve synced to average human breathing rates.
* **Liquid Page Transitions:** App-like routing between the "Task Input" and the "Active Flow State" views.
  * *Physics:* `<AnimatePresence>` with `type: "spring", stiffness: 100, damping: 20`. Elements slide up and fade in smoothly.
* **Kinetic Play Button:** A minimalist, circular control button.
  * *Interaction:* Emits a subtle, outward-pulsing ripple effect synced to the rhythm of the active focus session.

---

## 6. Implementation & Security Notes
* **Styling:** Colors should be mapped directly into the using tailwindcss v4 @theme in global extension for absolute consistency across React components.
* **Security:** When connecting the UI to the backend AI generation services, API keys and sensitive database URIs (like S3 buckets for audio storage) must never be exposed or stored in a `.env` file within the repository. They must be managed via cloud environment variables (e.g., Vercel Secrets).