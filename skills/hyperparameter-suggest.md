Suggest hyperparameter improvements for the model in $ARGUMENTS (or most recent model).

1. **Current params** — extract all hyperparameters currently set in the model
2. **Search space** — propose a reasonable grid or Bayesian search space for each tunable parameter
3. **Priority params** — rank which parameters will have the most impact to tune first for this dataset size and model type
4. **Optuna/GridSearchCV snippet** — generate ready-to-run tuning code using Optuna (preferred) or sklearn GridSearchCV
5. **CV strategy** — recommend the right cross-validation strategy (TimeSeriesSplit for temporal data, StratifiedKFold for class imbalance)
6. **Expected gain** — estimate how much metric improvement is realistic from tuning vs. the current baseline

For two-stage models, suggest tuning Stage 1 and Stage 2 independently before joint optimization.
