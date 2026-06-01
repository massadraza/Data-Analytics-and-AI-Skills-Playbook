Audit the datasets in this project for quality issues. Check:

1. **Missing values** — which columns have NaN, what percentage, and how models currently handle them
2. **Class imbalance** — ratio of disease-present vs. disease-absent rows; flag if below 20% minority class
3. **Temporal gaps** — if a date column exists, identify any missing date ranges that could affect time-series integrity
4. **Duplicate rows** — check for exact or near-duplicate records
5. **Outliers** — flag numeric columns with values beyond 3 standard deviations; check if they are plausible sensor readings
6. **Cultivar coverage** — how many records exist per cultivar; flag cultivars with fewer than 30 records as potentially unreliable for per-cultivar models
7. **Label distribution over time** — plot or summarize how disease severity changes by season/year to check for temporal drift

Focus on `ModelFinal/ALL_MERGED_FINAL.csv` as the primary dataset.
