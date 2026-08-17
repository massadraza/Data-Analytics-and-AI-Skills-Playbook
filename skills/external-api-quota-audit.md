Audit external/third-party API usage across the project for rate-limit and quota exhaustion risk.

1. **API inventory** — list every external API called (weather, social, research, LLM providers, etc.), its documented rate limit/quota, and where in the code it's called from
2. **Concurrency risk** — for APIs called from parallel/fan-out code (e.g., once per user, per region, per item), check whether the fan-out volume could exceed the API's rate limit, especially as the dataset/user base grows
3. **Backoff handling** — verify each external call has retry-with-backoff on 429/5xx responses, and that the backoff is capped (no infinite retry loop)
4. **Quota-exhaustion behavior** — check what happens when a quota is fully exhausted mid-run: does the pipeline fail loudly, skip that data source gracefully, or silently proceed with partial/stale data?
5. **Caching opportunity** — flag calls fetching data that doesn't change often (reference data, static lookups) but is re-fetched on every run instead of cached
6. **Cost/limit visibility** — check whether current usage against quota is monitored or logged anywhere, or whether the first sign of a problem would be a production outage

Output a per-API risk table (limit, current usage pattern, backoff present?, failure behavior) ranked by which API is most likely to be the next outage.
