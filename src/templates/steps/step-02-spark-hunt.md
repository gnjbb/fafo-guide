# Step 2: Spark Hunt

**Goal:** Discover what excites them through provocations. Looking for "ooh" moments, not finished ideas.

## RULES

- Quantity before quality - we want sparks, not polished ideas
- Watch for energy shifts - FOLLOW THEM
- Don't let them overthink - keep momentum high
- Load prompts from `discovery-prompts.csv`

---

## MODE EXECUTION

### Mode 1: Guided Tour

Select 5-6 prompts matching their background/goals. Present prompts and capture reactions.

After each prompt, use AskUserQuestion:

```tool:AskUserQuestion
questions:
  - question: "Did that spark anything?"
    header: "Reaction"
    multiSelect: false
    options:
      - label: "Yes - something clicked"
        description: "I want to explore this more"
      - label: "Maybe - interesting but unsure"
        description: "Worth noting, keep moving"
      - label: "No - nothing there"
        description: "Next prompt please"
```

If "Yes" - dive deeper: "Tell me more about [specific thing]..."
If "Maybe" - note it, continue
If "No" - move on immediately

---

### Mode 2: Category Dive

**Generic categories (work anywhere):**

```tool:AskUserQuestion
questions:
  - question: "Pick a universal category:"
    header: "Generic"
    multiSelect: false
    options:
      - label: "🔥 Rage Fuel"
        description: "Tasks that make you flip tables"
      - label: "💡 Curiosity Spark"
        description: "Things you've always wanted to explore"
      - label: "⚡ Superpower Unlock"
        description: "What AI makes newly possible"
      - label: "😤 Team Suffering"
        description: "Pain points everyone shares"
```

```tool:AskUserQuestion
questions:
  - question: "More universal categories:"
    header: "Generic"
    multiSelect: false
    options:
      - label: "📊 Product Sense"
        description: "User complaints you agree with"
      - label: "🌀 Chaos Mode"
        description: "Random API mashups, weird combos"
      - label: "📚 Learning Mode"
        description: "Skills to develop"
      - label: "🎲 Wild Card"
        description: "Personal obsessions, spite-driven dev"
```

**Telemetry-specific categories:**

```tool:AskUserQuestion
questions:
  - question: "Or dive into Telemetry-specific:"
    header: "Telemetry"
    multiSelect: false
    options:
      - label: "📈 Terminal"
        description: "Trading terminal pain points and UX"
      - label: "🤖 BONKbot"
        description: "Button flows, error states, onboarding"
      - label: "⛓️ Solana Infra"
        description: "RPCs, latency, transaction reliability"
      - label: "💎 Data Gold"
        description: "Patterns in our data users would pay for"
```

```tool:AskUserQuestion
questions:
  - question: "More Telemetry categories:"
    header: "Telemetry"
    multiSelect: false
    options:
      - label: "🔗 Cross-Product"
        description: "Terminal ↔ BONKbot integration"
      - label: "🧠 Trader Psychology"
        description: "Help users make better decisions"
      - label: "🏆 Competitive Edge"
        description: "Features competitors have (or don't)"
      - label: "🚀 Moonshots"
        description: "AI trading, social features, wild ideas"
```

Load ALL prompts from selected category. Rapid-fire through them.

---

### Mode 3: Chaos Mode

Random prompts from any category. Move FAST.
- Hesitation > 30 seconds: "Moving on—"
- Engagement: "Noting that. NEXT:"
- Every 4-5 prompts: Quick pause for spark check

---

## SPARK AMPLIFICATION

When energy shifts, dive in:

"**Hold up - something there.**

When you mentioned [thing], your energy changed."

```tool:AskUserQuestion
questions:
  - question: "What specifically appeals about this idea?"
    header: "Appeal"
    multiSelect: true
    options:
      - label: "It solves real pain"
        description: "This problem actually bugs me"
      - label: "I'd learn something new"
        description: "Skill development opportunity"
      - label: "Demo would be impressive"
        description: "People would react"
      - label: "It's fun/interesting"
        description: "Just want to build it"
  - question: "How big should this be?"
    header: "Scope"
    multiSelect: false
    options:
      - label: "Tiny - 1 day max"
        description: "Quick win, ship fast"
      - label: "Medium - 2-3 days"
        description: "Standard hackathon scope"
      - label: "Ambitious - full week+"
        description: "Stretch goal, might need fallback"
```

---

## SPARK INVENTORY

After exploration (15-20 min or energy flags):

Present captured sparks:

**High-Energy** (genuine excitement detected)
**Interesting But Uncertain** (worth considering)
**Sleeper Hits** (bigger than they seem)

**IMPORTANT:** Dynamically generate options using ACTUAL spark names captured during exploration. Example:

```tool:AskUserQuestion
questions:
  - question: "Which sparks to develop? (Pick 1-2)"
    header: "Selection"
    multiSelect: true
    options:
      - label: "RPC Health Dashboard"          # <-- Use real spark name
        description: "Excited about visibility" # <-- Real resonance reason
      - label: "Whale Alert System"
        description: "Data gold opportunity"
      - label: "BONKbot Error Recovery"
        description: "Solves daily frustration"
      - label: "Keep exploring"
        description: "Haven't found 'the one' yet"
```

---

## OUTPUT

Update frontmatter:
- `sparks_explored`: [list]
- `top_sparks`: [selected 1-2]
- `exploration_mode`: [mode used]

---

## NEXT

### Route Based on Spark Type

```tool:AskUserQuestion
questions:
  - question: "Is this spark about automating something you already do?"
    header: "Spark type"
    multiSelect: false
    options:
      - label: "Yes - existing pain/workflow"
        description: "I want to automate or fix something I already deal with"
      - label: "No - new thing to build"
        description: "I want to create something that doesn't exist yet"
```

**If "existing pain/workflow":**
"Let's map exactly what you do before we scope it."
→ Load `./step-02b-pain-decomposition.md`

**If "new thing to build":**
"We've got sparks. Let's see if they're actually buildable."
→ Load `./step-03-reality-forge.md`
