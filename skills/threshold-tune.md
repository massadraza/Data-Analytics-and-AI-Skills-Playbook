Tune the classification threshold for the binary classifier in $ARGUMENTS (or most recent model).

Context: the default threshold is 0.5, but the right threshold depends on the relative cost of false negatives vs. false positives in this domain.

1. **Threshold sweep** — evaluate precision, recall, F1, and false negative rate at thresholds: 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6
2. **Cost analysis** — frame the tradeoff: what does a false negative cost (a missed real event) vs. a false positive (an unnecessary action/alert)? Ask the user if the relative costs aren't obvious from the domain.
3. **Recommended threshold** — suggest the optimal threshold given the stated or inferred cost asymmetry
4. **Per-group thresholds** — check if different groups/segments warrant different thresholds based on their base rate
5. **Downstream impact** — if this classifier gates a downstream model/stage, explain how changing the threshold affects which rows reach that stage

Output the sweep table and a single recommended threshold with justification.
