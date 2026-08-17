Audit a scheduled/cron-triggered pipeline (e.g., a weekly data pipeline, batch job, or cron-deployed service) for reliability gaps.

1. **Schedule inventory** — list every scheduled job, its cadence, and what it depends on (upstream data, external APIs, other jobs finishing first)
2. **Failure alerting** — check whether a failed run actually notifies anyone (error surfaces in logs only vs. triggers an alert/page/email); flag silent failures
3. **Partial-run recovery** — if the job processes multiple items (e.g., per-subscriber, per-region, per-source), check whether a failure partway through the batch is resumable, or whether the whole run must restart from scratch and risks duplicate side effects
4. **Idempotency under retry** — if the scheduler or platform auto-retries failed jobs, verify retrying doesn't duplicate writes, sends, or charges (see also idempotency-check for the general pattern)
5. **Timeout/runtime budget** — check the job has an explicit timeout and what happens if it runs long (killed mid-write? overlaps with the next scheduled run?)
6. **Dependency staleness** — check what happens if an upstream data source is unavailable or returns stale/empty data — does the job skip gracefully, use cached data, or silently proceed with incomplete input?
7. **Observability** — confirm each run's outcome (success/failure/partial, duration, item counts) is logged somewhere queryable, not just in ephemeral platform logs

Output a per-job risk table and the highest-priority reliability gap to fix first.
