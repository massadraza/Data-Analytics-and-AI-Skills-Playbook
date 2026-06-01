Check all models in this project for signs of overfitting.

1. **Train vs. test gap** — find where train and test metrics are both reported; flag any model where train score exceeds test score by more than 10 points
2. **Depth and complexity** — flag XGBoost/tree models with max_depth > 6 or n_estimators > 500 with no regularization
3. **Regularization audit** — check for use of reg_alpha, reg_lambda, min_child_weight, subsample, colsample_bytree; note if any are missing
4. **Small dataset risk** — if training set has fewer than 200 rows per class, flag as high overfitting risk
5. **Validation strategy** — is cross-validation used? How many folds? Flag any model that only does a single train/test split
6. **Learning curves** — if possible, describe what a learning curve would look like given the dataset size and model complexity

For each model folder, give an overfitting risk score: Low / Medium / High, with one-line justification.
