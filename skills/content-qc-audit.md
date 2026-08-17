Audit the quality-control gates on an AI-generated content pipeline (e.g., a newsletter, report, or summary generator) before content reaches publish/delivery.

1. **QC step inventory** — list every quality gate the content passes through (plagiarism check, fact-check, citation audit, tone/style check, duplicate-source removal, etc.) and where each sits in the pipeline
2. **Coverage gaps** — flag any generated content type (section, agent, template) that skips QC entirely, or only gets a subset of the checks other sections get
3. **Fact-check grounding** — for any fact-check step, verify it's actually checking claims against cited/retrieved sources rather than just asking the LLM to self-assess plausibility
4. **Rewrite loop safety** — if failed QC triggers an automatic rewrite, check there's a max-retry cap and a defined fallback (e.g., drop the section, flag for human review) if it never passes
5. **Citation integrity** — check that every factual claim attributed to a source actually traces back to real, retrievable source content (no fabricated citations)
6. **Silent failure risk** — check what happens if a QC step itself errors (e.g., the fact-checking API times out) — does content get blocked, or does it default to publishing unchecked?

Output a QC coverage table (content type × check type) and flag the highest-risk gaps where unchecked content could reach the audience.
