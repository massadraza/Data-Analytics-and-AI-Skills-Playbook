Audit a LangGraph (or similar multi-node) agent pipeline run for $ARGUMENTS.

1. **Map the graph** — list each node/layer in execution order and what it's responsible for (ingestion, triage, agent calls, synthesis, quality check, human-in-the-loop, delivery, etc.)
2. **Per-node health** — for the run in question, report per node: input/output shape or size, latency, whether it errored or was skipped, and any retries
3. **State drift** — flag any node that mutated shared state in a way downstream nodes don't expect (missing keys, unexpected types, silently dropped fields)
4. **Bottleneck identification** — call out the slowest node(s) and whether the delay is LLM-call-bound, I/O-bound, or compute-bound
5. **Failure cascade** — if a node failed or produced low-quality output, trace whether downstream nodes propagated the issue or caught/recovered from it
6. **Quality gate check** — if there's a quality/validation layer, confirm it actually blocks bad output rather than just logging a warning

If no specific run is specified, use the most recent run's logs/state. Present findings as a table (node → status → latency → issue) followed by a plain-English summary of the biggest risk in the pipeline.
