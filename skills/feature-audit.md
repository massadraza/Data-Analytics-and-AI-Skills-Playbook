Audit the features (input columns) used across all models in this project. Report:

1. **Feature inventory** — list every unique feature name used across all model folders
2. **Consistency check** — flag features that appear in some models but not others with no clear reason
3. **Collinearity risks** — identify features that are likely highly correlated (e.g., multiple humidity/temperature metrics)
4. **Sensor dependency** — which features require physical sensors vs. which can be derived from weather station data alone
5. **Missing value handling** — how each model handles NaN/missing values for each feature

Present a matrix showing which features each model uses. Highlight any feature that only one model uses as potentially experimental.
