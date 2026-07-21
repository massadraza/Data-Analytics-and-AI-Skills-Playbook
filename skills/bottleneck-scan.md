Scan $ARGUMENTS for scalability bottlenecks.

1. **Sync-in-async check** — find blocking/synchronous calls (sync HTTP clients, sync DB drivers, `time.sleep`) inside async request paths or event loops
2. **N+1 query patterns** — find loops that issue one DB/API call per item instead of a single batched call
3. **Unbounded fan-out or loops** — find loops or recursive calls with no cap on iteration count, page size, or concurrency (risk of runaway cost/time on large inputs)
4. **Single points of failure** — identify any component with no redundancy where its failure takes down the whole system, and any hardcoded single-instance assumption (in-memory state that won't survive a restart or multiple instances)
5. **Hot path cost** — for the most frequently executed code path, check for unnecessary repeated work (re-parsing, re-fetching, re-computing) that could be cached or precomputed

For each finding, show file path and line number, explain the scenario where it becomes a real problem (e.g., "at 10x current volume this loop takes minutes"), and suggest the fix. Prioritize findings by how soon they'd bite at realistic growth, not just theoretical severity.
