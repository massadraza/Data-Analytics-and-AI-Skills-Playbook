Audit and fix the train/test split strategy across models to ensure temporal integrity.

Context: time-series data (readings over days/seasons/years) leaks future information into training if split randomly. The correct approach is a temporal split — train on earlier periods, test on later periods.

1. **Split audit** — for each model, find where train_test_split or similar is called; check if shuffle=True is used (bad for time-series)
2. **Date column check** — identify the date/time column in the dataset and verify it is NOT used as a raw feature but IS used to define the split
3. **Recommended split** — suggest a split point (e.g., train on all data before date X, test on X onward) based on the dataset's date range
4. **Leakage across boundary** — check if data from the same entity/location/session appears on both sides of the split boundary (should not)
5. **Fix** — for any model using random splits, show the corrected code using a temporal split

Flag each model as: Temporal Split (correct) / Random Split (needs fix) / Unknown.
