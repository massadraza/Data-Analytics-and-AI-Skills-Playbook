Audit the datasets in this project for quality issues. Check:

1. **Missing values** — which columns have NaN, what percentage, and how models currently handle them
2. **Class/label imbalance** — ratio of positive vs. negative (or per-class) rows for the target variable; flag if any class is below 20%
3. **Temporal gaps** — if a date/timestamp column exists, identify any missing date ranges that could affect time-series integrity
4. **Duplicate rows** — check for exact or near-duplicate records
5. **Outliers** — flag numeric columns with values beyond 3 standard deviations; check if they are plausible given the domain
6. **Categorical group coverage** — if the data has a grouping column (e.g., segment, category, cohort, cultivar, region), report record counts per group; flag groups with fewer than 30 records as unreliable for per-group models
7. **Label distribution over time** — plot or summarize how the target variable changes over time/season to check for temporal drift

If the project has an obvious primary dataset (largest/most recently modified CSV or Parquet file, or one named in a README), focus there; otherwise ask which dataset to audit.
