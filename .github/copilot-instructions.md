# Data Analytics & AI Skills Playbook — Copilot instructions

This repository (or the project you copied `skills/` into) uses a library of 32 review checklists under `skills/*.md`. Each file is a self-contained set of instructions for auditing one aspect of a data/ML/agent-pipeline/production codebase — e.g. `skills/dataset-health.md`, `skills/resilience-check.md`, `skills/secrets-exposure-scan.md`.

## When to use these

- Before suggesting or finishing a change to a **model, dataset, or feature pipeline**: check whether `skills/dataset-health.md`, `skills/data-leakage.md`, `skills/temporal-split.md`, or `skills/overfitting-check.md` applies, and apply its checklist to the code you touched.
- Before suggesting or finishing a change to an **agent/LLM pipeline** (LangGraph, multi-agent orchestration, RAG): check `skills/pipeline-trace-audit.md`, `skills/multi-agent-routing-audit.md`, `skills/source-grounding-audit.md`, `skills/vector-rag-index-audit.md`, or `skills/content-qc-audit.md`.
- Before suggesting or finishing a change that adds an **external call, scheduled job, or side-effecting operation** (email send, DB write, API call): check `skills/resilience-check.md`, `skills/idempotency-check.md`, `skills/scheduled-job-reliability-audit.md`, or `skills/external-api-quota-audit.md`.
- Before suggesting or finishing a change touching **config, env vars, or logging**: check `skills/secrets-exposure-scan.md` and `skills/observability-audit.md`.
- Before packaging a model as an API or scaffolding a new experiment: check `skills/model-to-api.md` or `skills/new-model.md`.

Full index: see the repo's `README.md` for the complete list of 32 skills grouped by category.

## How to apply a skill

Open the relevant `skills/<name>.md` file, follow its numbered checklist against the code you're currently working on, and surface findings the same way you would any other code review comment — cite the specific file/line, state the concrete failure scenario, don't just restate the checklist item. Don't fabricate a finding to satisfy the checklist; if a check doesn't apply or nothing is wrong, say so.

These are advisory checklists, not gates — use judgment about which apply to the change at hand rather than running all 32 on every diff.
