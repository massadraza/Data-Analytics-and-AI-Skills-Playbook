Analyze model performance and data distribution broken down by turfgrass cultivar.

1. **Data coverage** — how many records per cultivar in the dataset; flag cultivars with fewer than 50 rows
2. **Disease rate by cultivar** — what percentage of records show disease presence per cultivar; identify most and least susceptible
3. **Per-cultivar metrics** — if the model outputs predictions, break down AUC, F1, and RMSE by cultivar
4. **Worst-performing cultivars** — which cultivars does the model struggle with most; hypothesize why (small sample, unusual weather response, etc.)
5. **Pooled vs. per-cultivar models** — compare whether a single pooled model or separate per-cultivar models perform better; reference the `two-stage-per-cultivar` folder if it exists
6. **Recommendation** — suggest which cultivars need more data collection and whether any warrant their own dedicated model

Output a cultivar summary table ranked by disease susceptibility rate.
