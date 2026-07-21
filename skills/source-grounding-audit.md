Check whether the generated output in $ARGUMENTS is actually grounded in its source documents, rather than hallucinated.

1. **Extract claims** — pull out factual/specific claims from the generated text (numbers, product names, application rates, dates, recommendations)
2. **Match to source** — for each claim, search the source documents (PDFs, guides, retrieved chunks) for supporting text
3. **Flag ungrounded claims** — anything stated confidently that has no traceable source, or that contradicts the source
4. **Flag misattribution** — claims that are technically present in a source but attributed to the wrong context (e.g., a rate for one product applied to another)
5. **Check retrieval quality** — if this is a RAG pipeline, confirm the retrieved chunks actually contain what's needed to answer the query, not just semantically similar but irrelevant text
6. **Severity rating** — rate each ungrounded claim Low/Medium/High risk based on whether acting on it could cause real harm (e.g., wrong chemical application rate = High)

Report as a table: claim → source match (yes/no/partial) → risk level → suggested fix. If everything is grounded, confirm it explicitly rather than a generic pass.
