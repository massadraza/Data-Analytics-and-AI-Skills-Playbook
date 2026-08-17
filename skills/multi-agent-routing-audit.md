Audit the routing/orchestration logic in this multi-agent pipeline (e.g., LangGraph, custom orchestrator, or similar agentic framework).

1. **Routing inventory** — list every place content/state is routed to a node, section, or agent; note whether the routing decision is deterministic (rule-based) or LLM-driven
2. **Unhandled cases** — for each routing/classification step, check whether there's a default/fallback branch; flag any that would silently drop content on an unexpected category
3. **LLM-routing risk** — for routing decisions made by an LLM (e.g., an orchestrator node choosing which sections run), check if there are guardrails/overrides for high-stakes branches that should always run regardless of the model's choice (e.g., safety-critical or data-driven sections)
4. **Duplicate/conflicting routes** — check if any input could match multiple routing rules and produce inconsistent behavior depending on rule order
5. **Parallel fan-out consistency** — if the pipeline fans out per entity (e.g., per user, per region, per subscriber), verify each fan-out branch handles partial failures independently rather than failing the whole batch
6. **Observability** — check whether routing decisions are logged with enough context to debug "why did X get routed to Y" after the fact

Output a routing map (node → conditions → destinations) and flag the highest-risk gaps.
