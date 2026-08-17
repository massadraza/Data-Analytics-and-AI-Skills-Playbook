Compare the backend API contract (e.g., FastAPI Pydantic models, DB schema) against the frontend's expectations (TypeScript types, API client, form fields) to catch drift before it breaks the UI.

1. **Contract inventory** — for each API endpoint, list its request/response schema on the backend and the corresponding TypeScript type/interface used on the frontend
2. **Field drift** — flag fields present in one side but not the other: backend fields the frontend never reads (dead data or a missed feature), or frontend fields with no backend source (will be undefined at runtime)
3. **Type mismatches** — flag fields where backend and frontend disagree on type (e.g., backend returns a nullable field the frontend types as required, or a numeric field typed as string)
4. **Optional vs. required mismatch** — check fields marked required in the TS type but optional/nullable in the Pydantic model (a common source of runtime `undefined` crashes)
5. **Enum/union drift** — for status/category fields with a fixed set of values, verify the same set of allowed values exists on both sides; flag if the backend can emit a value the frontend's union type doesn't include
6. **Unversioned breaking changes** — check whether recent backend schema changes (renamed/removed fields) shipped without a corresponding frontend update in the same change, which would break the deployed UI immediately

Output a drift table (field × backend type × frontend type × status) and flag anything that would currently break at runtime.
