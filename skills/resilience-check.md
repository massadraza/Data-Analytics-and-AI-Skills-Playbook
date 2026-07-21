Audit $ARGUMENTS for resilience against transient failures.

1. **External calls inventory** — list every call to an external dependency (LLM APIs, databases, webhooks, third-party services) across the codebase
2. **Timeout coverage** — flag any external call with no timeout set (risk of hanging indefinitely)
3. **Retry/backoff coverage** — flag calls with no retry logic, and calls that retry without backoff (risk of hammering a failing dependency)
4. **Failure isolation** — check whether a single failed call can crash the whole pipeline/request, or whether it's caught and handled gracefully
5. **Cascading failure risk** — trace what happens downstream if an upstream node/service fails: does it propagate a clear error, silently pass bad data, or hang the whole chain

For each issue, show file path and line number, explain the failure scenario, and suggest the fix (e.g., add `tenacity` retry with exponential backoff, wrap in try/except with a clear fallback). If coverage looks solid, confirm explicitly rather than a generic pass.
