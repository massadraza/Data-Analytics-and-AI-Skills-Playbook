# Data Analytics & AI Skills Playbook

A reusable library of 21 AI prompts ("skills") for everyday data analytics, machine learning, AI agent-pipeline, and production system-design workflows — auditing datasets, evaluating models, tuning hyperparameters, shipping predictions to an API, auditing LLM/RAG pipelines, and hardening production systems for reliability, scalability, and security.

Built for [Claude Code](https://claude.com/claude-code), but the markdown files work in any AI assistant (Cursor, Copilot, VS Code, Codex, Windsurf, Gemini CLI, etc.).

**Live site:** https://massadraza.github.io/Data-Analytics-and-AI-Skills-Playbook/

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
- `cultivar-analysis` — per-segment performance breakdown

### 🚀 Deployment & Explanation
- `model-to-api` — package model as a FastAPI service
- `prediction-explainer` — plain-English explanation of a single prediction
- `new-model` — scaffold a new experiment from a template

### 🤖 AI Agent Pipelines
- `pipeline-trace-audit` — node-by-node health check for LangGraph/multi-agent pipelines (latency, errors, state drift)
- `source-grounding-audit` — verify LLM/RAG output is grounded in source documents, flag hallucinated claims

### 🛠️ System Design & Engineering
- `resilience-check` — find missing timeouts/retries/backoff on external calls, cascading failure risk
- `observability-audit` — check logging/metrics/traceability at failure-prone boundaries
- `bottleneck-scan` — find sync-in-async calls, N+1 patterns, unbounded loops, single points of failure
- `idempotency-check` — flag side-effecting operations unsafe to run twice (duplicate sends, duplicate writes)
- `secrets-exposure-scan` — find hardcoded secrets, `.env` hygiene issues, and logging/frontend leakage

## Install

```bash
git clone https://github.com/massadraza/Data-Analytics-and-AI-Skills-Playbook.git
cp Data-Analytics-and-AI-Skills-Playbook/skills/*.md your-project/.claude/commands/
```

Then trigger from Claude Code:

```
/dataset-health
/eval-report
/feature-importance
```

## License

MIT
