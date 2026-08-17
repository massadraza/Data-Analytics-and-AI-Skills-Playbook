Audit the health of a vector store / RAG index (e.g., pgvector, Pinecone, Chroma) used to ground agent or LLM output.

1. **Ingestion inventory** — what content gets embedded and indexed, how often, and whether the update job has failure alerting
2. **Staleness check** — identify content that changes upstream (e.g., source articles, research papers, docs) but whose embeddings/chunks are never refreshed or invalidated
3. **Chunking quality** — sample a few chunks and check they're semantically coherent (not cut mid-sentence/mid-table) and sized appropriately for the embedding model and retrieval use case
4. **Duplicate/near-duplicate entries** — check for the same source re-embedded multiple times (re-runs without dedup, or near-identical content from different sources) that could crowd out diverse retrieval results
5. **Retrieval sanity check** — run a handful of representative queries and manually inspect whether the top-k results are actually relevant; flag if similarity scores are high but content is off-topic (embedding/model mismatch)
6. **Metadata filters** — verify retrieval queries apply the metadata filters they're supposed to (e.g., date range, source type, region) rather than searching the entire index every time
7. **Index growth** — check whether the index has unbounded growth with no retention/archival policy, which will eventually degrade retrieval latency and quality

Output a health summary and the highest-priority fix if retrieval quality looks degraded.
