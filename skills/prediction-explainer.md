Given a specific prediction or set of input conditions in $ARGUMENTS, explain why the model made that prediction.

1. **Input summary** — restate the conditions/features being passed to the model
2. **Stage 1 decision** (if multi-stage) — what probability did the classifier/gate output, and which features pushed it above/below threshold
3. **Stage 2 output** (if multi-stage) — what value/severity did the downstream model output and what drove it high or low
4. **Counterfactual** — what would need to change in the inputs for the prediction to flip (e.g., "if feature X dropped below threshold Y, the outcome would not be predicted")
5. **Historical comparison** — compare these conditions to similar historical records in the dataset; is this prediction consistent with what happened historically under similar conditions?
6. **Confidence** — flag if the inputs fall outside the training distribution (extrapolation risk)

Output a plain-English explanation suitable for a non-technical domain expert, not a data scientist.
