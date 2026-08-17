Audit whether a time-series forecasting model's reported evaluation reflects true multi-step forecasting or is silently relying on 1-step-ahead ground truth.

1. **Horizon check** — identify whether the model is evaluated predicting 1 step ahead using real historical context, or genuinely forecasting multiple steps ahead using only its own prior predictions as input
2. **Recursive feature leakage** — for lag/rolling-window features (e.g., 3-day or 7-day rolling stats, prior-value lags), check whether evaluation code populates them from the true historical series even at forecast steps where, in real deployment, only prior predictions would be available
3. **Degradation estimate** — if only 1-step-ahead evaluation exists, flag this explicitly as a limitation and estimate (or recommend testing) how performance would degrade under true recursive multi-step forecasting
4. **Error accumulation** — if recursive forecasting is implemented, check whether errors compound over the horizon in a way that isn't reflected in an aggregate metric (e.g., report metrics broken out by step-ahead, not just averaged across the whole horizon)
5. **Deployment reality check** — compare what data is actually available at inference time in production against what the evaluation pipeline assumes is available; flag any mismatch

Output a clear statement of which evaluation mode was used (1-step vs. true recursive), and the risk this poses to reported metrics if deployed for longer-horizon forecasting.
