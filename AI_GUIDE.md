# 🤖 Using react-slidify with AI Builders

`react-slidify` was built to be "AI-Native." Because it handles aspect ratios, animations, and state management automatically, you can use AI tools (Cursor, Replit, v0, ChatGPT) to generate entire slide decks just by describing them.

## 🚀 The "System Prompt"

Copy and paste this context block into your AI tool (Cursor Chat, Replit Agent spec, or ChatGPT) before you start. This teaches the AI how to use the library correctly.

```markdown
I am building a presentation using the 'react-slidify' library. 
Please generate code using ONLY this library. Do not write custom CSS for layout scaling or animations.

# Library API Definition

1. <Deck> (Root)
   - Usage: Wraps the entire app.
   - Props: `theme` (object), `plugins` (array), `printMode` (boolean).
   - Note: Handles 16:9 auto-scaling automatically.

2. <Slide> (Container)
   - Usage: A single slide.
   - Props: `className` (Tailwind supported).
   - Note: Handles enter/exit animations automatically.

3. <Split> (Layout)
   - Usage: 2-column layout.
   - Props: `left` (ReactNode), `right` (ReactNode), `ratio` (default 0.5).
   - Example: <Split left={<h1>Title</h1>} right={<img src="..." />} />

4. <SlideLayout> (Safe Zone)
   - Usage: Wraps slide content in a grid with padding and header slots.
   - Props: `title?`, `subtitle?`, `align? ('left' | 'center')`.
   - Example: <SlideLayout title="Hello" subtitle="World">{content}</SlideLayout>

4. useStep(count) (Hook)
   - Usage: For revealing items one by one.
   - Returns: { isActive(index), currentStep }
   - Example: 
     const { isActive } = useStep(3);
     <p style={{ opacity: isActive(0) ? 1 : 0 }}>Point 1</p>

5. <Code> (Block)
   - Usage: Syntax highlighting.
   - Props: `code` (string), `language` (string).

# Rules for Generation
- ALWAYS use <Split> for side-by-side content (text + image).
- Wrap slides with <SlideLayout> to keep a safe padding/grid and avoid edge collisions.
- Use standard Tailwind classes for inner styling (text-4xl, font-bold).
- Do not create custom "slide containers" or "viewports"; <Deck> handles that.
- Create small, modular components for slides with internal logic (like steps).
- PresenterConsole is a separate view/route, not a plugin. Keep it out of the `plugins` array.

```

---

## 🛠 Workflow Examples

### 1. Generating a New Deck (Cursor / Replit)

Once the AI knows the context above, you can give it a high-level task.

> **User Prompt:**
> "Create a 5-slide pitch deck for a coffee startup called 'JavaScript'. Use a dark theme with orange accents.
>
> * Slide 1: Title
> * Slide 2: The Problem (text on left, sad person image on right)
> * Slide 3: The Solution (3 bullet points that reveal one by one)
> * Slide 4: Market Data (Code block showing our growth algorithm)
> * Slide 5: Contact info"

**Why this works:** The AI will map "text on left, image on right" to `<Split>` and "reveal one by one" to `useStep(3)` because of the system prompt.

### 2. Styling with Themes

You don't need to manually pick colors. Ask the AI to generate a theme object.

> **User Prompt:**
> "Create a `retroTheme` object for react-slidify. Use neon pink and purple colors with a pixel-art font family. Apply it to the Deck."

### 3. Adding Interactivity

Since `react-slidify` is just React, you can ask the AI to embed complex logic.

> **User Prompt:**
> "Create a new slide that contains a functional ROI calculator. It should have two inputs (Cost, Price) and show the profit in real-time. Wrap it in a `<Slide>`."

---

## ⚡️ Tips for Specific Tools

### Cursor (Composer)

1. Open `Ctrl+I` (Composer).
2. Type `@react-slidify` (if you have the files locally) or paste the **System Prompt** above.
3. Say: *"Scaffold a new presentation in `src/App.tsx` about [Topic]."*
4. Cursor will write the imports and components perfectly.

### Replit (Agent)

1. In the Agent prompt, paste: *"I want to build a slide deck using `react-slidify`. Install it first."*
2. Once installed, paste the **System Prompt** above.
3. The Agent will create the file structure and build the deck.

### v0 (Vercel)

*Note: v0 doesn't have access to npm libraries directly, but it can generate the code.*

1. Paste the **System Prompt**.
2. Say: *"Generate the App.tsx code for a slide deck about Space Exploration."*
3. Copy the code into your local project where `react-slidify` is installed.

---

## 🐛 Common AI Mistakes & Fixes

**Mistake:** The AI tries to write `className="h-screen w-screen"` on a `<Slide>`.
**Fix:** Remind it: *"Don't set dimensions on the `<Slide>`. The Deck component handles the 16:9 scaling automatically."*

**Mistake:** The AI tries to use `framer-motion` manually for slide transitions.
**Fix:** Remind it: *"The `<Slide>` component handles transitions. Just put content inside it."*

**Mistake:** The layout breaks on mobile.
**Fix:** Ensure the AI uses `<Split>` or Flexbox. The library scales the *entire container* down, so standard desktop CSS layouts work perfectly on mobile without media queries.
