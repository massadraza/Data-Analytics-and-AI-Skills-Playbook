Given a specific prediction or set of conditions in $ARGUMENTS, explain why the model made that prediction.

1. **Input summary** — restate the weather/environmental conditions being passed to the model
2. **Stage 1 decision** — what probability of disease presence did the classifier output, and which features pushed it above/below threshold
3. **Stage 2 severity** — if disease was predicted, what severity score was output and what drove it high or low
4. **Counterfactual** — what would need to change in the inputs for the prediction to flip (e.g., "if humidity dropped below X, disease would not be predicted")
5. **Historical comparison** — compare these conditions to similar historical records in the dataset; is this prediction consistent with what happened historically under similar weather?
6. **Confidence** — flag if the inputs fall outside the training distribution (extrapolation risk)

Output a plain-English explanation suitable for a turfgrass manager, not a data scientist.
