# Step 2b: Pain Decomposition

**Goal:** Convert vague pain into buildable automation spec. Triggered when spark is pain-based rather than creative.

## TRIGGER CONDITION

Activate this step when the spark matches:
- Categories: `rage_fuel`, `team_suffering`, `telemetry_dx`, or `product_sense`
- Language patterns: "I hate...", "every week I...", "takes forever...", "so annoying..."
- User explicitly wants to automate existing workflow

Skip this step for creative/exploratory sparks (→ go direct to Reality Forge).

---

## RULES

- Be annoyingly specific — "the spreadsheet" → "which spreadsheet, what tool, what data?"
- Map the CURRENT state before dreaming about future state
- Identify judgment points — these define automation boundaries
- Output a concrete I/O spec, not vibes

---

## SEQUENCE

### 1. Workflow Excavation

"**Before we can automate it, I need to understand exactly what you do.**"

```tool:AskUserQuestion
questions:
  - question: "How often does this pain happen?"
    header: "Frequency"
    multiSelect: false
    options:
      - label: "Multiple times daily"
        description: "It's constant background noise"
      - label: "Daily"
        description: "Once a day, predictable"
      - label: "Weekly"
        description: "Regular but not constant"
      - label: "On-demand / irregular"
        description: "Triggered by events"
```

Then ask: "**Walk me through the exact steps, start to finish.** Don't skip the boring parts — those are usually what we automate."

Capture the workflow as a numbered list:
```
1. Open [tool]
2. Find [thing]
3. Copy [data]
4. Paste into [destination]
5. Format [output]
6. Send to [recipient]
```

---

### 2. Data Source Mapping

"**Where does the information come from?**"

```tool:AskUserQuestion
questions:
  - question: "Primary data source?"
    header: "Input"
    multiSelect: false
    options:
      - label: "Slack"
        description: "Messages, threads, channels"
      - label: "Linear"
        description: "Issues, projects, cycles"
      - label: "Notion"
        description: "Pages, databases, docs"
      - label: "GitHub"
        description: "PRs, issues, commits, actions"
  - question: "Secondary sources? (if any)"
    header: "Also from"
    multiSelect: true
    options:
      - label: "Slack"
        description: "Messages, threads, channels"
      - label: "Linear"
        description: "Issues, projects, cycles"
      - label: "Notion"
        description: "Pages, databases, docs"
      - label: "GitHub"
        description: "PRs, issues, commits, actions"
```

Follow-up based on selection:

**If Slack:** "Which channel(s)? What are you looking for in the messages?"
**If Linear:** "Which project/team? What issue states matter?"
**If Notion:** "Which database/page? What properties do you pull?"
**If GitHub:** "Which repo(s)? PRs, issues, or code?"

---

### 3. Output Destination Mapping

"**Where does the result go?**"

```tool:AskUserQuestion
questions:
  - question: "Where does the output land?"
    header: "Output"
    multiSelect: false
    options:
      - label: "Slack message"
        description: "Posted to a channel or DM"
      - label: "Notion page/database"
        description: "Updated or created"
      - label: "Linear ticket"
        description: "Created or updated"
      - label: "Spreadsheet/doc"
        description: "Google Sheets, CSV, etc."
  - question: "Who consumes this output?"
    header: "Audience"
    multiSelect: false
    options:
      - label: "Just me"
        description: "Personal productivity"
      - label: "My team"
        description: "Team visibility"
      - label: "Leadership"
        description: "Reporting up"
      - label: "External"
        description: "Customers, partners"
```

---

### 4. Judgment Point Identification

"**Now the key question: where does your brain actually add value?**"

```tool:AskUserQuestion
questions:
  - question: "Which parts are pure mechanical work?"
    header: "Mechanical"
    multiSelect: true
    options:
      - label: "Gathering the data"
        description: "Finding and collecting info"
      - label: "Formatting/structuring"
        description: "Making it look right"
      - label: "Copying between tools"
        description: "Moving data A→B"
      - label: "Sending/posting"
        description: "Distribution step"
  - question: "Where do you make actual decisions?"
    header: "Judgment"
    multiSelect: true
    options:
      - label: "What to include/exclude"
        description: "Filtering, prioritizing"
      - label: "How to summarize/phrase"
        description: "Narrative, tone"
      - label: "What action to take"
        description: "Deciding next steps"
      - label: "Quality check"
        description: "Is this right/good enough?"
```

