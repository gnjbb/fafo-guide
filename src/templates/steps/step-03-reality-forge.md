# Step 3: Reality Forge

**Goal:** Pressure-test sparks into buildable hackathon projects. Not killing ideas - shaping them.

## RULES

- Every constraint is a design opportunity
- "Too ambitious" → "what's the core?"
- "Too simple" → "what would impress?"
- Target: achievable in ~3 days with AI assistance

---

## SEQUENCE

### 1. Essence Test

"**Let's forge [Spark] into something real.**"

```tool:AskUserQuestion
questions:
  - question: "In one sentence - what's the core value? Not features, the WHY."
    header: "Essence"
    multiSelect: false
    options:
      - label: "Saves time/pain"
        description: "Eliminates tedious work"
      - label: "Unlocks capability"
        description: "Makes impossible → possible"
      - label: "Impresses people"
        description: "Demo moment potential"
      - label: "Personal learning"
        description: "Skill I want to develop"
```

Reflect back: "Your core value is: [restate]. Does that capture it?"

---

### 2. MVP Pressure Test

```tool:AskUserQuestion
questions:
  - question: "What's the pitch hook?"
    header: "Pitch"
    multiSelect: false
    options:
      - label: "Pain killer"
        description: "'Kill [annoying thing] with [solution]'"
      - label: "Speed play"
        description: "'What if [slow thing] was instant?'"
      - label: "Unlock"
        description: "'Finally, [role] can do [thing]'"
      - label: "Delight"
        description: "'[Boring task] but actually fun'"
  - question: "What's the 'holy shit' demo moment?"
    header: "Demo"
    multiSelect: false
    options:
      - label: "Live AI doing something"
        description: "Real-time wow factor"
      - label: "Before/after comparison"
        description: "Dramatic improvement"
      - label: "Speed demonstration"
        description: "What took X now takes Y"
      - label: "Novel interaction"
        description: "Something they haven't seen"
  - question: "What features should you definitely CUT?"
    header: "Cut"
    multiSelect: true
    options:
      - label: "Auth/login"
        description: "Skip for demo - hardcode user"
      - label: "Pretty UI"
        description: "Ugly but functional is fine"
      - label: "Edge cases"
        description: "Happy path only"
      - label: "Persistence"
        description: "In-memory is fine for demo"
```

---

### 3. Technical Feasibility

```tool:AskUserQuestion
questions:
  - question: "Data/APIs - where does info come from?"
    header: "Data"
    multiSelect: false
    options:
      - label: "🟢 Got this"
        description: "Know how or AI can help"
      - label: "🟡 Stretch zone"
        description: "Don't know but willing to learn"
      - label: "🔴 Unknown"
        description: "Might need help"
  - question: "AI Integration - what's Claude actually doing?"
    header: "AI"
    multiSelect: false
    options:
      - label: "🟢 Got this"
        description: "Clear on the prompting"
      - label: "🟡 Stretch zone"
        description: "Need to figure it out"
      - label: "🔴 Unknown"
        description: "Not sure how to integrate"
  - question: "UI/Interface - how do people interact?"
    header: "UI"
    multiSelect: false
    options:
      - label: "🟢 Got this"
        description: "Can build or skip"
      - label: "🟡 Stretch zone"
        description: "New but learnable"
      - label: "🔴 Unknown"
        description: "Need help"
  - question: "Backend/Logic - what happens behind scenes?"
    header: "Backend"
    multiSelect: false
    options:
      - label: "🟢 Got this"
        description: "Comfortable territory"
      - label: "🟡 Stretch zone"
        description: "Doable with AI"
      - label: "🔴 Unknown"
        description: "New territory"
```

**Response based on colors:**
- Mostly 🟢: "Are you challenging yourself enough?"
- Mix 🟢/🟡: "Perfect - yellow zones are where you grow."
- Lots 🟡/🔴: "Let's rescope - what's the minimum?"

---

### 4. Three-Day Test

```tool:AskUserQuestion
questions:
  - question: "Day 1 milestone - what's working by EOD?"
    header: "Day 1"
    multiSelect: false
    options:
      - label: "Environment + scaffold"
        description: "Dev setup ready, basic structure"
      - label: "Data pipeline live"
        description: "Data flowing from source"
      - label: "AI integration proof"
        description: "Claude responding to prompts"
      - label: "Core logic working"
        description: "Main algorithm/flow tested"
  - question: "Day 2 milestone - what proves the idea works?"
    header: "Day 2"
    multiSelect: false
    options:
      - label: "Core feature complete"
        description: "Main functionality working"
      - label: "End-to-end working"
        description: "Full path operational"
      - label: "Demo-able prototype"
        description: "Could show someone right now"
      - label: "Integration proof"
        description: "External systems connected"
  - question: "If Day 2 goes sideways - what's the fallback?"
    header: "Failsafe"
    multiSelect: false
    options:
      - label: "Cut to core MVP"
        description: "Smallest impressive thing"
      - label: "Pivot to simpler version"
        description: "Related but easier"
      - label: "Demo the journey"
        description: "What I learned > what I built"
```

---

### 5. Spark Selection (If Multiple)

If 2 sparks, present comparison. **Use ACTUAL spark names and summaries:**

```tool:AskUserQuestion
questions:
  - question: "Which gets you out of bed Monday?"
    header: "Decision"
    multiSelect: false
    options:
      - label: "RPC Dashboard"                    # <-- Real name
        description: "🟢🟢🟡🟢 - Learn infra"     # <-- Feasibility + learning
      - label: "Whale Alerts"
        description: "🟢🟡🟡🟢 - Data science stretch"
```

---

### 6. Commitment

"**Your hackathon project is: [Name]**

The pitch: [One sentence]
The demo moment: [What impresses]
The failsafe: [If things go sideways]

**Say it back. Does it feel exciting AND achievable?**"

---

## OUTPUT

Update frontmatter:
- `final_project`
- `complexity_rating`
- `demo_moment`
- `failsafe_plan`

---

## NEXT

"We've got a real project. Let's create the battle plan."

Load `./step-04-ship-sheet.md` with finalized details.
