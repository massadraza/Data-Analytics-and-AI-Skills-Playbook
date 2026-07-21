Audit $ARGUMENTS for observability at its failure-prone boundaries.

1. **Boundary inventory** — list every point where the system crosses a boundary: external API/LLM call, database read/write, webhook receipt, queued job, scheduled run
2. **Logging coverage** — for each boundary, check whether success and failure are both logged with enough context to debug without reproducing locally (inputs, timing, error detail — not just "failed")
3. **Metrics coverage** — check whether latency, error rate, and volume are tracked anywhere for these boundaries, or if failures would only be noticed when a user/downstream system complains
4. **Silent failure check** — flag any `except: pass`, swallowed exceptions, or code paths where a failure doesn't produce any log line, metric, or alert
5. **Traceability** — for multi-step pipelines, check whether a single run can be traced end-to-end (a run ID or correlation ID threaded through all layers) or whether logs from one run are indistinguishable from another

For each gap, show file path and line number, explain what would be invisible in production, and suggest the minimal fix. If a boundary is already well-instrumented, confirm it explicitly.
