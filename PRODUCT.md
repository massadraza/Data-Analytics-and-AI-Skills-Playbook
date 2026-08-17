# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS deployed to GitHub Pages. No build step, no framework, no JS bundler. All pages are hand-authored `.html` files linked to a single `assets/styles.css`.

## Users

Three equally weighted audiences, all in active working sessions:

1. **Data scientists / ML engineers** — training, evaluating, or shipping models; want pre-built review checklists they can trigger without reconstructing from memory.
2. **Data analysts (non-ML)** — SQL/BI-focused; occasionally need ML or pipeline-level sanity checks without owning the full ML workflow.
3. **AI / LLM app developers** — building LangGraph, RAG, or multi-agent pipelines; need audit skills that cover agentic concerns generic ML tools ignore.

All three reach for the playbook mid-task, under time pressure, to replace a manual checklist they would otherwise run from memory.

## Product Purpose

A reusable library of 32 AI prompt skills covering data analytics, machine learning, AI agent pipelines, and production system design. Users install once and invoke skills on demand from any AI assistant — catching problems (leakage, hallucination, drift) and completing repeatable workflows (eval reports, API scaffolding, pipeline audits) without re-deriving the checklist each time.

Success means a user finishes a pre-ship review in one command instead of twenty minutes of manual checking.

## Positioning

The one skill library that works across every major AI coding assistant — Claude Code, GitHub Copilot, Cursor, Codex, Gemini CLI — without per-tool re-wiring. Competing resources are either tool-specific or limited to general coding; this one is domain-specific (data/ML/agents) and tool-agnostic by design.

## Operating Context

- Triggered inside active coding sessions in Claude Code, VS Code, Cursor, or similar environments.
- Users are mid-task: reviewing a model before shipping, auditing a pipeline before a release, or scaffolding a new experiment.
- Skills run as slash commands in Claude Code; `.github/copilot-instructions.md` and `AGENTS.md` route Copilot/Codex to the same files automatically.
- No login, no API key, no runtime dependency — the skill is a markdown file the assistant reads.

## Capabilities and Constraints

- 32 skills across 8 categories: Data Quality & Auditing, Model Evaluation, Tuning & Optimization, Deployment & Explanation, AI Agent Pipelines, System Design & Engineering, Workflows.
- Each skill is a single `.md` file; no dependencies, no install scripts.
- Static site with no server-side logic; all interactivity must be vanilla JS or CSS.
- GitHub Pages deploy constraint: must remain a static build, no framework compilation required.

## Brand Commitments

- Product name: **Data Analytics & AI Skills Playbook** (fixed).
- "DA" two-letter logomark is established but not legally registered; may be redesigned.
- No committed palette, typography, or visual world — fully open to redesign as long as product truth is preserved.

## Evidence on Hand

- `README.md` — full skill inventory with descriptions and category breakdown.
- `index.html` — landing page with hero, feature grid, install instructions, compatibility section, and stats (32 skills, 8 categories, 6 workflows, MIT license).
- `skills.html` — filterable skill catalog.
- `assets/styles.css` — incumbent visual system (dark navy + green/teal/amber accent; system font stack).
- `skills/` directory — 32 `.md` skill files (authoritative content).
- Live site: https://massadraza.github.io/Data-Analytics-and-AI-Skills-Playbook/
- Related projects named in README as real-world origin: a LangGraph multi-agent content pipeline and a two-stage disease forecasting model.

## Product Principles

1. **Zero friction to value.** A skill must be usable without setup, reading docs, or changing tools — install once, invoke anywhere.
2. **Domain depth over breadth.** The library covers data/ML/agent concerns that general coding assistants skip; it is not a generic prompt collection.
3. **Tool-agnostic by design.** No skill is locked to Claude Code; the same markdown works wherever an assistant accepts prompts.
4. **Checklist, not magic.** Skills surface the right questions and structure; the user's judgment and codebase remain the authority.
5. **Versioned and shareable.** Skills live in the repo alongside the code they review, so checklists evolve with the project and can be shared across a team.

## Accessibility & Inclusion

No product-specific accessibility requirement established. Web baseline (WCAG 2.1 AA) applies.
