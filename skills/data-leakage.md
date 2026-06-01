Audit the Python ML files in this project for data leakage. Check for:

1. **Train/test contamination** — any fitting (fit, fit_transform) on the full dataset before splitting
2. **Future data leakage** — features derived from the target variable, or columns that wouldn't be available at prediction time (e.g., same-day disease ratings used as input)
3. **Scaler/encoder leakage** — StandardScaler, LabelEncoder, or imputers fit on combined train+test data
4. **Cross-validation leakage** — preprocessing done outside the CV fold
5. **Index leakage** — shuffle=False when it should shuffle, or row indices used as features

For each issue found, show the file path and line number, explain the specific leakage, and suggest the fix. If no leakage is found, confirm the split logic looks clean.
