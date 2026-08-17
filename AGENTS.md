# Data Analytics & AI Skills Playbook — Codex instructions

This repository (or the project you copied `skills/` into) ships 32 review checklists under `skills/*.md`, each a self-contained set of instructions for auditing one aspect of a data/ML/agent-pipeline/production codebase.

## When to consult a skill

| Working on... | Check |
|---|---|
| A dataset or feature pipeline | `skills/dataset-health.md`, `skills/data-leakage.md`, `skills/temporal-split.md`, `skills/feature-audit.md` |
| Model training/eval | `skills/eval-report.md`, `skills/overfitting-check.md`, `skills/feature-importance.md`, `skills/model-compare.md` |
| Hyperparameters/thresholds | `skills/hyperparameter-suggest.md`, `skills/threshold-tune.md`, `skills/cultivar-analysis.md` |
| Shipping a model | `skills/model-to-api.md`, `skills/prediction-explainer.md`, `skills/new-model.md` |
| A staged (gate + downstream) or time-series forecasting model | `skills/staged-model-gating-audit.md`, `skills/forecast-horizon-audit.md`, `skills/training-serving-skew-check.md` |
| An LLM/agent pipeline (LangGraph, RAG, multi-agent) | `skills/pipeline-trace-audit.md`, `skills/multi-agent-routing-audit.md`, `skills/source-grounding-audit.md`, `skills/vector-rag-index-audit.md`, `skills/content-qc-audit.md`, `skills/agent-prompt-regression-check.md`, `skills/llm-pipeline-cost-audit.md` |
| Full-stack/ops concerns | `skills/full-stack-schema-drift-check.md`, `skills/scheduled-job-reliability-audit.md`, `skills/external-api-quota-audit.md` |
| Production hardening | `skills/resilience-check.md`, `skills/observability-audit.md`, `skills/bottleneck-scan.md`, `skills/idempotency-check.md`, `skills/secrets-exposure-scan.md` |

## How to apply a skill

Read the relevant `skills/<name>.md` file and follow its numbered checklist against the code you're currently touching. Cite specific files/lines and state the concrete failure scenario for anything you flag — don't just restate the checklist item, and don't invent a finding to satisfy it. If nothing applies, say so.

These are advisory checklists to run selectively based on what you're working on, not a mandatory gate on every task.

## Multi-agent workflows (Claude Code only)

`.claude/workflows/*.js` batches several of these skills into one orchestrated run with parallel fan-out and adversarial verification. That orchestration layer is specific to Claude Code's `Workflow` tool and does not run under Codex — in Codex, apply the individual skill files above one at a time instead.
