# Step 4: Ship Sheet

**Goal:** Create actionable battle plan for the week. This is the final export.

## RULES

- Actionable on Monday morning
- Not a PRD - a hackathon guide
- Include escape hatches
- End on high energy

---

## SEQUENCE

### 1. Confirm Details

```tool:AskUserQuestion
questions:
  - question: "Final check - is this all correct?"
    header: "Confirm"
    multiSelect: false
    options:
      - label: "Yes, looks good"
        description: "Let's generate the Ship Sheet"
      - label: "Need to tweak something"
        description: "Let me adjust before finalizing"
```

---

### 2. Generate Ship Sheet

Create document with this structure:

```markdown
# 🚀 [Project Name]

> [One-sentence tweet-length pitch]

## Why This Matters
[2-3 sentences on core value]

## The Demo Moment
[What makes people lean in Thursday]

## What I'll Learn
- [Goal 1]
- [Goal 2]

---

## Build Plan

### Monday: Foundation
**Goal:** [Milestone]
- [ ] Setup environment
- [ ] [Task 2]
- [ ] [Task 3]
**EOD Check:** [What "on track" looks like]

### Tuesday: Core Features
**Goal:** [Milestone]
- [ ] [Core task 1]
- [ ] [Core task 2]
**EOD Check:** [On track indicator]
**⚠️ Decision Point:** If behind, activate Failsafe

### Wednesday: Polish
**Goal:** Demo-ready by EOD
- [ ] Polish critical path
- [ ] Practice demo flow
- [ ] Handle demo edge cases

### Thursday: Demo
- [ ] Final polish
- [ ] Test demo E2E
- [ ] Prepare backup (screenshots if live fails)

---

## Resources

**Tools:** Claude Code / Cursor + [others]
**APIs:** [List with purpose]
**Help:** [Who to ping for what]

---

## Failsafe Plan

**Trigger:** End of Tuesday significantly behind
**Fallback:** [Smaller version that still demos]
**Cut:** [Features to drop]
**Keep:** [Core that must work]

---

## Wild Cards (Future Ideas)
[Other sparks that didn't make the cut]
```

---

### 3. Sendoff

"**Ship Sheet ready.**

**You're building:** [Name]
**Monday's first task:** [Specific action]
**Demo vision:** [Thursday success]

**Parting advice:**
1. Start before ready - don't perfect setup
2. Let AI do boring parts
3. Demo early, share progress
4. Embrace the mess - ship ugly code that works
5. Have fun - if it's not fun, wrong project

**Export path:** [file path]

Go build something cool. 🚀"

---

## OUTPUT

Final frontmatter:
```yaml
stepsCompleted: [1, 2, 3, 4]
workflow_completed: true
```

---

## SUCCESS METRICS

✅ Clear, exciting project defined
✅ Realistic 3-day scope
✅ Specific daily milestones
✅ Failsafe plan exists
✅ Resources identified
✅ Participant energized
