# Step 1: Vibe Check

**Goal:** Understand who you're working with. Get name, background, energy level, track preference, learning goals.

## EXECUTION

### Opening

"**Let's figure out what you should build this week.**

Quick ground rules:
- No wrong answers, only boring ones
- Job title irrelevant - anyone can build anything
- 'I don't know' is valid - that's why we're here"

### Use AskUserQuestion for structured input

**Question Block 1 - Who Are You:**

```tool:AskUserQuestion
questions:
  - question: "What do you actually do day-to-day?"
    header: "Role"
    multiSelect: false
    options:
      - label: "Engineering"
        description: "Backend, frontend, infra, data, etc."
      - label: "Product/Design"
        description: "PM, UX, design systems"
      - label: "Operations"
        description: "Support, success, ops, marketing"
      - label: "Other"
        description: "Something else entirely"
  - question: "How are you feeling about AI tools right now?"
    header: "AI Energy"
    multiSelect: false
    options:
      - label: "Terrified"
        description: "What is this sorcery?"
      - label: "Curious"
        description: "Skeptical but interested"
      - label: "Excited"
        description: "Let's burn it all down and rebuild"
      - label: "Experienced"
        description: "Been shipping with AI for a while"
```

### Calibrate based on response

- **Terrified/Curious:** "Uncertainty is fuel - no baggage about how things 'should' work."
- **Excited/Experienced:** "Let's stretch you beyond existing skills."

**Question Block 2 - Track & Goals:**

```tool:AskUserQuestion
questions:
  - question: "Any track calling to you? (Optional)"
    header: "Track"
    multiSelect: false
    options:
      - label: "User-Facing Magic"
        description: "Make users go 'holy shit'"
      - label: "Team Unlocks"
        description: "Reduce developer suffering"
      - label: "Quality Crusade"
        description: "Better QA, bulletproof BONKbot"
      - label: "Wild Card"
        description: "Anything goes - no constraints"
  - question: "What do you want to learn?"
    header: "Learning"
    multiSelect: true
    options:
      - label: "Claude Code workflow"
        description: "Not just prompting - the full workflow"
      - label: "Build from scratch"
        description: "Something new with AI assistance"
      - label: "New language/framework"
        description: "AI as training wheels"
      - label: "AI in your domain"
        description: "How AI handles your specific area"
```

### Transition to Spark Hunt

**Question Block 3 - Exploration Mode:**

```tool:AskUserQuestion
questions:
  - question: "How do you want to explore ideas?"
    header: "Mode"
    multiSelect: false
    options:
      - label: "Guided Tour (Recommended)"
        description: "I pick prompts based on your background"
      - label: "Category Dive"
        description: "You pick a category, we go deep"
      - label: "Chaos Mode"
        description: "Random prompts until something sticks"
```

---

## OUTPUT

Capture to document frontmatter:
- `participant_name`
- `role_background`
- `energy_level`
- `selected_track`
- `learning_goals`
- `exploration_mode`

---

## NEXT

Load `./step-02-spark-hunt.md` with exploration mode.
