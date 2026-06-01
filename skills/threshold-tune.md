Tune the classification threshold for the Stage 1 binary classifier in $ARGUMENTS (or most recent model).

Context: the default threshold is 0.5, but for disease prediction we may prefer to minimize false negatives (missing real disease outbreaks) at the cost of more false positives (unnecessary alerts).

1. **Threshold sweep** — evaluate precision, recall, F1, and false negative rate at thresholds: 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6
2. **Cost analysis** — frame the tradeoff: a false negative means a missed disease outbreak (high cost); a false positive means an unnecessary fungicide application (moderate cost)
3. **Recommended threshold** — suggest the optimal threshold given that false negatives are more costly in agronomic settings
4. **Cultivar-specific thresholds** — check if different cultivars warrant different thresholds based on their base disease susceptibility
5. **Impact on Stage 2** — explain how changing the threshold affects which rows reach the severity regressor

Output the sweep table and a single recommended threshold with justification.
