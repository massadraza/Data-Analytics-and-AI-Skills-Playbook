Audit LLM usage across this pipeline for cost and latency inefficiencies.

1. **Call inventory** — list every LLM call site, which model it uses, and roughly how large its input/output is
2. **Model-task fit** — flag calls using an expensive/large model (e.g., GPT-4o, Claude Opus) for a task that a cheaper/smaller model could likely handle (classification, extraction, short rewrites, routing)
3. **Redundant calls** — find cases where the same or near-identical prompt is sent multiple times (e.g., per-item in a loop that could be batched, or repeated across pipeline runs without caching)
4. **Missing caching** — check whether results that don't change often (e.g., embeddings, static reference content, RAG lookups) are cached or recomputed every run
5. **Serial vs. parallel** — identify LLM calls that are independent of each other but run sequentially instead of concurrently, adding unnecessary latency
6. **Context bloat** — check whether prompts include unnecessary history/context that inflates token usage without improving output quality
7. **Fallback cost spikes** — check whether retry/fallback logic (e.g., escalating to a bigger model on failure) has a cap, or could loop into runaway cost on repeated failures

Output a ranked list of the highest-impact changes, estimating relative cost/latency savings where possible.
