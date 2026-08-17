Package the model in $ARGUMENTS (or the most recently modified model folder) as a deployable prediction API.

1. **Serialize the model** — save the trained pipeline using joblib to a `model.pkl` file if not already done
2. **FastAPI endpoint** — generate an `api.py` with a POST /predict endpoint that accepts the model's input features as JSON and returns its prediction
3. **Input schema** — define a Pydantic model matching the exact features the model expects, with field descriptions and valid ranges
4. **Input validation** — add range checks for each feature and return a 422 with a clear message on invalid input
5. **Response schema** — return the prediction plus any relevant probability/score fields, and a confidence label (low/medium/high based on distance from training distribution)
6. **Example curl** — provide a ready-to-run curl command demonstrating a sample prediction request

Do not add authentication, logging, or database persistence — keep it minimal and runnable with `uvicorn api:app`.