**If judgment points are minimal:** "This could be fully automated — you'd just review the output occasionally."

**If judgment points are significant:** "This needs human-in-the-loop. The automation handles gathering + formatting, you handle the decisions."

---

### 5. Automation Boundary

"**What level of automation feels right?**"

```tool:AskUserQuestion
questions:
  - question: "How much do you trust automation here?"
    header: "Trust level"
    multiSelect: false
    options:
      - label: "Full autopilot"
        description: "Run without me, I'll spot-check"
      - label: "Draft for review"
        description: "Prepare it, I approve before sending"
      - label: "Suggestions only"
        description: "Show me options, I decide"
      - label: "Just the data"
        description: "Gather info, I do the rest"
  - question: "What would make you nervous if automated?"
    header: "Risk"
    multiSelect: true
    options:
      - label: "Wrong info going out"
        description: "Accuracy matters"
      - label: "Wrong tone/phrasing"
        description: "Communication style matters"
      - label: "Missing context"
        description: "I know things the system doesn't"
      - label: "Nothing — automate it all"
        description: "Low stakes, just do it"
```

---

### 6. QA Integration Check

"**Quick check on testing needs.**"

```tool:AskUserQuestion
questions:
  - question: "Does this touch anything that needs testing?"
    header: "Testing"
    multiSelect: true
    options:
      - label: "UI flows"
        description: "Could use Playwright for E2E"
      - label: "Bug reporting"
        description: "Could integrate with Jam.dev"
      - label: "API/data"
        description: "Need to verify data integrity"
      - label: "None — internal tooling only"
        description: "Low-risk automation"
```

---

## OUTPUT: Pain Decomposition Summary

Compile findings into structured spec:

```markdown
## Pain Decomposition: [Spark Name]

### Current Workflow
1. [Step 1]
2. [Step 2]
...

### Data Flow
- **Inputs:** [Sources with specifics]
- **Outputs:** [Destinations with specifics]
- **Frequency:** [How often]

### Judgment Map
- **Mechanical (automate):** [List]
- **Judgment (human):** [List]

### Automation Scope
- **Level:** [Full autopilot / Draft for review / Suggestions / Data only]
- **Risk factors:** [What could go wrong]

### Technical Notes
- **APIs needed:** [Slack API, Linear API, etc.]
- **Testing approach:** [Playwright, manual, etc.]
```

---

## NEXT

"**Now we know exactly what we're building.** Let's see if it's achievable in 3 days."

Pass decomposition summary to Reality Forge → Step 3

---

## EXAMPLES

### Example 1: Weekly Status Report

**Pain:** "I hate writing the weekly status update"

**Decomposition:**
- Workflow: Pull completed Linear tickets → summarize in Slack → format for leadership
- Inputs: Linear (completed issues), Slack (team updates thread)
- Outputs: Slack message to #general
- Mechanical: Gathering tickets, formatting
- Judgment: What to highlight, narrative framing
- Scope: Draft for review — AI gathers and formats, human adds narrative

**→ Buildable:** Linear API + Claude summarization + Slack bot

### Example 2: PR Review Reminders

**Pain:** "PRs sit for days without review"

**Decomposition:**
- Workflow: Check GitHub for stale PRs → ping reviewers in Slack
- Inputs: GitHub (open PRs, review status)
- Outputs: Slack DM to reviewers
- Mechanical: All of it
- Judgment: None — pure automation
- Scope: Full autopilot

**→ Buildable:** GitHub webhook + Slack bot, no AI needed

### Example 3: Bug Triage

**Pain:** "Jam.dev bugs pile up, nobody knows priority"

**Decomposition:**
- Workflow: Review Jam captures → assess severity → create Linear tickets
- Inputs: Jam.dev (new bug reports)
- Outputs: Linear (triaged tickets)
- Mechanical: Creating tickets, copying details
- Judgment: Severity assessment, priority
- Scope: Suggestions — AI proposes severity, human confirms

**→ Buildable:** Jam.dev webhook + Claude triage + Linear API
