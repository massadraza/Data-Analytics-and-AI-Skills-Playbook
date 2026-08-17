Audit a multi-stage model pipeline (e.g., a classifier "gate" feeding a downstream regressor/severity model, or any staged decision → detail architecture) for boundary bugs.

1. **Gating logic** — find where Stage 1's output determines whether/how Stage 2 runs; verify the gating threshold and its effect (e.g., "Stage 2 output is zeroed when Stage 1 predicts negative") is implemented consistently everywhere it's used (training, eval, inference/API)
2. **Regime-switch logic** — if the pipeline dynamically switches between sub-models or feature sets based on a detected condition (e.g., early-season vs. late-season, cold-start vs. warm), verify the switch point is computed only from information available at prediction time (no lookahead)
3. **Leakage across the boundary** — check whether any feature used in Stage 2 was derived using information that wouldn't be available if Stage 1 had gated the row out (or vice versa)
4. **Threshold sensitivity** — check how sensitive downstream metrics are to Stage 1's threshold; small threshold changes that cause large swings in Stage 2's evaluated performance suggest the stages are too tightly coupled for independent tuning
5. **Error propagation** — quantify how much of Stage 2's error is attributable to rows that were incorrectly gated by Stage 1 (false negatives that never reach Stage 2, false positives that reach it with no real signal)
6. **Consistency between offline eval and serving code** — verify the exact same gating/switching logic used in the training and evaluation scripts is used in the deployed inference path (a common source of train/serve skew)

Output a list of confirmed or suspected boundary bugs, ranked by how much they'd inflate reported performance vs. true production performance.
