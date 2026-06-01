Package the model in $ARGUMENTS (or ModelFinal) as a deployable prediction API.

1. **Serialize the model** — save the trained pipeline using joblib to a `model.pkl` file if not already done
2. **FastAPI endpoint** — generate a `api.py` with a POST /predict endpoint that accepts weather/environmental inputs as JSON and returns disease probability + severity
3. **Input schema** — define a Pydantic model matching the exact features the model expects, with field descriptions and valid ranges
4. **Input validation** — add range checks for each feature (e.g., humidity 0-100, temperature in plausible range) and return a 422 with a clear message on invalid input
5. **Response schema** — return: disease_predicted (bool), disease_probability (float), severity_score (float or null), confidence (str: low/medium/high based on distance from training distribution)
6. **Example curl** — provide a ready-to-run curl command demonstrating a sample prediction request

Do not add authentication, logging, or database persistence — keep it minimal and runnable with `uvicorn api:app`.
