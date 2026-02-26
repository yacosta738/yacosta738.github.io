---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

# Frontend Design Skill

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Inputs

The skill accepts the following inputs (typically provided by the user):

- **component/page/app**: The specific frontend artifact to build (e.g., landing page, dashboard component, button, form, navigation, modal)
- **audience**: Context about who will use the interface and the purpose it serves
- **constraints**: Technical requirements such as framework (React, Vue, HTML/CSS), performance goals, accessibility requirements, or design system constraints

The user provides these as natural language requirements describing what to build, why, and for whom.

## Outputs

This skill produces the following artifacts:

- **code**: Production-ready frontend code (HTML/CSS/JS, React components, Vue components, Astro components, or vanilla implementations)
- **assets**: Any required visual assets, icons, or images
- **design notes**: Explanation of aesthetic decisions, typography choices, color palette, and motion design
- **usage instructions**: How to integrate the component into the larger application

Output formats: Code files (`.tsx`, `.vue`, `.astro`, `.css`, `.html`), inline documentation, and design rationale in comments.

## Usage Examples

### When to Use This Skill

Invoke this skill when the user requests:

- **Landing pages**: Create a distinctive hero section, feature showcase, or call-to-action that stands out from generic templates
- **Dashboard components**: Build data visualization widgets, metric cards, navigation panels, or admin interfaces with polished aesthetics
- **Portfolio redesign**: Craft unique project showcases, about sections, or resume displays
- **UI beautification**: Enhance plain HTML/CSS, improve existing components, or apply a cohesive design system
- **Interactive elements**: Develop animated buttons, hover effects, micro-interactions, or motion-rich interfaces
- **Marketing materials**: Design promotional banners, email templates, or social media assets with web presence

### Do Not Invoke For

Avoid using this skill for:

- **Backend logic**: Database queries, API implementations, authentication flows (use backend/API skills instead)
- **Pure documentation**: Markdown files, README content, or text-only content without visual components
- **Infrastructure**: Docker configurations, CI/CD pipelines, deployment scripts (use DevOps skills instead)
- **Data processing**: ETL pipelines, data transformation, or algorithmic implementations

### Integration Points

This skill coordinates with other skills as follows:

- **content generation skills**: Receives content requirements (text, images, data) as input and produces styled components that present the content
- **testing skills**: Produces testable code with proper component boundaries; coordinates with testing skills for visual regression and accessibility testing
- **API/backend skills**: Consumes API contracts and data schemas to build frontend interfaces that display dynamic data; expects backend skills to provide type definitions and endpoint specifications

When handing off to testing skills, ensure components are properly exported with clear props/interfaces. When receiving from backend skills, request TypeScript types for any dynamic data.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created by reimagining conventions and committing fully to a distinctive vision.
