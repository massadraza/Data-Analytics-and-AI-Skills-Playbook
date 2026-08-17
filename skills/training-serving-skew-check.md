Compare feature computation logic between the training/eval pipeline and the serving/inference path (API, batch job, or scheduled pipeline) to catch train/serve skew.

1. **Feature inventory** — list every feature the model consumes, and locate where each is computed in (a) the training pipeline and (b) the serving path
2. **Logic diff** — for each feature, compare the two implementations line-by-line where possible; flag any difference in rounding, window size, timezone handling, null-fill strategy, or units
3. **Library/version drift** — check whether training and serving use the same versions of pandas/numpy/feature libraries; flag known behavior differences between versions (e.g., rolling-window edge handling)
4. **Data source drift** — check whether training pulls from a static snapshot/warehouse table while serving pulls from a live API or cache; flag fields that could differ in freshness or definition between the two
5. **Derived/lag features** — for any feature derived from historical values (lags, rolling stats, deltas), verify serving has access to the same lookback window training assumed was available
6. **Missing-value handling parity** — confirm both paths impute/drop missing values identically; a mismatch here silently shifts predictions without erroring

Output a feature-by-feature parity table (Match / Mismatch / Unknown) and rank mismatches by how much they'd likely move predictions.
