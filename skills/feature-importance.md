Extract and analyze feature importance for the model in $ARGUMENTS (or the most recent model if none specified).

1. **Raw importance scores** — pull feature_importances_ or SHAP values from the trained model; rank all features
2. **Stage 1 vs Stage 2** — if two-stage, report importance separately for the classifier and regressor
3. **Top 10 drivers** — explain in plain English what each top feature represents in the context of dollar spot disease
4. **Redundant features** — flag features with near-zero importance that could be dropped to simplify the model
5. **Surprise features** — flag any feature ranked highly that shouldn't intuitively drive disease risk (possible leakage or spurious correlation)
6. **Stability check** — if multiple model versions exist, compare whether the same features dominate across versions or if rankings shift dramatically

Output a ranked table and a plain-English summary of what the model has learned.
