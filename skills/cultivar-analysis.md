Analyze model performance and data distribution broken down by a categorical grouping column (e.g., segment, cohort, region, product line, cultivar — whatever grouping variable exists in this dataset).

1. **Data coverage** — how many records per group in the dataset; flag groups with fewer than 50 rows
2. **Target rate by group** — what percentage of records show the positive class (or mean target value) per group; identify highest and lowest
3. **Per-group metrics** — if the model outputs predictions, break down AUC, F1, and RMSE by group
4. **Worst-performing groups** — which groups does the model struggle with most; hypothesize why (small sample, distribution shift, unusual feature response, etc.)
5. **Pooled vs. per-group models** — compare whether a single pooled model or separate per-group models perform better; reference any existing per-group model folder if one exists
6. **Recommendation** — suggest which groups need more data collection and whether any warrant their own dedicated model

Output a group summary table ranked by target/positive rate.
