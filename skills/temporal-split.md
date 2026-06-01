Audit and fix the train/test split strategy across models to ensure temporal integrity.

Context: dollar spot data is time-series (weather + disease readings over seasons). A random split leaks future data into training. The correct approach is a temporal split — train on earlier years, test on later years.

1. **Split audit** — for each model, find where train_test_split or similar is called; check if shuffle=True is used (bad for time-series)
2. **Date column check** — identify the date/season column in the dataset and verify it is NOT used as a feature but IS used to define the split
3. **Recommended split** — suggest a split point (e.g., train on all data before year X, test on year X+1 onward) based on the dataset's date range
4. **Seasonal leakage** — check if within-season data from the same location appears in both train and test (should not)
5. **Fix** — for any model using random splits, show the corrected code using a temporal split

Flag each model as: Temporal Split (correct) / Random Split (needs fix) / Unknown.
