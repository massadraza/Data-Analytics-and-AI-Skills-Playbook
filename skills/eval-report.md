Run a full evaluation report on the current model or the model in $ARGUMENTS.

1. **Load and inspect** — check dataset shape, class/label balance, and any obvious data quality issues
2. **Classifier metrics** (if applicable) — report precision, recall, F1, AUC-ROC, and confusion matrix
3. **Regressor metrics** (if applicable) — report RMSE, MAE, R², and residual distribution
4. **Multi-stage breakdown** — if the model is a pipeline of multiple stages (e.g., a gate/classifier feeding a downstream regressor), report metrics separately per stage and note how errors in an earlier stage propagate downstream
5. **Per-group breakdown** — if a grouping/segment column exists, show metrics split by group
6. **Failure cases** — show the top 10 worst predictions (largest errors) with their feature values
7. **Calibration check** — are predicted probabilities/values well-calibrated vs. actuals?

If no model path is specified, look for the most recently modified model folder.
