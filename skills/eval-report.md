Run a full evaluation report on the current model or the model in $ARGUMENTS.

1. **Load and inspect** — check dataset shape, class balance (disease vs. no disease), and any obvious data quality issues
2. **Stage 1 classifier** — report precision, recall, F1, AUC-ROC, and confusion matrix
3. **Stage 2 regressor** — report RMSE, MAE, R², and residual distribution
4. **Per-cultivar breakdown** — if cultivar column exists, show metrics split by cultivar
5. **Failure cases** — show the top 10 worst predictions (largest errors) with their feature values
6. **Calibration check** — are predicted probabilities/severities well-calibrated vs. actuals?

If no model path is specified, look for the most recently modified model folder.
