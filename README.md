# Data Analytics & AI Skills Playbook

A reusable library of 32 AI prompts ("skills") for everyday data analytics, machine learning, AI agent-pipeline, and production system-design workflows — auditing datasets, evaluating models, tuning hyperparameters, shipping predictions to an API, auditing LLM/RAG and multi-agent pipelines, and hardening production systems for reliability, scalability, and security.

Built for [Claude Code](https://claude.com/claude-code), and the `skills/*.md` prompts work as-is in any AI assistant that reads project markdown (Cursor, VS Code, Windsurf, Gemini CLI, etc.). For **GitHub Copilot** and **Codex** specifically, this repo also ships native convention files — [`.github/copilot-instructions.md`](.github/copilot-instructions.md) and [`AGENTS.md`](AGENTS.md) — that point each tool at the right skill file for the task at hand, so the same 32 checklists apply automatically instead of needing a slash command.

**Live site:** https://massadraza.github.io/Data-Analytics-and-AI-Skills-Playbook/

## Why this exists

I kept re-running the same manual review checklist every time I shipped a model or touched a production agent pipeline at work — check for leakage, check the eval, check the retry logic, check the fact-check gate. Instead of doing that from memory each time, I turned the checklist into reusable Claude Code skills: one prompt per review, versioned, and shared across every project instead of re-derived per repo. The skills here are generic, but several are informed by real problems I hit building a [multi-agent LangGraph content pipeline](https://github.com/massadraza/Turfgrass-Newsletter-Agentic-Workflow-docs) and a [two-stage disease forecasting model](https://github.com/massadraza/Dollar-Spot-Two-Stage-Model-docs) in production.

## What's inside

### 📊 Data Quality & Auditing
- `dataset-health` — missing values, class imbalance, temporal gaps, outliers
- `data-leakage` — scan ML files for train/test contamination and future leakage
- `feature-audit` — inventory features across all models; flag inconsistencies
- `temporal-split` — validate train/test splits for time-series integrity

### 🎯 Model Evaluation
- `eval-report` — full classifier + regressor metrics, failure cases, calibration
- `model-compare` — cross-model comparison table
- `overfitting-check` — Low/Medium/High overfitting risk per model
- `feature-importance` — ranked drivers + plain-English summary

### ⚙️ Tuning & Optimization
- `hyperparameter-suggest` — search space + ready-to-run Optuna code
- `threshold-tune` — sweep decision thresholds with cost analysis
- `cultivar-analysis` — per-group performance breakdown

### 🚀 Deployment & Explanation
- `model-to-api` — package model as a FastAPI service
- `prediction-explainer` — plain-English explanation of a single prediction
- `new-model` — scaffold a new experiment from a template

### 🤖 AI Agent Pipelines
- `pipeline-trace-audit` — node-by-node health check for LangGraph/multi-agent pipelines (latency, errors, state drift)
- `source-grounding-audit` — verify LLM/RAG output is grounded in source documents, flag hallucinated claims
- `multi-agent-routing-audit` — map agent routing/orchestration logic, flag unhandled fallback branches
- `llm-pipeline-cost-audit` — find oversized models, redundant calls, and missing caching across a pipeline
- `content-qc-audit` — verify plagiarism/fact-check/citation gates actually cover every content type before publish
- `agent-prompt-regression-check` — diff a system-prompt change for removed guardrails and downstream format breakage
- `vector-rag-index-audit` — check embedding staleness, chunking quality, and retrieval relevance for a RAG index

### 📈 Staged & Time-Series Pipelines
- `staged-model-gating-audit` — audit gating logic between a classifier stage and a downstream model for leakage
- `forecast-horizon-audit` — check whether reported metrics reflect true multi-step forecasting or 1-step leakage

### 🧩 Full-Stack & Ops Engineering
- `training-serving-skew-check` — diff feature computation logic between training and serving to catch skew
- `full-stack-schema-drift-check` — compare backend schemas vs. frontend TS types to catch field/type drift
- `scheduled-job-reliability-audit` — audit cron/scheduled pipelines for failure alerting and safe retries
- `external-api-quota-audit` — check external API calls for rate-limit risk, backoff, and quota-exhaustion handling

### 🛠️ System Design & Engineering
- `resilience-check` — find missing timeouts/retries/backoff on external calls, cascading failure risk
- `observability-audit` — check logging/metrics/traceability at failure-prone boundaries
- `bottleneck-scan` — find sync-in-async calls, N+1 patterns, unbounded loops, single points of failure
- `idempotency-check` — flag side-effecting operations unsafe to run twice (duplicate sends, duplicate writes)
- `secrets-exposure-scan` — find hardcoded secrets, `.env` hygiene issues, and logging/frontend leakage

## Install

```bash
git clone https://github.com/massadraza/Data-Analytics-and-AI-Skills-Playbook.git
mkdir -p your-project/.claude/commands your-project/.claude/workflows
cp Data-Analytics-and-AI-Skills-Playbook/skills/*.md your-project/.claude/commands/
cp Data-Analytics-and-AI-Skills-Playbook/.claude/workflows/*.js your-project/.claude/workflows/

# Optional — for GitHub Copilot / Codex instead of (or alongside) Claude Code:
cp Data-Analytics-and-AI-Skills-Playbook/.github/copilot-instructions.md your-project/.github/
cp Data-Analytics-and-AI-Skills-Playbook/AGENTS.md your-project/
```

Then trigger from Claude Code:

```
/dataset-health
/eval-report
/feature-importance
```

Copilot and Codex don't have slash commands — they pick up `.github/copilot-instructions.md` / `AGENTS.md` automatically and apply the relevant `skills/*.md` checklist as you work, without you needing to invoke anything.

## Example (real run)

Ran the `production-readiness-audit` pattern for real against the [Turfgrass Newsletter Agentic Workflow](https://github.com/massadraza/Turfgrass-Newsletter-Agentic-Workflow-docs) production repo: 5 skills fanned out in parallel, 19 raw findings, then every single finding re-checked by an independent verifier agent against the actual source before being trusted. All 19 survived verification (7 high-severity) — the workflow returned a `NOT READY` verdict with file/line citations for every issue. A few of the confirmed findings:

- **`resilience-check`** — `db.get_conn()` opens a `psycopg2` connection with no `connect_timeout` and no retry/backoff; a network blip or unresponsive Postgres host hangs indefinitely and stalls the whole LangGraph run, since the pipeline's node wrapper doesn't catch it either.
- **`bottleneck-scan`** — the GDD chart is re-rendered by spinning up a full headless Chromium instance *per subscriber* instead of once per zip code — 500 subscribers across 20 zips means 500 browser launches instead of 20.
- **`idempotency-check`** — `delivery_node` loops over every active subscriber and calls `sendmail()` unconditionally, with no check against already-`sent` rows for that week — a re-run after a crash or a duplicate cron trigger re-emails everyone, including subscribers already delivered to.
- **`secrets-exposure-scan`** — confirmed `.env` (correctly gitignored, never committed) holds live-looking production credentials for 9+ services in plaintext on disk — flagged for rotation as a precaution even though it's not a git-history leak.

That's the actual payoff of the adversarial-verify pattern: 19/19 held up under independent re-checking, which is a much stronger signal than a single audit pass making unverified claims.

## Workflows

Individual skills are single audits you run one at a time. `.claude/workflows/` adds six multi-agent **Claude Code Workflows** that orchestrate a whole batch of relevant skills against a real project in one pass: most fan out one subagent per skill (reading that skill's own `.md` file for instructions, so there's no duplicated prompt text), run an independent adversarial-verification pass over every finding to cut false positives, and return one prioritized, severity-ranked report — a `verdict` you can gate a merge/deploy on, not just a wall of findings.

**Note:** this orchestration layer is Claude Code-specific — the `.js` scripts don't port to Copilot or Codex the way the `skills/*.md` prompts do. The skills remain the portable layer; workflows are how you run a batch of them together inside Claude Code.

Project-specific audits, one per project in this playbook:
- **`newsletter-pipeline-audit`** — for multi-agent/LangGraph content pipelines. Runs `pipeline-trace-audit`, `multi-agent-routing-audit`, `llm-pipeline-cost-audit`, `content-qc-audit`, `source-grounding-audit`, `vector-rag-index-audit`, `external-api-quota-audit`, `scheduled-job-reliability-audit`, and `agent-prompt-regression-check` in parallel, verifies each finding, and returns the confirmed ones ranked by severity. Modeled on the [Turfgrass Newsletter Agentic Workflow](https://github.com/massadraza/Turfgrass-Newsletter-Agentic-Workflow-docs).
- **`staged-forecast-model-audit`** — for staged/two-stage ML forecasting models. Runs `dataset-health`, `data-leakage`, `temporal-split`, `feature-importance`, `eval-report`, `threshold-tune`, `staged-model-gating-audit`, `forecast-horizon-audit`, `training-serving-skew-check`, and `overfitting-check` in parallel, then verifies each finding with extra scrutiny for metric-inflating bugs (leakage, gating skew, lookahead). Modeled on the [Dollar Spot Two-Stage Model](https://github.com/massadraza/Dollar-Spot-Two-Stage-Model-docs).

General-purpose, for any project:
- **`pr-readiness-check`** — reviews the current `git diff` in parallel across correctness, simplification/reuse, security, and test-coverage gaps, verifies each finding, and returns a READY / READY WITH NOTES / NOT READY verdict. A pre-PR gate broader than a single review pass.
- **`production-readiness-audit`** — the general (non-domain-specific) version of the pre-ship gate: runs `resilience-check`, `observability-audit`, `bottleneck-scan`, `idempotency-check`, and `secrets-exposure-scan` in parallel, verifies findings, returns a ship/no-ship verdict. Use this on any service; use the two project-specific audits above when they fit better.
- **`model-experiment-cycle`** — runs `dataset-health`, `eval-report`, `feature-importance`, and `model-compare` in parallel to assess the current model, then `hyperparameter-suggest` and `threshold-tune` for tuning ideas, then synthesizes everything into one concrete, prioritized next-experiment plan (scaffolded per `new-model`'s convention) instead of a scattered list of options.
- **`codebase-onboarding-map`** — discovers a repo's top-level modules, explores each in parallel, and synthesizes a cohesive architecture overview (written to `ARCHITECTURE.draft.md`, never overwriting an existing file). Useful on an unfamiliar codebase or one whose docs have drifted from the code.

Run one with the `Workflow` tool in Claude Code (e.g. `{ name: "pr-readiness-check" }`) from the root of the target project, after copying `.claude/workflows/` alongside `.claude/commands/`.

## License

MIT
